import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Symptoms from "@/pages/Symptoms";
import Providers from "@/pages/Providers";
import Pharmacies from "@/pages/Pharmacies";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Profile from "@/pages/Profile";
import FAQ from "@/pages/FAQ";
import Blog from "@/pages/Blog";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Disclaimer from "@/pages/Disclaimer";
import Contact from "@/pages/Contact";
import HealthTracker from "@/pages/HealthTracker";

const App = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/symptoms" element={<Symptoms />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/pharmacies" element={<Pharmacies />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/health-tracker" element={<HealthTracker />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
