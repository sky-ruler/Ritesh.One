document.addEventListener('DOMContentLoaded', () => {

    // --- 1. THEME MANAGEMENT ---
    const themeToggle = document.getElementById('theme-toggle');
    // Set default theme to dark if no preference is saved
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeToggle.checked = true;
    }
    themeToggle.addEventListener('change', () => {
        const theme = themeToggle.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // --- 2. GSAP SCROLL-TRIGGERED ANIMATIONS ---
    // The core of the site's stable, fluid motion.
    gsap.registerPlugin(ScrollTrigger);
    
    const animatedElements = gsap.utils.toArray('[data-anim]');
    
    animatedElements.forEach(el => {
        const delay = parseFloat(el.dataset.delay) || 0;
        
        let animationProps = {
            opacity: 1,
            y: 0,
            scale: 1,
            delay: delay,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                // This is the permanent bug fix: plays once, reverses gracefully.
                toggleActions: 'play none none reverse',
            }
        };

        // Initialize starting state based on animation type
        if (el.dataset.anim === 'fade-down') {
            gsap.set(el, { opacity: 0, y: -30 });
        } else { // Default to fade-up
            gsap.set(el, { opacity: 0, y: 30, scale: 0.98 });
        }

        gsap.to(el, animationProps);
    });

    // --- 3. FOOTER DATE & TIME ---
    // A small detail for a professional touch.
    document.getElementById('year').textContent = new Date().getFullYear();
    const timeElement = document.getElementById('current-time');
    
    const updateTime = () => {
        // Fetches time for Jamshedpur, India (Asia/Kolkata timezone)
        const timeString = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Using 24-hour format which is common
            timeZone: 'Asia/Kolkata'
        });
        timeElement.textContent = `| ${timeString}`;
    };
    
    if(timeElement) {
        updateTime();
        // Update the time every minute
        setInterval(updateTime, 60000);
    }
});