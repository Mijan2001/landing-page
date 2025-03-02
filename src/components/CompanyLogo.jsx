import React from 'react';
import { logos } from '../database/Data';
const CompanyLogo = () => {
    return (
        <div className="bg-black overflow-hidden md:py-16 py-8 text-white relative">
            {/* logo animation ============  */}
            <div className="flex animate-marquee">
                {[logos, logos]?.map((logoSet, setIndex) => (
                    <div
                        key={setIndex}
                        className="flex shrink-0 min-w-full items-center justify-around px-4"
                    >
                        {logoSet?.map((logo, index) => (
                            <img
                                key={`${setIndex}-${index}`}
                                width={logo.width}
                                height={logo.height}
                                src={logo.src}
                                alt={logo.alt}
                                className="mx-8 object-contain shrink-0"
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* gradient blur================  */}
            <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-black to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-black to-transparent"></div>
        </div>
    );
};

export default CompanyLogo;
