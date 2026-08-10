import React, { useState } from 'react';
import { Plus, X, Pencil, Trash2, ToggleLeft, ToggleRight, GripVertical, ChevronDown, ChevronUp, Upload } from 'lucide-react';
import {
  MenuCatalog, MenuCategory, MenuItem, ItemOptionGroup, ItemOptionChoice, AllergenTag, ALLERGEN_LABELS
} from '../types';

interface Props {
  data: MenuCatalog;
  onChange: (patch: Partial<MenuCatalog>) => void;
}

type SubTab = 'categories' | 'items';

const EMOJIS = ['🍽️', '🥤', '🥗', '🍕', '🍗', '🍔', '🌮', '🍜', '🎂', '🍰', '🍹', '🥩', '🥪', '🍱', '🍣', '🥘', '🍲', '🍛'];
const ALLERGEN_LIST: AllergenTag[] = ['nuts', 'dairy', 'gluten', 'shellfish', 'eggs', 'soy', 'other'];

const defaultItem = (): Omit<MenuItem, 'id'> => ({
  categoryId: '',
  name: '',
  price: 0,
  description: '',
  photoDataUrl: '',
  inStock: true,
  allergens: [],
  allergenOther: '',
  optionGroups: [],
});

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-[20px] border border-dashed border-[#ECEDF1] bg-[#F8F9FB] py-10 text-center">
      <p className="text-sm font-semibold text-[#8A8F98]">{label}</p>
    </div>
  );
}

