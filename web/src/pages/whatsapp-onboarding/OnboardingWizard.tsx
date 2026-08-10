import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ONBOARDING_STEPS, OnboardingStepId } from './types';
import { useOnboardingStore } from './useOnboardingStore';

import Step1BusinessIdentity from './steps/Step1BusinessIdentity';
import Step2HoursAvailability from './steps/Step2HoursAvailability';
import Step3Menu from './steps/Step3Menu';
import Step4Delivery from './steps/Step4Delivery';
import Step5Payment from './steps/Step5Payment';
import Step6BotBehavior from './steps/Step6BotBehavior';
import Step7Promotions from './steps/Step7Promotions';
import Step8Review from './steps/Step8Review';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  /** Called when the user clicks "Publish store" on the review step */
  onPublished: () => void;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const STEP_IDS = ONBOARDING_STEPS.map(s => s.id);

function stepIndexOf(id: OnboardingStepId) {
  return STEP_IDS.indexOf(id);
}

// ── Progress indicator ─────────────────────────────────────────────────────────

function ProgressBar({ currentIndex, total }: { currentIndex: number; total: number }) {
  return (
    <div className="flex items-center gap-0.5" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemax={total}>
      {ONBOARDING_STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div
            key={step.id}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${done ? 'bg-[#25D366]' : active ? 'bg-[#5B4FE8]' : 'bg-[#ECEDF1]'}`}
          />
        );
      })}
    </div>
  );
}

// ── Main wizard ────────────────────────────────────────────────────────────────

export default function OnboardingWizard({ onPublished }: Props) {
  const [currentStep, setCurrentStep] = useState<OnboardingStepId>('business');
  const store = useOnboardingStore();

  const currentIndex = stepIndexOf(currentStep);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === ONBOARDING_STEPS.length - 1;
  const currentStepMeta = ONBOARDING_STEPS[currentIndex];

  const goTo = (id: OnboardingStepId) => {
    setCurrentStep(id);
    // Scroll the step container to the top
    setTimeout(() => {
      document.getElementById('wa-onboarding-step')?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const goNext = () => {
    if (!isLast) goTo(ONBOARDING_STEPS[currentIndex + 1].id);
  };

  const goPrev = () => {
    if (!isFirst) goTo(ONBOARDING_STEPS[currentIndex - 1].id);
  };

  const handlePublish = () => {
    store.publish();
    onPublished();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'business':
        return <Step1BusinessIdentity data={store.data.businessIdentity} onChange={store.updateBusinessIdentity} />;
      case 'hours':
        return <Step2HoursAvailability data={store.data.hoursAvailability} onChange={store.updateHoursAvailability} />;
      case 'menu':
        return <Step3Menu data={store.data.menuCatalog} onChange={store.updateMenuCatalog} />;
      case 'delivery':
        return <Step4Delivery data={store.data.deliveryFulfillment} onChange={store.updateDeliveryFulfillment} />;
      case 'payment':
        return <Step5Payment data={store.data.paymentPolicy} onChange={store.updatePaymentPolicy} />;
      case 'bot':
        return <Step6BotBehavior data={store.data.botBehavior} onChange={store.updateBotBehavior} />;
      case 'promotions':
        return <Step7Promotions data={store.data.promotions} onChange={store.updatePromotions} />;
      case 'review':
        return (
          <Step8Review
            data={store.data}
            onNavigateToStep={goTo}
            onPublish={handlePublish}
          />
        );
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F7FB] overflow-hidden">
      {/* ── Top header ── */}
      <div className="flex-none bg-white border-b border-[#ECEDF1] px-4 pt-4 pb-3 md:px-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#25D366]">WhatsApp Store setup</p>
            <h2 className="text-xl font-extrabold text-[#16213E] mt-0.5">{currentStepMeta.label}</h2>
          </div>
          <div className="text-right">
            <p className="text-xs font-extrabold text-[#8A8F98]">
              {currentIndex + 1} / {ONBOARDING_STEPS.length}
            </p>
            <p className="text-[10px] font-bold text-[#C0C4CC] mt-0.5">Auto-saved</p>
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar currentIndex={currentIndex} total={ONBOARDING_STEPS.length} />

        {/* Step chips — scrollable on mobile */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
          {ONBOARDING_STEPS.map((step, i) => {
            const done = i < currentIndex;
            const active = i === currentIndex;
            return (
              <button
                key={step.id}
                onClick={() => goTo(step.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex-none transition-all ${
                  active
                    ? 'bg-[#16213E] text-white'
                    : done
                    ? 'bg-[#DCFCE7] text-[#166534]'
                    : 'bg-[#F5F6F8] text-[#8A8F98] hover:bg-[#ECEDF1]'
                }`}
              >
                {done && <CheckCircle2 size={11} />}
                {step.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Step content ── */}
      <div id="wa-onboarding-step" className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6 md:px-8">
          {renderStep()}
        </div>
      </div>

      {/* ── Bottom navigation ── */}
      {currentStep !== 'review' && (
        <div className="flex-none bg-white border-t border-[#ECEDF1] px-4 py-4 md:px-8">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <button
              onClick={goPrev}
              disabled={isFirst}
              className="flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#ECEDF1] text-sm font-bold text-[#8A8F98] hover:bg-[#F5F6F8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} /> Back
            </button>

            <button
              onClick={goNext}
              className="flex-1 flex items-center justify-center gap-2 h-12 rounded-full bg-[#16213E] text-white text-sm font-extrabold hover:bg-[#16213E]/90 active:scale-[0.98] transition-all"
            >
              {currentStep === 'promotions' ? 'Review & publish' : 'Continue'}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* On the review step, show only a "Back" link in the footer */}
      {currentStep === 'review' && (
        <div className="flex-none bg-white border-t border-[#ECEDF1] px-4 py-3 md:px-8">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={goPrev}
              className="flex items-center gap-1.5 text-sm font-bold text-[#8A8F98] hover:text-[#16213E] transition-colors"
            >
              <ChevronLeft size={15} /> Back to Promotions
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
