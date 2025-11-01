import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, Star, Check } from 'lucide-react';
import SlotPicker from '../components/SlotPicker';
import { PageLoader } from '../components/Loading';
import type { Experience, Slot } from '../types';
import { experienceService } from '../services/experienceService';
import { formatPrice } from '../utils/formatters';
import { useToast } from '../hooks/useToast';

const Details: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [experience, setExperience] = useState<Experience | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (id) {
            loadExperience();
        }
    }, [id]);

    const loadExperience = async () => {
        try {
            setLoading(true);
            const data = await experienceService.getExperienceById(id!);
            setExperience(data);
        } catch (error) {
            console.error('Failed to load experience:', error);
            showToast('Failed to load experience details', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (change: number) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= (selectedSlot?.availableSpots || experience?.maxGroupSize || 10)) {
            setQuantity(newQuantity);
        }
    };

    const calculateTotal = () => {
        if (!experience || !selectedSlot) return 0;
        const subtotal = selectedSlot.price * quantity;
        const taxes = subtotal * 0.18; // 18% GST
        return subtotal + taxes;
    };

    const handleConfirm = () => {
        if (!selectedSlot) {
            showToast('Please select a date and time slot', 'warning');
            return;
        }

        navigate('/checkout', {
            state: {
                experience,
                slot: selectedSlot,
                quantity,
                totalPrice: calculateTotal(),
            },
        });
    };

    if (loading) return <PageLoader />;
    if (!experience) return <div>Experience not found</div>;

    const subtotal = selectedSlot ? selectedSlot.price * quantity : 0;
    const taxes = subtotal * 0.18;
    const total = subtotal + taxes;

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Image Gallery */}
                <div className="mb-8">
                    <div className="relative h-96 rounded-card overflow-hidden mb-4">
                        <img
                            src={experience.images[currentImageIndex]}
                            alt={experience.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Thumbnail Navigation */}
                    {experience.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {experience.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-button overflow-hidden border-2 transition-all ${
                                        idx === currentImageIndex ? 'border-secondary' : 'border-transparent'
                                    }`}
                                >
                                    <img src={img} alt={`${experience.title} ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title & Rating */}
                        <div>
                            <h1 className="text-4xl font-bold text-black mb-3">{experience.title}</h1>
                            <div className="flex items-center gap-4 text-text-secondary">
                                <div className="flex items-center gap-1">
                                    <MapPin size={18} />
                                    <span>{experience.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold text-black">{experience.rating}</span>
                                    <span>({experience.reviews} reviews)</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-gray-50 rounded-card p-6">
                            <h2 className="text-xl font-semibold text-black mb-3">About this experience</h2>
                            <p className="text-text-secondary leading-relaxed">{experience.description}</p>
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-card">
                                <Clock className="text-secondary" size={24} />
                                <div>
                                    <p className="text-xs text-text-muted">Duration</p>
                                    <p className="font-semibold text-black">{experience.duration}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-card">
                                <Users className="text-secondary" size={24} />
                                <div>
                                    <p className="text-xs text-text-muted">Group Size</p>
                                    <p className="font-semibold text-black">Max {experience.maxGroupSize}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-card">
                                <MapPin className="text-secondary" size={24} />
                                <div>
                                    <p className="text-xs text-text-muted">Location</p>
                                    <p className="font-semibold text-black">{experience.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Highlights */}
                        {experience.highlights && experience.highlights.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-black mb-3">Highlights</h2>
                                <ul className="space-y-2">
                                    {experience.highlights.map((highlight, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <Check className="text-success flex-shrink-0 mt-1" size={18} />
                                            <span className="text-text-secondary">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* What's Included */}
                        {experience.included && experience.included.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-black mb-3">What's Included</h2>
                                <ul className="space-y-2">
                                    {experience.included.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <Check className="text-success flex-shrink-0 mt-1" size={18} />
                                            <span className="text-text-secondary">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Slot Picker */}
                        <div className="bg-gray-50 rounded-card p-6">
                            <SlotPicker
                                experienceId={experience.id}
                                onSlotSelect={setSelectedSlot}
                                selectedSlotId={selectedSlot?.id}
                            />
                        </div>
                    </div>

                    {/* Right Column - Booking Summary (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border-2 border-gray-200 rounded-card p-6 sticky top-24 shadow-card">
                            <h3 className="text-2xl font-bold text-black mb-4">Booking Summary</h3>

                            {/* Price */}
                            <div className="mb-6">
                                <p className="text-text-secondary text-sm mb-1">Starts at</p>
                                <p className="text-3xl font-bold text-black">{formatPrice(experience.price)}</p>
                                <p className="text-text-muted text-xs">per person</p>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-black mb-2">Number of Guests</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        className="w-10 h-10 rounded-button bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 font-bold transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="text-2xl font-bold text-black w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= (selectedSlot?.availableSpots || experience.maxGroupSize)}
                                        className="w-10 h-10 rounded-button bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 font-bold transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            {selectedSlot && (
                                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                    <div className="flex justify-between text-text-secondary">
                                        <span>Subtotal ({quantity} × {formatPrice(selectedSlot.price)})</span>
                                        <span className="font-semibold">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-text-secondary">
                                        <span>Taxes & Fees (18%)</span>
                                        <span className="font-semibold">{formatPrice(taxes)}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-black pt-3 border-t border-gray-200">
                                        <span>Total</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                </div>
                            )}

                            {/* Confirm Button */}
                            <button
                                onClick={handleConfirm}
                                disabled={!selectedSlot}
                                className="w-full py-4 bg-primary text-black font-bold text-lg rounded-button hover:bg-yellow-400 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-button active:scale-95"
                            >
                                {selectedSlot ? 'Confirm Booking' : 'Select a Time Slot'}
                            </button>

                            <p className="text-xs text-text-muted text-center mt-4">
                                Free cancellation up to 24 hours before the experience
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;