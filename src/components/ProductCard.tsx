
import { useState } from "react";
import { 
  ExternalLink, 
  ThumbsUp, 
  ThumbsDown, 
  CreditCard, 
  Clock, 
  Gift, 
  ShoppingCart 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    image: string;
    originalPrice: number;
    currentPrice: number;
    discount: number;
    rating: number;
    store: string;
    storeIcon: string;
    availability: string;
    badges: string[];
    paymentOptions: {
      type: "card" | "emi" | "voucher";
      label: string;
      discount?: number;
      bank?: string;
    }[];
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedOption, setSelectedOption] = useState(product.paymentOptions[0]);
  const [expanded, setExpanded] = useState(false);
  
  // Calculate final price based on selected payment option
  const finalPrice = selectedOption.discount 
    ? product.currentPrice - (product.currentPrice * (selectedOption.discount / 100))
    : product.currentPrice;
  
  // Calculate total savings
  const totalSavings = product.originalPrice - finalPrice;
  const totalSavingsPercent = Math.round((totalSavings / product.originalPrice) * 100);

  // Format currency in Indian Rupees
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0 h-48 w-full sm:w-48 bg-gray-50 rounded-md overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title} 
              className="h-full w-full object-contain p-2"
            />
          </div>
          
          {/* Product Info */}
          <div className="flex-grow space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <img 
                  src={product.storeIcon} 
                  alt={product.store} 
                  className="h-5 w-5 mr-2" 
                />
                <span className="text-sm text-gray-500">{product.store}</span>
              </div>
              <div className="text-sm text-gray-500">{product.availability}</div>
            </div>
            
            <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
            
            <div className="flex flex-wrap gap-1">
              {product.badges.map((badge, idx) => (
                <Badge key={idx} variant="outline" className="text-xs bg-blue-50">
                  {badge}
                </Badge>
              ))}
            </div>
            
            <div className="mt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-brand-dark">
                  {formatCurrency(finalPrice)}
                </span>
                <span className="text-sm line-through text-gray-400">
                  {formatCurrency(product.originalPrice)}
                </span>
                {totalSavingsPercent > 0 && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Save {totalSavingsPercent}%
                  </Badge>
                )}
              </div>
              
              <div className="mt-3 space-y-2">
                <div className="text-sm font-medium">Choose payment option:</div>
                <div className="flex flex-wrap gap-2">
                  {product.paymentOptions.map((option, idx) => (
                    <TooltipProvider key={idx}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={selectedOption === option ? "default" : "outline"}
                            size="sm"
                            className={`text-xs ${
                              selectedOption === option 
                                ? "bg-brand-teal hover:bg-brand-teal/90" 
                                : "hover:border-brand-teal"
                            }`}
                            onClick={() => setSelectedOption(option)}
                          >
                            {option.type === "card" && <CreditCard className="h-3 w-3 mr-1" />}
                            {option.type === "emi" && <Clock className="h-3 w-3 mr-1" />}
                            {option.type === "voucher" && <Gift className="h-3 w-3 mr-1" />}
                            {option.label}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            {option.type === "card" && `Save with ${option.bank} card`}
                            {option.type === "emi" && "Monthly instalment option"}
                            {option.type === "voucher" && "Apply discount voucher"}
                            {option.discount ? ` - ${option.discount}% off` : ""}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-600">
              <ThumbsUp className="h-4 w-4" />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <ThumbsDown className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Less Details" : "More Details"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white hover:bg-gray-50"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button 
              variant="default" 
              size="sm"
              className="bg-brand-orange hover:bg-brand-orange/90"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Expanded details */}
      {expanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-sm">
          <div className="space-y-3">
            <div>
              <div className="font-medium mb-1">Deal Quality</div>
              <div className="flex items-center gap-2">
                <Progress value={85} className="h-2" />
                <span className="text-xs font-medium">85%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                This is a great deal based on price history and current market offers
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="font-medium mb-1">Price History</div>
                <p className="text-xs text-gray-500">
                  Current price is the lowest in the last 30 days
                </p>
              </div>
              
              <div>
                <div className="font-medium mb-1">Shipping</div>
                <p className="text-xs text-gray-500">
                  Free shipping with estimated delivery in 2-3 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
