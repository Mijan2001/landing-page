import React, { useEffect, useRef, useState } from 'react';
import { tabsData } from '../database/Data';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
const DesignSection = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const progressInterval = useRef(null);
    const progress_duration = 10000;
    const update_interval = 100;

    useEffect(() => {
        startProgressTimer();
        return () => {
            clearInterval(progressInterval.current);
        };
    }, [activeTab]);

    const startProgressTimer = () => {
        setProgress(0);
        clearInterval(progressInterval.current);

        progressInterval.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    const currentIndex = tabsData.findIndex(
                        tab => tab.id === activeTab
                    );
                    const nextIndex = (currentIndex + 1) % tabsData.length;
                    setActiveTab(tabsData[nextIndex].id);
                }
                return prev + (update_interval / progress_duration) * 100;
            });
        }, update_interval);
    };

    // handle next click ============
    const handleTabClick = tabId => {
        setActiveTab(tabId);
        setIsPlaying(true);
        setProgress(0);
    };

    // toggle video play pause ============
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        const video = document.querySelector(`video[data-tab="${activeTab}"]`);

        if (video) {
            if (isPlaying) {
                video.pause();
                clearInterval(progressInterval.current);
            } else {
                video.play();
                startProgressTimer();
            }
        }
    };

    return (
        <div className="overflow-hidden py-24 bg-black text-white">
            <div className="primary-container">
                {/* header ============  */}
                <div>
                    <h2 className="sm:text-6xl text-5xl md:text-7xl font-bold text-white mb-8">
                        Launch pixel-perfect sites
                    </h2>
                </div>

                {/* content grid =============  */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* content =======  */}
                    <div className="flex flex-col justify-between gap-16">
                        {/* subheading with progress bar ========  */}
                        <div>
                            <p className="text-2xl text-gray-300">
                                Rethink the web dev cycle with CodeTutor. Give
                                your design and marketing teams the power to
                                launch sophisticated sites quickly — so your dev
                                team can focus on more complex work, not
                                pixel-perfect revisions.
                            </p>
                            <Link className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mt-8">
                                Get Started{' '}
                                <span className="font-medium ml-1">
                                    it's free
                                </span>
                            </Link>
                        </div>

                        {/* accordians with progess bar =====  */}
                        <div className="space-y-6">
                            {tabsData.map(tab => (
                                <div
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className="relative pl-4 cursor-pointer"
                                >
                                    {/* progress bar========  */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-800">
                                        {activeTab === tab.id && (
                                            <div
                                                className="absolute top-0 left-0 w-full bg-blue-600 transition-all duration-100"
                                                style={{
                                                    height: `${progress}%`
                                                }}
                                            ></div>
                                        )}
                                    </div>

                                    {/* title================  */}
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {tab.title}
                                    </h3>

                                    {/* sub title =============  */}
                                    <p
                                        className={`text-gray-400 transition-all duration-300 ${
                                            activeTab === tab.id
                                                ? 'h-auto opacity-100'
                                                : 'h-0 opacity-0 overflow-hidden'
                                        }`}
                                    >
                                        {tab.subtitle}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* video ==========  */}
                    <div className="relative">
                        <div className="max-w-[640px] mx-auto">
                            {tabsData.map(tab => (
                                <div
                                    className={`transition-opacity duration-500 ${
                                        activeTab === tab.id
                                            ? 'opacity-100'
                                            : 'opacity-0 hidden'
                                    }`}
                                    key={tab.id}
                                >
                                    <video
                                        key={tab.id}
                                        data-tab={tab.id}
                                        className={`w-full rounded-lg shadow-lg transition-all duration-300 ${
                                            activeTab === tab.id
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        }`}
                                        src={tab.video}
                                        autoPlay
                                        muted
                                        loop
                                        poster={tab.poster}
                                    ></video>

                                    {/* bottom text and play icon==========  */}
                                    <div className="flex items-center justify-between mt-4">
                                        <Link
                                            to="/"
                                            className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
                                        >
                                            {tab.cta.text}
                                            <HiArrowRight className="inline-block ml-2" />
                                        </Link>
                                        <button
                                            className="p-2 bg-blue-600 text-white rounded-full"
                                            onClick={handlePlayPause}
                                        >
                                            {isPlaying ? (
                                                <BsPauseFill size={24} />
                                            ) : (
                                                <BsPlayFill size={24} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignSection;
