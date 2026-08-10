import React, { useState } from 'react';
import { Plus, X, Pencil, ToggleLeft, ToggleRight, Bell } from 'lucide-react';
import { Promotions, PromoEntry } from '../types';

interface Props {
  data: Promotions;
  onChange: (patch: Partial<Promotions>) => void;
}

export default function Step7Promotions({ data, onChange }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftText, setDraftText] = useState('');

  const openAdd = () => {
    setEditingId(null);
    setDraftText('');
    setShowAdd(true);
  };

  const openEdit = (promo: PromoEntry) => {
    setEditingId(promo.id);
    setDraftText(promo.text);
    setShowAdd(true);
  };

  const save = () => {
    if (!draftText.trim()) return;
    if (editingId) {
      onChange({ promos: data.promos.map(p => p.id === editingId ? { ...p, text: draftText.trim() } : p) });
    } else {
      onChange({ promos: [...data.promos, { id: `promo${Date.now()}`, text: draftText.trim() }] });
    }
    setDraftText('');
    setEditingId(null);
    setShowAdd(false);
  };

  const remove = (id: string) => onChange({ promos: data.promos.filter(p => p.id !== id) });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-extrabold text-[#16213E]">Promotions</h3>
        <p className="mt-1 text-sm text-[#8A8F98]">Configure recurring promotional messages. Scheduling and sending is handled by existing infrastructure.</p>
      </div>

      {/* Push notifications toggle */}
      <div className="flex items-center justify-between rounded-[20px] border border-[#ECEDF1] bg-white px-4 py-4">
        <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
          <div className="w-10 h-10 rounded-xl bg-[#FFF3CD] flex items-center justify-center flex-none">
            <Bell size={16} className="text-[#856404]" />
          </div>
          <div>
            <p className="font-bold text-[#16213E]">Enable promotional push notifications</p>
            <p className="text-xs text-[#8A8F98] mt-0.5">Hands off to existing push infrastructure — no additional setup needed here</p>
          </div>
        </div>
        <button onClick={() => onChange({ enablePushNotifications: !data.enablePushNotifications })} className="flex-none">
          {data.enablePushNotifications
            ? <ToggleRight size={28} className="text-[#25D366]" />
            : <ToggleLeft size={28} className="text-[#C0C4CC]" />}
        </button>
      </div>

      {/* Promo entries */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">Promotional messages</p>
            <p className="text-xs text-[#8A8F98] mt-0.5">Recurring promo texts the bot can send out</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#16213E] text-white text-xs font-bold hover:bg-[#16213E]/90 transition-colors"
          >
            <Plus size={12} /> Add promo
          </button>
        </div>

        {showAdd && (
          <div className="rounded-[20px] border border-[#ECEDF1] bg-[#F8F9FB] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-extrabold text-[#16213E]">{editingId ? 'Edit promo' : 'New promo message'}</p>
              <button onClick={() => { setShowAdd(false); setEditingId(null); }} className="w-7 h-7 rounded-full bg-white border border-[#ECEDF1] flex items-center justify-center">
                <X size={13} className="text-[#8A8F98]" />
              </button>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#8A8F98]">Promo text *</label>
              <textarea
                value={draftText}
                onChange={e => setDraftText(e.target.value)}
                placeholder="e.g. Friday discount: 10% off all mains this Friday only! Use code FRIDAY10"
                rows={3}
                className="w-full rounded-xl border border-[#ECEDF1] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#5B4FE8] resize-none placeholder:text-[#C0C4CC]"
              />
              <p className="text-xs text-[#8A8F98]">{draftText.length}/500 characters</p>
            </div>
            <button
              onClick={save}
              disabled={!draftText.trim()}
              className="w-full h-10 rounded-full bg-[#16213E] text-white text-sm font-bold disabled:opacity-40 hover:bg-[#16213E]/90 transition-colors"
            >
              {editingId ? 'Save changes' : 'Add promo'}
            </button>
          </div>
        )}

        {data.promos.length === 0 && !showAdd && (
          <div className="rounded-[20px] border border-dashed border-[#ECEDF1] bg-[#F8F9FB] py-10 text-center">
            <p className="text-sm font-semibold text-[#8A8F98]">No promo messages yet</p>
            <p className="text-xs text-[#C0C4CC] mt-1">Add recurring promotional texts for your store</p>
          </div>
        )}

        {data.promos.map((promo, i) => (
          <div key={promo.id} className="flex items-start gap-3 rounded-[18px] border border-[#ECEDF1] bg-white px-4 py-3">
            <div className="w-7 h-7 rounded-full bg-[#FFF3CD] flex items-center justify-center flex-none mt-0.5">
              <span className="text-xs font-extrabold text-[#856404]">{i + 1}</span>
            </div>
            <p className="flex-1 text-sm text-[#16213E] font-semibold leading-relaxed">{promo.text}</p>
            <div className="flex gap-1.5 flex-none">
              <button
                onClick={() => openEdit(promo)}
                className="w-7 h-7 rounded-full bg-[#F5F6F8] flex items-center justify-center hover:bg-[#ECEDF1] transition-colors"
              >
                <Pencil size={12} className="text-[#8A8F98]" />
              </button>
              <button
                onClick={() => remove(promo.id)}
                className="w-7 h-7 rounded-full bg-[#FFF5F5] flex items-center justify-center hover:bg-[#FFE0E0] transition-colors"
              >
                <X size={12} className="text-[#E74C3C]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[20px] border border-[#E8F4FD] bg-[#F0F7FF] px-4 py-3">
        <p className="text-xs font-semibold text-[#1565C0]">
          Promo messages are stored here and surfaced to the push notification system. To schedule or send them, go to the Marketing section.
        </p>
      </div>
    </div>
  );
}
