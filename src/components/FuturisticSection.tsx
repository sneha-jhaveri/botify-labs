import React from 'react';
import AIEmployeeBuilder from '@/components/AIEmployeeBuilder';
import { 
  Brain, 
  Sparkles, 
  Zap,
  Users,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const FuturisticSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-full px-4 py-2 text-sm mb-6">
            <Brain className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-medium">AI Employee Builder</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Build Your AI Team in{' '}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Minutes, Not Months
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Watch your AI employees come to life with our futuristic builder. 
            Each AI agent is custom-trained for your business needs.
          </p>
        </div>

        {/* AI Employee Builder Animation */}
        <div className="max-w-6xl mx-auto mb-16">
          <AIEmployeeBuilder />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-3xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Neural Training</h3>
            <p className="text-muted-foreground leading-relaxed">
              Advanced machine learning algorithms train your AI on your specific business data and processes.
            </p>
          </div>

          <div className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-3xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Multi-Agent System</h3>
            <p className="text-muted-foreground leading-relaxed">
              Deploy multiple specialized AI agents that collaborate seamlessly to handle complex workflows.
            </p>
          </div>

          <div className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-3xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Continuous Learning</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your AI employees get smarter over time, learning from every interaction and improving performance.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Build Your First AI Employee?
            </h3>
            <p className="text-muted-foreground mb-8">
              Join thousands of businesses already automating with AI. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="xl" className="group">
                <Sparkles className="w-5 h-5 mr-2" />
                <span>Start Building for Free</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                <Zap className="w-5 h-5 mr-2" />
                Watch Demo Video
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuturisticSection;