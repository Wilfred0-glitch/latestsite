import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/components/ui/use-toast";

export default function NewsletterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (data: any) => {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      return apiRequest('POST', '/api/newsletter', data);
    },
    onSuccess: (data: any) => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      const form = document.querySelector('form[data-newsletter-form]') as HTMLFormElement;
      if (form) form.reset();
      
      // Reset status after animation
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
      
      toast({
        title: "Welcome to Code Garden! 🌱",
        description: "You've successfully subscribed to our newsletter. Get ready for coding tips and updates!",
        variant: "default"
      });
    },
    onError: (error: any) => {
      setIsSubmitting(false);
      setSubmitStatus('error');
      console.error('Newsletter subscription error:', error);
      
      // Reset status after showing error
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
      
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
                className={`btn btn-modern ${submitStatus === 'success' ? 'btn-success-modern' : 'btn-primary-modern'}`}
                disabled={newsletterMutation.isPending}
              >
                {newsletterMutation.isPending ? (
                  <>
                    <div className="sending-animation me-2">
                      <div className="paper-plane">
                        <i className="fas fa-envelope"></i>
                      </div>
                    </div>
                    Subscribing...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <div className="success-animation me-2">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    Message Sent!
                  </>
                ) : (
                  <>
                    <i className="fas fa-arrow-right me-2"></i>
                    Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}