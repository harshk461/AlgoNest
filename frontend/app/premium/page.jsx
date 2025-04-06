"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Zap,
  Shield,
  Clock,
  Code,
  BookOpen,
  Award,
  Star,
  ChevronRight,
  ArrowRight,
  Lock,
  Unlock,
  Gift,
  Users,
  Sparkles,
} from "lucide-react";

export default function PremiumPage() {
  const [animateIn, setAnimateIn] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("annual");

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-all duration-700 ease-out ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header Section */}
        <PremiumHeader />
        {/* Pricing Section */}
        <PricingSection
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
        {/* Features Section */}
        <FeaturesSection />
        {/* Testimonials */}
        <TestimonialsSection />
        {/* FAQ Section */}
        <FAQSection />
        {/* CTA Section */}
        <CTASection selectedPlan={selectedPlan} />
      </div>
    </div>
  );
}

// Premium Header Component
function PremiumHeader() {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-950/30 rounded-full mb-6 border border-indigo-800/40">
        <Sparkles size={16} className="text-indigo-400" />
        <span className="text-indigo-300 text-sm font-medium">
          Unlock Your Full Potential
        </span>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Elevate Your Learning Experience
      </h1>
      <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
        Join thousands of developers who have accelerated their careers with our
        premium learning resources and tools.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-full">
          <CheckCircle size={14} className="text-green-400" />
          <span className="text-sm">Unlimited Access</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-full">
          <CheckCircle size={14} className="text-green-400" />
          <span className="text-sm">Advanced Courses</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-full">
          <CheckCircle size={14} className="text-green-400" />
          <span className="text-sm">Personalized Path</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-full">
          <CheckCircle size={14} className="text-green-400" />
          <span className="text-sm">Certificate</span>
        </div>
      </div>
    </div>
  );
}

