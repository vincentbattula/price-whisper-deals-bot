
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const ProductSearchForm = () => {
  const [productUrl, setProductUrl] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productUrl) {
      toast.error("Please enter a product URL");
      return;
    }
    
    // Check if URL is from a supported platform
    const isSupported = ["amazon", "flipkart", "croma"].some(platform => 
      productUrl.toLowerCase().includes(platform)
    );
    
    if (!isSupported) {
      toast.error("Please enter a URL from Amazon, Flipkart, or Croma");
      return;
    }
    
    setLoading(true);
    setResults(null);
    
    try {
      const { data, error } = await supabase.functions.invoke("product-comparison", {
        body: { url: productUrl }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data || !data.bestDeal) {
        throw new Error("No price comparison data returned");
      }
      
      console.log("Comparison results:", data);
      setResults(data);
      toast.success("Found price comparisons!");
    } catch (error) {
      console.error("Error fetching price comparisons:", error);
      toast.error("Failed to compare prices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Paste product URL from Amazon, Flipkart, or Croma"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            className="flex-grow"
            required
          />
          <Button 
            type="submit" 
            className="bg-brand-teal hover:bg-brand-teal/90"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Compare Prices
          </Button>
        </div>
      </form>
      
      {loading && (
        <div className="flex justify-center my-12">
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-brand-teal mb-4" />
            <p className="text-gray-600">Searching for the best prices...</p>
          </div>
        </div>
      )}
      
      {results && (
        <div className="mt-8 space-y-6">
          <Card className="border-brand-teal/50">
            <CardHeader>
              <CardTitle className="text-xl text-brand-teal flex items-center gap-2">
                <span className="bg-brand-teal text-white text-xs px-2 py-1 rounded-full">Best Deal</span>
                {results.bestDeal.platform.toUpperCase()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0 p-2">
                  {results.bestDeal.image ? (
                    <img src={results.bestDeal.image} alt={results.bestDeal.title} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-lg line-clamp-2">{results.bestDeal.title}</h3>
                  <div className="mt-2 text-2xl font-bold text-brand-dark">
                    {formatCurrency(results.bestDeal.price)}
                  </div>
                  <Button 
                    variant="default" 
                    size="sm"
                    className="mt-2 bg-brand-orange hover:bg-brand-orange/90"
                    onClick={() => window.open(results.bestDeal.url, '_blank')}
                  >
                    View Deal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h3 className="text-lg font-medium mt-6 mb-4">All Price Comparisons</h3>
          
          <div className="space-y-4">
            {results.allDeals.map((deal: any, index: number) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="pt-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{deal.platform.toUpperCase()}</div>
                      {deal.platform === results.bestDeal.platform && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Best Price</span>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="text-lg font-bold">
                        {formatCurrency(deal.price)}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => window.open(deal.url, '_blank')}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearchForm;
