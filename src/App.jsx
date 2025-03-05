import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CompanyLogo from './components/CompanyLogo';
import FeaturesSection from './components/FeaturesSection';
import DesignSection from './components/DesignSection';
import CustomerSection from './components/CustomerSection';

const App = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <CompanyLogo />
            <FeaturesSection />
            <DesignSection />
            <CustomerSection />
        </>
    );
};

export default App;
