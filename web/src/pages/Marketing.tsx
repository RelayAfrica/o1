import React, { useState } from 'react';
import { 
  Image, Type, Hash, Calendar, Send, Sparkles, LayoutTemplate, Clock, 
  Zap, Users, Target, TrendingUp, Eye, MousePointerClick, ShoppingCart,
  Check, X, ChevronDown, Plus, Copy, Trash2, Edit2, Play, Pause,
  Instagram, Facebook, MessageCircle, Music2, Share2, Mail, Bell,
  Download, Upload, Search, Filter, BarChart3, Settings, Info
} from 'lucide-react';

// Types
type Platform = 'instagram' | 'whatsapp' | 'facebook' | 'tiktok' | 'telegram';
type Tab = 'social' | 'push';
type ScheduleMode = 'now' | 'scheduled';
type Audience = 'all' | 'vip' | 'inactive' | 'new';
type Journey = 'welcome' | 'birthday' | 'loyalty' | 'abandoned-cart' | 'appointment' | 'win-back';

interface MediaAsset {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video';
}

interface Template {
  id: string;
  name: string;
  caption: string;
  hashtags: string;
  category: string;
}

interface SavedContent {
  id: string;
  type: 'caption' | 'hashtags' | 'draft';
  content: string;
  name: string;
}

interface Campaign {
  id: string;
  title: string;
  message: string;
  audience: Audience;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  status: 'draft' | 'scheduled' | 'sent';
  date: string;
}

// Sample Data
const MEDIA_LIBRARY: MediaAsset[] = [
  { id: 'M1', url: '', name: 'Jollof special', type: 'image' },
  { id: 'M2', url: '', name: 'Ankara collection', type: 'image' },
  { id: 'M3', url: '', name: 'Suya platter', type: 'image' },
  { id: 'M4', url: '', name: 'Store front', type: 'image' },
  { id: 'M5', url: '', name: 'Behind scenes', type: 'video' },
];

const TEMPLATES: Template[] = [
  {
    id: 'T1',
    name: "Today's Special",
    caption: "Today's special at Amara's Kitchen: fresh jollof rice with grilled chicken. Available until 8pm.",
    hashtags: '#JollofRice #LagosFood #NigerianCuisine #FoodieNigeria',
    category: 'special'
  },
  {
    id: 'T2',
    name: 'New Arrival',
    caption: "Just in! Check out our latest addition. Come experience something new at Amara's Kitchen.",
    hashtags: '#NewMenu #LagosEats #NaijaFood #FreshFood',
    category: 'new'
  },
  {
    id: 'T3',
    name: 'Flash Sale',
    caption: "Flash Sale Alert: 20% off all orders for the next 3 hours. Order now and save!",
    hashtags: '#FlashSale #Discount #LagosDeals #NaijaFood',
    category: 'sale'
  },
  {
    id: 'T4',
    name: 'Before / After',
    caption: "From prep to perfection! Swipe to see the journey. Fresh ingredients, authentic taste.",
    hashtags: '#BehindTheScenes #FoodPrep #AuthenticNigerian #MadeWithLove',
    category: 'story'
  },
];

const SAVED_CONTENT: SavedContent[] = [
  { id: 'S1', type: 'caption', name: 'Weekend greeting', content: 'Happy weekend from all of us at Amara\'s Kitchen!' },
  { id: 'S2', type: 'hashtags', name: 'General food', content: '#LagosFood #NigerianCuisine #Foodie #LagosEats' },
  { id: 'S3', type: 'draft', name: 'Monday promo draft', content: 'Start your week right with our Monday special...' },
];

const CAMPAIGNS: Campaign[] = [
  {
    id: 'C1',
    title: 'Weekend Special - Jollof & Chicken',
    message: 'This weekend only: Get 15% off our signature Jollof Rice with Grilled Chicken combo!',
    audience: 'all',
    sent: 1247,
    delivered: 1238,
    opened: 892,
    clicked: 234,
    converted: 67,
    status: 'sent',
    date: '2 days ago'
  },
  {
    id: 'C2',
    title: 'VIP Early Access - New Menu',
    message: 'As a VIP customer, you get first taste of our new menu items. Book your table now!',
    audience: 'vip',
    sent: 156,
    delivered: 156,
    opened: 134,
    clicked: 89,
    converted: 23,
    status: 'sent',
    date: '1 week ago'
  },
  {
    id: 'C3',
    title: 'We Miss You - Come Back Offer',
    message: 'It\'s been a while! Here\'s 20% off your next order. We\'d love to serve you again.',
    audience: 'inactive',
    sent: 423,
    delivered: 418,
    opened: 167,
    clicked: 54,
    converted: 12,
    status: 'sent',
    date: '2 weeks ago'
  },
];

