import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ExperienceCard from '../components/ExperienceCard';
import { CardSkeleton } from '../components/Loading';
import type { Experience } from '../types';
import { experienceService } from '../services/experienceService';
import { useDebounce } from '../hooks/useDebounce';
import { Filter } from 'lucide-react';

const Home: React.FC = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const debouncedSearch = useDebounce(searchQuery, 300);

    const categories = ['all', 'Adventure', 'Nature', 'Cultural', 'Food & Drink', 'Wellness'];

    useEffect(() => {
        loadExperiences();
    }, []);

    useEffect(() => {
        filterExperiences();
    }, [debouncedSearch, selectedCategory, experiences]);

    const loadExperiences = async () => {
        try {
            setLoading(true);
            const data = await experienceService.getExperiences();
            setExperiences(data);
        } catch (error) {
            console.error('Failed to load experiences:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterExperiences = () => {
        let filtered = [...experiences];

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(exp => exp.category === selectedCategory);
        }

        // Filter by search query
        if (debouncedSearch) {
            filtered = filtered.filter(exp =>
                exp.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                exp.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                exp.location.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
        }

        setFilteredExperiences(filtered);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-black mb-2">
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'Explore Experiences'}
                    </h1>
                    <p className="text-text-secondary">
                        {filteredExperiences.length} {filteredExperiences.length === 1 ? 'experience' : 'experiences'} available
                    </p>
                </div>

                {/* Category Filter */}
                <div className="mb-8 flex items-center gap-3 overflow-x-auto pb-2">
                    <Filter size={20} className="text-text-secondary flex-shrink-0" />
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-pill font-medium whitespace-nowrap transition-all ${
                                selectedCategory === category
                                    ? 'bg-secondary text-white shadow-button'
                                    : 'bg-gray-100 text-black hover:bg-gray-200'
                            }`}
                        >
                            {category === 'all' ? 'All' : category}
                        </button>
                    ))}
                </div>

                {/* Experience Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <CardSkeleton key={i} />
                        ))}
                    </div>
                ) : filteredExperiences.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-2xl text-text-secondary mb-2">No experiences found</p>
                        <p className="text-text-muted">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                        {filteredExperiences.map((experience) => (
                            <ExperienceCard key={experience.id} experience={experience} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;