import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Services from "./pages/Services";
import Trainers from "./pages/Trainers";
import Gallery from "./pages/Gallery";
import Plans from "./pages/Plans";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Transformations from "./pages/Transformations";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminTrainers from "./pages/admin/AdminTrainers";
import AdminPlans from "./pages/admin/AdminPlans";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminServices from "./pages/admin/AdminServices";
import AdminStatistics from "./pages/admin/AdminStatistics";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminTransformations from "./pages/admin/AdminTransformations";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-pulse text-primary font-heading text-xl">Loading...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/services" element={<Layout><Services /></Layout>} />
              <Route path="/trainers" element={<Layout><Trainers /></Layout>} />
              <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
              <Route path="/plans" element={<Layout><Plans /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/blog" element={<Layout><Blog /></Layout>} />
              <Route path="/transformations" element={<Layout><Transformations /></Layout>} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
              <Route path="/admin/trainers" element={<AdminLayout><AdminTrainers /></AdminLayout>} />
              <Route path="/admin/plans" element={<AdminLayout><AdminPlans /></AdminLayout>} />
              <Route path="/admin/gallery" element={<AdminLayout><AdminGallery /></AdminLayout>} />
              <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
              <Route path="/admin/inquiries" element={<AdminLayout><AdminInquiries /></AdminLayout>} />
              <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
              <Route path="/admin/statistics" element={<AdminLayout><AdminStatistics /></AdminLayout>} />
              <Route path="/admin/blog" element={<AdminLayout><AdminBlog /></AdminLayout>} />
              <Route path="/admin/transformations" element={<AdminLayout><AdminTransformations /></AdminLayout>} />
              <Route path="/admin/reviews" element={<AdminLayout><AdminReviews /></AdminLayout>} />
              <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
