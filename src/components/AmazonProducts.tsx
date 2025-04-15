
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const AmazonProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("product-comparison", {
        body: { 
          action: 'fetch_products',
          keywords: 'electronics',
          limit: 30 
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data && data.products) {
        setProducts(data.products);
      } else {
        setError("No products found");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center my-16">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-brand-teal mb-4" />
          <p className="text-gray-600">Loading trending products...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center my-16">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchProducts}
          className="mt-4 px-4 py-2 bg-brand-teal text-white rounded-md hover:bg-brand-teal/90"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
            Trending Products
          </h2>
          <p className="mt-4 text-gray-600">
            Discover the hottest deals on today's most popular products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={page === currentPage} 
                    onClick={() => paginate(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => paginate(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
};

export default AmazonProducts;
