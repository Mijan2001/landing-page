import React, { useEffect, useRef, useState } from 'react';
import { tabsData } from '../database/Data';
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

    const handleTabClick = tabId => {
        setActiveTab(tabId);
        setIsPlaying(true);
        setProgress(0);
    };

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
                <div>
                    {/* content =======  */}
                    <div>
                        {/* subheading with progress bar ========  */}
                        <div>subheading</div>

                        {/* accordians with progess bar =====  */}
                        <div>accordians</div>
                    </div>

                    {/* video ==========  */}
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default DesignSection;
