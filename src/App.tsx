import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import DemosPage from "./pages/DemosPage";
import PricingPage from "./pages/PricingPage";
import TechnologyPage from "./pages/TechnologyPage";
import UseCasesPage from "./pages/UseCasesPage";
import AuthPage from "./pages/AuthPage";
import AIAgentBuilder from "./pages/AIAgentBuilder";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/demos" element={<DemosPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/use-cases" element={<UseCasesPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/build-agent" element={<AIAgentBuilder />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
