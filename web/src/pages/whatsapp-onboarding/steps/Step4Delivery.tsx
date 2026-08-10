import React, { useState } from 'react';
import { Plus, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { DeliveryFulfillment, DeliveryZone } from '../types';

interface Props {
  data: DeliveryFulfillment;
  onChange: (patch: Partial<DeliveryFulfillment>) => void;
}

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">
        {label}{required && <span className="text-[#E74C3C]">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[#8A8F98] font-medium mt-1">{hint}</p>}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full h-11 rounded-2xl border border-[#ECEDF1] bg-white px-4 text-sm font-semibold outline-none focus:border-[#5B4FE8] focus:ring-2 focus:ring-[#5B4FE8]/10 transition-all placeholder:text-[#C0C4CC] ${props.className ?? ''}`}
    />
  );
}

function ToggleCard({ title, description, enabled, onToggle }: { title: string; description: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-[20px] border border-[#ECEDF1] bg-white px-4 py-4">
      <div className="flex-1 min-w-0 mr-4">
        <p className="font-bold text-[#16213E]">{title}</p>
        <p className="text-xs text-[#8A8F98] mt-0.5">{description}</p>
      </div>
      <button onClick={onToggle} className="flex-none">
        {enabled ? <ToggleRight size={28} className="text-[#25D366]" /> : <ToggleLeft size={28} className="text-[#C0C4CC]" />}
      </button>
    </div>
  );
}

export default function Step4Delivery({ data, onChange }: Props) {
  const [newZone, setNewZone] = useState({ name: '', fee: '' });
  const [showAddZone, setShowAddZone] = useState(false);

  const addZone = () => {
    if (!newZone.name.trim()) return;
    const zone: DeliveryZone = { id: `z${Date.now()}`, name: newZone.name.trim(), fee: parseFloat(newZone.fee) || 0 };
    onChange({ zones: [...data.zones, zone] });
    setNewZone({ name: '', fee: '' });
    setShowAddZone(false);
  };

  const removeZone = (id: string) => onChange({ zones: data.zones.filter(z => z.id !== id) });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-extrabold text-[#16213E]">Delivery & fulfillment</h3>
        <p className="mt-1 text-sm text-[#8A8F98]">Tell customers how they can receive their orders.</p>
      </div>

      {/* Delivery toggle */}
      <ToggleCard
        title="Delivery available"
        description="Customers can order for delivery to their location"
        enabled={data.deliveryAvailable}
        onToggle={() => onChange({ deliveryAvailable: !data.deliveryAvailable })}
      />

      {data.deliveryAvailable && (
        <div className="space-y-4 rounded-[20px] border border-[#ECEDF1] bg-[#F8F9FB] p-4">
          <Field label="Coverage area" hint="Describe your delivery radius or list neighbourhood names">
            <Input
              value={data.coverageDescription}
              onChange={e => onChange({ coverageDescription: e.target.value })}
              placeholder="e.g. Within 15km of Ikeja, Lagos"
            />
          </Field>

          <Field label="Estimated delivery time">
            <Input
              value={data.estimatedDeliveryTime}
              onChange={e => onChange({ estimatedDeliveryTime: e.target.value })}
              placeholder="e.g. 30–45 minutes"
            />
          </Field>

          {/* Fee mode */}
          <Field label="Delivery fee structure">
            <div className="flex gap-2">
              <button
                onClick={() => onChange({ deliveryFeeMode: 'flat' })}
                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${data.deliveryFeeMode === 'flat' ? 'bg-[#16213E] text-white' : 'bg-white border border-[#ECEDF1] text-[#8A8F98]'}`}
              >
                Flat fee
              </button>
              <button
                onClick={() => onChange({ deliveryFeeMode: 'by_zone' })}
                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${data.deliveryFeeMode === 'by_zone' ? 'bg-[#16213E] text-white' : 'bg-white border border-[#ECEDF1] text-[#8A8F98]'}`}
              >
                Fee by zone
              </button>
            </div>
          </Field>

          {data.deliveryFeeMode === 'flat' && (
            <Field label="Delivery fee (₦)">
              <Input
                type="number"
                min="0"
                value={data.flatFee || ''}
                onChange={e => onChange({ flatFee: parseFloat(e.target.value) || 0 })}
                placeholder="0"
              />
            </Field>
          )}

          {data.deliveryFeeMode === 'by_zone' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">Delivery zones</p>
                <button onClick={() => setShowAddZone(true)} className="flex items-center gap-1 text-xs font-bold text-[#5B4FE8]">
                  <Plus size={12} /> Add zone
                </button>
              </div>

              {showAddZone && (
                <div className="rounded-[16px] border border-[#ECEDF1] bg-white p-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={newZone.name}
                      onChange={e => setNewZone(p => ({ ...p, name: e.target.value }))}
                      placeholder="Zone name"
                      className="h-9 rounded-xl border border-[#ECEDF1] px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8] placeholder:text-[#C0C4CC]"
                    />
                    <input
                      type="number"
                      min="0"
                      value={newZone.fee}
                      onChange={e => setNewZone(p => ({ ...p, fee: e.target.value }))}
                      placeholder="Fee (₦)"
                      className="h-9 rounded-xl border border-[#ECEDF1] px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8] placeholder:text-[#C0C4CC]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={addZone} disabled={!newZone.name.trim()} className="flex-1 h-9 rounded-full bg-[#16213E] text-white text-xs font-bold disabled:opacity-40">Add zone</button>
                    <button onClick={() => setShowAddZone(false)} className="px-4 h-9 rounded-full border border-[#ECEDF1] text-xs font-bold text-[#8A8F98]">Cancel</button>
                  </div>
                </div>
              )}

              {data.zones.length === 0 && !showAddZone && (
                <p className="text-xs text-[#8A8F98] text-center py-3">No zones added yet.</p>
              )}

              {data.zones.map(zone => (
                <div key={zone.id} className="flex items-center justify-between rounded-[14px] border border-[#ECEDF1] bg-white px-3 py-2.5">
                  <span className="text-sm font-bold text-[#16213E]">{zone.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-extrabold text-[#5B4FE8]">₦{zone.fee.toLocaleString()}</span>
                    <button onClick={() => removeZone(zone.id)} className="w-6 h-6 rounded-full bg-[#F5F6F8] flex items-center justify-center">
                      <X size={11} className="text-[#8A8F98]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pickup toggle */}
      <ToggleCard
        title="Pickup available"
        description="Customers can collect their order themselves"
        enabled={data.pickupAvailable}
        onToggle={() => onChange({ pickupAvailable: !data.pickupAvailable })}
      />

      {data.pickupAvailable && (
        <Field label="Pickup instructions" hint="Address (if different from your main address) and any extra instructions">
          <textarea
            value={data.pickupInstructions}
            onChange={e => onChange({ pickupInstructions: e.target.value })}
            placeholder="e.g. Pick up at back entrance, Gate 4. Ask for the restaurant counter."
            rows={3}
            className="w-full rounded-2xl border border-[#ECEDF1] bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#5B4FE8] resize-none placeholder:text-[#C0C4CC]"
          />
        </Field>
      )}

      {/* Minimum order */}
      <Field label="Minimum order value (₦)" hint="Set to 0 for no minimum">
        <Input
          type="number"
          min="0"
          value={data.minimumOrderValue || ''}
          onChange={e => onChange({ minimumOrderValue: parseFloat(e.target.value) || 0 })}
          placeholder="0"
        />
      </Field>
    </div>
  );
}
