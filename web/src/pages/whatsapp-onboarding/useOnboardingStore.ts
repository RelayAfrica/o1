import { useState, useCallback, useEffect } from 'react';
import {
  OnboardingData,
  BusinessIdentity,
  HoursAvailability,
  MenuCatalog,
  DeliveryFulfillment,
  PaymentPolicy,
  BotBehavior,
  Promotions,
  DAYS_OF_WEEK,
} from './types';

const STORAGE_KEY = 'relay_wa_onboarding_v1';

function defaultData(): OnboardingData {
  const weeklySchedule = Object.fromEntries(
    DAYS_OF_WEEK.map(d => [
      d,
      {
        open: d !== 'sunday',
        openTime: '08:00',
        closeTime: '21:00',
      },
    ])
  ) as OnboardingData['hoursAvailability']['weeklySchedule'];

  return {
    businessIdentity: {
      restaurantName: '',
      address: '',
      contactPhone: '',
      whatsappNumber: '',
      cuisineType: '',
      logoDataUrl: '',
    },
    hoursAvailability: {
      weeklySchedule,
      holidays: [],
      closedTodayOverride: false,
    },
    menuCatalog: {
      categories: [],
      items: [],
    },
    deliveryFulfillment: {
      deliveryAvailable: true,
      deliveryFeeMode: 'flat',
      flatFee: 0,
      zones: [],
      estimatedDeliveryTime: '',
      coverageDescription: '',
      pickupAvailable: false,
      pickupInstructions: '',
      minimumOrderValue: 0,
    },
    paymentPolicy: {
      cashOnDelivery: false,
      cancellationRefundPolicy: '',
      payoutBankName: '',
      payoutAccountNumber: '',
      payoutAccountName: '',
    },
    botBehavior: {
      tone: 'casual',
      emojiUsage: 'light',
      greetingMessage: "Hi! 👋 Welcome to our store. Browse our menu below and place your order — we'll get it ready for you.",
      faqEntries: [],
      escalation: {
        triggers: ['complaints', 'unmatched'],
        largeOrderThreshold: 50000,
        escalationWhatsApp: '',
      },
    },
    promotions: {
      promos: [],
      enablePushNotifications: false,
    },
    published: false,
  };
}

function load(): OnboardingData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as OnboardingData;
      // Deep-merge with defaults to handle schema additions
      const defaults = defaultData();
      return {
        ...defaults,
        ...parsed,
        hoursAvailability: {
          ...defaults.hoursAvailability,
          ...parsed.hoursAvailability,
        },
        menuCatalog: {
          ...defaults.menuCatalog,
          ...parsed.menuCatalog,
        },
        deliveryFulfillment: {
          ...defaults.deliveryFulfillment,
          ...parsed.deliveryFulfillment,
        },
        paymentPolicy: {
          ...defaults.paymentPolicy,
          ...parsed.paymentPolicy,
        },
        botBehavior: {
          ...defaults.botBehavior,
          ...parsed.botBehavior,
          escalation: {
            ...defaults.botBehavior.escalation,
            ...parsed.botBehavior?.escalation,
          },
        },
        promotions: {
          ...defaults.promotions,
          ...parsed.promotions,
        },
      };
    }
  } catch (_) {
    // ignore parse errors
  }
  return defaultData();
}

function save(data: OnboardingData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {
    // ignore quota errors
  }
}

export function useOnboardingStore() {
  const [data, setData] = useState<OnboardingData>(load);

  // Persist on every change
  useEffect(() => {
    save(data);
  }, [data]);

  const updateBusinessIdentity = useCallback((patch: Partial<BusinessIdentity>) => {
    setData(d => ({ ...d, businessIdentity: { ...d.businessIdentity, ...patch } }));
  }, []);

  const updateHoursAvailability = useCallback((patch: Partial<HoursAvailability>) => {
    setData(d => ({ ...d, hoursAvailability: { ...d.hoursAvailability, ...patch } }));
  }, []);

  const updateMenuCatalog = useCallback((patch: Partial<MenuCatalog>) => {
    setData(d => ({ ...d, menuCatalog: { ...d.menuCatalog, ...patch } }));
  }, []);

  const updateDeliveryFulfillment = useCallback((patch: Partial<DeliveryFulfillment>) => {
    setData(d => ({ ...d, deliveryFulfillment: { ...d.deliveryFulfillment, ...patch } }));
  }, []);

  const updatePaymentPolicy = useCallback((patch: Partial<PaymentPolicy>) => {
    setData(d => ({ ...d, paymentPolicy: { ...d.paymentPolicy, ...patch } }));
  }, []);

  const updateBotBehavior = useCallback((patch: Partial<BotBehavior>) => {
    setData(d => ({ ...d, botBehavior: { ...d.botBehavior, ...patch } }));
  }, []);

  const updatePromotions = useCallback((patch: Partial<Promotions>) => {
    setData(d => ({ ...d, promotions: { ...d.promotions, ...patch } }));
  }, []);

  const publish = useCallback(() => {
    setData(d => ({ ...d, published: true }));
  }, []);

  const reset = useCallback(() => {
    const fresh = defaultData();
    setData(fresh);
    save(fresh);
  }, []);

  return {
    data,
    updateBusinessIdentity,
    updateHoursAvailability,
    updateMenuCatalog,
    updateDeliveryFulfillment,
    updatePaymentPolicy,
    updateBotBehavior,
    updatePromotions,
    publish,
    reset,
  };
}
