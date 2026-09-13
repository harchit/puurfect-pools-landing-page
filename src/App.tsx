import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Estimate from "./pages/Estimate";
import Contact from "./pages/Contact";
import ConcretePools from "./pages/ConcretePools";
import Spas from "./pages/Spas";
import Financing from "./pages/Financing";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Projects from "./pages/Projects";
import SpruceProject from "./pages/SpruceProject";
import MontalcinoProject from "./pages/MontalcinoProject";
import BrycewoodProject from "./pages/BrycewoodProject";
import GarlandProject from "./pages/GarlandProject";

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
          <Route path="/estimate" element={<Estimate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/concrete-pools" element={<ConcretePools />} />
          <Route path="/spas" element={<Spas />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/spruce" element={<SpruceProject />} />
          <Route path="/projects/montalcino" element={<MontalcinoProject />} />
          <Route path="/projects/brycewood" element={<BrycewoodProject />} />
          <Route path="/projects/garland" element={<GarlandProject />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;