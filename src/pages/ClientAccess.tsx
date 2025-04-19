
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Lock, Unlock, Image } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const ClientAccess = () => {
  const { toast } = useToast();
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [galleryData, setGalleryData] = useState<{
    client: string;
    date: string;
    images: GalleryImage[];
  } | null>(null);

  // Mock gallery data
  const mockGallery = {
    client: "Sarah & David's Wedding",
    date: "April 15, 2025",
    images: [
      { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", alt: "Wedding ceremony" },
      { id: 2, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", alt: "Wedding rings" },
      { id: 3, src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", alt: "Wedding venue" },
      { id: 4, src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", alt: "Wedding cake" },
      { id: 5, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", alt: "Bride and groom" },
      { id: 6, src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", alt: "Wedding dress" },
      { id: 7, src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", alt: "Wedding flowers" },
      { id: 8, src: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", alt: "First dance" },
      { id: 9, src: "https://images.unsplash.com/photo-1470204639138-9a712edeebb1?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", alt: "Wedding guests" },
      { id: 10, src: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", alt: "Bride portrait" },
      { id: 11, src: "https://images.unsplash.com/photo-1508717272800-9fff97da7e8f?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", alt: "Wedding party" },
      { id: 12, src: "https://images.unsplash.com/photo-1482482097755-0b595893ba63?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", alt: "Wedding reception" },
    ]
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessToken(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      // For demo purposes, any token works, but in a real app you would validate against a database
      if (accessToken.trim() !== '') {
        setAuthenticated(true);
        setGalleryData(mockGallery);
        toast({
          title: "Access Granted",
          description: "Welcome to your private gallery!",
        });
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid access token. Please try again.",
          variant: "destructive"
        });
      }
      setLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setGalleryData(null);
    setAccessToken('');
    toast({
      title: "Logged Out",
      description: "You've been logged out of the client gallery."
    });
  };

  return (
    <Layout>
      <section className="py-12 px-4 md:px-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-serif mb-2">Client Gallery Access</h1>
          <p className="text-gray-dark mb-10 max-w-2xl">
            Enter your unique access token to view your private photo gallery.
            This token was provided to you after your photography session.
          </p>

          {!authenticated ? (
            <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-md">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-gold/10 flex items-center justify-center">
                  <Lock className="h-10 w-10 text-gold" />
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="accessToken" className="block mb-2 font-medium">
                    Access Token
                  </label>
                  <Input 
                    id="accessToken"
                    value={accessToken}
                    onChange={handleTokenChange}
                    placeholder="Enter your access token"
                    required
                    className="rounded-lg"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gold hover:bg-gold-dark text-white rounded-full"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Access Gallery'}
                </Button>
              </form>
              
              <p className="mt-6 text-center text-gray-dark text-sm">
                Don't have an access token? <a href="/contact" className="text-gold hover:underline">Contact us</a> for assistance.
              </p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="flex flex-wrap justify-between items-center bg-white p-6 rounded-3xl shadow-md mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                  <Unlock className="h-6 w-6 text-gold mr-3" />
                  <div>
                    <h2 className="text-2xl font-serif">{galleryData?.client}</h2>
                    <p className="text-gray-dark">Session Date: {galleryData?.date}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    className="border-gold text-gold hover:bg-gold/10 rounded-full"
                    onClick={() => {
                      toast({
                        title: "Download Started",
                        description: "Your gallery is being prepared for download."
                      });
                    }}
                  >
                    Download All
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-gray-dark text-gray-dark hover:bg-gray-lightest rounded-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {galleryData?.images.map((image) => (
                  <div key={image.id} className="image-card group">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="rounded-full border-white text-white hover:bg-white/20 mr-2"
                          onClick={() => {
                            toast({
                              title: "Downloading Image",
                              description: `Downloading ${image.alt}...`
                            });
                          }}
                        >
                          <Image className="h-5 w-5" />
                        </Button>
                        <span className="block mt-2">{image.alt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ClientAccess;
