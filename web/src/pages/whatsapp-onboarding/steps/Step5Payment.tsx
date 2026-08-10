import React from 'react';
import { CreditCard, ToggleLeft, ToggleRight, Info } from 'lucide-react';
import { PaymentPolicy } from '../types';

interface Props {
  data: PaymentPolicy;
  onChange: (patch: Partial<PaymentPolicy>) => void;
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

export default function Step5Payment({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-extrabold text-[#16213E]">Payment & order policy</h3>
        <p className="mt-1 text-sm text-[#8A8F98]">Configure how customers pay and your store's policies.</p>
      </div>

      {/* Accepted payment methods */}
      <div className="space-y-3">
        <p className="text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">Accepted payment methods</p>

        {/* In-chat payment (always required) */}
        <div className="flex items-center gap-3 rounded-[20px] border border-[#D1FAE5] bg-[#F0FDF4] px-4 py-4">
          <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center flex-none">
            <CreditCard size={16} className="text-[#25D366]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[#16213E]">In-chat payment link</p>
            <p className="text-xs text-[#8A8F98] mt-0.5">Customers pay directly inside WhatsApp via a secure link</p>
          </div>
          <div className="flex-none">
            <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-[#DCFCE7] text-[#166534]">Required</span>
          </div>
        </div>

        {/* Cash on delivery */}
        <div className="flex items-center justify-between rounded-[20px] border border-[#ECEDF1] bg-white px-4 py-4">
          <div className="flex-1 min-w-0 mr-4">
            <p className="font-bold text-[#16213E]">Cash on delivery</p>
            <p className="text-xs text-[#8A8F98] mt-0.5">Also accept cash when the order arrives</p>
          </div>
          <button onClick={() => onChange({ cashOnDelivery: !data.cashOnDelivery })} className="flex-none">
            {data.cashOnDelivery
              ? <ToggleRight size={28} className="text-[#25D366]" />
              : <ToggleLeft size={28} className="text-[#C0C4CC]" />}
          </button>
        </div>
      </div>

      {/* Cancellation / refund policy */}
      <Field
        label="Cancellation & refund policy"
        hint="This text is shown verbatim to customers when they ask about cancellations or refunds"
      >
        <textarea
          value={data.cancellationRefundPolicy}
          onChange={e => onChange({ cancellationRefundPolicy: e.target.value })}
          placeholder="e.g. Orders can be cancelled within 5 minutes of placing. Refunds are processed within 3–5 business days..."
          rows={4}
          className="w-full rounded-2xl border border-[#ECEDF1] bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#5B4FE8] resize-none placeholder:text-[#C0C4CC]"
        />
      </Field>

      {/* Payout details */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">Payout account</p>
          <div className="group relative">
            <Info size={13} className="text-[#C0C4CC] cursor-help" />
            <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-56 bg-[#16213E] text-white text-xs font-semibold rounded-xl p-2 z-10 text-center">
              Only required if you haven't already set up payout details in your general business settings.
            </div>
          </div>
        </div>

        <div className="rounded-[20px] border border-[#E8F4FD] bg-[#F0F7FF] px-4 py-3">
          <p className="text-xs font-semibold text-[#1565C0]">
            If you have already configured payout details in your general business settings, you can leave these blank — those settings apply here.
          </p>
        </div>

        <div className="space-y-3">
          <Field label="Bank name">
            <Input
              value={data.payoutBankName}
              onChange={e => onChange({ payoutBankName: e.target.value })}
              placeholder="e.g. GTBank"
            />
          </Field>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Account number">
              <Input
                value={data.payoutAccountNumber}
                onChange={e => onChange({ payoutAccountNumber: e.target.value })}
                placeholder="0123456789"
                type="tel"
                maxLength={10}
              />
            </Field>
            <Field label="Account name">
              <Input
                value={data.payoutAccountName}
                onChange={e => onChange({ payoutAccountName: e.target.value })}
                placeholder="e.g. Amara Okafor"
              />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}
