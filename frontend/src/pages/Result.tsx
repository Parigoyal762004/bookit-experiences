import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Home } from 'lucide-react';
import { formatPrice, formatDate, formatTime } from '../utils/formatters';
import confetti from 'canvas-confetti';

const Result: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { success, bookingId, experience, slot, quantity, totalPrice, message } = location.state || {};

    useEffect(() => {
        // Redirect if no state
        if (!location.state) {
            navigate('/');
            return;
        }

        // Trigger confetti on success
        if (success) {
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#FFD700', '#FFA500', '#FF6347'],
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FFD700', '#FFA500', '#FF6347'],
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };

            frame();
        }
    }, [success, location.state, navigate]);

    if (!location.state) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
            <div className="max-w-2xl w-full">
                {success ? (
                    // Success State
                    <div className="text-center animate-scale-in">
                        {/* Success Icon */}
                        <div className="mb-6 flex justify-center">
                            <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center">
                                <CheckCircle className="text-white" size={60} />
                            </div>
                        </div>

                        {/* Success Message */}
                        <h1 className="text-4xl font-bold text-black mb-2">Booking Confirmed!</h1>
                        <p className="text-text-secondary mb-2">Your adventure awaits</p>

                        {/* Booking Reference */}
                        <div className="inline-block bg-gray-100 px-6 py-3 rounded-pill mb-8">
                            <p className="text-sm text-text-secondary mb-1">Booking Reference</p>
                            <p className="text-2xl font-bold text-black tracking-wide">{bookingId}</p>
                        </div>

                        {/* Booking Details Card */}
                        <div className="bg-white border-2 border-gray-200 rounded-card p-6 mb-8 text-left shadow-card">
                            <h2 className="text-xl font-semibold text-black mb-4">Booking Details</h2>

                            <div className="space-y-4">
                                {/* Experience Info */}
                                <div className="flex gap-4">
                                    <img
                                        src={experience.images[0]}
                                        alt={experience.title}
                                        className="w-24 h-24 rounded-button object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-black text-lg mb-1">{experience.title}</h3>
                                        <p className="text-text-secondary text-sm">{experience.location}</p>
                                    </div>
                                </div>

                                {/* Booking Info */}
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                                    <div>
                                        <p className="text-xs text-text-muted mb-1">Date</p>
                                        <p className="font-semibold text-black">{formatDate(slot.date)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-muted mb-1">Time</p>
                                        <p className="font-semibold text-black">{formatTime(slot.startTime)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-muted mb-1">Guests</p>
                                        <p className="font-semibold text-black">{quantity} {quantity === 1 ? 'person' : 'people'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-muted mb-1">Total Paid</p>
                                        <p className="font-semibold text-black">{formatPrice(totalPrice)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Confirmation Message */}
                        <div className="bg-blue-50 border border-blue-200 rounded-card p-4 mb-8 text-left">
                            <p className="text-sm text-blue-800">
                                📧 A confirmation email has been sent to your registered email address with all the details and instructions.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/"
                                className="px-8 py-3 bg-primary text-black font-semibold rounded-button hover:bg-yellow-400 transition-colors shadow-button inline-flex items-center justify-center gap-2"
                            >
                                <Home size={20} />
                                Back to Home
                            </Link>
                            <button
                                onClick={() => window.print()}
                                className="px-8 py-3 bg-white border-2 border-gray-300 text-black font-semibold rounded-button hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
                            >
                                Print Confirmation
                            </button>
                        </div>
                    </div>
                ) : (
                    // Failure State
                    <div className="text-center animate-scale-in">
                        {/* Error Icon */}
                        <div className="mb-6 flex justify-center">
                            <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center">
                                <XCircle className="text-white" size={60} />
                            </div>
                        </div>

                        {/* Error Message */}
                        <h1 className="text-4xl font-bold text-black mb-2">Booking Failed</h1>
                        <p className="text-text-secondary mb-8">
                            {message || "We couldn't process your booking. Please try again."}
                        </p>

                        {/* Error Details */}
                        <div className="bg-red-50 border border-red-200 rounded-card p-6 mb-8 text-left">
                            <h3 className="font-semibold text-red-800 mb-2">What went wrong?</h3>
                            <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                                <li>Payment processing failed</li>
                                <li>Selected slot may no longer be available</li>
                                <li>Network connection issues</li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-8 py-3 bg-primary text-black font-semibold rounded-button hover:bg-yellow-400 transition-colors shadow-button"
                            >
                                Try Again
                            </button>
                            <Link
                                to="/"
                                className="px-8 py-3 bg-white border-2 border-gray-300 text-black font-semibold rounded-button hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
                            >
                                <Home size={20} />
                                Back to Home
                            </Link>
                        </div>

                        {/* Support Info */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-sm text-text-secondary">
                                Need help? Contact our support team at{' '}
                                <a href="mailto:support@hdbooking.com" className="text-primary font-semibold hover:underline">
                                    support@hdbooking.com
                                </a>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Result;