// Platform Info
const PLATFORM_INFO: Record<Platform, { name: string; color: string; icon: string; core: boolean }> = {
  instagram: { name: 'Instagram', color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500', icon: 'hgi-instagram', core: true },
  whatsapp: { name: 'WhatsApp Status', color: 'bg-[#25D366]', icon: 'hgi-whatsapp', core: true },
  facebook: { name: 'Facebook', color: 'bg-[#1877F2]', icon: 'hgi-facebook-01', core: false },
  tiktok: { name: 'TikTok', color: 'bg-black', icon: 'hgi-tiktok', core: false },
  telegram: { name: 'Telegram', color: 'bg-[#0088cc]', icon: 'hgi-telegram', core: false },
};

const AUDIENCE_INFO: Record<Audience, { label: string; desc: string; count: string }> = {
  all: { label: 'All Customers', desc: 'Everyone on your list', count: '1,247' },
  vip: { label: 'VIP Customers', desc: 'High-value repeat customers', count: '156' },
  inactive: { label: "Hasn't visited in 30 days", desc: 'Win them back', count: '423' },
  new: { label: 'New Customers', desc: 'First-time buyers', count: '89' },
};

export default function Marketing() {
  const [activeTab, setActiveTab] = useState<Tab>('social');
  
  // Social state
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [platforms, setPlatforms] = useState<Record<Platform, boolean>>({
    instagram: true,
    whatsapp: true,
    facebook: false,
    tiktok: false,
    telegram: false,
  });
  const [scheduleMode, setScheduleMode] = useState<ScheduleMode>('now');
  const [socialScheduleAt, setSocialScheduleAt] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset[]>([]);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSavedContent, setShowSavedContent] = useState(false);
  const [socialStatus, setSocialStatus] = useState<string | null>(null);

  // Push state
  const [pushTitle, setPushTitle] = useState('');
  const [pushMessage, setPushMessage] = useState('');
  const [pushAudience, setPushAudience] = useState<Audience>('all');
  const [pushScheduleMode, setPushScheduleMode] = useState<ScheduleMode>('now');
  const [pushScheduleAt, setPushScheduleAt] = useState('');
  const [pushHasImage, setPushHasImage] = useState(false);
  const [pushHasCTA, setPushHasCTA] = useState(false);
  const [pushCTAText, setPushCTAText] = useState('');
  const [showCampaigns, setShowCampaigns] = useState(false);
  const [showJourneys, setShowJourneys] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [pushStatus, setPushStatus] = useState<string | null>(null);

  const togglePlatform = (p: Platform) => {
    if (PLATFORM_INFO[p].core) return;
    setPlatforms(prev => ({ ...prev, [p]: !prev[p] }));
  };

  const applyTemplate = (template: Template) => {
    setCaption(template.caption);
    setHashtags(template.hashtags);
    setShowTemplates(false);
  };

  const applySavedContent = (content: SavedContent) => {
    if (content.type === 'caption') setCaption(content.content);
    if (content.type === 'hashtags') setHashtags(content.content);
    if (content.type === 'draft') {
      setCaption(content.content);
    }
    setShowSavedContent(false);
  };

  const createContentFaster = () => {
    setCaption("Fresh from the kitchen at Amara's Kitchen. Order your favourite Nigerian comfort food for pickup or delivery today.");
    setHashtags('#LagosFood #NigerianCuisine #LagosEats #MadeInNigeria');
    setSocialStatus('Caption and hashtag set added. Make them yours before publishing.');
  };

  const handleMediaUpload = (file?: File) => {
    if (!file) return;
    const uploadedMedia: MediaAsset = {
      id: `upload-${Date.now()}`,
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type.startsWith('video/') ? 'video' : 'image',
    };
    setSelectedMedia((current) => [...current, uploadedMedia]);
    setShowMediaLibrary(false);
    setSocialStatus(`${file.name} added to your shared media selection.`);
  };

  const handlePublish = () => {
    const enabledCount = Object.values(platforms).filter(Boolean).length;
    if (scheduleMode === 'scheduled' && !socialScheduleAt) {
      setSocialStatus('Choose a date and time before scheduling this post.');
      return;
    }
    setSocialStatus(
      scheduleMode === 'scheduled'
        ? `Post scheduled for ${new Date(socialScheduleAt).toLocaleString()} across ${enabledCount} channels.`
        : `Post queued for ${enabledCount} channel${enabledCount !== 1 ? 's' : ''}.`
    );
  };

  const handleSendPush = () => {
    const audienceCount = AUDIENCE_INFO[pushAudience].count;
    if (!selectedJourney && pushScheduleMode === 'scheduled' && !pushScheduleAt) {
      setPushStatus('Choose a date and time before scheduling this campaign.');
      return;
    }
    setPushStatus(
      selectedJourney
        ? `${selectedJourney.replace('-', ' ')} journey activated for ${AUDIENCE_INFO[pushAudience].label}.`
        : pushScheduleMode === 'scheduled'
          ? `Campaign scheduled for ${new Date(pushScheduleAt).toLocaleString()} to ${audienceCount} customers.`
          : `Campaign sent to ${audienceCount} customers.`
    );
  };

  const selectedPlatformCount = Object.values(platforms).filter(Boolean).length;
  const fullCaption = caption + (hashtags ? '\n\n' + hashtags : '');
  const charCount = fullCaption.length;

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      
      {/* Top-level Tab Switcher */}
      <div className="flex-none px-4 md:px-8 pt-6 pb-4 border-b bg-card">
        <div className="flex bg-muted p-1 rounded-full max-w-md">
          <button
            onClick={() => setActiveTab('social')}
            className={`flex-1 py-3 px-4 text-sm font-bold rounded-full transition-all ${
              activeTab === 'social' ? 'bg-card text-ink shadow-sm' : 'text-muted-foreground'
            }`}
            data-testid="tab-social"
          >
            <Share2 size={16} className="inline mr-2" />
            Social Distribution
          </button>
          <button
            onClick={() => setActiveTab('push')}
            className={`flex-1 py-3 px-4 text-sm font-bold rounded-full transition-all ${
              activeTab === 'push' ? 'bg-card text-ink shadow-sm' : 'text-muted-foreground'
            }`}
            data-testid="tab-push"
          >
            <Bell size={16} className="inline mr-2" />
            Push Notifications
          </button>
        </div>
      </div>

      {/* Social Distribution */}
      {activeTab === 'social' && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
          
          {/* Composer Pane */}
          <div className="w-full lg:flex-1 lg:overflow-y-auto">
            <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6 lg:pb-32">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold tracking-tight" data-testid="heading-composer">Create Post</h2>
                <button 
                  onClick={createContentFaster}
                  className="flex items-center gap-1.5 text-xs font-bold text-ink bg-lime-pale px-3 py-1.5 rounded-full hover:bg-lime/30 transition-colors"
                  data-testid="button-content-assist"
                >
                  <Sparkles size={14} className="text-ink" />
                  Create content faster
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-full border-2 border-border hover:border-lime transition-colors text-sm font-bold whitespace-nowrap"
                  data-testid="button-templates"
                >
                  <LayoutTemplate size={16} />
                  Templates
                </button>
                <button
                  onClick={() => setShowSavedContent(!showSavedContent)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-full border-2 border-border hover:border-lime transition-colors text-sm font-bold whitespace-nowrap"
                  data-testid="button-library"
                >
                  <Copy size={16} />
                  Content Library
                </button>
              </div>

              {/* Templates Panel */}
              {showTemplates && (
                <div className="bg-card rounded-[24px] p-4 border shadow-soft animate-in slide-in-from-top-2" data-testid="panel-templates">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold">Quick Templates</h3>
                    <button onClick={() => setShowTemplates(false)} className="text-muted-foreground hover:text-ink">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TEMPLATES.map(template => (
                      <button
                        key={template.id}
                        onClick={() => applyTemplate(template)}
                        className="p-3 bg-surface-alt rounded-2xl text-left hover:bg-muted transition-colors group"
                        data-testid={`template-${template.id}`}
                      >
                        <div className="font-bold text-sm mb-1 group-hover:text-lime transition-colors">{template.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">{template.caption}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Content Panel */}
              {showSavedContent && (
                <div className="bg-card rounded-[24px] p-4 border shadow-soft animate-in slide-in-from-top-2" data-testid="panel-saved-content">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold">Saved Content</h3>
                    <button onClick={() => setShowSavedContent(false)} className="text-muted-foreground hover:text-ink">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {SAVED_CONTENT.map(content => (
                      <button
                        key={content.id}
                        onClick={() => applySavedContent(content)}
                        className="p-3 bg-surface-alt rounded-2xl text-left hover:bg-muted transition-colors flex items-center justify-between group"
                        data-testid={`saved-${content.id}`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm mb-0.5 group-hover:text-lime transition-colors">{content.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{content.content}</div>
                        </div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase ml-2">{content.type}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Platform Toggles */}
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-3">Publish to</label>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {(Object.keys(PLATFORM_INFO) as Platform[]).map(platform => {
                    const info = PLATFORM_INFO[platform];
                    const isSelected = platforms[platform];
                    return (
                      <div key={platform} className="flex flex-col items-center gap-2 flex-none">
                        <button
                          onClick={() => togglePlatform(platform)}
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center relative transition-all font-bold text-xs ${
                            isSelected
                              ? `${info.color} text-white shadow-sm`
                              : 'bg-surface-alt text-muted-foreground border-2 border-border border-dashed'
                          } ${info.core ? 'cursor-default' : 'cursor-pointer'}`}
                          disabled={info.core}
                          data-testid={`platform-${platform}`}
                        >
                          {info.core && (
                            <div className="absolute -top-2 -right-2 bg-lime text-ink text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border-2 border-card">
                              Core
                            </div>
                          )}
                          <i
                            aria-hidden="true"
                            className={`hgi hgi-stroke hgi-rounded ${info.icon} text-[24px]`}
                          />
                        </button>
                        <span className={`text-[10px] font-bold ${isSelected ? 'text-ink' : 'text-muted-foreground'}`}>
                          {info.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Media Section */}
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-3">Media</label>
                {selectedMedia.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {selectedMedia.map(media => (
                      <div key={media.id} className="relative aspect-square bg-muted rounded-2xl overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center bg-surface-alt">
                          <Image size={24} className="text-muted-foreground opacity-40" />
                        </div>
                        <button
                          onClick={() => setSelectedMedia(selectedMedia.filter(m => m.id !== media.id))}
                          className="absolute top-2 right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          data-testid={`remove-media-${media.id}`}
                        >
                          <X size={14} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                          <div className="text-[10px] font-bold text-white truncate">{media.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
                <button
                  onClick={() => setShowMediaLibrary(true)}
                  className="w-full aspect-[4/3] bg-surface-alt rounded-[24px] border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-muted transition-colors group"
                  data-testid="button-add-media"
                >
                  <div className="w-14 h-14 rounded-full bg-card shadow-sm flex items-center justify-center text-ink group-hover:scale-105 transition-transform">
                    <Image size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-ink">Add photo or video</p>
                    <p className="text-[11px] font-semibold text-muted-foreground mt-1">or choose from library</p>
                  </div>
                </button>
              </div>

              {/* Caption Field */}
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-3">Caption</label>
                <div className="bg-card rounded-[24px] p-1 shadow-sm border focus-within:border-lime transition-colors">
                  <textarea
                    placeholder="Write your caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full h-32 bg-transparent border-none outline-none resize-none p-4 text-sm font-medium placeholder:text-muted-foreground/70"
                    data-testid="input-caption"
                  />
                  <div className="flex items-center justify-between p-3 border-t bg-surface-alt rounded-b-[20px]">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setHashtags('#LagosFood #NigerianCuisine #LagosEats #NaijaFood')}
                        className="w-8 h-8 rounded-full bg-card shadow-sm flex items-center justify-center text-ink hover:text-lime"
                        data-testid="button-format-text"
                      >
                        <Type size={14} />
                      </button>
                      <button 
                        className="w-8 h-8 rounded-full bg-card shadow-sm flex items-center justify-center text-ink hover:text-lime"
                        data-testid="button-add-hashtags"
                      >
                        <Hash size={14} />
                      </button>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground">{caption.length}/2200</span>
                  </div>
                </div>
              </div>

              {/* Hashtags Field */}
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-3">Hashtags</label>
                <div className="bg-card rounded-[24px] p-1 shadow-sm border focus-within:border-lime transition-colors">
                  <input
                    type="text"
                    placeholder="#LagosFood #NigerianCuisine..."
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    className="w-full bg-transparent border-none outline-none p-4 text-sm font-medium placeholder:text-muted-foreground/70"
                    data-testid="input-hashtags"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Preview & Action Pane */}
          <div className="w-full lg:w-96 flex-none bg-card h-auto lg:h-full flex flex-col p-4 lg:p-8 pb-32 md:pb-32 lg:pb-8 lg:overflow-y-auto border-t lg:border-t-0 lg:border-l shadow-[0_-20px_40px_rgba(0,0,0,0.05)] lg:shadow-none rounded-t-[32px] lg:rounded-none">
            
            <div className="hidden lg:block flex-1 mb-8">
              <h3 className="text-sm font-bold text-muted-foreground mb-4">Live Preview</h3>
              <div className="bg-background rounded-[28px] overflow-hidden shadow-soft w-[280px] mx-auto border">
                <div className="p-3 flex items-center gap-2 border-b bg-card">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime-light to-lime text-ink flex items-center justify-center font-bold text-[10px]">
                    AK
                  </div>
                  <span className="text-xs font-bold">Amara's Kitchen</span>
                </div>
                {selectedMedia.length > 0 ? (
                  <div className="w-full aspect-square bg-muted flex items-center justify-center">
                    <Image size={32} className="text-muted-foreground opacity-20" />
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-muted flex items-center justify-center text-muted-foreground">
                    <Image size={32} opacity={0.2} />
                  </div>
                )}
                <div className="p-4 pt-3">
                  <p className="text-sm whitespace-pre-wrap line-clamp-4">
                    {fullCaption || "Your caption will appear here..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex bg-muted p-1 rounded-full w-full">
                <button
                  onClick={() => setScheduleMode('now')}
                  className={`flex-1 py-3 text-xs font-bold rounded-full transition-all ${
                    scheduleMode === 'now' ? 'bg-card text-ink shadow-sm' : 'text-muted-foreground'
                  }`}
                  data-testid="button-post-now"
                >
                  Post Now
                </button>
                <button
                  onClick={() => setScheduleMode('scheduled')}
                  className={`flex-1 py-3 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1.5 ${
                    scheduleMode === 'scheduled' ? 'bg-card text-ink shadow-sm' : 'text-muted-foreground'
                  }`}
                  data-testid="button-schedule"
                >
                  <Clock size={14} /> Schedule
                </button>
              </div>

              {scheduleMode === 'scheduled' && (
                <label className="block">
                  <span className="sr-only">Post date and time</span>
                  <input
                    type="datetime-local"
                    value={socialScheduleAt}
                    onChange={(e) => setSocialScheduleAt(e.target.value)}
                    className="w-full h-12 rounded-full border border-border bg-card px-4 text-sm font-bold text-ink outline-none focus:ring-2 focus:ring-lime"
                    data-testid="input-social-schedule"
                  />
                </label>
              )}

              <button
                onClick={handlePublish}
                className="w-full bg-ink text-white h-14 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-ink-2 transition-colors"
                data-testid="button-publish"
              >
                {scheduleMode === 'scheduled' ? <Calendar size={18} /> : <Send size={18} />}
                {scheduleMode === 'scheduled' 
                  ? 'Pick Date & Time' 
                  : `Publish to ${selectedPlatformCount} Platform${selectedPlatformCount !== 1 ? 's' : ''}`
                }
              </button>
              {socialStatus && (
                <p className="text-center text-xs font-bold text-muted-foreground" role="status">{socialStatus}</p>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Push Notifications */}
      {activeTab === 'push' && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
          
          {/* Campaign Builder Pane */}
          <div className="w-full lg:flex-1 lg:overflow-y-auto">
            <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6 lg:pb-32">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold tracking-tight" data-testid="heading-campaign-builder">Campaign Builder</h2>
                <button 
                  onClick={() => setShowCampaigns(!showCampaigns)}
                  className="flex items-center gap-1.5 text-xs font-bold text-ink bg-lime-pale px-3 py-1.5 rounded-full hover:bg-lime/30 transition-colors"
                  data-testid="button-view-campaigns"
                >
                  <BarChart3 size={14} />
                  Past Campaigns
                </button>
              </div>

              {/* Plan Info */}
              <div className="bg-lime-pale/30 border-2 border-lime-pale rounded-[24px] p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-lime text-ink flex items-center justify-center flex-none">
                    <Zap size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm mb-1">Growth Plan Active</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      Manual campaigns + automated journeys enabled. Upgrade to Pro for trigger personalization, recurring campaigns, and A/B testing.
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Type Selector */}
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-3">Campaign Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedJourney(null)}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                      !selectedJourney 
                        ? 'border-lime bg-lime/10' 
                        : 'border-border bg-card hover:border-muted'
                    }`}
                    data-testid="button-manual-campaign"
                  >
                    <div className="font-bold text-sm mb-1">Manual Campaign</div>
                    <div className="text-xs text-muted-foreground">Send now or schedule</div>
                  </button>
                  <button
                    onClick={() => setShowJourneys(true)}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                      selectedJourney 
                        ? 'border-lime bg-lime/10' 
                        : 'border-border bg-card hover:border-muted'
                    }`}
                    data-testid="button-automated-journey"
                  >
                    <div className="font-bold text-sm mb-1">Automated Journey</div>
                    <div className="text-xs text-muted-foreground">
                      {selectedJourney ? 'Journey selected' : 'Choose trigger'}
                    </div>
                  </button>
                </div>
              </div>

              {/* Journey Picker Modal */}
              {showJourneys && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in" onClick={() => setShowJourneys(false)}>
                  <div 
                    className="bg-card rounded-[32px] shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95" 
                    onClick={e => e.stopPropagation()}
                    data-testid="modal-journeys"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-extrabold text-lg">Automated Journeys</h3>
                      <button onClick={() => setShowJourneys(false)} className="text-muted-foreground hover:text-ink">
                        <X size={20} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {(['welcome', 'birthday', 'loyalty', 'abandoned-cart', 'appointment', 'win-back'] as Journey[]).map(journey => (
                        <button
                          key={journey}
                          onClick={() => {
                            setSelectedJourney(journey);
                            setShowJourneys(false);
                          }}
                          className="p-4 bg-surface-alt rounded-2xl text-left hover:bg-muted transition-colors group"
                          data-testid={`journey-${journey}`}
                        >
                          <div className="font-bold text-sm mb-0.5 group-hover:text-lime transition-colors capitalize">
                            {journey.replace('-', ' ')}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {journey === 'welcome' && 'Sent when customer first signs up'}
                            {journey === 'birthday' && 'Sent on customer birthday'}
                            {journey === 'loyalty' && 'Sent after X purchases'}
                            {journey === 'abandoned-cart' && 'Sent when cart is left incomplete'}
                            {journey === 'appointment' && 'Sent before scheduled appointment'}
                            {journey === 'win-back' && 'Sent after 30 days inactive'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Past Campaigns Panel */}
              {showCampaigns && (
                <div className="bg-card rounded-[24px] p-4 border shadow-soft animate-in slide-in-from-top-2" data-testid="panel-past-campaigns">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold">Recent Campaigns</h3>
                    <button onClick={() => setShowCampaigns(false)} className="text-muted-foreground hover:text-ink">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {CAMPAIGNS.map(campaign => (
                      <div key={campaign.id} className="p-4 bg-surface-alt rounded-2xl" data-testid={`campaign-${campaign.id}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="font-bold text-sm mb-0.5">{campaign.title}</div>
                            <div className="text-xs text-muted-foreground">{campaign.date}</div>
                          </div>
                          <div className="text-[10px] font-bold text-lime bg-lime-pale px-2 py-1 rounded-full uppercase">
                            {AUDIENCE_INFO[campaign.audience].label}
                          </div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 text-center">
                          <div>
                            <div className="text-xs font-bold">{campaign.sent}</div>
                            <div className="text-[10px] text-muted-foreground">Sent</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold">{campaign.delivered}</div>
                            <div className="text-[10px] text-muted-foreground">Delivered</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold">{campaign.opened}</div>
                            <div className="text-[10px] text-muted-foreground">Opened</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold">{campaign.clicked}</div>
                            <div className="text-[10px] text-muted-foreground">Clicked</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-lime">{campaign.converted}</div>
                            <div className="text-[10px] text-muted-foreground">Converted</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Title Field */}
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-3">
                  Campaign Title <span className="text-muted-foreground/60">(internal only)</span>
                </label>
                <div className="bg-card rounded-[24px] p-1 shadow-sm border focus-within:border-lime transition-colors">
                  <input
                    type="text"
                    placeholder="e.g. Weekend Jollof Special"
                    value={pushTitle}
                    onChange={(e) => setPushTitle(e.target.value)}
                    className="w-full bg-transparent border-none outline-none p-4 text-sm font-medium placeholder:text-muted-foreground/70"
                    data-testid="input-push-title"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-3">
                  Notification Message
                </label>
                <div className="bg-card rounded-[24px] p-1 shadow-sm border focus-within:border-lime transition-colors">
                  <textarea
                    placeholder="Write the message customers will see..."
                    value={pushMessage}
                    onChange={(e) => setPushMessage(e.target.value)}
                    className="w-full h-24 bg-transparent border-none outline-none resize-none p-4 text-sm font-medium placeholder:text-muted-foreground/70"
                    data-testid="input-push-message"
                  />
                  <div className="flex items-center justify-end p-3 border-t bg-surface-alt rounded-b-[20px]">
                    <span className="text-xs font-bold text-muted-foreground">{pushMessage.length}/180</span>
                  </div>
                </div>
              </div>

              {/* Audience Selector */}
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-3">
                  Target Audience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(AUDIENCE_INFO) as Audience[]).map(audience => {
                    const info = AUDIENCE_INFO[audience];
                    const isSelected = pushAudience === audience;
                    return (
                      <button
                        key={audience}
                        onClick={() => setPushAudience(audience)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          isSelected 
                            ? 'border-lime bg-lime/10' 
                            : 'border-border bg-card hover:border-muted'
                        }`}
                        data-testid={`audience-${audience}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-sm">{info.label}</div>
                          <div className="text-xs font-bold text-lime">{info.count}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{info.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Elements */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground block">
                  Optional Elements
                </label>
                
                <button
                  onClick={() => setPushHasImage(!pushHasImage)}
                  className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                    pushHasImage 
                      ? 'border-lime bg-lime/10' 
                      : 'border-border bg-card hover:border-muted'
                  }`}
                  data-testid="toggle-push-image"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      pushHasImage ? 'bg-lime text-ink' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Image size={18} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">Add Image</div>
                      <div className="text-xs text-muted-foreground">Rich notification with photo</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    pushHasImage ? 'bg-lime border-lime' : 'border-border'
                  }`}>
                    {pushHasImage && <Check size={14} className="text-ink" />}
                  </div>
                </button>

                <button
                  onClick={() => setPushHasCTA(!pushHasCTA)}
                  className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                    pushHasCTA 
                      ? 'border-lime bg-lime/10' 
                      : 'border-border bg-card hover:border-muted'
                  }`}
                  data-testid="toggle-push-cta"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      pushHasCTA ? 'bg-lime text-ink' : 'bg-muted text-muted-foreground'
                    }`}>
                      <MousePointerClick size={18} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">Add Action Button</div>
                      <div className="text-xs text-muted-foreground">Direct customers to take action</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    pushHasCTA ? 'bg-lime border-lime' : 'border-border'
                  }`}>
                    {pushHasCTA && <Check size={14} className="text-ink" />}
                  </div>
                </button>

                {pushHasCTA && (
                  <div className="bg-card rounded-[24px] p-1 shadow-sm border animate-in slide-in-from-top-1">
                    <input
                      type="text"
                      placeholder="Button text (e.g. Order Now, View Menu)"
                      value={pushCTAText}
                      onChange={(e) => setPushCTAText(e.target.value)}
                      className="w-full bg-transparent border-none outline-none p-4 text-sm font-medium placeholder:text-muted-foreground/70"
                      data-testid="input-cta-text"
                    />
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Preview & Action Pane */}
          <div className="w-full lg:w-96 flex-none bg-card h-auto lg:h-full flex flex-col p-4 lg:p-8 pb-32 md:pb-32 lg:pb-8 lg:overflow-y-auto border-t lg:border-t-0 lg:border-l shadow-[0_-20px_40px_rgba(0,0,0,0.05)] lg:shadow-none rounded-t-[32px] lg:rounded-none">
            
            <div className="hidden lg:block flex-1 mb-8">
              <h3 className="text-sm font-bold text-muted-foreground mb-4">Notification Preview</h3>
              <div className="bg-background rounded-[28px] overflow-hidden shadow-soft w-[280px] mx-auto border">
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-ink text-lime flex items-center justify-center font-bold text-xs flex-none">
                      R
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold mb-0.5">Amara's Kitchen</div>
                      <div className="text-xs text-muted-foreground">just now</div>
                    </div>
                  </div>
                  {pushHasImage && (
                    <div className="w-full aspect-video bg-muted rounded-xl mb-3 flex items-center justify-center">
                      <Image size={24} className="text-muted-foreground opacity-40" />
                    </div>
                  )}
                  <p className="text-sm font-medium leading-snug mb-3">
                    {pushMessage || "Your notification message will appear here..."}
                  </p>
                  {pushHasCTA && pushCTAText && (
                    <button className="w-full py-2.5 bg-lime text-ink text-xs font-bold rounded-xl">
                      {pushCTAText}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {!selectedJourney && (
                <div className="flex bg-muted p-1 rounded-full w-full">
                  <button
                    onClick={() => setPushScheduleMode('now')}
                    className={`flex-1 py-3 text-xs font-bold rounded-full transition-all ${
                      pushScheduleMode === 'now' ? 'bg-card text-ink shadow-sm' : 'text-muted-foreground'
                    }`}
                    data-testid="button-send-now"
                  >
                    Send Now
                  </button>
                  <button
                    onClick={() => setPushScheduleMode('scheduled')}
                    className={`flex-1 py-3 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1.5 ${
                      pushScheduleMode === 'scheduled' ? 'bg-card text-ink shadow-sm' : 'text-muted-foreground'
                    }`}
                    data-testid="button-schedule-push"
                  >
                    <Clock size={14} /> Schedule
                  </button>
                </div>
              )}

              {!selectedJourney && pushScheduleMode === 'scheduled' && (
                <label className="block">
                  <span className="sr-only">Campaign date and time</span>
                  <input
                    type="datetime-local"
                    value={pushScheduleAt}
                    onChange={(e) => setPushScheduleAt(e.target.value)}
                    className="w-full h-12 rounded-full border border-border bg-card px-4 text-sm font-bold text-ink outline-none focus:ring-2 focus:ring-lime"
                    data-testid="input-push-schedule"
                  />
                </label>
              )}

              <button
                onClick={handleSendPush}
                className="w-full bg-ink text-white h-14 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-ink-2 transition-colors"
                data-testid="button-send-push"
              >
                {selectedJourney ? (
                  <>
                    <Zap size={18} />
                    Activate Journey
                  </>
                ) : (
                  <>
                    {pushScheduleMode === 'scheduled' ? <Calendar size={18} /> : <Send size={18} />}
                    {pushScheduleMode === 'scheduled' 
                      ? 'Pick Date & Time' 
                      : `Send to ${AUDIENCE_INFO[pushAudience].count} Customers`
                    }
                  </>
                )}
              </button>
              {pushStatus && (
                <p className="text-center text-xs font-bold text-muted-foreground" role="status">{pushStatus}</p>
              )}

              {!selectedJourney && (
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">
                    Basic plan: up to 1,000 subscribers
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Media Library Modal */}
      {showMediaLibrary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in" onClick={() => setShowMediaLibrary(false)}>
          <div 
            className="bg-card rounded-[32px] shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col animate-in zoom-in-95" 
            onClick={e => e.stopPropagation()}
            data-testid="modal-media-library"
          >
            <div className="p-6 border-b flex items-center justify-between flex-none">
              <h3 className="font-extrabold text-lg">Media Library</h3>
              <button onClick={() => setShowMediaLibrary(false)} className="text-muted-foreground hover:text-ink">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {MEDIA_LIBRARY.map(media => {
                  const isSelected = selectedMedia.some(m => m.id === media.id);
                  return (
                    <button
                      key={media.id}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedMedia(selectedMedia.filter(m => m.id !== media.id));
                        } else {
                          setSelectedMedia([...selectedMedia, media]);
                        }
                      }}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                        isSelected ? 'border-lime' : 'border-border hover:border-muted'
                      }`}
                      data-testid={`media-${media.id}`}
                    >
                      <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        {media.type === 'video' ? (
                          <Play size={24} className="text-muted-foreground opacity-40" />
                        ) : (
                          <Image size={24} className="text-muted-foreground opacity-40" />
                        )}
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-lime text-ink rounded-full flex items-center justify-center">
                          <Check size={14} />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="text-[10px] font-bold text-white truncate">{media.name}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="p-4 border-t flex items-center justify-between flex-none">
              <label
                className="flex items-center gap-2 px-4 py-2.5 bg-surface-alt rounded-full text-sm font-bold hover:bg-muted transition-colors cursor-pointer"
                data-testid="button-upload-new"
              >
                <Upload size={16} />
                Upload New
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="sr-only"
                  onChange={(e) => handleMediaUpload(e.target.files?.[0])}
                />
              </label>
              <button 
                onClick={() => setShowMediaLibrary(false)}
                className="px-6 py-2.5 bg-ink text-white rounded-full text-sm font-bold hover:bg-ink-2 transition-colors"
                data-testid="button-done-media"
              >
                Done ({selectedMedia.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
