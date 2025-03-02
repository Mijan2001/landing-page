import React from 'react';
import { features } from '../database/Data';
const FeaturesSection = () => {
    return (
        <div className="bg-primary text-white">
            <div className="primary-container py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {features?.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col text-white border-t border-white/20 pt-8"
                        >
                            <div className="mb-4 text-white">
                                {feature?.icon}
                            </div>
                            <h3 className="text-lg font-medium mb-2">
                                {feature?.title}
                            </h3>
                            <p className="text-gray-500  mb-4 flex-1">
                                {feature?.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;