// Pricing Section Component
function PricingSection({ selectedPlan, setSelectedPlan }) {
  return (
    <div className="mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Select the plan that works best for you and start your journey to
          mastery today.
        </p>
      </div>
      {/* Plan Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1 bg-gray-900 rounded-lg">
          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              selectedPlan === "monthly"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedPlan("annual")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
              selectedPlan === "annual"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Annual
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-green-500 text-black text-xs font-bold rounded">
              Save 20%
            </span>
          </button>
        </div>
      </div>
      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <PricingCard
          title="Basic"
          price={selectedPlan === "monthly" ? "$9.99" : "$7.99"}
          period={
            selectedPlan === "monthly"
              ? "per month"
              : "per month, billed annually"
          }
          description="Perfect for beginners looking to enhance their skills."
          features={[
            "Access to basic courses",
            "Standard coding exercises",
            "Community forum access",
            "Monthly coding challenges",
          ]}
          buttonText="Get Started"
          isPopular={false}
          isDisabled={false}
        />

        <PricingCard
          title="Pro"
          price={selectedPlan === "monthly" ? "$19.99" : "$15.99"}
          period={
            selectedPlan === "monthly"
              ? "per month"
              : "per month, billed annually"
          }
          description="Ideal for serious developers ready to level up."
          features={[
            "Everything in Basic",
            "Advanced algorithm courses",
            "Interview preparation",
            "Personalized learning path",
            "Priority support",
          ]}
          buttonText="Get Pro Access"
          isPopular={true}
          isDisabled={false}
        />

        <PricingCard
          title="Enterprise"
          price={selectedPlan === "monthly" ? "$49.99" : "$39.99"}
          period={
            selectedPlan === "monthly"
              ? "per month"
              : "per month, billed annually"
          }
          description="Complete solution for teams and organizations."
          features={[
            "Everything in Pro",
            "Team management dashboard",
            "Custom learning tracks",
            "API access",
            "Dedicated account manager",
            "Private workshops",
          ]}
          buttonText="Contact Sales"
          isPopular={false}
          isDisabled={true}
        />
      </div>
    </div>
  );
}

// Pricing Card Component
function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  isPopular,
  isDisabled,
}) {
  return (
    <div
      className={`relative rounded-2xl p-6 ${
        isPopular
          ? "bg-gradient-to-b from-indigo-900/40 to-purple-900/20 border border-indigo-800/50"
          : "bg-gray-900/60 border border-gray-800"
      } transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-900/10`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-indigo-600 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-end justify-center mb-1">
          <span className="text-4xl font-bold">{price}</span>
        </div>
        <span className="text-gray-400 text-sm">{period}</span>
        <p className="mt-3 text-gray-300">{description}</p>
      </div>

      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircle
              size={18}
              className="text-green-400 mt-0.5 flex-shrink-0"
            />
            <span className="text-gray-300">{feature}</span>
          </div>
        ))}
      </div>

      <button
        className={`
      w-full py-3 rounded-lg font-medium transition-colors 
      ${
        isPopular
          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
          : "bg-gray-800 hover:bg-gray-700 text-white"
      }
      ${isDisabled ? "opacity-70 cursor-not-allowed" : ""}
    `}
        disabled={isDisabled}
      >
        {buttonText}
      </button>
    </div>
  );
}

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen size={24} className="text-indigo-400" />,
      title: "Exclusive Content",
      description:
        "Access premium courses and tutorials not available to free users.",
    },
    {
      icon: <Code size={24} className="text-purple-400" />,
      title: "Advanced Challenges",
      description:
        "Test your skills with complex problems used in real tech interviews.",
    },
    {
      icon: <Users size={24} className="text-pink-400" />,
      title: "Community Access",
      description:
        "Join a private community of dedicated developers and industry experts.",
    },
    {
      icon: <Clock size={24} className="text-blue-400" />,
      title: "Progress Tracking",
      description:
        "Detailed analytics to monitor your learning journey and improvements.",
    },
    {
      icon: <Award size={24} className="text-yellow-400" />,
      title: "Certificates",
      description:
        "Earn recognized certificates upon completion of premium courses.",
    },
    {
      icon: <Shield size={24} className="text-green-400" />,
      title: "Priority Support",
      description:
        "Get faster responses from our expert team when you need help.",
    },
  ];

  return (
    <div className="mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Premium Features</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover all the exclusive benefits available to our premium members.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-gray-900/40 border border-gray-800 hover:border-indigo-800/50 transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Testimonials Section Component
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "The premium courses helped me land my dream job at a FAANG company. The interview preparation was invaluable.",
      author: "Sarah Johnson",
      role: "Senior Developer at Google",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote:
        "I've tried many platforms, but this one stands out. The quality of content and personalized learning path is exceptional.",
      author: "Michael Chen",
      role: "Full Stack Engineer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote:
        "Worth every penny! The advanced algorithms section helped me solve problems I couldn't tackle before.",
      author: "Emma Rodriguez",
      role: "Software Architect",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    },
  ];

  return (
    <div className="mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Our Members Say</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Join thousands of satisfied developers who have transformed their
          careers with our premium membership.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800"
          >
            <div className="flex items-center mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
            <div className="flex items-center">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-medium">{testimonial.author}</h4>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// FAQ Section Component
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to premium features until the end of your billing period.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "We offer a 7-day free trial for new users to experience our premium features before committing to a subscription.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and in select regions, we also support Apple Pay and Google Pay.",
    },
    {
      question: "Can I switch between plans?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.",
    },
    {
      question: "Do you offer team or enterprise plans?",
      answer:
        "Yes, we offer special plans for teams and enterprises with additional features like team management, custom learning tracks, and dedicated support.",
    },
  ];

  return (
    <div className="mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Find answers to common questions about our premium membership.
        </p>
      </div>
      <div className="max-w-3xl mx-auto divide-y divide-gray-800">
        {faqs.map((faq, index) => (
          <div key={index} className="py-5">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex justify-between items-center w-full text-left focus:outline-none"
            >
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <ChevronRight
                size={20}
                className={`transform transition-transform ${
                  openIndex === index ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`mt-2 text-gray-400 transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTASection({ selectedPlan }) {
  return (
    <div className="rounded-2xl overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30"></div>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      <div className="relative p-10 md:p-16 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Elevate Your Skills?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join our premium membership today and unlock your full potential as a
          developer.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 font-medium transition-colors">
            Learn More
          </button>
          <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group">
            Get {selectedPlan === "annual" ? "Annual" : "Monthly"} Premium
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
          <Shield size={16} />
          <span className="text-sm">
            30-day money-back guarantee. No questions asked.
          </span>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/visa.svg" alt="Visa" className="h-8" />
            <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
            <img src="/amex.svg" alt="American Express" className="h-8" />
          </div>
          <div className="flex items-center gap-2">
            <img src="/paypal.svg" alt="PayPal" className="h-8" />
            <img src="/applepay.svg" alt="Apple Pay" className="h-8" />
            <img src="/googlepay.svg" alt="Google Pay" className="h-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
