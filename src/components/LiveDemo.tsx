import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Monitor,
  Play,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Building,
  ShoppingCart,
  Plane
} from 'lucide-react';

interface LiveDemoProps {
  type: 'chat' | 'voice' | 'whatsapp';
  title: string;
  description: string;
  industry: string;
}

const LiveDemo: React.FC<LiveDemoProps> = ({ type, title, description, industry }) => {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string, content: string, timestamp: Date}>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const startDemo = () => {
    setIsActive(true);
    // Add initial AI message
    setTimeout(() => {
      setMessages([{
        role: 'ai',
        content: getDemoGreeting(),
        timestamp: new Date()
      }]);
    }, 500);
  };

  const getDemoGreeting = () => {
    switch (industry) {
      case 'banking':
        return "Hi! I'm your AI banking assistant. I can help you with account inquiries, loan applications, or financial planning. How can I assist you today?";
      case 'realestate':
        return "Hello! I'm here to help you find the perfect property. Are you looking to buy, sell, or schedule a viewing?";
      case 'ecommerce':
        return "Welcome! I'm your shopping assistant. I can help you find products, track orders, or answer any questions. What are you looking for?";
      default:
        return "Hello! How can I help you today?";
    }
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'ai',
        content: generateAIResponse(inputValue, industry),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (input: string, industry: string) => {
    const lower = input.toLowerCase();
    
    if (industry === 'banking') {
      if (lower.includes('loan') || lower.includes('credit')) {
        return "I'd be happy to help you with loan options. Based on your needs, I can pre-qualify you in just 2 minutes. What type of loan are you interested in - personal, home, or business?";
      }
      if (lower.includes('balance') || lower.includes('account')) {
        return "I can help you check your account balance. For security, I'll need to verify your identity first. Can you provide your account number and date of birth?";
      }
      return "I understand you're interested in our banking services. Let me connect you with the right solution. Are you looking for personal banking, business accounts, or investment services?";
    }
    
    if (industry === 'realestate') {
      if (lower.includes('buy') || lower.includes('purchase')) {
        return "Excellent! I'll help you find the perfect home. What's your budget range and preferred location? I can schedule viewings for properties that match your criteria.";
      }
      if (lower.includes('sell')) {
        return "I can help you sell your property. Let me get some details - what's the address and when are you looking to sell? I'll provide a free market evaluation.";
      }
      return "Great! I can help you with all your real estate needs. Are you a first-time buyer, investor, or looking to upgrade? Let me find the best options for you.";
    }
    
    if (industry === 'ecommerce') {
      if (lower.includes('order') || lower.includes('delivery')) {
        return "I can help track your order. Please provide your order number or email, and I'll give you real-time updates on your delivery status.";
      }
      if (lower.includes('return') || lower.includes('refund')) {
        return "No problem! I can process your return. Our hassle-free return policy allows returns within 30 days. What item would you like to return?";
      }
      return "I'm here to help with your shopping! Are you looking for specific products, need help with an order, or have questions about our services?";
    }
    
    return "Thank you for your message. I'm processing your request and will provide you with the best solution shortly.";
  };

  const getIndustryIcon = () => {
    switch (industry) {
      case 'banking': return <Building className="w-5 h-5" />;
      case 'ecommerce': return <ShoppingCart className="w-5 h-5" />;
      case 'travel': return <Plane className="w-5 h-5" />;
      default: return <MessageSquare className="w-5 h-5" />;
    }
  };

  if (!isActive) {
    return (
      <div className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
          {type === 'chat' && <MessageSquare className="w-8 h-8 text-white" />}
          {type === 'voice' && <Phone className="w-8 h-8 text-white" />}
          {type === 'whatsapp' && <MessageSquare className="w-8 h-8 text-white" />}
        </div>
        
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="flex items-center justify-center space-x-2 mb-6 text-sm text-muted-foreground">
          {getIndustryIcon()}
          <span className="capitalize">{industry} Industry</span>
        </div>

        <Button variant="cta" onClick={startDemo} className="group">
          <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Start Live Demo</span>
        </Button>
      </div>
    );
  }

  if (type === 'voice') {
    return (
      <div className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-6">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Phone className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">Voice AI Demo - {industry}</h3>
          <p className="text-muted-foreground">Simulated voice call in progress...</p>
        </div>

        <div className="bg-background/50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium">AI Agent Speaking</span>
            </div>
            <div className="text-sm text-muted-foreground">00:45</div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            "Thank you for calling! I'm your AI assistant. I understand you're interested in our services. Let me ask you a few questions to better assist you..."
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={isListening ? "cta" : "outline"}
            size="lg"
            onClick={() => setIsListening(!isListening)}
            className="w-16 h-16 rounded-full"
          >
            {isListening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsMuted(!isMuted)}
            className="w-16 h-16 rounded-full"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-primary/10 backdrop-blur-sm p-4 border-b border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {type === 'whatsapp' && <MessageSquare className="w-5 h-5 text-primary" />}
            {type === 'chat' && <Monitor className="w-5 h-5 text-primary" />}
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-xs text-muted-foreground capitalize">{industry} AI Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-xl p-3 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border/30 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-background/50 border border-border/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Button 
            variant="cta" 
            size="sm" 
            onClick={sendMessage}
            disabled={!inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;