// ─── WhatsApp Store Onboarding — TypeScript Types ────────────────────────────
// These types are designed to be serializable for a future
// POST /api/restaurants/:id/onboarding endpoint.

// ── Step 1: Business Identity ─────────────────────────────────────────────────
export interface BusinessIdentity {
  restaurantName: string;
  address: string;
  contactPhone: string;
  whatsappNumber: string;
  cuisineType: string;
  /** base64 data URL or empty string */
  logoDataUrl: string;
}

// ── Step 2: Hours & Availability ─────────────────────────────────────────────
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface DaySchedule {
  open: boolean;
  openTime: string;   // "HH:MM" 24h format
  closeTime: string;  // "HH:MM" 24h format
}

export interface HolidayException {
  id: string;
  date: string;        // ISO date string YYYY-MM-DD
  label: string;
  closed: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface HoursAvailability {
  weeklySchedule: Record<DayOfWeek, DaySchedule>;
  holidays: HolidayException[];
  closedTodayOverride: boolean;
}

// ── Step 3: Menu / Inventory ──────────────────────────────────────────────────
export type AllergenTag =
  | 'nuts'
  | 'dairy'
  | 'gluten'
  | 'shellfish'
  | 'eggs'
  | 'soy'
  | 'other';

export interface ItemOptionChoice {
  id: string;
  label: string;
  /** additional price in base currency units (0 = no extra charge) */
  priceModifier: number;
}

export interface ItemOptionGroup {
  id: string;
  name: string;          // e.g. "Spice level", "Size"
  required: boolean;
  choices: ItemOptionChoice[];
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  /** Up to three base64 data URLs for the item */
  photoDataUrls: string[];
  inStock: boolean;
  allergens: AllergenTag[];
  allergenOther: string;
  optionGroups: ItemOptionGroup[];
}

export interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  /** display order index */
  order: number;
}

export interface MenuCatalog {
  categories: MenuCategory[];
  items: MenuItem[];
}

// ── Step 4: Delivery & Fulfillment ────────────────────────────────────────────
export type DeliveryFeeMode = 'flat' | 'by_zone';

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
}

export interface DeliveryFulfillment {
  deliveryAvailable: boolean;
  deliveryFeeMode: DeliveryFeeMode;
  flatFee: number;
  zones: DeliveryZone[];
  estimatedDeliveryTime: string;   // e.g. "30-45 mins"
  coverageDescription: string;     // free text areas / radius description
  pickupAvailable: boolean;
  pickupInstructions: string;
  minimumOrderValue: number;
}

// ── Step 5: Payment & Order Policy ───────────────────────────────────────────
export interface PaymentPolicy {
  cashOnDelivery: boolean;
  cancellationRefundPolicy: string;
  /** Only populated if no existing payout settings found elsewhere in the app */
  payoutBankName: string;
  payoutAccountNumber: string;
  payoutAccountName: string;
}

// ── Step 6: Bot Behavior & FAQ ────────────────────────────────────────────────
export type BotTone = 'formal' | 'casual';
export type EmojiUsage = 'none' | 'light' | 'frequent';
export type EscalationTrigger =
  | 'complaints'
  | 'allergy_questions'
  | 'large_orders'
  | 'unmatched';

export interface FAQEntry {
  id: string;
  /** Multiple trigger phrases, separated by newline or comma */
  triggerPhrases: string[];
  answer: string;
}

export interface EscalationRule {
  triggers: EscalationTrigger[];
  largeOrderThreshold: number;
  escalationWhatsApp: string;
}

export interface BotBehavior {
  tone: BotTone;
  emojiUsage: EmojiUsage;
  greetingMessage: string;
  faqEntries: FAQEntry[];
  escalation: EscalationRule;
}

// ── Step 7: Promotions ────────────────────────────────────────────────────────
export interface PromoEntry {
  id: string;
  text: string;
}

export interface Promotions {
  promos: PromoEntry[];
  enablePushNotifications: boolean;
}

// ── Root Onboarding Data ──────────────────────────────────────────────────────
export interface OnboardingData {
  businessIdentity: BusinessIdentity;
  hoursAvailability: HoursAvailability;
  menuCatalog: MenuCatalog;
  deliveryFulfillment: DeliveryFulfillment;
  paymentPolicy: PaymentPolicy;
  botBehavior: BotBehavior;
  promotions: Promotions;
  published: boolean;
}

export type OnboardingStepId =
  | 'business'
  | 'hours'
  | 'menu'
  | 'delivery'
  | 'payment'
  | 'bot'
  | 'promotions'
  | 'review';

export interface OnboardingStep {
  id: OnboardingStepId;
  label: string;
  shortLabel: string;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  { id: 'business',   label: 'Business identity',    shortLabel: 'Business' },
  { id: 'hours',      label: 'Hours & availability', shortLabel: 'Hours' },
  { id: 'menu',       label: 'Menu & inventory',     shortLabel: 'Menu' },
  { id: 'delivery',   label: 'Delivery & fulfillment', shortLabel: 'Delivery' },
  { id: 'payment',    label: 'Payment & policy',     shortLabel: 'Payment' },
  { id: 'bot',        label: 'Bot behavior & FAQ',   shortLabel: 'Bot' },
  { id: 'promotions', label: 'Promotions',           shortLabel: 'Promos' },
  { id: 'review',     label: 'Review & confirm',     shortLabel: 'Review' },
];

export const ALLERGEN_LABELS: Record<AllergenTag, string> = {
  nuts: 'Tree nuts',
  dairy: 'Dairy',
  gluten: 'Gluten',
  shellfish: 'Shellfish',
  eggs: 'Eggs',
  soy: 'Soy',
  other: 'Other',
};

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
];

export const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};
