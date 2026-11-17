import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServerPage from "./pages/ServerPage";
import ContactPage from "./pages/Contact";
import TokenizationPage from "./pages/Tokenization";
import RaceFunnelPage from "./pages/RaceFunnel";
import NotFound from "./pages/NotFound";
import { ContactModalProvider } from "@/hooks/use-contact-modal";
import { ContactModal } from "@/components/ContactModal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ContactModalProvider>
        <Toaster />
        <Sonner />
        <ContactModal />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ServerPage />} />
            <Route path="/manifesto" element={<ServerPage />} />
            <Route path="/tokenization" element={<TokenizationPage />} />
            <Route path="/race-funnel" element={<RaceFunnelPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContactModalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
