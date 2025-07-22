import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Zap, 
  Brain, 
  MessageSquare, 
  BarChart3,
  Building,
  PlayCircle
} from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const productFeatures = [
    { icon: Brain, name: 'AI Employee Builder', href: '#builder' },
    { icon: Zap, name: 'Workflow Automation', href: '#workflow' },
    { icon: MessageSquare, name: 'Multi-Channel Hub', href: '#channels' },
    { icon: BarChart3, name: 'Dashboard Builder', href: '#dashboard' },
  ];

  const industries = [
    { icon: Building, name: 'Banking & Fintech', href: '#banking' },
    { icon: Building, name: 'Real Estate', href: '#realestate' },
    { icon: Building, name: 'Ecommerce', href: '#ecommerce' },
    { icon: Building, name: 'Healthcare', href: '#healthcare' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-ai' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                BotWot AI
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">AI Employee Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Product Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('product')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
                onClick={() => navigate('/product')}
              >
                <span className="font-medium">Product</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'product' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-ai p-6 animate-fade-in">
                  <div className="grid grid-cols-1 gap-4">
                    {productFeatures.map((feature) => (
                      <button
                        key={feature.name}
                        onClick={() => navigate('/product')}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group w-full text-left"
                      >
                        <feature.icon className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                        <div>
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {feature.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {feature.name === 'AI Employee Builder' && 'Drag-and-drop agent creation'}
                            {feature.name === 'Workflow Automation' && 'Visual no-code builder'}
                            {feature.name === 'Multi-Channel Hub' && 'WhatsApp, Voice, Email & more'}
                            {feature.name === 'Dashboard Builder' && 'Prompt-based analytics'}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Use Cases Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('usecases')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
                onClick={() => navigate('/use-cases')}
              >
                <span className="font-medium">Use Cases</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'usecases' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-ai p-6 animate-fade-in">
                  <div className="grid grid-cols-1 gap-3">
                    {industries.map((industry) => (
                      <button
                        key={industry.name}
                        onClick={() => navigate('/use-cases')}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group w-full text-left"
                      >
                        <industry.icon className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {industry.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => navigate('/demos')} 
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Demos
            </button>
            <button 
              onClick={() => navigate('/pricing')}
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => navigate('/technology')}
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Technology
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="demo" size="sm" className="flex items-center space-x-2">
              <PlayCircle className="w-4 h-4" />
              <span>Watch Demo</span>
            </Button>
            <Button variant="cta" size="sm">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 mt-4 pt-6 pb-6 animate-fade-in">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Product</h3>
                <div className="space-y-3 pl-4">
                  {productFeatures.map((feature) => (
                    <a
                      key={feature.name}
                      href={feature.href}
                      className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <feature.icon className="w-4 h-4" />
                      <span>{feature.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-3">Industries</h3>
                <div className="space-y-3 pl-4">
                  {industries.map((industry) => (
                    <a
                      key={industry.name}
                      href={industry.href}
                      className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <industry.icon className="w-4 h-4" />
                      <span>{industry.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/demos')}
                  className="block font-medium text-foreground hover:text-primary transition-colors"
                >
                  Demos
                </button>
                <button 
                  onClick={() => navigate('/pricing')}
                  className="block font-medium text-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => navigate('/technology')}
                  className="block font-medium text-foreground hover:text-primary transition-colors"
                >
                  Technology
                </button>
              </div>

              <div className="pt-4 space-y-3">
                <Button variant="demo" size="lg" className="w-full flex items-center justify-center space-x-2">
                  <PlayCircle className="w-4 h-4" />
                  <span>Watch Demo</span>
                </Button>
                <Button variant="cta" size="lg" className="w-full">
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