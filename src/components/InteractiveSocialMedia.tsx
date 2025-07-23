import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  Calendar,
  TrendingUp,
  Heart,
  MessageCircle,
  Repeat2,
  Eye,
  Users,
  Clock,
  Zap,
  Plus,
  BarChart3,
  Settings
} from 'lucide-react';

const InteractiveSocialMedia = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      platform: 'Instagram',
      content: 'Just launched our new AI-powered workflow builder! 🚀 #AI #Automation',
      image: '📱',
      status: 'published',
      engagement: { likes: 245, comments: 18, shares: 12 },
      reach: '12.5K',
      publishedAt: '2 hours ago',
      performance: 'high'
    },
    {
      id: 2,
      platform: 'LinkedIn',
      content: 'How AI is transforming business workflows in 2024 - insights from our latest study',
      image: '📊',
      status: 'scheduled',
      engagement: { likes: 0, comments: 0, shares: 0 },
      reach: '0',
      scheduledFor: 'Tomorrow 9:00 AM',
      performance: 'pending'
    },
    {
      id: 3,
      platform: 'Twitter',
      content: 'AI agents are the future of customer service. Here\'s why 👇',
      image: '🤖',
      status: 'draft',
      engagement: { likes: 0, comments: 0, shares: 0 },
      reach: '0',
      performance: 'draft'
    }
  ]);

  const platforms = [
    { name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600', followers: '15.2K', engagement: '4.8%' },
    { name: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-700', followers: '8.7K', engagement: '6.2%' },
    { name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-500', followers: '22.1K', engagement: '3.1%' },
    { name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-800', followers: '11.9K', engagement: '2.9%' }
  ];

  const analytics = [
    { metric: 'Total Reach', value: '156.2K', change: '+12%', color: 'text-blue-600' },
    { metric: 'Engagement Rate', value: '4.2%', change: '+0.8%', color: 'text-green-600' },
    { metric: 'New Followers', value: '1,247', change: '+23%', color: 'text-purple-600' },
    { metric: 'Content Score', value: '8.4/10', change: '+0.6', color: 'text-orange-600' }
  ];

  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        setIsGenerating(false);
        // Add a new AI-generated post
        const newPost = {
          id: posts.length + 1,
          platform: 'Instagram',
          content: 'AI just generated this engaging post about productivity trends! ✨ #AIGenerated #Productivity',
          image: '✨',
          status: 'draft',
          engagement: { likes: 0, comments: 0, shares: 0 },
          reach: '0',
          performance: 'draft'
        };
        setPosts(prev => [newPost, ...prev]);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, posts.length]);

  const generateContent = () => {
    setIsGenerating(true);
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Instagram': return Instagram;
      case 'LinkedIn': return Linkedin;
      case 'Twitter': return Twitter;
      case 'Facebook': return Facebook;
      default: return Share2;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-3xl border border-border/50 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Share2 className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">Social Media Management</h3>
              <p className="text-white/80 text-sm">AI-powered content creation & automation</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-white/20 text-white hover:bg-white/10"
            onClick={generateContent}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                AI Generate
              </>
            )}
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'content', label: 'Content', icon: MessageCircle },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
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
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Platform Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {platforms.map((platform, index) => {
                const IconComponent = platform.icon;
                return (
                  <Card key={index} className="p-4 text-center hover:shadow-lg transition-all">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-semibold mb-1">{platform.name}</h5>
                    <div className="text-lg font-bold text-primary mb-1">{platform.followers}</div>
                    <div className="text-xs text-muted-foreground">{platform.engagement} engagement</div>
                  </Card>
                );
              })}
            </div>

            {/* Quick Analytics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {analytics.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">{item.metric}</div>
                  <div className={`text-2xl font-bold ${item.color} mb-1`}>{item.value}</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {item.change}
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h5 className="font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Activity
              </h5>
              <div className="space-y-3">
                {[
                  { action: 'New follower on Instagram', time: '5 min ago', type: 'follower' },
                  { action: 'High engagement on LinkedIn post', time: '1 hour ago', type: 'engagement' },
                  { action: 'Scheduled post published on Twitter', time: '2 hours ago', type: 'publish' },
                  { action: 'AI generated 3 content ideas', time: '4 hours ago', type: 'ai' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <span className="text-sm">{activity.action}</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold">Content Library</h4>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button variant="default" size="sm" onClick={generateContent} disabled={isGenerating}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {posts.map((post) => {
                const PlatformIcon = getPlatformIcon(post.platform);
                return (
                  <Card 
                    key={post.id} 
                    className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedPost?.id === post.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <PlatformIcon className="w-5 h-5 text-muted-foreground" />
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                      </div>
                      <div className="text-2xl">{post.image}</div>
                    </div>
                    
                    <p className="text-sm mb-3 line-clamp-2">{post.content}</p>
                    
                    {post.status === 'published' && (
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{post.engagement.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{post.engagement.comments}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Repeat2 className="w-3 h-3" />
                            <span>{post.engagement.shares}</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{post.reach}</span>
                          </span>
                          <span className={getPerformanceColor(post.performance)}>
                            {post.performance}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {post.status === 'scheduled' && (
                      <div className="text-xs text-blue-600 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.scheduledFor}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            {isGenerating && (
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <div>
                    <p className="font-medium text-primary">AI Content Generation in Progress...</p>
                    <p className="text-sm text-muted-foreground">Creating engaging content optimized for your audience</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h5 className="font-semibold mb-4">Engagement Trends</h5>
                <div className="space-y-4">
                  {[
                    { platform: 'Instagram', trend: '+15%', value: '4.8%', color: 'bg-pink-500' },
                    { platform: 'LinkedIn', trend: '+8%', value: '6.2%', color: 'bg-blue-600' },
                    { platform: 'Twitter', trend: '-2%', value: '3.1%', color: 'bg-blue-400' },
                    { platform: 'Facebook', trend: '+5%', value: '2.9%', color: 'bg-blue-700' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-sm font-medium">{item.platform}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">{item.value}</span>
                        <span className={`text-xs ${item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {item.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h5 className="font-semibold mb-4">Content Performance</h5>
                <div className="space-y-4">
                  {[
                    { type: 'Video Posts', performance: 92, color: 'bg-green-500' },
                    { type: 'Image Posts', performance: 78, color: 'bg-blue-500' },
                    { type: 'Text Posts', performance: 65, color: 'bg-yellow-500' },
                    { type: 'Carousel Posts', performance: 85, color: 'bg-purple-500' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.type}</span>
                        <span className="text-sm font-semibold">{item.performance}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} transition-all duration-1000`}
                          style={{ width: `${item.performance}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-semibold mb-2 flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    AI Optimization Insights
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    Best posting time: 2-4 PM weekdays • Optimal hashtags: #AI #Tech #Innovation
                  </p>
                </div>
                <Button variant="default">
                  <Zap className="w-4 h-4 mr-2" />
                  Apply Insights
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveSocialMedia;