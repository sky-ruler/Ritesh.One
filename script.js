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

    // --- 2. VANILLA JS SCROLL ANIMATIONS (IntersectionObserver) ---
    const animatedElements = document.querySelectorAll('[data-anim]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a delay based on the data-delay attribute
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
            } else {
                // This part ensures the animation can replay if the user scrolls up
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- 3. MOBILE NAVIGATION TOGGLE ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;

    navToggle.addEventListener('click', () => {
        const isOpened = body.classList.toggle('mobile-nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpened));
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
        // Update the time every minute
        setInterval(updateTime, 60000);
    }
});