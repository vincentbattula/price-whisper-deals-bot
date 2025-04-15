
// Follow Deno runtime for Supabase Edge Functions
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

// Handle CORS preflight requests
function handleCors(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  return null;
}

// RapidAPI Amazon Price API endpoint
const AMAZON_API_ENDPOINT = "https://amazon-price1.p.rapidapi.com/search";
const AMAZON_API_KEY = Deno.env.get("RAPID_API_KEY") || "60b41dc98dmsh4323112fb253f31p11d159jsn54c8ab9429d2";

serve(async (req) => {
  try {
    // Handle CORS
    const corsResponse = handleCors(req);
    if (corsResponse) return corsResponse;

    // Parse the request body
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL is required" }),
        { headers: corsHeaders, status: 400 }
      );
    }
    
    console.log("Received product URL:", url);
    
    // Determine which platform the URL is from
    const platform = determinePlatform(url);
    console.log("Detected platform:", platform);
    
    if (!platform) {
      return new Response(
        JSON.stringify({ error: "Unsupported e-commerce platform" }),
        { headers: corsHeaders, status: 400 }
      );
    }
    
    // Extract basic product details from the URL (no longer using DOM parsing)
    const productDetails = extractBasicProductDetails(url, platform);
    console.log("Extracted product details:", productDetails);
    
    if (!productDetails) {
      return new Response(
        JSON.stringify({ error: "Failed to extract product details" }),
        { headers: corsHeaders, status: 400 }
      );
    }
    
    // Search for the same product on other platforms using the API
    const results = await searchProductOnPlatforms(productDetails, platform);
    console.log("Search results:", results);
    
    // Find the best deal
    const bestDeal = findBestDeal(results);
    
    return new Response(
      JSON.stringify({
        originalProduct: productDetails,
        allDeals: results,
        bestDeal: bestDeal
      }),
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: corsHeaders, status: 500 }
    );
  }
});

// Determine the e-commerce platform from the URL
function determinePlatform(url: string): string | null {
  if (url.includes("amazon")) return "amazon";
  if (url.includes("flipkart")) return "flipkart";
  if (url.includes("croma")) return "croma";
  return null;
}

// Extract basic product details from the URL without DOM parsing
function extractBasicProductDetails(url: string, platform: string): any {
  try {
    let title = "Product from " + platform;
    let price = null;
    let image = null;
    let productId = "";
    
    // Extract product ID based on platform
    if (platform === "amazon") {
      productId = extractAmazonProductId(url);
      title = "Amazon Product " + productId;
    } else if (platform === "flipkart") {
      productId = extractFlipkartProductId(url);
      title = "Flipkart Product " + productId;
    } else if (platform === "croma") {
      productId = extractCromaProductId(url);
      title = "Croma Product " + productId;
    }
    
    return {
      title,
      price,
      image,
      id: productId,
      platform,
      url
    };
  } catch (error) {
    console.error(`Error extracting product details: ${error.message}`);
    return null;
  }
}

// Extract Amazon product ID
function extractAmazonProductId(url: string): string {
  const match = url.match(/\/dp\/([A-Z0-9]+)/);
  return match ? match[1] : "";
}

// Extract Flipkart product ID
function extractFlipkartProductId(url: string): string {
  const match = url.match(/\/p\/([a-zA-Z0-9]+)/);
  return match ? match[1] : "";
}

// Extract Croma product ID
function extractCromaProductId(url: string): string {
  const match = url.match(/\/p\/([a-zA-Z0-9]+)/);
  return match ? match[1] : "";
}

