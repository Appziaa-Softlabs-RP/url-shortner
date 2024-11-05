"use client"

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function GoToTop() {
    const [isHeaderActive, setIsHeaderActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setIsHeaderActive(true);
            } else {
                setIsHeaderActive(false);
            }
        };

        // Add event listener when component mounts
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array to ensure effect runs only once

    return (
        <a href="#top" className={`go-top ${isHeaderActive ? 'active' : ''}`} data-go-top>
            <ChevronUp />
        </a>
    );
}
