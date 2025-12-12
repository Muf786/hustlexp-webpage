import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Simplified Navigation Tracker for HustleXP
// Tracks page views without external SDK

function useNavigationTracking() {
    const location = useLocation();

    useEffect(() => {
        const pageName = location.pathname === '/' ? 'home' : location.pathname.replace(/^\//, '');

        // Log navigation for analytics (can integrate with your own analytics later)
        console.log(`[HustleXP] Page view: ${pageName}`);

        // You can add Firebase Analytics here if needed:
        // import { logEvent } from 'firebase/analytics';
        // logEvent(analytics, 'page_view', { page_name: pageName });

    }, [location.pathname]);
}

export default function NavigationTracker() {
    useNavigationTracking();
    return null;
}