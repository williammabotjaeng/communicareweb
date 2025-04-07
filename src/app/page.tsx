"use client";

import { useEffect, useState, useRef } from "react";
import { Box, CircularProgress, Fade } from "@mui/material";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";
import "@/styles/globals.css";

// Import refactored components
import FeatureShowcase from "@/components/FeatureShowcase";
import ServiceSection from "@/components/ServiceSection";
import StatisticsSection from "@/components/StatisticsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTASection from "@/components/CTASection";

// AgentVerse-inspired color scheme
const theme = {
  colors: {
    primary: "#3D8BD3",     // Main blue color
    secondary: "#6E44FF",   // Secondary purple
    accent: "#00CCFF",      // Bright cyan accent
    dark: "#1A1F36",        // Dark background
    light: "#F7F9FC",       // Light background
    text: "#333333",        // Main text
    lightText: "#6B7280",   // Secondary text
    white: "#FFFFFF",       // White
    success: "#34D399",     // Success green
  },
};

// Communicare.world community services
const services = [
  {
    icon: "public",
    title: "Community Space Creation",
    description:
      "Create interactive, multimedia-rich community spaces that connect neighbors and facilitate local engagement.",
  },
  {
    icon: "calendar_month",
    title: "Event Coordination",
    description:
      "Organize community meetings, activities, and events with automated scheduling and reminders.",
  },
  {
    icon: "health_and_safety",
    title: "Health & Wellness Tools",
    description:
      "Support community well-being with health monitoring, medical resources, and emergency assistance.",
  },
  {
    icon: "groups",
    title: "Community Insights",
    description:
      "Collect and analyze community feedback to optimize services and improve satisfaction.",
  },
];

// Communicare.world statistics
const statistics = [
  { value: "150+", label: "Community Partners" },
  { value: "25,000+", label: "Active Members" },
  { value: "30+", label: "AI Agents Integrated" },
];

// Communicare.world quick links
const quickLinks = [
  { label: "About Us", url: "/about" },
  { label: "Features", url: "/features" },
  { label: "Pricing", url: "/pricing" },
  { label: "Help Center", url: "/help" },
];

// Communicare.world contact info
const contactInfo = [
  {
    icon: "location_on",
    text: "Global AI Agents League<br />Innovation Hub - South Africa",
    alt: "Location icon",
  },
  {
    icon: "phone",
    text: "+27 (800) 123-4567",
    alt: "Phone icon",
  },
  {
    icon: "email",
    text: "support@communicare.world",
    alt: "Email icon",
  },
];

// Communicare.world social links
const socialLinks = [
  {
    icon: "facebook",
    url: "https://facebook.com",
    alt: "Facebook",
  },
  {
    icon: "twitter",
    url: "https://twitter.com",
    alt: "Twitter",
  },
  {
    icon: "instagram",
    url: "https://instagram.com",
    alt: "Instagram",
  },
];

// Testimonials data
const testimonials = [
  {
    name: "Michael Ndlovu",
    role: "Community Leader, Springville",
    quote:
      "Communicare.world has transformed how our community connects. The AI agents help us organize events, manage health initiatives, and keep everyone informed and engaged.",
    image:
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
  },
  {
    name: "Sarah Chen",
    role: "Healthcare Coordinator, Newtown",
    quote:
      "Since implementing Communicare.world, our community health programs have seen a 40% increase in participation. The health monitoring tools give residents peace of mind.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1558&q=80",
  },
  {
    name: "David Wilson",
    role: "Township Administrator, Oakridge",
    quote:
      "The insights we get from Communicare.world have been invaluable. We've optimized our community services based on real data and feedback, creating stronger connections between residents.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  },
];

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Handle initial loading
  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Update header state
      setScrolled(scrollY > 50);

      // Check each section for animations
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.75;

        if (rect.top < triggerPoint) {
          section.classList.add("section-visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Initialize animation classes
    setTimeout(() => {
      handleScroll();
    }, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add a ref to a section
  const addSectionRef = (index: number) => (el: HTMLDivElement) => {
    sectionsRef.current[index] = el;
  };

  return (
    <>
      {/* Loading screen */}
      {loading && <LoadingScreen />}

      {/* Main content */}
      <Fade in={!loading} timeout={800}>
        <Box sx={{ overflowX: "hidden" }}>
          <Header />

          {/* Hero Section */}
          <div ref={addSectionRef(0)} className="scroll-section">
            <Hero />
          </div>

          {/* Feature Showcase */}
          <div ref={addSectionRef(1)} id="features" className="scroll-section">
            <FeatureShowcase />
          </div>

          {/* Services Section */}
          <div ref={addSectionRef(2)} id="service" className="scroll-section">
            <ServiceSection services={services} />
          </div>

          {/* Statistics Section */}
          <div ref={addSectionRef(3)} className="scroll-section">
            <StatisticsSection statistics={statistics} />
          </div>

          {/* How It Works */}
          <div
            ref={addSectionRef(4)}
            id="howitworks"
            className="scroll-section"
          >
            <HowItWorksSection />
          </div>

          {/* Call To Action */}
          <div ref={addSectionRef(6)} className="scroll-section">
            <CTASection />
          </div>

          <Footer
            quickLinks={quickLinks}
            contactInfo={contactInfo}
            socialLinks={socialLinks}
          />
        </Box>
      </Fade>
    </>
  );
};

export default Home;