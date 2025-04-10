
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DealComparison from "@/components/DealComparison";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
                Smart Features to Save You Money
              </h2>
              <p className="mt-4 text-gray-600">
                PriceWhisper uses advanced algorithms to find you the absolute best deals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-brand-dark">Compare All Options</h3>
                <p className="text-gray-600">
                  We compare prices across all major retailers and marketplaces to find the lowest prices.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-brand-dark">Card & EMI Savings</h3>
                <p className="text-gray-600">
                  Automatically check for credit card discounts, EMI options, and bank offers for additional savings.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-brand-dark">Voucher Finder</h3>
                <p className="text-gray-600">
                  Our system automatically finds and applies the best vouchers and promo codes for maximum discounts.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
                How PriceWhisper Works
              </h2>
              <p className="mt-4 text-gray-600">
                Finding the absolute best deal has never been easier.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-brand-dark">Search Product</h3>
                  <p className="text-gray-600">
                    Enter a product name, URL, or upload an image to start your search.
                  </p>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-brand-dark">Compare Options</h3>
                  <p className="text-gray-600">
                    We instantly scan all retailers, payment options, and available vouchers.
                  </p>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-brand-dark">Save Big</h3>
                  <p className="text-gray-600">
                    Choose the best deal and buy with confidence, knowing it's the lowest price available.
                  </p>
                </div>
                
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-8 left-[25%] right-[25%] h-0.5 bg-gray-200"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Deal Comparison Section */}
        <DealComparison />
      </main>
      <Footer />
      
      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Index;
