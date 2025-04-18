
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, CheckCircle, ShoppingCart, CreditCard, Clock, Tag, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRetailer, setSelectedRetailer] = useState("amazon");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<any>(null);
  
  useEffect(() => {
    fetchProductDetails();
  }, [id]);
  
  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      // For predefined products, we'll use hardcoded data
      if (id === "iphone15promax") {
        const iphoneData = {
          id: "iphone15promax",
          title: "Apple iPhone 15 Pro Max, 256GB, Natural Titanium, Unlocked",
          image: "https://placehold.co/400x400/f8f8f8/878787?text=iPhone+15+Pro+Max",
          originalPrice: 79999,
          currentPrice: 75999,
          discount: 5,
          rating: 4.9,
          store: "Amazon",
          storeIcon: "https://placehold.co/20x20/f8f8f8/878787?text=A",
          availability: "In Stock",
          badges: ["Free Shipping", "2 Year Apple Care"],
          description: "The iPhone 15 Pro Max features a titanium design, the powerful A17 Pro chip, a 48MP main camera with 5x optical zoom, and a stunning 6.7-inch Super Retina XDR display.",
          specifications: [
            { name: "Display", value: "6.7-inch Super Retina XDR" },
            { name: "Processor", value: "A17 Pro chip" },
            { name: "Storage", value: "256GB" },
            { name: "Camera", value: "48MP main, 12MP ultra wide, 12MP telephoto with 5x optical zoom" },
            { name: "Battery", value: "Up to 29 hours video playback" },
            { name: "OS", value: "iOS 17" },
            { name: "Water Resistance", value: "IP68" },
            { name: "Color", value: "Natural Titanium" }
          ],
          retailers: [
            { 
              name: "Amazon", 
              price: 75999,
              icon: "https://placehold.co/20x20/f8f8f8/878787?text=A",
              inStock: true,
              deliveryTime: "1-2 days",
              isCheapest: true,
              paymentOptions: [
                { type: "card", label: "ICICI Platinum Credit Card", discount: 0, bank: "ICICI" },
                { type: "emi", label: "6 Month No Cost EMI (ICICI)", discount: 4000, finalPrice: 71999, bank: "ICICI" },
                { type: "card", label: "HDFC Credit Card", discount: 2000, finalPrice: 73999, bank: "HDFC" }
              ]
            },
            { 
              name: "Flipkart", 
              price: 76599,
              icon: "https://placehold.co/20x20/f8f8f8/878787?text=F",
              inStock: true,
              deliveryTime: "2-3 days",
              isCheapest: false,
              paymentOptions: [
                { type: "card", label: "Axis Bank Card", discount: 1500, finalPrice: 75099, bank: "Axis" },
                { type: "emi", label: "3 Month No Cost EMI", discount: 0, finalPrice: 76599 },
                { type: "voucher", label: "APPLE1000", discount: 1000, finalPrice: 75599 }
              ]
            },
            { 
              name: "Croma", 
              price: 77999,
              icon: "https://placehold.co/20x20/f8f8f8/878787?text=C",
              inStock: true,
              deliveryTime: "3-4 days",
              isCheapest: false,
              paymentOptions: [
                { type: "card", label: "SBI Card", discount: 2000, finalPrice: 75999, bank: "SBI" },
                { type: "emi", label: "9 Month Low Cost EMI", discount: 0, finalPrice: 77999 },
                { type: "voucher", label: "WELCOME500", discount: 500, finalPrice: 77499 }
              ]
            }
          ]
        };
        setProduct(iphoneData);
        setSelectedPaymentOption(iphoneData.retailers[0].paymentOptions[1]); // Default to the ICICI EMI option
      } else if (id === "samsungs24ultra") {
        const samsungData = {
          id: "samsungs24ultra",
          title: "Samsung Galaxy S24 Ultra, 512GB, Titanium Black, 5G",
          image: "https://placehold.co/400x400/f8f8f8/878787?text=Galaxy+S24+Ultra",
          originalPrice: 134999,
          currentPrice: 92250,
          discount: 31.7,
          rating: 4.8,
          store: "Amazon",
          storeIcon: "https://placehold.co/20x20/f8f8f8/878787?text=A",
          availability: "In Stock",
          badges: ["Free Shipping", "Samsung Care+"],
          description: "The Samsung Galaxy S24 Ultra features a stunning 6.8-inch Dynamic AMOLED display, Snapdragon 8 Gen 3 processor, 200MP main camera, and a built-in S Pen for enhanced productivity.",
          specifications: [
            { name: "Display", value: "6.8-inch Dynamic AMOLED 2X, 120Hz" },
            { name: "Processor", value: "Snapdragon 8 Gen 3" },
            { name: "Storage", value: "512GB" },
            { name: "Camera", value: "200MP main, 12MP ultra wide, 50MP telephoto with 5x optical zoom" },
            { name: "Battery", value: "5,000mAh" },
            { name: "OS", value: "Android 14 with One UI 6.1" },
            { name: "Water Resistance", value: "IP68" },
            { name: "Color", value: "Titanium Black" }
          ],
          retailers: [
            { 
              name: "Amazon", 
              price: 92250,
              icon: "https://placehold.co/20x20/f8f8f8/878787?text=A",
              inStock: true,
              deliveryTime: "1-2 days",
              isCheapest: true,
              paymentOptions: [
                { type: "card", label: "Standard Price", discount: 0, finalPrice: 92250 },
                { type: "card", label: "HDFC Credit Card", discount: 30250, finalPrice: 62000, bank: "HDFC" },
                { type: "emi", label: "No Cost EMI (12 months)", discount: 0, finalPrice: 92250 }
              ]
            },
            { 
              name: "Flipkart", 
              price: 94990,
              icon: "https://placehold.co/20x20/f8f8f8/878787?text=F",
              inStock: false,
              deliveryTime: "Out of Stock",
              isCheapest: false,
              paymentOptions: [
                { type: "card", label: "Standard Price", discount: 0, finalPrice: 94990 },
                { type: "card", label: "Axis Bank Card", discount: 5000, finalPrice: 89990, bank: "Axis" },
                { type: "emi", label: "3 Month No Cost EMI", discount: 0, finalPrice: 94990 }
              ]
            },
            { 
              name: "Samsung", 
              price: 96990,
              icon: "https://placehold.co/20x20/f8f8f8/878787?text=S",
              inStock: true,
              deliveryTime: "3-5 days",
              isCheapest: false,
              paymentOptions: [
                { type: "card", label: "Standard Price", discount: 0, finalPrice: 96990 },
                { type: "card", label: "Student Discount", discount: 8, finalPrice: 89231 },
                { type: "emi", label: "24 Month Low Cost EMI", discount: 0, finalPrice: 96990 }
              ]
            }
          ]
        };
        setProduct(samsungData);
        setSelectedPaymentOption(samsungData.retailers[0].paymentOptions[1]); // Default to the credit card option
      } else if (id === "ps5") {
        const ps5Data = {
          id: "ps5",
          title: "Sony PlayStation 5 Digital Edition Console with DualSense Controller",
          image: "https://placehold.co/400x400/f8f8f8/878787?text=PS5",
          originalPrice: 47990,
          currentPrice: 44990,
          discount: 6.3,
          rating: 4.9,
          store: "Amazon",
          storeIcon: "https://placehold.co/20x20/f8f8f8/878787?text=A",
          availability: "In Stock",
          badges: ["Limited Offer", "Includes Game Pass"],
          description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.",
          specifications: [
            { name: "CPU", value: "AMD Zen 2-based CPU with 8 cores at 3.5GHz" },
            { name: "GPU", value: "10.28 TFLOPs, 36 CUs at 2.23GHz (variable frequency)" },
            { name: "RAM", value: "16GB GDDR6" },
            { name: "Storage", value: "825GB SSD" },
            { name: "Resolution", value: "Up to 4K" },
            { name: "Frame Rate", value: "Up to 120fps" },
            { name: "Optical Drive", value: "None (Digital Edition)" },
            { name: "HDMI", value: "HDMI 2.1" }
          ],
          retailers: [
            { 
              name: "Amazon", 
              price: 44990,
              icon: "https://placehold.co/20x20/f8f8f8/878787?text=A",
              inStock: true,
              deliveryTime: "1-2 days",
              isCheapest: true,
              paymentOptions: [
                { type: "card", label: "Standard Price", discount: 0, finalPrice: 44990 },
                { type: "card", label: "SBI Credit Card", discount: 4000, finalPrice: 40990, bank: "SBI" },
                { type: "emi", label: "No Cost EMI (6 months)", discount: 0, finalPrice: 44990 }
              ]
            },
            { 
              name: "Flipkart", 
              price: 46490,
              icon: "https://placehold.co/20x20/f8f8f8/878787?text=F",
              inStock: true,
              deliveryTime: "2-3 days",
              isCheapest: false,
              paymentOptions: [
                { type: "card", label: "Standard Price", discount: 0, finalPrice: 46490 },
                { type: "card", label: "ICICI Bank Card", discount: 1500, finalPrice: 44990, bank: "ICICI" },
                { type: "voucher", label: "GAMING1000", discount: 1000, finalPrice: 45490 }
              ]
            },
            { 
              name: "Croma", 
              price: 47990,
              icon: "https://placehold.co/20x20/f8f8f8/878787?text=C",
              inStock: true,
              deliveryTime: "3-4 days",
              isCheapest: false,
              paymentOptions: [
                { type: "card", label: "Standard Price", discount: 0, finalPrice: 47990 },
                { type: "emi", label: "12 Month EMI", discount: 0, finalPrice: 47990 },
                { type: "voucher", label: "WELCOME2000", discount: 2000, finalPrice: 45990 }
              ]
            }
          ]
        };
        setProduct(ps5Data);
        setSelectedPaymentOption(ps5Data.retailers[0].paymentOptions[1]); // Default to the credit card option
      } else {
        // For other products, fetch from the API
        const { data, error } = await supabase.functions.invoke("product-comparison", {
          body: { 
            action: 'fetch_product',
            productId: id
          }
        });
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data && data.product) {
          setProduct(data.product);
          if (data.product.retailers && data.product.retailers.length > 0) {
            setSelectedPaymentOption(data.product.retailers[0].paymentOptions[0]);
          }
        } else {
          setError("Product not found");
        }
      }
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };
  
  // Find the selected retailer object
  const getSelectedRetailer = () => {
    if (!product || !product.retailers) return null;
    return product.retailers.find((r: any) => r.name.toLowerCase() === selectedRetailer);
  };
  
  // Calculate the best price across all retailers
  const getBestPrice = () => {
    if (!product || !product.retailers) return null;
    
    let bestPrice = Infinity;
    let bestOption = null;
    
    product.retailers.forEach((retailer: any) => {
      retailer.paymentOptions.forEach((option: any) => {
        const finalPrice = option.finalPrice || retailer.price - (retailer.price * (option.discount || 0) / 100);
        if (finalPrice < bestPrice) {
          bestPrice = finalPrice;
          bestOption = {
            retailer: retailer.name,
            option: option.label,
            price: finalPrice
          };
        }
      });
    });
    
    return bestOption;
  };
  
  const bestPrice = getBestPrice();
  const selectedRetailerObj = getSelectedRetailer();
  
  const handleBuyNow = (retailer: string, option: any) => {
    toast({
      title: "Proceeding to checkout",
      description: `Redirecting to ${retailer} with ${option.label} payment option`,
    });
    // In a real app, this would redirect to the retailer's checkout page
    console.log(`Buying from ${retailer} with option:`, option);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-brand-teal mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="text-center my-16">
        <p className="text-red-500">{error || "Product not found"}</p>
        <Button 
          onClick={() => navigate(-1)}
          className="mt-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-[400px] object-contain"
            />
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2">{product.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {product.badges?.map((badge: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-blue-50">
                    {badge}
                  </Badge>
                ))}
              </div>
              
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              {bestPrice && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-4">
                  <div className="flex items-center text-green-800 mb-2">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Best Deal Found</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Save the most with {bestPrice.retailer} using {bestPrice.option} 
                    for ₹{bestPrice.price.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Compare Prices</CardTitle>
                <CardDescription>Choose your preferred retailer and payment option</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue={selectedRetailer} 
                  onValueChange={setSelectedRetailer}
                  className="space-y-4"
                >
                  <TabsList className="grid grid-cols-3">
                    {product.retailers.map((retailer: any, idx: number) => (
                      <TabsTrigger key={idx} value={retailer.name.toLowerCase()}>
                        <img 
                          src={retailer.icon} 
                          alt={retailer.name} 
                          className="h-5 w-5 mr-2" 
                        />
                        {retailer.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {product.retailers.map((retailer: any, idx: number) => (
                    <TabsContent 
                      key={idx} 
                      value={retailer.name.toLowerCase()}
                      className={`space-y-4 ${selectedRetailer === retailer.name.toLowerCase() ? 'border-2 border-brand-teal rounded-lg p-4' : ''}`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center">
                            <p className="text-2xl font-bold text-brand-dark">
                              ₹{retailer.price.toLocaleString()}
                            </p>
                            {retailer.isCheapest && (
                              <Badge className="ml-2 bg-purple-600 hover:bg-purple-700">
                                <BadgePercent className="h-3 w-3 mr-1" /> Cheapest
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {retailer.inStock ? "In Stock" : "Out of Stock"} • 
                            Delivery in {retailer.deliveryTime}
                          </p>
                        </div>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline">View All Payment Options</Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>{retailer.name} Payment Options</SheetTitle>
                              <SheetDescription>
                                Choose the payment option that saves you the most
                              </SheetDescription>
                            </SheetHeader>
                            <div className="space-y-4 mt-6">
                              {retailer.paymentOptions.map((option: any, optIdx: number) => {
                                const finalPrice = option.finalPrice || 
                                  retailer.price - (retailer.price * (option.discount || 0) / 100);
                                
                                return (
                                  <div 
                                    key={optIdx}
                                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                    onClick={() => {
                                      setSelectedPaymentOption(option);
                                    }}
                                  >
                                    <div className="flex items-center mb-2">
                                      {option.type === "card" && <CreditCard className="h-4 w-4 mr-2" />}
                                      {option.type === "emi" && <Clock className="h-4 w-4 mr-2" />}
                                      {option.type === "voucher" && <Tag className="h-4 w-4 mr-2" />}
                                      <span className="font-medium">{option.label}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-xl font-semibold">₹{finalPrice.toLocaleString()}</span>
                                      {option.discount > 0 && (
                                        <Badge variant="outline" className="bg-green-50 text-green-700">
                                          Save ₹{(
                                            typeof option.discount === 'number' && option.discount > 100 
                                              ? option.discount 
                                              : retailer.price * (option.discount || 0) / 100
                                          ).toLocaleString()}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium">Popular Payment Options:</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {retailer.paymentOptions.slice(0, 2).map((option: any, optIdx: number) => {
                            const finalPrice = option.finalPrice || 
                              retailer.price - (retailer.price * (option.discount || 0) / 100);
                            
                            return (
                              <div 
                                key={optIdx}
                                className={`p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                                  selectedPaymentOption === option ? 'border-brand-teal bg-blue-50' : ''
                                }`}
                                onClick={() => setSelectedPaymentOption(option)}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    {option.type === "card" && <CreditCard className="h-4 w-4 mr-2" />}
                                    {option.type === "emi" && <Clock className="h-4 w-4 mr-2" />}
                                    {option.type === "voucher" && <Tag className="h-4 w-4 mr-2" />}
                                    <span className="font-medium">{option.label}</span>
                                  </div>
                                  <span className="text-lg font-semibold">₹{finalPrice.toLocaleString()}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-brand-orange hover:bg-brand-orange/90"
                        onClick={() => handleBuyNow(retailer.name, selectedPaymentOption || retailer.paymentOptions[0])}
                        disabled={!retailer.inStock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" /> 
                        {retailer.inStock ? `Buy Now from ${retailer.name}` : "Out of Stock"}
                      </Button>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Specifications */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Specifications</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableBody>
                {product.specifications?.map((spec: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium w-1/3">{spec.name}</TableCell>
                    <TableCell>{spec.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
