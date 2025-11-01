import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold text-black mb-3">HD Booking</h3>
                        <p className="text-text-secondary text-sm">
                            Discover and book amazing travel experiences around the world.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-black mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-text-secondary hover:text-black transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-text-secondary hover:text-black transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-text-secondary hover:text-black transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-black mb-3">Contact</h4>
                        <p className="text-text-secondary text-sm">
                            Email: support@hdbooking.com
                        </p>
                        <p className="text-text-secondary text-sm mt-1">
                            Phone: +91 1234567890
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-8 pt-6 text-center">
                    <p className="text-text-secondary text-sm">
                        © 2025 HD Booking. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;