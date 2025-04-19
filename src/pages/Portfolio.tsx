
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

type Category = 'all' | 'weddings' | 'portraits' | 'families' | 'events';

interface GalleryItem {
  id: number;
  src: string;
  category: Exclude<Category, 'all'>;
  alt: string;
}

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [isLoading, setIsLoading] = useState(false);

  const galleryItems: GalleryItem[] = [
    // Weddings
    { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'weddings', alt: "Bride and groom" },
    { id: 2, src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'weddings', alt: "Wedding ceremony" },
    { id: 3, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'weddings', alt: "Wedding rings" },
    { id: 4, src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'weddings', alt: "Wedding dress" },
    
    // Portraits
    { id: 5, src: "https://images.unsplash.com/photo-1517940310602-26535839fe84?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'portraits', alt: "Professional portrait" },
    { id: 6, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'portraits', alt: "Male portrait" },
    { id: 7, src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'portraits', alt: "Female portrait" },
    { id: 8, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'portraits', alt: "Fashion portrait" },
    
    // Families
    { id: 9, src: "https://images.unsplash.com/photo-1437915160026-6c59da36ede2?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'families', alt: "Family outdoors" },
    { id: 10, src: "https://images.unsplash.com/photo-1478061653917-455ba7f4a541?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'families', alt: "Family at home" },
    { id: 11, src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'families', alt: "Family with children" },
    { id: 12, src: "https://images.unsplash.com/photo-1484665754804-74b091911087?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'families', alt: "Family portrait" },
    
    // Events
    { id: 13, src: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'events', alt: "Corporate event" },
    { id: 14, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'events', alt: "Party event" },
    { id: 15, src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'events', alt: "Concert event" },
    { id: 16, src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80", category: 'events', alt: "Birthday party" }
  ];

  const handleCategoryChange = (category: Category) => {
    setIsLoading(true);
    setSelectedCategory(category);
    
    // Simulate loading time for animation effect
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      <section className="py-12 px-4 md:px-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-serif mb-2">Portfolio</h1>
          <p className="text-gray-dark mb-10 max-w-2xl">
            Explore our collection of professional photography across various categories.
            Each image tells a unique story and captures the essence of special moments.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Button 
              variant={selectedCategory === 'all' ? 'default' : 'outline'} 
              className={`rounded-full ${selectedCategory === 'all' ? 'bg-gold hover:bg-gold-dark' : 'border-gold text-gold hover:bg-gold/10'}`}
              onClick={() => handleCategoryChange('all')}
            >
              All
            </Button>
            <Button 
              variant={selectedCategory === 'weddings' ? 'default' : 'outline'} 
              className={`rounded-full ${selectedCategory === 'weddings' ? 'bg-gold hover:bg-gold-dark' : 'border-gold text-gold hover:bg-gold/10'}`}
              onClick={() => handleCategoryChange('weddings')}
            >
              Weddings
            </Button>
            <Button 
              variant={selectedCategory === 'portraits' ? 'default' : 'outline'} 
              className={`rounded-full ${selectedCategory === 'portraits' ? 'bg-gold hover:bg-gold-dark' : 'border-gold text-gold hover:bg-gold/10'}`}
              onClick={() => handleCategoryChange('portraits')}
            >
              Portraits
            </Button>
            <Button 
              variant={selectedCategory === 'families' ? 'default' : 'outline'} 
              className={`rounded-full ${selectedCategory === 'families' ? 'bg-gold hover:bg-gold-dark' : 'border-gold text-gold hover:bg-gold/10'}`}
              onClick={() => handleCategoryChange('families')}
            >
              Families
            </Button>
            <Button 
              variant={selectedCategory === 'events' ? 'default' : 'outline'} 
              className={`rounded-full ${selectedCategory === 'events' ? 'bg-gold hover:bg-gold-dark' : 'border-gold text-gold hover:bg-gold/10'}`}
              onClick={() => handleCategoryChange('events')}
            >
              Events
            </Button>
          </div>

          {/* Gallery Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            {filteredItems.map((item) => (
              <div key={item.id} className="image-card group">
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="font-serif text-xl">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</h3>
                    <p className="text-white/80">{item.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
