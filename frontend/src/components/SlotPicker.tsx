import React, { useState, useEffect } from 'react';
import type { Slot } from '../types';
import {  formatTime } from '../utils/formatters';
import { experienceService } from '../services/experienceService';

interface SlotPickerProps {
    experienceId: string;
    onSlotSelect: (slot: Slot) => void;
    selectedSlotId?: string;
}

const SlotPicker: React.FC<SlotPickerProps> = ({
                                                   experienceId,
                                                   onSlotSelect,
                                                   selectedSlotId,
                                               }) => {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string>('');

    // Get unique dates from slots
    const uniqueDates = [...new Set(slots.map((slot) => slot.date))];

    useEffect(() => {
        loadSlots();
    }, [experienceId]);

    const loadSlots = async () => {
        try {
            setLoading(true);
            const data = await experienceService.getSlots(experienceId);
            setSlots(data);
            if (data.length > 0) {
                setSelectedDate(data[0].date);
            }
        } catch (error) {
            console.error('Failed to load slots:', error);
        } finally {
            setLoading(false);
        }
    };

    const slotsForSelectedDate = slots.filter((slot) => slot.date === selectedDate);

    if (loading) {
        return <div className="text-center py-8">Loading availability...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Date Selection */}
            <div>
                <h3 className="text-lg font-semibold text-black mb-3">Select Date</h3>
                <div className="flex flex-wrap gap-2">
                    {uniqueDates.map((date) => {
                        const dateObj = new Date(date);
                        const isSelected = date === selectedDate;
                        return (
                            <button
                                key={date}
                                onClick={() => setSelectedDate(date)}
                                className={`px-4 py-2 rounded-pill font-medium transition-all ${
                                    isSelected
                                        ? 'bg-secondary text-white shadow-button'
                                        : 'bg-gray-100 text-black hover:bg-gray-200'
                                }`}
                            >
                                {dateObj.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Time Selection */}
            <div>
                <h3 className="text-lg font-semibold text-black mb-3">Select Time</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {slotsForSelectedDate.map((slot) => {
                        const isSelected = slot.id === selectedSlotId;
                        const isSoldOut = slot.availableSpots === 0;

                        return (
                            <button
                                key={slot.id}
                                onClick={() => !isSoldOut && onSlotSelect(slot)}
                                disabled={isSoldOut}
                                className={`p-3 rounded-button font-medium transition-all ${
                                    isSoldOut
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : isSelected
                                            ? 'bg-secondary text-white shadow-button'
                                            : 'bg-gray-100 text-black hover:bg-gray-200 border-2 border-transparent hover:border-secondary'
                                }`}
                            >
                                <div className="text-center">
                                    <p className="font-semibold">{formatTime(slot.startTime)}</p>
                                    {isSoldOut ? (
                                        <p className="text-xs mt-1">Sold Out</p>
                                    ) : (
                                        <p className="text-xs mt-1">{slot.availableSpots} spots left</p>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SlotPicker;