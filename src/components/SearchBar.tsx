
import { useState } from "react";
import { Search, Camera, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const SearchBar = () => {
  const isMobile = useMobile();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    
    // For demo, we'll just show a success toast
    toast.success("Searching for: " + searchQuery);
    
    // In a real app, we would:
    // 1. Trigger an API call to search for products
    // 2. Update the UI with search results
    // 3. Store recent searches
    
    // Simulate scrolling to results
    document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageSearch = () => {
    toast("Image search coming soon!", {
      description: "Upload a product image to find the best deals.",
      action: {
        label: "Dismiss",
        onClick: () => console.log("Dismissed")
      },
    });
  };

  const handleVoiceSearch = () => {
    toast("Voice search coming soon!", {
      description: "Speak to search for products.",
      action: {
        label: "Dismiss",
        onClick: () => console.log("Dismissed")
      },
    });
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center w-full">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search for any product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-l-full border-2 border-r-0 border-gray-200 focus:border-brand-teal focus:ring-brand-teal focus:outline-none text-gray-700 shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        <div className="flex">
          {!isMobile && (
            <>
              <button 
                type="button"
                onClick={handleImageSearch}
                className="bg-white border-2 border-l-0 border-r-0 border-gray-200 px-3 py-4 text-gray-600 hover:text-brand-teal transition"
                title="Search by image"
              >
                <Camera className="h-5 w-5" />
              </button>
              <button 
                type="button"
                onClick={handleVoiceSearch}
                className="bg-white border-2 border-l-0 border-r-0 border-gray-200 px-3 py-4 text-gray-600 hover:text-brand-teal transition"
                title="Search by voice"
              >
                <Mic className="h-5 w-5" />
              </button>
            </>
          )}
          
          <Button 
            type="submit" 
            className="rounded-r-full bg-brand-teal hover:bg-brand-teal/90 text-white px-8 py-6 h-full"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
