import React, { useEffect, useRef, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { aboutFeatures, features } from '../database/Data';

const About = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const featuresRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        observerRef.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const index = featuresRef.findIndex(
                        feature => feature.id === id
                    );

                    if (index !== -1) {
                        setActiveFeature(index);
                        const video = document.querySelector(
                            `video[data-feature="${id}"]`
                        );
                        if (video) video.play();
                    }
                }
            });
        }, options);

        const featuresElements = document.querySelectorAll('.feature-item');
        featuresElements.forEach(feature =>
            observerRef.current.observe(feature)
        );

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    return (
        <div className="bg-black text-white py-24">
            <div className="primary-container">
                {/* header section=======  */}
                <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-32 gap-8">
                    <div className="md:mb-24">
                        <h2 className="text-5xl md:text-7xl font-bold mb-8 max-w-[50rem]">
                            AI at CodeTutor
                        </h2>
                    </div>
                    <div className="mb-24">
                        <p className="text-xl text-gray-300 mb-8 max-w-[35rem]">
                            Write, edit, and update content — or generate it
                            with the help of AI — directly in CodeTutor, then
                            publish with a click.Easily create page layouts by
                            adding the elements you want and pulling in content
                            from the CMS. Plus create reusable templates for
                            dynamic content — design the layout once and any new
                            content will automatically follow it.
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center text-white hover:text-gray-300 text-lg font-medium transition-colors"
                        >
                            Discover AI at CodeTutor{' '}
                            <HiArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* image and content section=======   */}
                <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-32 gap-8">
                    {/* image========  */}
                    <div>
                        <div className="sticky top-24">
                            <div className="aspect-square rounded-lg overflow-hidden border border-white/40">
                                <video
                                    src={aboutFeatures[activeFeature].video}
                                    key={aboutFeatures[activeFeature].id}
                                    data-feature={
                                        aboutFeatures[activeFeature].id
                                    }
                                    poster={aboutFeatures[activeFeature].poster}
                                    muted
                                    playsInline
                                    loop
                                    autoPlay
                                    className="w-full h-full object-cover"
                                ></video>
                            </div>
                        </div>
                    </div>

                    {/* content =============  */}
                    <div>
                        {/* intro text =============  */}
                        <div className="md:mb-28 mb-16 md:h-72 border-b border-white/10 pb-16">
                            <div className="max-w-[35ch] mb-4">
                                <h3 className="text-2xl font-semibold">
                                    Generate styled content quickly
                                </h3>
                            </div>
                            <p className="text-xl text-gray-300 mb-8 max-w-[35rem]">
                                codetutor's AI tools elevate your web projects
                                through contextual design and writing help,
                                machine-powered translation, and more.
                            </p>
                            <Link
                                to="/"
                                className="inline-flex items-center text-white hover:text-gray-300 text-lg font-medium transition-colors"
                            >
                                Discover AI at CodeTutor{' '}
                                <HiArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>

                        {/* features text=========  */}
                        <div ref={featuresRef} className="space-y-24">
                            {aboutFeatures.map((feature, index) => (
                                <div
                                    key={feature.id}
                                    id={feature.id}
                                    className="feature-item scroll-mt-24 md:h-72 border-b border-white/10 pb-16"
                                >
                                    <div className="max-w-[35ch] mb-4">
                                        <h3 className="text-2xl font-semibold">
                                            {feature.title}
                                        </h3>
                                    </div>
                                    <p className="text-xl text-gray-300 mb-8 max-w-[35rem]">
                                        {feature.description}
                                    </p>
                                    <Link
                                        to="/"
                                        className="inline-flex items-center text-white hover:text-gray-300 text-lg font-medium transition-colors"
                                    >
                                        {feature.linkText}
                                        <HiArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
