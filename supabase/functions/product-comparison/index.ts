
// Follow Deno runtime for Supabase Edge Functions
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36/deno-dom-wasm.ts";

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
    
    // Extract product details from the original URL
    const productDetails = await extractProductDetails(url, platform);
    console.log("Extracted product details:", productDetails);
    
    if (!productDetails) {
      return new Response(
        JSON.stringify({ error: "Failed to extract product details" }),
        { headers: corsHeaders, status: 400 }
      );
    }
    
    // Search for the same product on other platforms
    const results = await searchProductOnPlatforms(productDetails, platform);
    console.log("Search results:", results);
    
    // Find the best price
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

// Extract product details from the given URL
async function extractProductDetails(url: string, platform: string): Promise<any> {
  try {
    // This would normally use a headless browser or specialized scraping library
    // For demonstration, we'll use a simple fetch and DOM parsing
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product page: ${response.status}`);
    }
    
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    
    // Extract product details based on the platform
    // Note: These selectors would need to be updated regularly as websites change
    if (platform === "amazon") {
      return {
        title: doc?.querySelector("#productTitle")?.textContent?.trim(),
        price: parsePrice(doc?.querySelector(".a-price-whole")?.textContent),
        image: doc?.querySelector("#landingImage")?.getAttribute("src"),
        platform: "amazon"
      };
    } else if (platform === "flipkart") {
      return {
        title: doc?.querySelector(".B_NuCI")?.textContent?.trim(),
        price: parsePrice(doc?.querySelector("._30jeq3._16Jk6d")?.textContent),
        image: doc?.querySelector("._396cs4")?.getAttribute("src"),
        platform: "flipkart"
      };
    } else if (platform === "croma") {
      return {
        title: doc?.querySelector(".pd-title")?.textContent?.trim(),
        price: parsePrice(doc?.querySelector(".amount")?.textContent),
        image: doc?.querySelector(".pd-img-container img")?.getAttribute("src"),
        platform: "croma"
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error extracting product details: ${error.message}`);
    return null;
  }
}

// Parse price from string to number
function parsePrice(priceStr: string | undefined | null): number | null {
  if (!priceStr) return null;
  
  // Remove currency symbols, commas, and non-numeric characters
  const cleanPrice = priceStr.replace(/[^0-9.]/g, "");
  return parseFloat(cleanPrice) || null;
}

// Search for the product on other platforms
async function searchProductOnPlatforms(productDetails: any, originalPlatform: string): Promise<any[]> {
  // In a real implementation, this would use platform-specific search APIs
  // or more sophisticated web scraping techniques
  
  const platforms = ["amazon", "flipkart", "croma"];
  const results = [productDetails]; // Include the original product
  
  // Search term based on product title
  const searchTerm = productDetails.title
    ?.split(" ")
    .slice(0, 5)
    .join(" "); // Use first 5 words for more accurate results
  
  for (const platform of platforms) {
    // Skip the original platform
    if (platform === originalPlatform) continue;
    
    // Construct search URL
    let searchUrl;
    if (platform === "amazon") {
      searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(searchTerm)}`;
    } else if (platform === "flipkart") {
      searchUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(searchTerm)}`;
    } else if (platform === "croma") {
      searchUrl = `https://www.croma.com/searchB?q=${encodeURIComponent(searchTerm)}`;
    } else {
      continue;
    }
    
    try {
      // This is a simplified version; a real implementation would need to:
      // 1. Navigate to the search results page
      // 2. Find the most relevant product
      // 3. Visit that product page
      // 4. Extract the details
      
      // Mock data for demonstration
      const mockResults = {
        amazon: {
          title: productDetails.title,
          price: productDetails.price * 0.95, // Slightly lower price for demo
          image: "https://example.com/amazon-image.jpg",
          platform: "amazon",
          url: "https://www.amazon.in/product-example"
        },
        flipkart: {
          title: productDetails.title,
          price: productDetails.price * 1.05, // Slightly higher price for demo
          image: "https://example.com/flipkart-image.jpg",
          platform: "flipkart",
          url: "https://www.flipkart.com/product-example"
        },
        croma: {
          title: productDetails.title,
          price: productDetails.price * 0.90, // Lower price for demo
          image: "https://example.com/croma-image.jpg",
          platform: "croma",
          url: "https://www.croma.com/product-example"
        }
      };
      
      results.push(mockResults[platform]);
    } catch (error) {
      console.error(`Error searching on ${platform}: ${error.message}`);
      // Continue with other platforms if one fails
    }
  }
  
  return results.filter(Boolean); // Filter out any null results
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
