
import { ArrowRight, CreditCard, Gift, Percent, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50 py-12 sm:py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwQUJBQjUiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzAgMEMxMy40MzEgMCAwIDEzLjQzMSAwIDMwYzAgMTYuNTY5IDEzLjQzMSAzMCAzMCAzMCAxNi41NjkgMCAzMC0xMy40MzEgMzAtMzBDNjAgMTMuNDMxIDQ2LjU2OSAwIDMwIDB6bTAgM2MyLjU3NSAwIDUuMDY0LjM3NSA3LjQzMiAxLjA0NmwtMy4wNjIgMy4wNjJDMzIuOTA0IDYuMzg3IDMxLjQ3NSA2IDMwIDZzLTIuOTA0LjM4Ny00LjM3IDEuMTA4bC0zLjA2Mi0zLjA2MkMyNC45MzYgMy4zNzUgMjcuNDI1IDMgMzAgM3ptLTEzLjAzMiA0LjUxM2wzLjAzOSAzLjAzOWMtLjcyNSAxLjQ3LTEuMTE0IDMuMTA0LTEuMTE0IDQuODI0IDAgLjM0OS4wMjMuNjkuMDU1IDEuMDI4bC00LjUzMSA0LjUzYy0uNjQtMS42OTQtLjk5My0zLjUyNy0uOTkzLTUuNDQ1IDAtNC4yMzYgMS43Mi04LjA3IDQuNDk0LTEwLjg0NXEtLjQ5OS4zODEtLjk1Ljc5NXptNy40NTQgMS45OUM0IDExLjMwNiA1LjI5NyAxMiA1LjI5NyAxMyAxMy4zMDYgMTEuMzA2IDEgMS4zMDYgOSA1LjI5NyAxMyA1LjI5NyAxM3MuMDA2IDAgMCAweiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6">
            Find the <span className="text-brand-teal">Absolute Best Deals</span> Across the Web
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            PriceWhisper compares prices, payment options, and applies the best vouchers
            automatically to get you the lowest possible price on any product.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <CreditCard className="h-5 w-5 text-brand-teal" />
              <span className="text-sm font-medium">Card Offers</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Gift className="h-5 w-5 text-brand-teal" />
              <span className="text-sm font-medium">Vouchers</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Percent className="h-5 w-5 text-brand-teal" />
              <span className="text-sm font-medium">EMI Options</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <TrendingDown className="h-5 w-5 text-brand-teal" />
              <span className="text-sm font-medium">Price History</span>
            </div>
          </div>
          
          <SearchBar />
          
          <p className="text-sm text-gray-500 mt-4">
            Popular: iPhone 15 Pro, PlayStation 5, Nike Air Max, Samsung TV
          </p>
        </div>

        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            className="group flex items-center gap-2 text-brand-dark"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See how it works
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
