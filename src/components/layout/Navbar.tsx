import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart, MapPin, Pill, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="ayu-container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 bg-gradient-to-br from-ayurveda-terracotta to-ayurveda-sage rounded-full flex items-center justify-center">
              <Heart className="text-white h-5 w-5 animate-pulse-glow" />
            </div>
            <span className="text-xl font-bold gradient-text">LoveHealth AI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/symptoms" className="flex items-center space-x-2 text-foreground/80 hover:text-ayurveda-deepblue transition-colors">
              <Heart size={18} />
              <span>Symptom Guide</span>
            </Link>
            <Link to="/providers" className="flex items-center space-x-2 text-foreground/80 hover:text-ayurveda-deepblue transition-colors">
              <MapPin size={18} />
              <span>Healthcare Providers</span>
            </Link>
            <Link to="/pharmacies" className="flex items-center space-x-2 text-foreground/80 hover:text-ayurveda-deepblue transition-colors">
              <Pill size={18} />
              <span>Pharmacies</span>
            </Link>
            
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link to="/signup">
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="sm" className="bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90">
                    Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 border border-ayurveda-sage/50">
                      <AvatarFallback className="bg-ayurveda-cream text-ayurveda-deepblue">
                        {user?.name ? getInitials(user.name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <Link to="/symptoms" className="block py-2 px-4 rounded-md hover:bg-muted">
              <div className="flex items-center space-x-2">
                <Heart size={18} />
                <span>Symptom Guide</span>
              </div>
            </Link>
            <Link to="/providers" className="block py-2 px-4 rounded-md hover:bg-muted">
              <div className="flex items-center space-x-2">
                <MapPin size={18} />
                <span>Healthcare Providers</span>
              </div>
            </Link>
            <Link to="/pharmacies" className="block py-2 px-4 rounded-md hover:bg-muted">
              <div className="flex items-center space-x-2">
                <Pill size={18} />
                <span>Pharmacies</span>
              </div>
            </Link>
            
            {!isLoggedIn ? (
              <div className="block py-2 px-4">
                <Link to="/signup">
                  <Button variant="outline" size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login" className="mt-2">
                  <Button size="sm" className="w-full bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90">
                    Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="block py-2 px-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="h-6 w-6 border border-ayurveda-sage/50">
                    <AvatarFallback className="bg-ayurveda-cream text-ayurveda-deepblue text-xs">
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
