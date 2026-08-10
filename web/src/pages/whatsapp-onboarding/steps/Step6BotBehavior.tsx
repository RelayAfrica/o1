import React, { useState } from 'react';
import { Plus, X, MessageCircle } from 'lucide-react';
import {
  BotBehavior, BotTone, EmojiUsage, FAQEntry, EscalationTrigger
} from '../types';

interface Props {
  data: BotBehavior;
  onChange: (patch: Partial<BotBehavior>) => void;
}

const GREETING_DEFAULTS: Record<BotTone, Record<EmojiUsage, string>> = {
  formal: {
    none: 'Good day. Welcome to our store. Please browse the menu below and place your order.',
    light: 'Hello! Welcome to our store. Browse the menu below and place your order when ready.',
    frequent: 'Hello! 👋 Welcome to our store! 🛍️ Browse our menu and place your order anytime! 😊',
  },
  casual: {
    none: "Hey! Welcome to our store. Take a look at the menu and order when you're ready.",
    light: "Hi! 👋 Welcome to our store. Browse our menu below and place your order — we'll get it ready for you.",
    frequent: "Hey hey! 👋🎉 Welcome to our store! Check out our menu and order whenever you're ready! 🍽️✨",
  },
};

const ESCALATION_OPTIONS: { id: EscalationTrigger; label: string; description: string }[] = [
  { id: 'complaints', label: 'Complaints', description: 'Customer expresses dissatisfaction' },
  { id: 'allergy_questions', label: 'Allergy questions', description: 'Customer asks about allergens or dietary needs' },
  { id: 'large_orders', label: 'Large orders', description: 'Order total exceeds a threshold you set' },
  { id: 'unmatched', label: 'Anything unmatched', description: "Questions the bot can't answer" },
];

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full h-11 rounded-2xl border border-[#ECEDF1] bg-white px-4 text-sm font-semibold outline-none focus:border-[#5B4FE8] focus:ring-2 focus:ring-[#5B4FE8]/10 transition-all placeholder:text-[#C0C4CC] ${props.className ?? ''}`}
    />
  );
}

