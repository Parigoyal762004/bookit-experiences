import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Experience } from '../types';
import { formatPrice } from '../utils/formatters';

interface ExperienceCardProps {
    experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={experience.images[0]}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-text-primary mb-2">
                    {experience.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                    {experience.description}
                </p>

                {/* Location */}
                <p className="text-text-muted text-xs mb-4">
                    📍 {experience.location}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center">
                    {/* Price */}
                    <div>
                        <span className="text-xs text-text-secondary">From</span>
                        <p className="text-lg font-bold text-black">
                            {formatPrice(experience.price)}
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => navigate(`/experience/${experience.id}`)}
                        className="px-6 py-2 bg-primary text-black font-semibold rounded-button hover:bg-yellow-400 transition-colors shadow-button active:scale-95"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExperienceCard;