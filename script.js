document.addEventListener('DOMContentLoaded', () => {

    // --- 1. THEME MANAGEMENT ---
    const themeToggle = document.getElementById('theme-toggle');
    // Default to dark mode if no preference is saved
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
    gsap.registerPlugin(ScrollTrigger);
    
    const animatedElements = gsap.utils.toArray('[data-anim]');
    
    animatedElements.forEach(el => {
        const delay = parseFloat(el.dataset.delay) || 0;
        let animationProps = {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            delay: delay,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            }
        };
        if (el.dataset.anim === 'fade-down') {
            gsap.set(el, { opacity: 0, y: -30 });
        } else { // Default to fade-up with settle effect
            gsap.set(el, { opacity: 0, y: 30, scale: 0.98, rotate: -1 });
        }
        gsap.to(el, animationProps);
    });

    // --- 3. MOBILE NAVIGATION TOGGLE ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;

    navToggle.addEventListener('click', () => {
        const isOpened = body.classList.toggle('mobile-nav-open');
        navToggle.setAttribute('aria-expanded', isOpened);
    });

    // Close menu when a link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-resume-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            body.classList.remove('mobile-nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // --- 4. FOOTER DATE & TIME ---
    document.getElementById('year').textContent = new Date().getFullYear();
    const timeElement = document.getElementById('current-time');
    
    const updateTime = () => {
        const timeString = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Kolkata'
        });
        timeElement.textContent = `| ${timeString}`;
    };
    
    if(timeElement) {
        updateTime();
        setInterval(updateTime, 60000);
    }
});