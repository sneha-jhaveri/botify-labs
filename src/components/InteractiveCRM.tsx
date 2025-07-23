import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Mail, 
  Phone,
  Calendar,
  CheckCircle2,
  Star,
  DollarSign,
  UserCheck,
  ArrowRight,
  Clock,
  BarChart3,
  Zap
} from 'lucide-react';

const InteractiveCRM = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [selectedLead, setSelectedLead] = useState(null);
  const [automationRunning, setAutomationRunning] = useState(false);

  const leads = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp',
      email: 'sarah@techcorp.com',
      score: 92,
      status: 'hot',
      value: '$45,000',
      stage: 'Proposal',
      lastActivity: '2 hours ago',
      nextAction: 'Follow-up call scheduled',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'StartupXYZ',
      email: 'mike@startupxyz.com',
      score: 78,
      status: 'warm',
      value: '$28,000',
      stage: 'Demo',
      lastActivity: '1 day ago',
      nextAction: 'Send pricing proposal',
      avatar: '👨‍💻'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      company: 'Enterprise Inc',
      email: 'emma@enterprise.com',
      score: 65,
      status: 'cold',
      value: '$85,000',
      stage: 'Discovery',
      lastActivity: '3 days ago',
      nextAction: 'Schedule discovery call',
      avatar: '👩‍🎓'
    }
  ];

  const campaigns = [
    { name: 'Q4 Product Launch', opens: '34%', clicks: '8.2%', conversions: '12' },
    { name: 'Nurture Sequence', opens: '42%', clicks: '12.1%', conversions: '8' },
    { name: 'Webinar Follow-up', opens: '28%', clicks: '5.4%', conversions: '5' }
  ];

  useEffect(() => {
    if (automationRunning) {
      const timer = setTimeout(() => {
        setAutomationRunning(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [automationRunning]);

  const runAutomation = () => {
    setAutomationRunning(true);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status) => {
    if (status === 'hot') return 'bg-red-100 text-red-700';
    if (status === 'warm') return 'bg-yellow-100 text-yellow-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-3xl border border-border/50 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">Functional CRM & Marketing</h3>
              <p className="text-white/80 text-sm">Complete customer lifecycle management</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-white/20 text-white hover:bg-white/10"
            onClick={runAutomation}
          >
            <Zap className="w-4 h-4 mr-2" />
            Run Automation
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
          {[
            { id: 'leads', label: 'Lead Management', icon: Users },
            { id: 'pipeline', label: 'Sales Pipeline', icon: TrendingUp },
            { id: 'campaigns', label: 'Campaigns', icon: Mail }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-primary shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold">High-Value Leads</h4>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {leads.filter(l => l.score >= 80).length} Hot Leads
              </Badge>
            </div>

            <div className="grid gap-4">
              {leads.map((lead) => (
                <Card 
                  key={lead.id} 
                  className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedLead?.id === lead.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedLead(lead)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{lead.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h5 className="font-semibold">{lead.name}</h5>
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                          <Badge className={`${getScoreColor(lead.score)} border-0`}>
                            {lead.score}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{lead.company}</p>
                        <p className="text-xs text-muted-foreground">{lead.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600 mb-1">{lead.value}</div>
                      <div className="text-xs text-muted-foreground">{lead.stage}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center space-x-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{lead.lastActivity}</span>
                      </span>
                      <span className="text-primary font-medium">{lead.nextAction}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {automationRunning && (
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <div>
                    <p className="font-medium text-primary">AI Automation Running...</p>
                    <p className="text-sm text-muted-foreground">Scoring leads, updating pipelines, and triggering follow-ups</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { stage: 'Prospects', count: 45, value: '$2.1M', color: 'from-blue-500 to-cyan-500' },
                { stage: 'Qualified', count: 23, value: '$1.8M', color: 'from-yellow-500 to-orange-500' },
                { stage: 'Proposal', count: 12, value: '$980K', color: 'from-purple-500 to-pink-500' },
                { stage: 'Closed', count: 8, value: '$420K', color: 'from-green-500 to-emerald-500' }
              ].map((stage, index) => (
                <Card key={index} className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center mx-auto mb-3`}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="font-semibold mb-1">{stage.stage}</h5>
                  <div className="text-2xl font-bold text-primary mb-1">{stage.count}</div>
                  <div className="text-sm text-muted-foreground">{stage.value}</div>
                </Card>
              ))}
            </div>

            <Card className="p-6">
              <h5 className="font-semibold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Conversion Rates
              </h5>
              <div className="space-y-3">
                {[
                  { from: 'Prospects → Qualified', rate: 51, color: 'bg-blue-500' },
                  { from: 'Qualified → Proposal', rate: 52, color: 'bg-yellow-500' },
                  { from: 'Proposal → Closed', rate: 67, color: 'bg-green-500' }
                ].map((conversion, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{conversion.from}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${conversion.color} transition-all duration-1000`}
                          style={{ width: `${conversion.rate}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold">{conversion.rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold">Active Campaigns</h4>
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </div>

            <div className="grid gap-4">
              {campaigns.map((campaign, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold">{campaign.name}</h5>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{campaign.opens}</div>
                      <div className="text-xs text-muted-foreground">Open Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{campaign.clicks}</div>
                      <div className="text-xs text-muted-foreground">Click Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{campaign.conversions}</div>
                      <div className="text-xs text-muted-foreground">Conversions</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-semibold mb-2">AI Campaign Optimization</h5>
                  <p className="text-sm text-muted-foreground">
                    Let AI automatically optimize your campaigns for better performance
                  </p>
                </div>
                <Button variant="default">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Enable AI
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveCRM;