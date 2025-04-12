
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, X, ShoppingBag, MessageSquare, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-brand-teal" />
            <span className="font-bold text-xl text-brand-dark">
              Shop<span className="text-brand-teal">Wise AI</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-700 hover:text-brand-teal transition">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-700 hover:text-brand-teal transition">
            How It Works
          </a>
          <a href="#deals" className="text-gray-700 hover:text-brand-teal transition">
            Today's Deals
          </a>
          <Button variant="ghost" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Chat
          </Button>
          
          {user ? (
            <>
              <Button variant="ghost" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Profile
              </Button>
              <Button 
                onClick={() => signOut()} 
                variant="outline"
                className="flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                Sign In
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <MenuIcon className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white px-4 pt-2 pb-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            <a
              href="#features"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#deals"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Today's Deals
            </a>
            <Button variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
            
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button 
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }} 
                  variant="outline"
                  className="justify-start"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button
                  className="bg-brand-teal hover:bg-brand-teal/90 text-white w-full"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
