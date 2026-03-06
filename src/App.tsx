import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Trainers from "./pages/Trainers";
import Gallery from "./pages/Gallery";
import Plans from "./pages/Plans";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminTrainers from "./pages/admin/AdminTrainers";
import AdminPlans from "./pages/admin/AdminPlans";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminInquiries from "./pages/admin/AdminInquiries";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/trainers" element={<Layout><Trainers /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
            <Route path="/plans" element={<Layout><Plans /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/admin/trainers" element={<AdminLayout><AdminTrainers /></AdminLayout>} />
            <Route path="/admin/plans" element={<AdminLayout><AdminPlans /></AdminLayout>} />
            <Route path="/admin/gallery" element={<AdminLayout><AdminGallery /></AdminLayout>} />
            <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
            <Route path="/admin/inquiries" element={<AdminLayout><AdminInquiries /></AdminLayout>} />

            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
