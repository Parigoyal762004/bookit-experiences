import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import type { BookingData } from '../types';
import { bookingService } from '../services/bookingService';
import { formatPrice, formatDate, formatTime } from '../utils/formatters';
import { useToast } from '../hooks/useToast';

interface CheckoutFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    promoCode?: string;
    agreeToTerms: boolean;
}

const Checkout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const { experience, slot, quantity } = location.state || {};

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoApplied, setPromoApplied] = useState(false);
    const [isValidatingPromo, setIsValidatingPromo] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormData>();

    if (!experience || !slot) {
        navigate('/');
        return null;
    }

    const subtotal = slot.price * quantity;
    const taxes = subtotal * 0.18;
    const finalTotal = subtotal + taxes - discount;

    const handlePromoValidation = async () => {
        if (!promoCode.trim()) {
            showToast('Please enter a promo code', 'warning');
            return;
        }

        try {
            setIsValidatingPromo(true);
            const result = await bookingService.validatePromo(promoCode);

            if (result.valid) {
                const discountAmount = result.type === 'PERCENTAGE'
                    ? (subtotal * result.discount) / 100
                    : result.discount;

                setDiscount(discountAmount);
                setPromoApplied(true);
                showToast('Promo code applied successfully!', 'success');
            } else {
                showToast('Invalid promo code', 'error');
            }
        } catch (error) {
            showToast('Failed to validate promo code', 'error');
        } finally {
            setIsValidatingPromo(false);
        }
    };

    const onSubmit = async (data: CheckoutFormData) => {
        if (!data.agreeToTerms) {
            showToast('Please agree to terms and conditions', 'warning');
            return;
        }

        try {
            setIsSubmitting(true);

            const bookingData: BookingData = {
                experienceId: experience.id,
                slotId: slot.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                guests: quantity,
                promoCode: promoApplied ? promoCode : undefined,
                totalPrice: finalTotal,
            };

            const response = await bookingService.createBooking(bookingData);

            if (response.success) {
                navigate('/result', {
                    state: {
                        success: true,
                        bookingId: response.bookingId,
                        experience,
                        slot,
                        quantity,
                        totalPrice: finalTotal,
                    },
                });
            } else {
                throw new Error(response.message);
            }
        } catch (error: any) {
            showToast(error.message || 'Booking failed. Please try again.', 'error');
            navigate('/result', {
                state: {
                    success: false,
                    message: error.message || 'Booking failed',
                },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-black mb-8">Complete Your Booking</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-card shadow-card p-6 space-y-6">
                            {/* Personal Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-black mb-4">Personal Information</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-2">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            {...register('firstName', { required: 'First name is required', minLength: 2 })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-button focus:outline-none focus:border-primary"
                                            placeholder="John"
                                        />
                                        {errors.firstName && (
                                            <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-black mb-2">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            {...register('lastName', { required: 'Last name is required', minLength: 2 })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-button focus:outline-none focus:border-primary"
                                            placeholder="Doe"
                                        />
                                        {errors.lastName && (
                                            <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-button focus:outline-none focus:border-primary"
                                        placeholder="john.doe@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        {...register('phone', {
                                            required: 'Phone number is required',
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: 'Invalid phone number (10 digits required)',
                                            },
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-button focus:outline-none focus:border-primary"
                                        placeholder="9876543210"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div>
                                <h2 className="text-xl font-semibold text-black mb-4">Promo Code</h2>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                        disabled={promoApplied}
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-button focus:outline-none focus:border-primary disabled:bg-gray-100"
                                        placeholder="Enter promo code"
                                    />
                                    <button
                                        type="button"
                                        onClick={handlePromoValidation}
                                        disabled={promoApplied || isValidatingPromo}
                                        className="px-6 py-3 bg-primary text-black font-semibold rounded-button hover:bg-yellow-400 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
                                    >
                                        {isValidatingPromo ? 'Validating...' : promoApplied ? 'Applied' : 'Apply'}
                                    </button>
                                </div>
                                {promoApplied && (
                                    <p className="text-success text-sm mt-2">✓ Promo code applied! You saved {formatPrice(discount)}</p>
                                )}
                            </div>

                            {/* Terms & Conditions */}
                            <div>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        {...register('agreeToTerms', { required: true })}
                                        className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-text-secondary">
                    I agree to the <span className="text-primary font-medium">terms and conditions</span> and <span className="text-primary font-medium">safety policy</span>
                  </span>
                                </label>
                                {errors.agreeToTerms && (
                                    <p className="text-red-500 text-xs mt-1">You must agree to terms and conditions</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-primary text-black font-bold text-lg rounded-button hover:bg-yellow-400 disabled:bg-gray-200 disabled:text-gray-400 transition-all shadow-button active:scale-95 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Processing...
                                    </>
                                ) : (
                                    'Pay and Confirm'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-card shadow-card p-6 sticky top-24">
                            <h2 className="text-xl font-semibold text-black mb-4">Booking Summary</h2>

                            {/* Experience Details */}
                            <div className="mb-4 pb-4 border-b border-gray-200">
                                <div className="flex gap-3 mb-3">
                                    <img
                                        src={experience.images[0]}
                                        alt={experience.title}
                                        className="w-20 h-20 rounded-button object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-black">{experience.title}</h3>
                                        <p className="text-sm text-text-secondary">{experience.location}</p>
                                    </div>
                                </div>

                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Date:</span>
                                        <span className="font-medium text-black">{formatDate(slot.date)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Time:</span>
                                        <span className="font-medium text-black">{formatTime(slot.startTime)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Guests:</span>
                                        <span className="font-medium text-black">{quantity}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                                <div className="flex justify-between text-text-secondary">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-text-secondary">
                                    <span>Taxes & Fees</span>
                                    <span className="font-semibold">{formatPrice(taxes)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-success">
                                        <span>Discount</span>
                                        <span className="font-semibold">-{formatPrice(discount)}</span>
                                    </div>
                                )}
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center text-2xl font-bold text-black">
                                <span>Total</span>
                                <span>{formatPrice(finalTotal)}</span>
                            </div>

                            <p className="text-xs text-text-muted mt-4 text-center">
                                All prices in Indian Rupees (₹)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;