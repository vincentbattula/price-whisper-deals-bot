
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./ProductCard";

// Sample product data
const SAMPLE_PRODUCTS = [
  {
    id: "iphone15pro",
    title: "Apple iPhone 15 Pro, 256GB, Natural Titanium, Unlocked",
    image: "https://placehold.co/400x400/f8f8f8/878787?text=iPhone+15+Pro",
    originalPrice: 79999,
    currentPrice: 75999,
    discount: 5,
    rating: 4.8,
    store: "Amazon",
    storeIcon: "https://placehold.co/20x20/f8f8f8/878787?text=A",
    availability: "In Stock",
    badges: ["Free Shipping", "Apple Care+"],
    paymentOptions: [
      { type: "card" as const, label: "ICICI Card", discount: 0, bank: "ICICI" },
      { type: "emi" as const, label: "No Cost EMI", discount: 5 },
      { type: "voucher" as const, label: "APPLEDEAL", discount: 3 }
    ]
  },
  {
    id: "2",
    title: "Samsung Galaxy S24 Ultra, 512GB, Titanium Black, 5G",
    image: "https://placehold.co/400x400/f8f8f8/878787?text=Galaxy+S24",
    originalPrice: 104999,
    currentPrice: 96999,
    discount: 7.6,
    rating: 4.7,
    store: "Samsung",
    storeIcon: "https://placehold.co/20x20/f8f8f8/878787?text=S",
    availability: "In Stock",
    badges: ["Free Shipping", "Samsung Care+"],
    paymentOptions: [
      { type: "voucher" as const, label: "GALAXY100", discount: 8 },
      { type: "card" as const, label: "ICICI Card", discount: 7, bank: "ICICI" },
      { type: "emi" as const, label: "6 Month EMI", discount: 0 }
    ]
  },
  {
    id: "3",
    title: "Sony PlayStation 5 Digital Edition Console with DualSense Controller",
    image: "https://placehold.co/400x400/f8f8f8/878787?text=PS5",
    originalPrice: 32999,
    currentPrice: 28999,
    discount: 12.1,
    rating: 4.9,
    store: "Croma",
    storeIcon: "https://placehold.co/20x20/f8f8f8/878787?text=BB",
    availability: "Few Left",
    badges: ["Limited Offer", "Includes Game Pass"],
    paymentOptions: [
      { type: "card" as const, label: "Citi Card", discount: 5, bank: "Citi" },
      { type: "emi" as const, label: "12 Month EMI", discount: 0 },
      { type: "voucher" as const, label: "GAMING20", discount: 5 }
    ]
  },
];

const TRENDING_PRODUCTS = [
  {
    id: "4",
    title: "Apple MacBook Air with M2 chip, 13.6-inch, 256GB SSD",
    image: "https://placehold.co/400x400/f8f8f8/878787?text=MacBook+Air",
    originalPrice: 94999,
    currentPrice: 79999,
    discount: 15.8,
    rating: 4.8,
    store: "Apple Store",
    storeIcon: "https://placehold.co/20x20/f8f8f8/878787?text=A",
    availability: "In Stock",
    badges: ["Student Offer", "Free Engraving"],
    paymentOptions: [
      { type: "card" as const, label: "American Express", discount: 7, bank: "Amex" },
      { type: "emi" as const, label: "No Cost EMI", discount: 0 },
      { type: "voucher" as const, label: "BACKTOSCHOOL", discount: 8 }
    ]
  },
  {
    id: "iphone15pro",
    title: "Apple iPhone 15 Pro, 256GB, Natural Titanium, Unlocked",
    image: "https://placehold.co/400x400/f8f8f8/878787?text=iPhone+15+Pro",
    originalPrice: 79999,
    currentPrice: 75999,
    discount: 5,
    rating: 4.8,
    store: "Amazon",
    storeIcon: "https://placehold.co/20x20/f8f8f8/878787?text=A",
    availability: "In Stock",
    badges: ["Free Shipping", "5% Cashback"],
    paymentOptions: [
      { type: "card" as const, label: "ICICI Card", discount: 0, bank: "ICICI" },
      { type: "emi" as const, label: "No Cost EMI", discount: 5 },
      { type: "voucher" as const, label: "APPLE15", discount: 3 }
    ]
  },
];

const DealComparison = () => {
  const [activeTab, setActiveTab] = useState("today");
  
  return (
    <section id="deals" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
            Compare & Save on Top Products
          </h2>
          <p className="mt-4 text-gray-600">
            ShopWise AI finds the absolute best prices by comparing all payment options,
            applying vouchers, and checking EMI deals.
          </p>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl text-brand-dark">Best Deals</CardTitle>
              <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="today">
                <TabsList>
                  <TabsTrigger value="today">Today's Deals</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="today">
              <TabsContent value="today" className="space-y-6 mt-6">
                {SAMPLE_PRODUCTS.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </TabsContent>
              <TabsContent value="trending" className="space-y-6 mt-6">
                {TRENDING_PRODUCTS.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DealComparison;
