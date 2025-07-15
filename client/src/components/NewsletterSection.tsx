import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/components/ui/use-toast";

export default function NewsletterSection() {
  const newsletterMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('POST', '/api/newsletter', data);
    },
    onSuccess: (data: any) => {
      const form = document.querySelector('form[data-newsletter-form]') as HTMLFormElement;
      if (form) form.reset();
      toast({
        title: "Welcome to Code Garden! 🌱",
        description: "You've successfully subscribed to our newsletter. Get ready for coding tips and updates!",
        variant: "default"
      });
    },
    onError: (error: any) => {
      console.error('Newsletter subscription error:', error);
      toast({
        variant: "destructive",
        title: "Subscription Failed",
        description: error.message || 'Something went wrong. Please try again.'
      });
    }
  });

  const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (!data.email) {
      toast({
        variant: "destructive",
        title: "Email Required",
        description: "Please enter your email address."
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email as string)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address."
      });
      return;
    }

    newsletterMutation.mutate({ email: data.email });
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <h3 className="mb-3">Stay Updated with Code Garden</h3>
            <p className="text-muted mb-4">Get the latest coding tips, course updates, and special offers delivered to your inbox.</p>

            <form onSubmit={handleNewsletter} className="d-flex gap-2" data-newsletter-form>
              <input 
                type="email" 
                className="form-control form-control-modern" 
                placeholder="Enter your email address" 
                name="email" 
                required 
              />
              <button 
                type="submit" 
                className="btn btn-modern btn-primary-modern"
                disabled={newsletterMutation.isPending}
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}