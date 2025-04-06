"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, Mail, Bell, Star, Zap, Shield, Check } from "lucide-react";

export default function NewsletterSubscription() {
  // State management
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Animation effect on component mount
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Form submission handler
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (!email.includes("@")) {
        throw new Error("Invalid email address");
      }
      setSuccessMessage("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Component render
  return (
    <div className="min-h-screen flex items-center justify-center  text-white overflow-hidden">
      <div className={`relative max-w-7xl w-full flex flex-col md:flex-row items-stretch shadow-[0_0_50px_rgba(59,130,246,0.3)] rounded-2xl overflow-hidden transition-all duration-1000 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Decorative background elements */}
        <BackgroundDecorations />
        
        {/* Left Section: Subscription Form */}
        <SubscriptionFormSection 
          email={email} 
          setEmail={setEmail} 
          handleSubscribe={handleSubscribe} 
          loading={loading}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />

        {/* Right Section: Visual Content */}
        <VisualContentSection />
      </div>
      
      {/* Animated background */}
      <AnimatedBackground />
    </div>
  );
}

// Background decorations component
const BackgroundDecorations = () => (
  <>
    <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500 rounded-full filter blur-[100px] opacity-20"></div>
    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500 rounded-full filter blur-[100px] opacity-20"></div>
  </>
);

// Subscription form section component
const SubscriptionFormSection = ({ email, setEmail, handleSubscribe, loading, successMessage, errorMessage }) => (
  <div className="w-full md:w-1/2 p-8 md:p-16 bg-gray-900 bg-opacity-80 backdrop-blur-sm relative z-10">
    <PremiumBadge />
    <h2 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
      Level Up Your Inbox
    </h2>
    <p className="text-gray-300 mb-8 text-lg leading-relaxed">
      Subscribe to receive exclusive insights, cutting-edge trends, and personalized content curated for forward-thinkers like you.
    </p>
    <FeaturesList />
    <SubscriptionForm 
      email={email} 
      setEmail={setEmail} 
      handleSubscribe={handleSubscribe} 
      loading={loading} 
    />
    <MessageDisplay 
      successMessage={successMessage} 
      errorMessage={errorMessage} 
    />
    <PrivacyNote />
  </div>
);

// Premium badge component
const PremiumBadge = () => (
  <div className="inline-block px-4 py-1 bg-blue-900 bg-opacity-40 rounded-full mb-6">
    <span className="text-blue-400 text-sm font-medium flex items-center">
      <Mail size={14} className="mr-2" /> Premium Newsletter
    </span>
  </div>
);

// Features list component
const FeaturesList = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    <Feature icon={<Zap size={18} />} text="Weekly Updates" />
    <Feature icon={<Star size={18} />} text="Exclusive Content" />
    <Feature icon={<Bell size={18} />} text="Early Access" />
    <Feature icon={<Shield size={18} />} text="No Spam Promise" />
  </div>
);

// Individual feature component
const Feature = ({ icon, text }) => (
  <div className="flex items-center">
    <div className="mr-3 p-2 bg-blue-900 bg-opacity-30 rounded-lg">
      {icon}
    </div>
    <span className="text-gray-200">{text}</span>
  </div>
);

// Subscription form component
const SubscriptionForm = ({ email, setEmail, handleSubscribe, loading }) => (
  <form onSubmit={handleSubscribe} className="flex flex-col gap-5">
    <div className="relative group">
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full h-[60px] px-5 rounded-xl border border-gray-700 bg-gray-800 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-500 group-hover:border-blue-400"
      />
      <ChevronRight
        size={24}
        className="absolute right-4 top-[50%] transform -translate-y-[50%] text-blue-400 group-hover:translate-x-1 transition-transform duration-300"
      />
    </div>
    <SubscribeButton loading={loading} />
  </form>
);

// Subscribe button component
const SubscribeButton = ({ loading }) => (
  <button
    type="submit"
    disabled={loading}
    className={`w-full h-[60px] rounded-xl font-bold text-lg relative overflow-hidden transition-all duration-300 ${
      loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
    }`}
  >
    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x"></span>
    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
    <span className="relative flex items-center justify-center">
      {loading ? "Subscribing..." : "Subscribe Now"}
      {!loading && <ChevronRight size={20} className="ml-2" />}
    </span>
  </button>
);

// Message display component
const MessageDisplay = ({ successMessage, errorMessage }) => (
  <>
    {successMessage && (
      <div className="mt-6 p-4 bg-green-900 bg-opacity-20 border border-green-800 rounded-lg flex items-center">
        <Check size={20} className="text-green-400 mr-2" />
        <p className="text-green-400 font-medium">{successMessage}</p>
      </div>
    )}
    {errorMessage && (
      <div className="mt-6 p-4 bg-red-900 bg-opacity-20 border border-red-800 rounded-lg">
        <p className="text-red-400 font-medium">{errorMessage}</p>
      </div>
    )}
  </>
);

// Privacy note component
const PrivacyNote = () => (
  <p className="mt-6 text-sm text-gray-500">
    We respect your privacy and will never share your information. Unsubscribe with a single click anytime.
  </p>
);

// Visual content section component
const VisualContentSection = () => (
  <div className="w-full md:w-1/2 p-8 md:p-16 bg-gray-800 bg-opacity-70 backdrop-blur-sm flex flex-col justify-center items-center relative z-10">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full filter blur-[80px] opacity-10"></div>
    <NewsletterImage />
    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
      Join Our Community
    </h3>
    <p className="text-gray-300 mb-8 text-center max-w-md">
      Connect with over 25,000 forward-thinking professionals who are already benefiting from our curated insights and exclusive content.
    </p>
    <Testimonial />
    <TrustIndicators />
  </div>
);

// Newsletter image component
const NewsletterImage = () => (
  <div className="relative mb-10 transition-transform duration-500 hover:scale-105">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full filter blur-[30px] opacity-30"></div>
    <img
      src="/newsletter-image.svg" // Replace with your image URL
      alt="Newsletter Illustration"
      className="w-[90%] max-w-[350px] h-auto relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
    />
  </div>
);

// Testimonial component
const Testimonial = () => (
  <div className="bg-gray-900 bg-opacity-50 p-6 rounded-xl border border-gray-700 mb-6 w-full max-w-md hover:border-blue-800 transition-colors duration-300">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
        <span className="font-bold text-white">JD</span>
      </div>
      <div>
        <h4 className="font-medium text-white">Jane Doe</h4>
        <p className="text-sm text-gray-400">Product Designer</p>
      </div>
    </div>
    <p className="text-gray-300 italic">
      "This newsletter has consistently delivered valuable insights that have directly impacted my work. Absolutely worth subscribing!"
    </p>
  </div>
);

// Trust indicators component
const TrustIndicators = () => (
  <div className="flex flex-wrap justify-center gap-4 mt-4">
    <TrustBadge text="25K+ Subscribers" />
    <TrustBadge text="Weekly Updates" />
    <TrustBadge text="4.9/5 Rating" />
  </div>
);

// Individual trust badge component
const TrustBadge = ({ text }) => (
  <div className="px-4 py-2 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
    <span className="text-gray-400 text-sm">{text}</span>
  </div>
);

// Animated background component
const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-blob"></div>
    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-900 rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-blob animation-delay-4000"></div>
  </div>
);
