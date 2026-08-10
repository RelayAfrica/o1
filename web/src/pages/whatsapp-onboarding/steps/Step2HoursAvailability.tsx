import React, { useState } from 'react';
import { Plus, X, ToggleLeft, ToggleRight, AlertTriangle } from 'lucide-react';
import { HoursAvailability, DayOfWeek, DAYS_OF_WEEK, DAY_LABELS, HolidayException } from '../types';

interface Props {
  data: HoursAvailability;
  onChange: (patch: Partial<HoursAvailability>) => void;
}

const WA = '#25D366';

function TimeInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="time"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="h-9 rounded-xl border border-[#ECEDF1] bg-white px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8] transition-colors min-w-[120px]"
    />
  );
}

export default function Step2HoursAvailability({ data, onChange }: Props) {
  const [newHoliday, setNewHoliday] = useState<Omit<HolidayException, 'id'>>({
    date: '',
    label: '',
    closed: true,
    openTime: '10:00',
    closeTime: '16:00',
  });
  const [showAddHoliday, setShowAddHoliday] = useState(false);

  const updateDay = (day: DayOfWeek, patch: Partial<HoursAvailability['weeklySchedule'][DayOfWeek]>) => {
    onChange({
      weeklySchedule: {
        ...data.weeklySchedule,
        [day]: { ...data.weeklySchedule[day], ...patch },
      },
    });
  };

  const addHoliday = () => {
    if (!newHoliday.date) return;
    const entry: HolidayException = { id: `h${Date.now()}`, ...newHoliday };
    onChange({ holidays: [...data.holidays, entry] });
    setNewHoliday({ date: '', label: '', closed: true, openTime: '10:00', closeTime: '16:00' });
    setShowAddHoliday(false);
  };

  const removeHoliday = (id: string) => {
    onChange({ holidays: data.holidays.filter(h => h.id !== id) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-extrabold text-[#16213E]">Opening hours</h3>
        <p className="mt-1 text-sm text-[#8A8F98]">Customers will see your hours on the storefront. The bot also uses them to show availability.</p>
      </div>

      {/* Manual closed-today override */}
      <div className="flex items-center justify-between rounded-[20px] border border-[#ECEDF1] bg-white px-4 py-4">
        <div>
          <p className="font-bold text-[#16213E]">Close store today</p>
          <p className="mt-0.5 text-xs text-[#8A8F98]">Temporarily marks your store as closed right now, regardless of regular hours</p>
        </div>
        <button onClick={() => onChange({ closedTodayOverride: !data.closedTodayOverride })} className="flex-none ml-4">
          {data.closedTodayOverride
            ? <ToggleRight size={28} className="text-[#E74C3C]" />
            : <ToggleLeft size={28} className="text-[#8A8F98]" />}
        </button>
      </div>

      {data.closedTodayOverride && (
        <div className="rounded-[16px] border border-[#FDECEA] bg-[#FFF5F5] px-4 py-3 flex items-center gap-2">
          <AlertTriangle size={14} className="text-[#E74C3C] flex-none" />
          <p className="text-xs font-bold text-[#E74C3C]">Store is currently marked as closed for today</p>
        </div>
      )}

      {/* Weekly schedule */}
      <div className="space-y-2">
        <p className="text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">Weekly schedule</p>
        {DAYS_OF_WEEK.map(day => {
          const sched = data.weeklySchedule[day];
          return (
            <div key={day} className="flex items-center gap-3 rounded-[18px] border border-[#ECEDF1] bg-white px-4 py-3">
              {/* Day label + open toggle */}
              <div className="flex items-center gap-2 flex-none" style={{ minWidth: 110 }}>
                <button onClick={() => updateDay(day, { open: !sched.open })} className="flex-none">
                  {sched.open
                    ? <ToggleRight size={24} color={WA} />
                    : <ToggleLeft size={24} className="text-[#C0C4CC]" />}
                </button>
                <span className={`text-sm font-bold ${sched.open ? 'text-[#16213E]' : 'text-[#C0C4CC]'}`}>
                  {DAY_LABELS[day]}
                </span>
              </div>

              {sched.open ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <TimeInput value={sched.openTime} onChange={v => updateDay(day, { openTime: v })} />
                  <span className="text-xs font-bold text-[#8A8F98]">to</span>
                  <TimeInput value={sched.closeTime} onChange={v => updateDay(day, { closeTime: v })} />
                </div>
              ) : (
                <span className="text-xs font-bold text-[#C0C4CC]">Closed</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Public holidays / exceptions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#8A8F98]">Holiday exceptions</p>
            <p className="text-xs text-[#8A8F98] mt-0.5">Override hours for specific dates (public holidays, special events)</p>
          </div>
          <button
            onClick={() => setShowAddHoliday(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#16213E] text-white text-xs font-bold hover:bg-[#16213E]/90 transition-colors"
          >
            <Plus size={12} /> Add date
          </button>
        </div>

        {showAddHoliday && (
          <div className="rounded-[20px] border border-[#ECEDF1] bg-[#F8F9FB] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-extrabold text-[#16213E]">New exception</p>
              <button onClick={() => setShowAddHoliday(false)} className="w-7 h-7 rounded-full bg-[#F5F6F8] flex items-center justify-center">
                <X size={13} className="text-[#8A8F98]" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#8A8F98]">Date *</label>
                <input
                  type="date"
                  value={newHoliday.date}
                  onChange={e => setNewHoliday(p => ({ ...p, date: e.target.value }))}
                  className="w-full h-10 rounded-xl border border-[#ECEDF1] bg-white px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#8A8F98]">Label</label>
                <input
                  value={newHoliday.label}
                  onChange={e => setNewHoliday(p => ({ ...p, label: e.target.value }))}
                  placeholder="e.g. Christmas Day"
                  className="w-full h-10 rounded-xl border border-[#ECEDF1] bg-white px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8] placeholder:text-[#C0C4CC]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setNewHoliday(p => ({ ...p, closed: true }))}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${newHoliday.closed ? 'bg-[#16213E] text-white' : 'bg-[#F5F6F8] text-[#8A8F98]'}`}
              >
                Closed
              </button>
              <button
                onClick={() => setNewHoliday(p => ({ ...p, closed: false }))}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${!newHoliday.closed ? 'bg-[#16213E] text-white' : 'bg-[#F5F6F8] text-[#8A8F98]'}`}
              >
                Custom hours
              </button>
            </div>

            {!newHoliday.closed && (
              <div className="flex items-center gap-2">
                <input type="time" value={newHoliday.openTime} onChange={e => setNewHoliday(p => ({ ...p, openTime: e.target.value }))}
                  className="h-9 rounded-xl border border-[#ECEDF1] bg-white px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8]" />
                <span className="text-xs font-bold text-[#8A8F98]">to</span>
                <input type="time" value={newHoliday.closeTime} onChange={e => setNewHoliday(p => ({ ...p, closeTime: e.target.value }))}
                  className="h-9 rounded-xl border border-[#ECEDF1] bg-white px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8]" />
              </div>
            )}

            <button
              onClick={addHoliday}
              disabled={!newHoliday.date}
              className="w-full h-10 rounded-full bg-[#16213E] text-white text-sm font-bold disabled:opacity-40 hover:bg-[#16213E]/90 transition-colors"
            >
              Add exception
            </button>
          </div>
        )}

        {data.holidays.length === 0 && !showAddHoliday && (
          <div className="rounded-[18px] border border-dashed border-[#ECEDF1] bg-[#F8F9FB] py-6 text-center">
            <p className="text-sm text-[#8A8F98] font-semibold">No holiday exceptions yet</p>
          </div>
        )}

        {data.holidays.map(h => (
          <div key={h.id} className="flex items-center justify-between rounded-[18px] border border-[#ECEDF1] bg-white px-4 py-3">
            <div>
              <p className="text-sm font-bold text-[#16213E]">{h.label || h.date}</p>
              <p className="text-xs text-[#8A8F98] font-semibold">
                {h.date}
                {' · '}
                {h.closed ? 'Closed' : `${h.openTime} – ${h.closeTime}`}
              </p>
            </div>
            <button onClick={() => removeHoliday(h.id)} className="w-7 h-7 rounded-full bg-[#F5F6F8] flex items-center justify-center ml-2">
              <X size={13} className="text-[#8A8F98]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
