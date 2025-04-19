
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

interface PackageProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const PackageCard: React.FC<PackageProps> = ({ title, price, description, features, popular }) => {
  return (
    <div className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${popular ? 'shadow-xl shadow-gold/20 scale-105 border-2 border-gold' : 'shadow-lg hover:shadow-xl'}`}>
      {popular && (
        <div className="absolute top-0 right-0 bg-gold text-white px-4 py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      <div className="bg-white p-8">
        <h3 className="text-2xl font-serif mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-4xl font-serif text-gold">${price}</span>
        </div>
        <p className="text-gray-dark mb-6">{description}</p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-gold shrink-0 mr-2 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link to="/contact">
          <Button className={`w-full rounded-full ${popular ? 'bg-gold hover:bg-gold-dark' : 'bg-gray-light text-foreground hover:bg-gray'}`}>
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Packages = () => {
  return (
    <Layout>
      <section className="py-12 px-4 md:px-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-serif mb-2">Photography Packages</h1>
          <p className="text-gray-dark mb-10 max-w-2xl">
            Choose from our range of professional photography packages designed to meet your specific needs.
            Each package includes post-processing and delivery of high-quality images.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <PackageCard 
              title="Essential Portrait" 
              price="299"
              description="Perfect for individuals or couples looking for professional portraits."
              features={[
                "1-hour photoshoot",
                "1 location",
                "10 professionally edited digital images",
                "Online gallery for 30 days",
                "Print release for personal use"
              ]}
            />
            <PackageCard 
              title="Family Collection" 
              price="499"
              description="Ideal for families wanting to capture precious moments together."
              features={[
                "2-hour photoshoot",
                "Up to 2 locations",
                "25 professionally edited digital images",
                "Online gallery for 60 days",
                "Print release for personal use",
                "1 11x14 mounted print"
              ]}
              popular
            />
            <PackageCard 
              title="Wedding Premium" 
              price="1,999"
              description="Comprehensive coverage for your special day, from preparation to reception."
              features={[
                "8 hours of wedding day coverage",
                "Second photographer included",
                "Engagement photoshoot session",
                "300+ professionally edited digital images",
                "Online gallery for 6 months",
                "Custom wedding album (10x10, 20 pages)",
                "Print release for personal use"
              ]}
            />
          </div>

          <h2 className="text-3xl font-serif mb-6">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-md">
              <h3 className="text-xl font-serif mb-4">À La Carte Options</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-gray-light pb-2">
                  <span>Additional Hour of Coverage</span>
                  <span className="font-medium">$150</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-light pb-2">
                  <span>Extra Location</span>
                  <span className="font-medium">$75</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-light pb-2">
                  <span>Additional Edited Images (per 10)</span>
                  <span className="font-medium">$100</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-light pb-2">
                  <span>Rush Editing (48-hour delivery)</span>
                  <span className="font-medium">$250</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Second Photographer</span>
                  <span className="font-medium">$350</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-md">
              <h3 className="text-xl font-serif mb-4">Print Products</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-gray-light pb-2">
                  <span>8x10 Professional Print</span>
                  <span className="font-medium">$25</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-light pb-2">
                  <span>11x14 Professional Print</span>
                  <span className="font-medium">$45</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-light pb-2">
                  <span>16x20 Canvas Print</span>
                  <span className="font-medium">$150</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-light pb-2">
                  <span>Custom Photo Album (10x10, 20 pages)</span>
                  <span className="font-medium">$350</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Set of 25 5x7 Thank You Cards</span>
                  <span className="font-medium">$75</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-lightest rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-serif mb-4">Custom Packages</h2>
            <p className="text-gray-dark mb-6">
              Need something different? We offer custom packages tailored to your specific requirements. 
              Whether it's a special event, commercial photography, or a unique personal project, we can 
              create a package that works for you.
            </p>
            <Link to="/contact">
              <Button className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">
                Request Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Packages;
