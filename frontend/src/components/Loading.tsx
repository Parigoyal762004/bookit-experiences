import React from 'react';

export const CardSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-card overflow-hidden shadow-card animate-pulse">
            <div className="w-full h-48 bg-gray-300"></div>
            <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                <div className="flex justify-between items-center mt-4">
                    <div className="h-6 bg-gray-300 rounded w-24"></div>
                    <div className="h-10 bg-gray-300 rounded w-28"></div>
                </div>
            </div>
        </div>
    );
};

export const PageLoader: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-text-secondary font-medium text-center">Loading...</p>
            </div>
        </div>
    );
};

export default { CardSkeleton, PageLoader };