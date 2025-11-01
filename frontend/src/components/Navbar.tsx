import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <span className="text-2xl font-bold text-black">HD Booking</span>
                    </Link>

                    {/* Desktop Search */}
                    <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search experiences..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-l-button focus:outline-none focus:border-primary"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 h-full px-6 bg-primary text-black font-semibold rounded-r-button hover:bg-yellow-400 transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Search */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <form onSubmit={handleSearch} className="flex">
                            <input
                                type="text"
                                placeholder="Search experiences..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-button focus:outline-none focus:border-primary"
                            />
                            <button
                                type="submit"
                                className="px-6 bg-primary text-black font-semibold rounded-r-button hover:bg-yellow-400 transition-colors"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;