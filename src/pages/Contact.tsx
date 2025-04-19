
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, User } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: 'wedding'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        serviceType: 'wedding'
      });
    }, 1500);
  };

  return (
    <Layout>
      <section className="py-12 px-4 md:px-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-serif mb-2">Contact Us</h1>
          <p className="text-gray-dark mb-10 max-w-2xl">
            Have questions or ready to book a session? Contact us using the form below or 
            reach out directly through phone or email.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-md">
                <h2 className="text-2xl font-serif mb-6">Send a Message</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">
                      Your Name
                    </label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">
                      Email Address
                    </label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium">
                      Phone Number
                    </label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="serviceType" className="block mb-2 font-medium">
                      Service Type
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray rounded-lg"
                      required
                    >
                      <option value="wedding">Wedding</option>
                      <option value="portrait">Portrait</option>
                      <option value="family">Family</option>
                      <option value="event">Event</option>
                      <option value="commercial">Commercial</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block mb-2 font-medium">
                    Subject
                  </label>
                  <Input 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Inquiry about wedding photography"
                    required
                    className="rounded-lg"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your photography needs..."
                    rows={5}
                    required
                    className="rounded-lg"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gold hover:bg-gold-dark text-white rounded-full"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            <div>
              <div className="bg-white p-8 rounded-3xl shadow-md mb-6">
                <h2 className="text-2xl font-serif mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-gold mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-gray-dark">contact@goldenlens.com</p>
                      <p className="text-gray-dark">bookings@goldenlens.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-gold mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-gray-dark">(123) 456-7890</p>
                      <p className="text-gray-dark">(123) 456-7891</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="h-6 w-6 text-gold mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Studio Address</h3>
                      <address className="not-italic text-gray-dark">
                        123 Photography Lane<br />
                        San Francisco, CA 94105<br />
                        United States
                      </address>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-md">
                <h2 className="text-2xl font-serif mb-6">Business Hours</h2>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </li>
                </ul>
                <p className="mt-4 text-gray-dark">
                  Photoshoots are available outside of business hours by appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