export default function Step6BotBehavior({ data, onChange }: Props) {
  const [showAddFAQ, setShowAddFAQ] = useState(false);
  const [newFAQ, setNewFAQ] = useState({ triggers: '', answer: '' });
  const [editingFAQId, setEditingFAQId] = useState<string | null>(null);

  const applyToneDefault = (tone: BotTone, emojiUsage: EmojiUsage) => {
    onChange({
      tone,
      emojiUsage,
      greetingMessage: GREETING_DEFAULTS[tone][emojiUsage],
    });
  };

  const setTone = (tone: BotTone) => applyToneDefault(tone, data.emojiUsage);
  const setEmoji = (emojiUsage: EmojiUsage) => applyToneDefault(data.tone, emojiUsage);

  const addFAQ = () => {
    if (!newFAQ.triggers.trim() || !newFAQ.answer.trim()) return;
    const entry: FAQEntry = {
      id: editingFAQId ?? `faq${Date.now()}`,
      triggerPhrases: newFAQ.triggers.split(/[,\n]+/).map(s => s.trim()).filter(Boolean),
      answer: newFAQ.answer,
    };
    onChange({
      faqEntries: editingFAQId
        ? data.faqEntries.map(f => f.id === editingFAQId ? entry : f)
        : [...data.faqEntries, entry],
    });
    setNewFAQ({ triggers: '', answer: '' });
    setEditingFAQId(null);
    setShowAddFAQ(false);
  };

  const deleteFAQ = (id: string) => onChange({ faqEntries: data.faqEntries.filter(f => f.id !== id) });

  const startEditFAQ = (faq: FAQEntry) => {
    setEditingFAQId(faq.id);
    setNewFAQ({ triggers: faq.triggerPhrases.join(', '), answer: faq.answer });
    setShowAddFAQ(true);
  };

  const toggleEscalationTrigger = (trigger: EscalationTrigger) => {
    const cur = data.escalation.triggers;
    onChange({
      escalation: {
        ...data.escalation,
        triggers: cur.includes(trigger)
          ? cur.filter(t => t !== trigger)
          : [...cur, trigger],
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-extrabold text-[#16213E]">Bot behavior & FAQ</h3>
        <p className="mt-1 text-sm text-[#8A8F98]">Configure how your WhatsApp bot sounds and responds to customers.</p>
      </div>

      {/* Tone */}
      <div className="space-y-3">
        <p className="text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">Tone</p>
        <div className="grid grid-cols-2 gap-3">
          {(['formal', 'casual'] as BotTone[]).map(t => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`py-3 rounded-[18px] border-2 text-sm font-bold transition-all capitalize ${data.tone === t ? 'border-[#5B4FE8] bg-[#5B4FE8]/8 text-[#5B4FE8]' : 'border-[#ECEDF1] bg-white text-[#8A8F98]'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Emoji usage */}
      <div className="space-y-3">
        <p className="text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">Emoji usage</p>
        <div className="grid grid-cols-3 gap-2">
          {([['none', 'None', '🚫'], ['light', 'Light', '😊'], ['frequent', 'Frequent', '🎉']] as [EmojiUsage, string, string][]).map(([val, label, icon]) => (
            <button
              key={val}
              onClick={() => setEmoji(val)}
              className={`py-3 rounded-[18px] border-2 text-sm font-bold transition-all ${data.emojiUsage === val ? 'border-[#5B4FE8] bg-[#5B4FE8]/8 text-[#5B4FE8]' : 'border-[#ECEDF1] bg-white text-[#8A8F98]'}`}
            >
              <span className="block text-xl mb-1">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Greeting message */}
      <div className="space-y-1.5">
        <label className="text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">Greeting message</label>
        <textarea
          value={data.greetingMessage}
          onChange={e => onChange({ greetingMessage: e.target.value })}
          rows={3}
          className="w-full rounded-2xl border border-[#ECEDF1] bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#5B4FE8] resize-none"
        />
        <p className="text-xs text-[#8A8F98]">Pre-filled based on your tone and emoji settings. Edit freely.</p>
      </div>

      {/* Preview */}
      <div className="rounded-[20px] border border-[#E9EAF1] bg-[#ECE5DD] p-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-none">
            <MessageCircle size={14} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-[#16213E]">Preview</p>
            <p className="text-[10px] text-[#8A8F98]">How your greeting will look</p>
          </div>
        </div>
        <div className="bg-white rounded-[16px] rounded-tl-sm px-3 py-2.5 max-w-[85%] shadow-sm">
          <p className="text-sm text-[#16213E] leading-relaxed">{data.greetingMessage || 'No greeting set.'}</p>
        </div>
      </div>

      {/* FAQ entries */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">FAQ entries</p>
            <p className="text-xs text-[#8A8F98] mt-0.5">Add common questions your customers ask</p>
          </div>
          <button
            onClick={() => { setShowAddFAQ(true); setEditingFAQId(null); setNewFAQ({ triggers: '', answer: '' }); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#16213E] text-white text-xs font-bold hover:bg-[#16213E]/90 transition-colors"
          >
            <Plus size={12} /> Add FAQ
          </button>
        </div>

        {showAddFAQ && (
          <div className="rounded-[20px] border border-[#ECEDF1] bg-[#F8F9FB] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-extrabold text-[#16213E]">{editingFAQId ? 'Edit FAQ' : 'New FAQ entry'}</p>
              <button onClick={() => { setShowAddFAQ(false); setEditingFAQId(null); }} className="w-7 h-7 rounded-full bg-white border border-[#ECEDF1] flex items-center justify-center">
                <X size={13} className="text-[#8A8F98]" />
              </button>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#8A8F98]">Trigger phrases * <span className="font-medium">(comma or newline separated)</span></label>
              <textarea
                value={newFAQ.triggers}
                onChange={e => setNewFAQ(p => ({ ...p, triggers: e.target.value }))}
                placeholder={"do you deliver, delivery area, how far do you deliver"}
                rows={2}
                className="w-full rounded-xl border border-[#ECEDF1] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#5B4FE8] resize-none placeholder:text-[#C0C4CC]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#8A8F98]">Answer *</label>
              <textarea
                value={newFAQ.answer}
                onChange={e => setNewFAQ(p => ({ ...p, answer: e.target.value }))}
                placeholder="We deliver within 15km of Ikeja. Delivery takes 30–45 minutes."
                rows={3}
                className="w-full rounded-xl border border-[#ECEDF1] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#5B4FE8] resize-none placeholder:text-[#C0C4CC]"
              />
            </div>
            <button
              onClick={addFAQ}
              disabled={!newFAQ.triggers.trim() || !newFAQ.answer.trim()}
              className="w-full h-10 rounded-full bg-[#16213E] text-white text-sm font-bold disabled:opacity-40 hover:bg-[#16213E]/90 transition-colors"
            >
              {editingFAQId ? 'Save changes' : 'Add FAQ'}
            </button>
          </div>
        )}

        {data.faqEntries.length === 0 && !showAddFAQ && (
          <div className="rounded-[20px] border border-dashed border-[#ECEDF1] bg-[#F8F9FB] py-8 text-center">
            <p className="text-sm text-[#8A8F98] font-semibold">No FAQ entries yet</p>
            <p className="text-xs text-[#C0C4CC] mt-1">Add common questions customers ask about your store</p>
          </div>
        )}

        {data.faqEntries.map((faq, i) => (
          <div key={faq.id} className="rounded-[18px] border border-[#ECEDF1] bg-white p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex flex-wrap gap-1.5">
                  {faq.triggerPhrases.map((phrase, j) => (
                    <span key={j} className="px-2 py-1 bg-[#F0F0FF] text-[#5B4FE8] text-xs font-bold rounded-full">{phrase}</span>
                  ))}
                </div>
                <p className="text-sm text-[#16213E]">{faq.answer}</p>
              </div>
              <div className="flex gap-1.5 flex-none">
                <button onClick={() => startEditFAQ(faq)} className="w-7 h-7 rounded-full bg-[#F5F6F8] flex items-center justify-center text-xs font-bold text-[#8A8F98]">✏️</button>
                <button onClick={() => deleteFAQ(faq.id)} className="w-7 h-7 rounded-full bg-[#FFF5F5] flex items-center justify-center">
                  <X size={12} className="text-[#E74C3C]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Escalation rules */}
      <div className="space-y-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">Escalation rules</p>
          <p className="text-xs text-[#8A8F98] mt-0.5">Which situations should hand off to a human?</p>
        </div>

        <div className="space-y-2">
          {ESCALATION_OPTIONS.map(opt => {
            const active = data.escalation.triggers.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleEscalationTrigger(opt.id)}
                className={`w-full flex items-center gap-3 rounded-[18px] border-2 px-4 py-3 text-left transition-all ${active ? 'border-[#5B4FE8] bg-[#5B4FE8]/5' : 'border-[#ECEDF1] bg-white'}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-none ${active ? 'bg-[#5B4FE8] border-[#5B4FE8]' : 'border-[#C0C4CC]'}`}>
                  {active && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#16213E] text-sm">{opt.label}</p>
                  <p className="text-xs text-[#8A8F98]">{opt.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {data.escalation.triggers.includes('large_orders') && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#8A8F98]">Large order threshold (₦)</label>
            <Input
              type="number"
              min="0"
              value={data.escalation.largeOrderThreshold || ''}
              onChange={e => onChange({ escalation: { ...data.escalation, largeOrderThreshold: parseFloat(e.target.value) || 0 } })}
              placeholder="50000"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#8A8F98]">Escalation WhatsApp number</label>
          <Input
            value={data.escalation.escalationWhatsApp}
            onChange={e => onChange({ escalation: { ...data.escalation, escalationWhatsApp: e.target.value } })}
            placeholder="+234 801 234 5678"
            type="tel"
          />
          <p className="text-xs text-[#8A8F98]">The staff number that receives escalated chats</p>
        </div>
      </div>
    </div>
  );
}
