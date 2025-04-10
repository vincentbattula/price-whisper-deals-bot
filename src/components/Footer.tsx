
import { Heart, Mail, MessageCircle, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="font-bold text-xl">
                Price<span className="text-brand-teal">Whisper</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Find the best deals across the web with our smart comparison engine. 
              We check all payment options to find you the absolute lowest price.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-brand-dark mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-teal text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-teal text-sm">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-teal text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-teal text-sm">
                  Browser Extension
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-brand-dark mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-teal text-sm">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-teal text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-teal text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-teal text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-brand-dark mb-4">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to get notified about new features and hot deals.
            </p>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                />
              </div>
              <Button className="w-full bg-brand-teal hover:bg-brand-teal/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} PriceWhisper. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-gray-500 text-sm flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by the PriceWhisper Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
