
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { slogan } from '@/lib/constants';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className={`absolute inset-0 bg-[url('https://vaneck-photography.s3.af-south-1.amazonaws.com/featured/1.png')] bg-cover bg-center`}>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container relative z-10 px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 max-w-3xl">
            Your special moments
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-xl">
            captured.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/portfolio">
              <Button className="bg-gold hover:bg-gold-dark text-white rounded-full px-8 py-6">
                View Portfolio
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white hover:bg-white/20 rounded-full px-8 py-6">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">About Van Eck Photography</h2>
              <p className="mb-6 text-gray-dark">
                With over 10 years of experience capturing life's most precious moments, Van Eck Photography
                offers a unique perspective and artistic vision for your special occasions.
              </p>
              <p className="mb-6 text-gray-dark">
                Whether it's a wedding, family portrait, special event, or professional headshot,
                I bring passion, creativity, and technical expertise to every photoshoot.
              </p>
              <Link to="/contact">
                <Button className="bg-gold hover:bg-gold-dark text-white rounded-full px-6">
                  Book a Session
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Photographer with camera"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gold flex items-center justify-center text-white font-serif text-lg">
                10+ Years
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 px-4 md:px-8 bg-gray-lightest rounded-3xl mx-4">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="image-card">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80"
                alt="Wedding photography"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white font-serif text-xl">Weddings</span>
              </div>
            </div>
            <div className="image-card">
              <img
                src="https://images.unsplash.com/photo-1517940310602-26535839fe84?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80"
                alt="Portrait photography"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white font-serif text-xl">Portraits</span>
              </div>
            </div>
            <div className="image-card">
              <img
                src="https://images.unsplash.com/photo-1437915160026-6c59da36ede2?ixlib=rb-4.0.1&auto=format&fit=crop&w=1350&q=80"
                alt="Family photography"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white font-serif text-xl">Families</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/portfolio">
              <Button className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">
                View Full Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gold text-white flex items-center justify-center font-serif text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Jessica & Michael</h4>
                  <p className="text-gray-dark text-sm">Wedding Photography</p>
                </div>
              </div>
              <p className="text-gray-dark">
                "Our wedding photos are absolutely stunning! The attention to detail and ability to capture
                genuine emotions made our special day even more memorable. Highly recommended!"
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gold text-white flex items-center justify-center font-serif text-xl">
                  R
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Robert Thompson</h4>
                  <p className="text-gray-dark text-sm">Corporate Headshots</p>
                </div>
              </div>
              <p className="text-gray-dark">
                "Professional, efficient, and incredibly skilled. My team's corporate headshots turned out
                perfect and have significantly enhanced our company website and marketing materials."
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gold text-white flex items-center justify-center font-serif text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-gray-dark text-sm">Family Portrait</p>
                </div>
              </div>
              <p className="text-gray-dark">
                "We've been coming back year after year for our family portraits. The photographer has
                an amazing way with kids and always captures our family's personality perfectly."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Access CTA */}
      <section className="py-16 px-4 md:px-8 bg-gold/10 rounded-3xl mx-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-serif mb-4">Are You a Client?</h2>
          <p className="text-gray-dark mb-8 max-w-xl mx-auto">
            Access your personal photo gallery using the access token provided to you after your photoshoot.
          </p>
          <Link to="/client-access">
            <Button className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">
              Client Gallery Access
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