// Search for the product on other platforms using the Amazon Price API
async function searchProductOnPlatforms(productDetails: any, originalPlatform: string): Promise<any[]> {
  const results = [productDetails]; // Include the original product
  
  // Use the product title for searching
  const searchTerm = productDetails.title
    ?.split(" ")
    .slice(0, 5)
    .join(" "); // Use first 5 words for more accurate results
  
  try {
    console.log("Searching for product using RapidAPI:", searchTerm);
    
    // Call the Amazon Price API from RapidAPI
    const searchUrl = `${AMAZON_API_ENDPOINT}?keywords=${encodeURIComponent(searchTerm)}`;
    console.log("API URL:", searchUrl);
    
    const apiResponse = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": AMAZON_API_KEY,
        "X-RapidAPI-Host": "amazon-price1.p.rapidapi.com",
      },
    });
    
    if (!apiResponse.ok) {
      console.log("API response not OK, using mock data. Status:", apiResponse.status);
      return useMockData(productDetails, originalPlatform);
    }
    
    const apiData = await apiResponse.json();
    console.log("API search results:", apiData);
    
    if (apiData && Array.isArray(apiData) && apiData.length > 0) {
      // Add Amazon results to our list
      for (const product of apiData.slice(0, 3)) { // Limit to top 3 results for demo
        results.push({
          title: product.title || "Amazon Product",
          price: product.price ? parseFloat(product.price.replace(/[^0-9.]/g, "")) : null,
          image: product.imageUrl || "https://example.com/amazon-image.jpg",
          platform: "amazon",
          url: product.detailPageURL || "https://www.amazon.com"
        });
      }
      
      // Add some mock results for other platforms for comparison
      if (originalPlatform !== "flipkart") {
        results.push({
          title: productDetails.title,
          price: productDetails.price ? productDetails.price * 1.05 : 16500, // Slightly higher price
          image: "https://example.com/flipkart-image.jpg",
          platform: "flipkart",
          url: "https://www.flipkart.com/product-example"
        });
      }
      
      if (originalPlatform !== "croma") {
        results.push({
          title: productDetails.title,
          price: productDetails.price ? productDetails.price * 0.90 : 14200, // Lower price
          image: "https://example.com/croma-image.jpg",
          platform: "croma",
          url: "https://www.croma.com/product-example"
        });
      }
      
      return results;
    } else {
      console.log("No results from API, using mock data");
      return useMockData(productDetails, originalPlatform);
    }
  } catch (error) {
    console.error("Error with Amazon Price API:", error);
    return useMockData(productDetails, originalPlatform);
  }
}

// Fallback to mock data when API fails
function useMockData(productDetails: any, originalPlatform: string): any[] {
  const results = [productDetails];
  
  const mockResults = {
    amazon: {
      title: productDetails.title,
      price: productDetails.price ? productDetails.price * 0.95 : 15000, // Slightly lower price for demo
      image: "https://example.com/amazon-image.jpg",
      platform: "amazon",
      url: "https://www.amazon.in/product-example"
    },
    flipkart: {
      title: productDetails.title,
      price: productDetails.price ? productDetails.price * 1.05 : 16500, // Slightly higher price for demo
      image: "https://example.com/flipkart-image.jpg",
      platform: "flipkart",
      url: "https://www.flipkart.com/product-example"
    },
    croma: {
      title: productDetails.title,
      price: productDetails.price ? productDetails.price * 0.90 : 14200, // Lower price for demo
      image: "https://example.com/croma-image.jpg",
      platform: "croma",
      url: "https://www.croma.com/product-example"
    }
  };
  
  // Add mock results for platforms other than the original one
  for (const platform of Object.keys(mockResults)) {
    if (platform !== originalPlatform) {
      results.push(mockResults[platform as keyof typeof mockResults]);
    }
  }
  
  return results;
}

// Find the best deal from the search results
function findBestDeal(results: any[]): any {
  if (!results || results.length === 0) return null;
  
  // Sort by price (lowest first)
  const sortedResults = [...results].sort((a, b) => {
    // Handle null prices
    if (a.price === null) return 1;
    if (b.price === null) return -1;
    return a.price - b.price;
  });
  
  return sortedResults[0]; // Return the lowest price product
}
