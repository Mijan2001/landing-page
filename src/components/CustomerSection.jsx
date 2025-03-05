import React, { useRef, useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { customerData } from '../database/Data';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';

const CustomerSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const sliderRef = useRef(null);

    // previous slide ========
    const handlePrevSlide = () => {
        setCurrentSlide(prev =>
            prev === 0 ? customerData.length - 1 : prev - 1
        );
    };

    // next slide ========
    const handleNextSlide = () => {
        setCurrentSlide(prev =>
            prev === customerData.length - 1 ? 0 : prev + 1
        );
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);

        const video = document.querySelector(
            `video[data-slide="${customerData[currentSlide].id}"]`
        );
        if (video) {
            if (isPlaying) {
                video.pause();
            } else {
                video.play();
            }
        }
    };

    return (
        <div className="py-24 bg-gray-100 overflow-hidden">
            <div className="primary-container">
                {/* header===========  */}
                <div className="flex justify-between items-center mb-16">
                    <div className="max-w-[34rem]">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            The best startup companies build on here
                        </h2>
                    </div>

                    <div className="hidden md:flex gap-4">
                        <button
                            onClick={handlePrevSlide}
                            className="p-4 hover:bg-gray-200 cursor-pointer rounded-full transition-colors"
                        >
                            <HiArrowLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNextSlide}
                            className="p-4 hover:bg-gray-200 cursor-pointer rounded-full transition-colors"
                        >
                            <HiArrowRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* video slider=============  */}
                <div className="relative overflow-hidden">
                    <div
                        ref={sliderRef}
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`
                        }}
                    >
                        {customerData.map(customer => (
                            <div
                                key={customer.id}
                                className="w-full shrink-0 relative"
                            >
                                <div className="relative aspect-video overflow-hidden rounded-lg">
                                    <video
                                        src={customer.video}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        playsInline
                                        poster={customer.poster}
                                    ></video>

                                    <div className="absolute inset-0 bg-black/40"></div>

                                    {/* content============  */}
                                    <div className="absolute inset-0 p-8 flex flex-col items-center justify-center  text-white">
                                        <img
                                            src={customer.logo}
                                            alt=""
                                            className="h-12 w-auto mb-auto"
                                        />
                                        <div className="sm:grid grid-cols-2 hidden items-end gap-8 text-white">
                                            <div>
                                                <p className="text-6xl font-bold mb-2">
                                                    {customer.stat}
                                                </p>
                                                <p className="text-lg">
                                                    {customer.statDesc}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xl mb-4">
                                                    {customer.quote}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                                        {customer.author}
                                                    </div>
                                                    <button
                                                        className="p-2 hover:bg-white/20 rounded-full"
                                                        onClick={
                                                            togglePlayPause
                                                        }
                                                    >
                                                        {isPlaying ? (
                                                            <BsPauseFill />
                                                        ) : (
                                                            <BsPlayFill />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerSection;