export default function Step3Menu({ data, onChange }: Props) {
  const [subTab, setSubTab] = useState<SubTab>('categories');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', emoji: '🍽️' });
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>(defaultItem());
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // ── Categories ──────────────────────────────────────────────────────────────
  const addCategory = () => {
    if (!newCategory.name.trim()) return;
    const cat: MenuCategory = {
      id: `cat${Date.now()}`,
      name: newCategory.name.trim(),
      emoji: newCategory.emoji,
      order: data.categories.length,
    };
    onChange({ categories: [...data.categories, cat] });
    setNewCategory({ name: '', emoji: '🍽️' });
    setShowAddCategory(false);
  };

  const deleteCategory = (id: string) => {
    onChange({
      categories: data.categories.filter(c => c.id !== id),
      items: data.items.filter(i => i.categoryId !== id),
    });
  };

  const startEditCategory = (cat: MenuCategory) => {
    setEditingCategoryId(cat.id);
    setNewCategory({ name: cat.name, emoji: cat.emoji });
  };

  const saveEditCategory = (id: string) => {
    onChange({
      categories: data.categories.map(c =>
        c.id === id ? { ...c, name: newCategory.name, emoji: newCategory.emoji } : c
      ),
    });
    setEditingCategoryId(null);
    setNewCategory({ name: '', emoji: '🍽️' });
  };

  // ── Items ────────────────────────────────────────────────────────────────────
  const addItem = () => {
    if (!newItem.name.trim() || !newItem.price || !newItem.categoryId) return;
    const item: MenuItem = { id: `item${Date.now()}`, ...newItem };
    onChange({ items: [...data.items, item] });
    setNewItem(defaultItem());
    setShowAddItem(false);
  };

  const deleteItem = (id: string) => {
    onChange({ items: data.items.filter(i => i.id !== id) });
  };

  const toggleStock = (id: string) => {
    onChange({ items: data.items.map(i => i.id === id ? { ...i, inStock: !i.inStock } : i) });
  };

  const startEditItem = (item: MenuItem) => {
    setEditingItemId(item.id);
    setNewItem({ ...item });
    setShowAddItem(true);
  };

  const saveEditItem = () => {
    if (!newItem.name.trim() || !newItem.price || !newItem.categoryId) return;
    onChange({ items: data.items.map(i => i.id === editingItemId ? { id: editingItemId, ...newItem } : i) });
    setEditingItemId(null);
    setNewItem(defaultItem());
    setShowAddItem(false);
  };

  const toggleAllergen = (allergen: AllergenTag) => {
    const cur = newItem.allergens;
    setNewItem(p => ({
      ...p,
      allergens: cur.includes(allergen) ? cur.filter(a => a !== allergen) : [...cur, allergen],
    }));
  };

  const addOptionGroup = () => {
    const group: ItemOptionGroup = {
      id: `og${Date.now()}`,
      name: '',
      required: false,
      choices: [{ id: `ch${Date.now()}`, label: '', priceModifier: 0 }],
    };
    setNewItem(p => ({ ...p, optionGroups: [...p.optionGroups, group] }));
  };

  const updateOptionGroup = (gid: string, patch: Partial<ItemOptionGroup>) => {
    setNewItem(p => ({
      ...p,
      optionGroups: p.optionGroups.map(g => g.id === gid ? { ...g, ...patch } : g),
    }));
  };

  const addChoice = (gid: string) => {
    const choice: ItemOptionChoice = { id: `ch${Date.now()}`, label: '', priceModifier: 0 };
    setNewItem(p => ({
      ...p,
      optionGroups: p.optionGroups.map(g => g.id === gid ? { ...g, choices: [...g.choices, choice] } : g),
    }));
  };

  const updateChoice = (gid: string, cid: string, patch: Partial<ItemOptionChoice>) => {
    setNewItem(p => ({
      ...p,
      optionGroups: p.optionGroups.map(g =>
        g.id === gid ? { ...g, choices: g.choices.map(c => c.id === cid ? { ...c, ...patch } : c) } : g
      ),
    }));
  };

  const removeChoice = (gid: string, cid: string) => {
    setNewItem(p => ({
      ...p,
      optionGroups: p.optionGroups.map(g =>
        g.id === gid ? { ...g, choices: g.choices.filter(c => c.id !== cid) } : g
      ),
    }));
  };

  const removeOptionGroup = (gid: string) => {
    setNewItem(p => ({ ...p, optionGroups: p.optionGroups.filter(g => g.id !== gid) }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setNewItem(p => ({ ...p, photoDataUrl: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const itemsByCategory = (catId: string) => data.items.filter(i => i.categoryId === catId);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-extrabold text-[#16213E]">Menu & inventory</h3>
        <p className="mt-1 text-sm text-[#8A8F98]">Set up your categories and items. Customers will browse this catalog on WhatsApp.</p>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2 border-b border-[#ECEDF1] pb-3">
        {(['categories', 'items'] as SubTab[]).map(t => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all capitalize ${subTab === t ? 'bg-[#16213E] text-white' : 'bg-[#F5F6F8] text-[#8A8F98] hover:bg-[#ECEDF1]'}`}
          >
            {t === 'categories' ? `Categories (${data.categories.length})` : `Items (${data.items.length})`}
          </button>
        ))}
      </div>

      {/* ── Categories tab ── */}
      {subTab === 'categories' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">Menu categories</p>
            <button
              onClick={() => { setShowAddCategory(true); setEditingCategoryId(null); setNewCategory({ name: '', emoji: '🍽️' }); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#16213E] text-white text-xs font-bold hover:bg-[#16213E]/90 transition-colors"
            >
              <Plus size={12} /> Add category
            </button>
          </div>

          {(showAddCategory || editingCategoryId) && (
            <div className="rounded-[20px] border border-[#ECEDF1] bg-[#F8F9FB] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-extrabold text-[#16213E]">{editingCategoryId ? 'Edit category' : 'New category'}</p>
                <button onClick={() => { setShowAddCategory(false); setEditingCategoryId(null); }} className="w-7 h-7 rounded-full bg-white border border-[#ECEDF1] flex items-center justify-center">
                  <X size={13} className="text-[#8A8F98]" />
                </button>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#8A8F98]">Name *</label>
                <input
                  value={newCategory.name}
                  onChange={e => setNewCategory(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Starters"
                  className="w-full h-10 rounded-xl border border-[#ECEDF1] bg-white px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8] placeholder:text-[#C0C4CC]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#8A8F98]">Emoji icon</label>
                <div className="flex gap-2 flex-wrap">
                  {EMOJIS.map(e => (
                    <button
                      key={e}
                      onClick={() => setNewCategory(p => ({ ...p, emoji: e }))}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${newCategory.emoji === e ? 'bg-[#5B4FE8]/15 ring-2 ring-[#5B4FE8]' : 'bg-white border border-[#ECEDF1] hover:bg-[#F5F6F8]'}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={editingCategoryId ? () => saveEditCategory(editingCategoryId) : addCategory}
                disabled={!newCategory.name.trim()}
                className="w-full h-10 rounded-full bg-[#16213E] text-white text-sm font-bold disabled:opacity-40 hover:bg-[#16213E]/90 transition-colors"
              >
                {editingCategoryId ? 'Save changes' : 'Add category'}
              </button>
            </div>
          )}

          {data.categories.length === 0 && !showAddCategory && (
            <EmptyState label="No categories yet. Add one to start building your menu." />
          )}

          {data.categories.map(cat => (
            <div key={cat.id} className="flex items-center gap-3 rounded-[18px] border border-[#ECEDF1] bg-white px-4 py-3">
              <GripVertical size={14} className="text-[#C0C4CC] flex-none cursor-grab" />
              <span className="text-xl flex-none">{cat.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#16213E] truncate">{cat.name}</p>
                <p className="text-xs text-[#8A8F98]">{itemsByCategory(cat.id).length} items</p>
              </div>
              <button onClick={() => startEditCategory(cat)} className="w-8 h-8 rounded-full bg-[#F5F6F8] flex items-center justify-center hover:bg-[#ECEDF1] transition-colors">
                <Pencil size={13} className="text-[#8A8F98]" />
              </button>
              <button onClick={() => deleteCategory(cat.id)} className="w-8 h-8 rounded-full bg-[#FFF0F0] flex items-center justify-center hover:bg-[#FFE0E0] transition-colors">
                <Trash2 size={13} className="text-[#E74C3C]" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Items tab ── */}
      {subTab === 'items' && (
        <div className="space-y-3">
          {data.categories.length === 0 && (
            <div className="rounded-[16px] border border-[#FFF3CD] bg-[#FFFBEA] px-4 py-3">
              <p className="text-xs font-bold text-[#856404]">Add at least one category before adding items.</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">Menu items</p>
            <button
              onClick={() => { setShowAddItem(true); setEditingItemId(null); setNewItem(defaultItem()); }}
              disabled={data.categories.length === 0}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#16213E] text-white text-xs font-bold hover:bg-[#16213E]/90 transition-colors disabled:opacity-40"
            >
              <Plus size={12} /> Add item
            </button>
          </div>

          {/* Add/Edit item form */}
          {showAddItem && (
            <div className="rounded-[20px] border border-[#ECEDF1] bg-[#F8F9FB] p-4 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-extrabold text-[#16213E]">{editingItemId ? 'Edit item' : 'New item'}</p>
                <button onClick={() => { setShowAddItem(false); setEditingItemId(null); }} className="w-7 h-7 rounded-full bg-white border border-[#ECEDF1] flex items-center justify-center">
                  <X size={13} className="text-[#8A8F98]" />
                </button>
              </div>

              {/* Photo */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#8A8F98]">Photo</label>
                <div className="flex items-center gap-3">
                  <label className="w-16 h-16 rounded-[14px] border-2 border-dashed border-[#ECEDF1] bg-white flex items-center justify-center cursor-pointer hover:border-[#5B4FE8] overflow-hidden flex-none">
                    {newItem.photoDataUrl ? (
                      <img src={newItem.photoDataUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Upload size={16} className="text-[#C0C4CC]" />
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                  {newItem.photoDataUrl && (
                    <button onClick={() => setNewItem(p => ({ ...p, photoDataUrl: '' }))} className="text-xs text-[#E74C3C] font-semibold">Remove</button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-[#8A8F98]">Name *</label>
                  <input
                    value={newItem.name}
                    onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Jollof Rice Combo"
                    className="w-full h-10 rounded-xl border border-[#ECEDF1] bg-white px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8] placeholder:text-[#C0C4CC]"
                  />
                </div>
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-[#8A8F98]">Price (₦) *</label>
                  <input
                    type="number"
                    min="0"
                    value={newItem.price || ''}
                    onChange={e => setNewItem(p => ({ ...p, price: parseFloat(e.target.value) || 0 }))}
                    placeholder="0"
                    className="w-full h-10 rounded-xl border border-[#ECEDF1] bg-white px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8] placeholder:text-[#C0C4CC]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#8A8F98]">Category *</label>
                <select
                  value={newItem.categoryId}
                  onChange={e => setNewItem(p => ({ ...p, categoryId: e.target.value }))}
                  className="w-full h-10 rounded-xl border border-[#ECEDF1] bg-white px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8] text-[#16213E]"
                >
                  <option value="">Select category</option>
                  {data.categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#8A8F98]">Description</label>
                <textarea
                  value={newItem.description}
                  onChange={e => setNewItem(p => ({ ...p, description: e.target.value }))}
                  placeholder="Brief description for customers..."
                  rows={2}
                  className="w-full rounded-xl border border-[#ECEDF1] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#5B4FE8] resize-none placeholder:text-[#C0C4CC]"
                />
              </div>

              {/* Allergens */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#8A8F98]">Allergens</label>
                <div className="flex flex-wrap gap-2">
                  {ALLERGEN_LIST.map(a => (
                    <button
                      key={a}
                      onClick={() => toggleAllergen(a)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${newItem.allergens.includes(a) ? 'bg-[#FFF3CD] text-[#856404] border border-[#FFD900]/40' : 'bg-white border border-[#ECEDF1] text-[#8A8F98]'}`}
                    >
                      {ALLERGEN_LABELS[a]}
                    </button>
                  ))}
                </div>
                {newItem.allergens.includes('other') && (
                  <input
                    value={newItem.allergenOther}
                    onChange={e => setNewItem(p => ({ ...p, allergenOther: e.target.value }))}
                    placeholder="Describe other allergens..."
                    className="w-full h-9 rounded-xl border border-[#ECEDF1] bg-white px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8] placeholder:text-[#C0C4CC]"
                  />
                )}
              </div>

              {/* Option groups */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#8A8F98]">Customisation options</label>
                  <button onClick={addOptionGroup} className="text-xs font-bold text-[#5B4FE8] hover:text-[#4A40D4]">
                    + Add group
                  </button>
                </div>
                {newItem.optionGroups.map(group => (
                  <div key={group.id} className="rounded-[16px] border border-[#ECEDF1] bg-white p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        value={group.name}
                        onChange={e => updateOptionGroup(group.id, { name: e.target.value })}
                        placeholder="Group name e.g. Spice level"
                        className="flex-1 h-9 rounded-xl border border-[#ECEDF1] bg-[#F8F9FB] px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8] placeholder:text-[#C0C4CC]"
                      />
                      <label className="flex items-center gap-1.5 text-xs font-bold text-[#8A8F98]">
                        <input
                          type="checkbox"
                          checked={group.required}
                          onChange={e => updateOptionGroup(group.id, { required: e.target.checked })}
                          className="rounded"
                        />
                        Required
                      </label>
                      <button onClick={() => removeOptionGroup(group.id)} className="w-7 h-7 flex items-center justify-center">
                        <X size={13} className="text-[#E74C3C]" />
                      </button>
                    </div>
                    {group.choices.map(c => (
                      <div key={c.id} className="flex items-center gap-2">
                        <input
                          value={c.label}
                          onChange={e => updateChoice(group.id, c.id, { label: e.target.value })}
                          placeholder="Choice label"
                          className="flex-1 h-8 rounded-lg border border-[#ECEDF1] bg-[#F8F9FB] px-2 text-xs font-semibold outline-none focus:border-[#5B4FE8] placeholder:text-[#C0C4CC]"
                        />
                        <span className="text-xs text-[#8A8F98]">+₦</span>
                        <input
                          type="number"
                          min="0"
                          value={c.priceModifier || ''}
                          onChange={e => updateChoice(group.id, c.id, { priceModifier: parseFloat(e.target.value) || 0 })}
                          placeholder="0"
                          className="w-20 h-8 rounded-lg border border-[#ECEDF1] bg-[#F8F9FB] px-2 text-xs font-semibold outline-none focus:border-[#5B4FE8] placeholder:text-[#C0C4CC]"
                        />
                        {group.choices.length > 1 && (
                          <button onClick={() => removeChoice(group.id, c.id)}>
                            <X size={12} className="text-[#C0C4CC]" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button onClick={() => addChoice(group.id)} className="text-xs font-bold text-[#5B4FE8] hover:text-[#4A40D4]">
                      + Add choice
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={editingItemId ? saveEditItem : addItem}
                disabled={!newItem.name.trim() || !newItem.price || !newItem.categoryId}
                className="w-full h-11 rounded-full bg-[#16213E] text-white text-sm font-bold disabled:opacity-40 hover:bg-[#16213E]/90 transition-colors"
              >
                {editingItemId ? 'Save changes' : 'Add item'}
              </button>
            </div>
          )}

          {data.items.length === 0 && !showAddItem && (
            <EmptyState label="No menu items yet. Add categories first, then add items." />
          )}

          {/* Item list */}
          {data.items.map(item => {
            const cat = data.categories.find(c => c.id === item.categoryId);
            const isExpanded = expandedItemId === item.id;
            return (
              <div key={item.id} className="rounded-[20px] border border-[#ECEDF1] bg-white overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3">
                  {item.photoDataUrl ? (
                    <img src={item.photoDataUrl} alt="" className="w-11 h-11 rounded-[12px] object-cover flex-none" />
                  ) : (
                    <div className="w-11 h-11 rounded-[12px] bg-[#F5F6F8] flex items-center justify-center flex-none text-lg">
                      {cat?.emoji ?? '🍽️'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#16213E] truncate">{item.name}</span>
                    </div>
                    <div className="text-xs text-[#8A8F98] font-semibold">
                      ₦{item.price.toLocaleString()} · {cat?.name ?? 'Uncategorised'}
                    </div>
                  </div>
                  {/* Quick stock toggle */}
                  <button onClick={() => toggleStock(item.id)} className="flex-none" title="Toggle in stock">
                    {item.inStock
                      ? <ToggleRight size={24} className="text-[#25D366]" />
                      : <ToggleLeft size={24} className="text-[#C0C4CC]" />}
                  </button>
                  <button onClick={() => setExpandedItemId(isExpanded ? null : item.id)} className="flex-none">
                    {isExpanded ? <ChevronUp size={16} className="text-[#8A8F98]" /> : <ChevronDown size={16} className="text-[#8A8F98]" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="border-t border-[#F5F6F8] px-4 py-3 space-y-2">
                    {item.description && <p className="text-xs text-[#8A8F98]">{item.description}</p>}
                    {item.allergens.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap">
                        {item.allergens.map(a => (
                          <span key={a} className="px-2 py-0.5 bg-[#FFF3CD] text-[#856404] text-[10px] font-bold rounded-full">
                            {ALLERGEN_LABELS[a]}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => startEditItem(item)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#ECEDF1] text-xs font-bold text-[#16213E] hover:bg-[#F5F6F8]"
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#FDECEA] bg-[#FFF5F5] text-xs font-bold text-[#E74C3C]"
                      >
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
