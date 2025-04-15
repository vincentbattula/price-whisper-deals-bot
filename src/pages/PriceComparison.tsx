
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductSearchForm from "@/components/ProductSearchForm";

const PriceComparison = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-brand-dark mb-2">
            Compare Product Prices
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Paste a product URL from Amazon, Flipkart, or Croma to find the best price across all platforms
          </p>
          
          <ProductSearchForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PriceComparison;
