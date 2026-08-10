import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { BusinessIdentity } from '../types';

interface Props {
  data: BusinessIdentity;
  onChange: (patch: Partial<BusinessIdentity>) => void;
}

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">
        {label}
        {required && <span className="text-[#E74C3C]">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs font-medium text-[#8A8F98]">{hint}</p>}
    </div>
  );
}

function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full h-11 rounded-2xl border border-[#ECEDF1] bg-white px-4 text-sm font-semibold outline-none focus:border-[#5B4FE8] focus:ring-2 focus:ring-[#5B4FE8]/10 transition-all placeholder:text-[#C0C4CC] ${props.className ?? ''}`}
    />
  );
}

export default function Step1BusinessIdentity({ data, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ logoDataUrl: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-extrabold text-[#16213E]">Tell us about your restaurant</h3>
        <p className="mt-1 text-sm text-[#8A8F98]">This information appears on your WhatsApp storefront and in your bot's greeting.</p>
      </div>

      {/* Logo upload */}
      <Field label="Logo / photo">
        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 rounded-[18px] border-2 border-dashed border-[#ECEDF1] bg-[#F8F9FB] flex items-center justify-center cursor-pointer hover:border-[#5B4FE8] hover:bg-[#5B4FE8]/5 transition-all overflow-hidden flex-none"
            onClick={() => fileInputRef.current?.click()}
          >
            {data.logoDataUrl ? (
              <img src={data.logoDataUrl} alt="logo" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <Upload size={18} className="text-[#8A8F98]" />
                <span className="text-[10px] font-bold text-[#8A8F98]">Upload</span>
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#ECEDF1] bg-white text-sm font-bold text-[#16213E] hover:bg-[#F5F6F8] transition-colors"
            >
              <Upload size={13} /> Choose image
            </button>
            {data.logoDataUrl && (
              <button
                type="button"
                onClick={() => onChange({ logoDataUrl: '' })}
                className="flex items-center gap-1 text-xs font-semibold text-[#E74C3C] hover:text-[#C0392B]"
              >
                <X size={11} /> Remove
              </button>
            )}
            <p className="text-xs text-[#8A8F98]">PNG, JPG, WebP — max 5MB</p>
          </div>
        </div>
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Restaurant name" required>
          <StyledInput
            value={data.restaurantName}
            onChange={e => onChange({ restaurantName: e.target.value })}
            placeholder="e.g. Your business name"
          />
        </Field>
        <Field label="Cuisine type / short description" required hint="Used in the bot's intro message to customers">
          <StyledInput
            value={data.cuisineType}
            onChange={e => onChange({ cuisineType: e.target.value })}
            placeholder="e.g. Nigerian cuisine & healthy bowls"
          />
        </Field>
      </div>

      <Field label="Full address" required>
        <StyledInput
          value={data.address}
          onChange={e => onChange({ address: e.target.value })}
          placeholder="e.g. 12 Allen Avenue, Ikeja, Lagos"
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Contact phone number" required>
          <StyledInput
            value={data.contactPhone}
            onChange={e => onChange({ contactPhone: e.target.value })}
            placeholder="+234 801 234 5678"
            type="tel"
          />
        </Field>
        <Field
          label="WhatsApp storefront number"
          required
          hint="The WhatsApp number customers will chat with to browse and order"
        >
          <StyledInput
            value={data.whatsappNumber}
            onChange={e => onChange({ whatsappNumber: e.target.value })}
            placeholder="+234 801 234 5678"
            type="tel"
          />
        </Field>
      </div>

      <div className="rounded-[20px] border border-[#E8F5E9] bg-[#F0FAF1] px-4 py-3">
        <p className="text-xs font-bold text-[#2E7D32]">
          💡 Make sure the WhatsApp number is registered and active on WhatsApp before publishing.
        </p>
      </div>
    </div>
  );
}
