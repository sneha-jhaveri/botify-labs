import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Zap,
  Brain,
  MessageSquare,
  BarChart3,
  Building,
  PlayCircle,
} from "lucide-react";
import { logoImage } from "@/assets";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const productFeatures = [
    { icon: Brain, name: "AI Employee Builder", href: "#builder" },
    { icon: Zap, name: "Workflow Automation", href: "#workflow" },
    { icon: MessageSquare, name: "Multi-Channel Hub", href: "#channels" },
    { icon: BarChart3, name: "Dashboard Builder", href: "#dashboard" },
  ];

  const industries = [
    { icon: Building, name: "Banking & Fintech", href: "#banking" },
    { icon: Building, name: "Real Estate", href: "#realestate" },
    { icon: Building, name: "Ecommerce", href: "#ecommerce" },
    { icon: Building, name: "Healthcare", href: "#healthcare" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#2E2F5F]/10 backdrop-blur-xl border-b border-teal/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-150 h-10 flex items-center justify-center">
              <img
                src={logoImage}
                alt="Botwot Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Product Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("product")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center space-x-1 text-black hover:text-purple-light transition-colors py-4"
                onClick={() => navigate("/product")}
              >
                <span className="font-medium">Products</span>
                {/* <ChevronDown className="w-4 h-4" /> */}
              </button>
              {/* 
              {activeDropdown === "product" && (
                <div
                  className="absolute top-full left-0 mt-0 w-80 bg-background/98 backdrop-blur-xl border border-border/50 rounded-xl shadow-ai p-6 animate-fade-in z-50 group-hover:block"
                  onMouseEnter={() => setActiveDropdown("product")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="grid grid-cols-1 gap-4">
                    {productFeatures.map((feature) => (
                      <a
                        key={feature.name}
                        href={feature.href}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/product");
                          setActiveDropdown(null);
                        }}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group w-full text-left"
                      >
                        <feature.icon className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                        <div>
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {feature.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {feature.name === "AI Employee Builder" &&
                              "Drag-and-drop agent creation"}
                            {feature.name === "Workflow Automation" &&
                              "Visual no-code builder"}
                            {feature.name === "Multi-Channel Hub" &&
                              "WhatsApp, Voice, Email & more"}
                            {feature.name === "Dashboard Builder" &&
                              "Prompt-based analytics"}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )} */}
            </div>

            {/* Use Cases Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("usecases")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center space-x-1 text-black hover:text-purple-light transition-colors py-4"
                onClick={() => navigate("/use-cases")}
              >
                <span className="font-medium">Use Cases</span>
                {/* <ChevronDown className="w-4 h-4" /> */}
              </button>

              {/* {activeDropdown === 'usecases' && (
                <div className="absolute top-full left-0 mt-0 w-72 bg-mint/95 backdrop-blur-xl border border-teal/20 rounded-xl shadow-lg p-6 animate-fade-in z-50 group-hover:block"
                     onMouseEnter={() => setActiveDropdown('usecases')}
                     onMouseLeave={() => setActiveDropdown(null)}>
                  <div className="grid grid-cols-1 gap-3">
                    {industries.map((industry) => (
                      <button
                        key={industry.name}
                        onClick={() => navigate('/use-cases')}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-teal/20 transition-colors group w-full text-left"
                      >
                        <industry.icon className="w-5 h-5 text-purple-light group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-purple hover:text-purple-light transition-colors">
                          {industry.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )} */}
            </div>

            <button
              onClick={() => navigate("/demos")}
              className="font-medium text-black hover:text-purple-light transition-colors"
            >
              Demos
            </button>
            <button
              onClick={() => navigate("/pricing")}
              className="font-medium text-black hover:text-purple-light transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => navigate("/technology")}
              className="font-medium text-black hover:text-purple-light transition-colors"
            >
              Technology
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-black hover:text-purple-light hover:bg-mint/50"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Watch Demo</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/auth")}
              className="border-purple text-black hover:bg-purple/10"
            >
              Sign In
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-purple hover:bg-purple-light text-white shadow-lg"
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-purple hover:bg-mint/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-teal/20 mt-4 pt-6 pb-6 animate-fade-in bg-mint/95 backdrop-blur-xl">
            <div className="space-y-1">
              <div className="space-y-3 px-4">
                <button
                  onClick={() => navigate("/product")}
                  className="block w-full text-left font-medium text-purple hover:text-purple-light transition-colors py-2"
                >
                  Product
                </button>
                {/* <div className="space-y-3 px-4">
                  {productFeatures.map((feature) => (
                    <a
                      key={feature.name}
                      href={feature.href}
                      className="flex items-center space-x-3 text-purple hover:text-purple-light transition-colors py-2"
                    >
                      <feature.icon className="w-4 h-4" />
                      <span className="font-medium">{feature.name}</span>
                    </a>
                  ))}
                </div> */}
              </div>

              <div className="space-y-3 px-4">
                <button
                  onClick={() => navigate("/use-cases")}
                  className="block w-full text-left font-medium text-purple hover:text-purple-light transition-colors py-2"
                >
                  Industries
                </button>
                {/* <div className="space-y-3 px-4">
                  {industries.map((industry) => (
                    <a
                      key={industry.name}
                      href={industry.href}
                      className="flex items-center space-x-3 text-purple hover:text-purple-light transition-colors py-2"
                    >
                      <industry.icon className="w-4 h-4" />
                      <span className="font-medium">{industry.name}</span>
                    </a>
                  ))}
                </div> */}
              </div>

              <div className="space-y-3 px-4">
                <button
                  onClick={() => navigate("/demos")}
                  className="block w-full text-left font-medium text-purple hover:text-purple-light transition-colors py-2"
                >
                  Demos
                </button>
                <button
                  onClick={() => navigate("/pricing")}
                  className="block w-full text-left font-medium text-purple hover:text-purple-light transition-colors py-2"
                >
                  Pricing
                </button>
                <button
                  onClick={() => navigate("/technology")}
                  className="block w-full text-left font-medium text-purple hover:text-purple-light transition-colors py-2"
                >
                  Technology
                </button>
              </div>

              <div className="pt-4 space-y-3 px-4">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full flex items-center justify-center space-x-2 text-purple hover:text-purple-light hover:bg-mint/50"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Watch Demo</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-purple text-purple hover:bg-purple/10"
                  onClick={() => navigate("/auth")}
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full bg-purple hover:bg-purple-light text-mint shadow-lg"
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
