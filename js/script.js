/* ================= Utilities ================= */
const storage = {
    get(k, fallback) {
        try { const v = localStorage.getItem(k); return v === null ? fallback : JSON.parse(v); } catch { return fallback; }
    },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

/* ================= App ================= */
document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-btn');
    const themeBtn = document.getElementById('theme-btn');
    const scrollBtn = document.getElementById('scrollTopBtn');
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const infoBtns = document.querySelectorAll('.info-btn');

    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.querySelector('.navbar');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('#primary-nav a');

    const certButtonsMap = {
        'cert-cyber-btn': 'cyber',
        'cert-internet-btn': 'internet',
        'cert-computer-btn': 'computer',
        'cert-terms-btn': 'security_terms',
        'cert-ux-btn': 'ux'
    };

    let currentLang = storage.get('site_lang', 'ar');
    let currentTheme = storage.get('site_theme',
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
    );

    /* ========== translations ========== */
    const translations = {
        ar: {
            page_title: "يوسف أيمن حسن دحلان | مطوّر واجهات أمامية",
            brand: "Yousif",
            nav_home: "الرئيسية",
            nav_education: "التعليم",
            nav_certificates: "الشهادات",
            nav_projects: "المشاريع",
            nav_skills: "المهارات",
            nav_contact: "تواصل",
            name: "يوسف أيمن حسن دحلان",
            profile_alt: "صورة يوسف أيمن",
            title: "مطوّر واجهات أمامية | مهتم بالأمن السيبراني",
            download_cv: "تحميل السيرة الذاتية",
            eduTitle: "التعليم",
            edu1: "بكالوريوس أنظمة معلومات حاسوبية – أمن معلومات",
            edu1_meta: "جامعة القدس المفتوحة",
            edu2: "مقدمة في الأمن السيبراني",
            edu3: "أساسيات الحاسوب والإنترنت",
            edu4: "تصميم تجربة المستخدم (UX)",
            certTitle: "الشهادات",
            cert_cyber: "دبلومة الأمن السيبراني – American Board Giza",
            cert_internet: "أساسيات الإنترنت والمراسلات",
            cert_computer: "أساسيات الحاسوب",
            cert_terms: "أهم المصطلحات في مقدمة الأمن السيبراني",
            cert_ux: "تصميم تجربة المستخدم",
            view_cert: "عرض الشهادة",
            cert_note: "سيتم فتح نسخة الشهادة حسب لغة الصفحة الحالية.",
            projectsTitle: "المشاريع",
            proj1_title: "موقع شخصي",
            proj1_desc: "موقع متكامل باستخدام HTML وCSS",
            proj1_alt: "صورة مشروع موقع شخصي",
            demo: "المعاينة",
            github: "جيت هب",
            gallery: "معرض الصور",
            skillsTitle: "المهارات",
            contactTitle: "التواصل",
            contact_location: "القاهرة، مصر",
            form_title: "أرسل رسالة مباشرة",
            form_submit: "إرسال",
            form_name_placeholder: "الاسم الكامل",
            form_email_placeholder: "البريد الإلكتروني",
            form_contact_info_placeholder: "البريد أو رقم واتساب (مثال: +2010…)",
            form_message_placeholder: "اكتب رسالتك هنا",
            contact_info_tooltip: "يرجى إدخال بريد صحيح أو رقم واتساب مع رمز الدولة.",
            theme_label: "الوضع",
            footer_name: "يوسف أيمن",

            // Form validation messages
            err_required: "الحقل مطلوب.",
            err_email_or_phone: "الرجاء إدخال بريد إلكتروني صحيح أو رقم واتساب صحيح (مع رمز الدولة).",
            err_email_invalid: "البريد الإلكتروني غير صالح.",
            err_phone_invalid: "رقم الواتساب غير صالح. مثال: +2010..."
        },
        en: {
            page_title: "Yousif Ayman Hasan Dahlan | Front-End Developer",
            brand: "Yousif",
            nav_home: "Home",
            nav_education: "Education",
            nav_certificates: "Certificates",
            nav_projects: "Projects",
            nav_skills: "Skills",
            nav_contact: "Contact",
            name: "Yousif Ayman Hasan Dahlan",
            profile_alt: "Yousif Ayman Profile Picture",
            title: "Front-End Developer | Cybersecurity Enthusiast",
            download_cv: "Download CV",
            eduTitle: "Education",
            edu1: "B.Sc. in Computer Information Systems – Cybersecurity",
            edu1_meta: "Al-Quds Open University",
            edu2: "Introduction to Cybersecurity",
            edu3: "Computer & Internet Fundamentals",
            edu4: "User Experience (UX) Design",
            certTitle: "Certificates",
            cert_cyber: "Cybersecurity Diploma – American Board Giza",
            cert_internet: "Internet & Messaging Fundamentals",
            cert_computer: "Computer Fundamentals",
            cert_terms: "Key Terms — Intro to Cybersecurity",
            cert_ux: "User Experience (UX) Design",
            view_cert: "View Certificate",
            cert_note: "The certificate version will match the current page language.",
            projectsTitle: "Projects",
            proj1_title: "Personal Website",
            proj1_desc: "A full website built using HTML & CSS",
            proj1_alt: "Personal Website Project Image",
            demo: "Demo",
            github: "GitHub",
            gallery: "Gallery",
            skillsTitle: "Skills",
            contactTitle: "Contact",
            contact_location: "Cairo, Egypt",
            form_title: "Send a Direct Message",
            form_submit: "Send",
            form_name_placeholder: "Full Name",
            form_email_placeholder: "Email Address",
            form_contact_info_placeholder: "Email or WhatsApp (+2010…)",
            form_message_placeholder: "Type your message here",
            contact_info_tooltip: "Please enter a valid email or WhatsApp number including country code.",
            theme_label: "Theme",
            footer_name: "Yousif Ayman",

            err_required: "This field is required.",
            err_email_or_phone: "Please provide a valid email or WhatsApp number (with country code).",
            err_email_invalid: "Invalid email address.",
            err_phone_invalid: "Invalid WhatsApp number. Example: +2010..."
        }
    };

    const certPaths = {
        cyber: { ar: "assets/certificates/cyber.security.diploma.pdf", en: "assets/certificates/cyber.security.diploma.pdf" },
        internet: { ar: "assets/certificates/internet_ar.pdf", en: "assets/certificates/internet_en.pdf" },
        computer: { ar: "assets/certificates/computer_ar.pdf", en: "assets/certificates/computer_en.pdf" },
        security_terms: { ar: "assets/certificates/security_terms_ar.pdf", en: "assets/certificates/security_terms_en.pdf" },
        ux: { ar: "assets/certificates/ux_ar.pdf", en: "assets/certificates/ux_en.pdf" }
    };

    /* ================= Core Functions ================= */

    /* --- Language Handler --- */
    function applyLanguage(lang) {
        currentLang = lang === 'en' ? 'en' : 'ar';
        document.body.setAttribute('lang', currentLang);
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

        // update inner text for keys
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = translations[currentLang][key];
            if (val !== undefined) {
                el.textContent = val;
            }
        });

        // placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(inp => {
            const key = inp.getAttribute('data-i18n-placeholder');
            const val = translations[currentLang][key];
            if (val !== undefined) inp.setAttribute('placeholder', val);
        });

        // images alt
        // 1. Profile Image
        const profileImg = document.querySelector('.profile-img');
        if (profileImg && translations[currentLang].profile_alt) {
            profileImg.alt = translations[currentLang].profile_alt;
        }

        // 2. Project Images (Auto-detect based on title key: proj1_title -> proj1_alt)
        document.querySelectorAll('.project-card').forEach(card => {
            const titleEl = card.querySelector('h3[data-i18n]');
            if (!titleEl) return;
            const keyBase = titleEl.getAttribute('data-i18n').replace('_title', ''); // e.g. proj1
            const altKey = keyBase + '_alt';
            const img = card.querySelector('img');
            if (img && translations[currentLang][altKey]) {
                img.alt = translations[currentLang][altKey];
            }
        });

        // Title
        if (translations[currentLang].page_title) document.title = translations[currentLang].page_title;

        // Footer name
        const footerName = document.querySelector('[data-i18n="footer_name"]');
        if (footerName) footerName.textContent = translations[currentLang].footer_name;

        langBtn.textContent = currentLang === 'ar' ? 'EN' : 'AR';
        setCertificatesTargets(currentLang);
        storage.set('site_lang', currentLang);

        // re-run typing effect with new language
        startTyping(translations[currentLang].title);
    }

    /* --- Theme Handler --- */
    function applyTheme(theme) {
        currentTheme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', currentTheme === 'dark');
        themeBtn.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        storage.set('site_theme', currentTheme);
    }

    /* --- Certificates Handler --- */
    function setCertificatesTargets(lang) {
        Object.entries(certButtonsMap).forEach(([btnId, shortName]) => {
            const el = document.getElementById(btnId);
            if (!el) return;
            const path = certPaths[shortName] ? certPaths[shortName][lang] : null;
            if (path) el.onclick = () => window.open(path, '_blank', 'noopener,noreferrer');
            else el.onclick = () => console.warn('Certificate path not found for:', shortName);
        });
    }

    /* ================= UI & Layout Logic ================= */

    /* --- Navbar & Controls Setup --- */
    function setupNavbar() {
        // Menu Event Listeners
        const toggleMenu = (forceClose = false) => {
            const isClosed = !navbar.classList.contains('open');
            if (forceClose || !isClosed) {
                menuToggle.classList.remove('active');
                navbar.classList.remove('open');
                navOverlay.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            } else {
                menuToggle.classList.add('active');
                navbar.classList.add('open');
                navOverlay.classList.add('show');
                menuToggle.setAttribute('aria-expanded', 'true');
            }
        };

        if (menuToggle) menuToggle.addEventListener('click', () => toggleMenu());
        if (navOverlay) navOverlay.addEventListener('click', () => toggleMenu(true));
        navLinks.forEach(link => link.addEventListener('click', () => toggleMenu(true)));
    }

    /* --- Scroll Handling (ScrollTop + ScrollSpy) --- */
    function setupScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinksMap = {};

        // تحسين الأداء: تخزين الروابط في الذاكرة بدلاً من البحث عنها عند كل تمرير
        sections.forEach(sec => {
            const id = sec.getAttribute('id');
            const link = document.querySelector(`.navbar a[href*="#${id}"]`);
            if (link) navLinksMap[id] = link;
        });

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;

            // 1. Scroll To Top Button
            if (scrollBtn) {
                if (scrollY > 220) scrollBtn.classList.add('show');
                else scrollBtn.classList.remove('show');
            }

            // 2. Scroll Spy (Active Link Highlight)
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 150; // Offset for fixed header
                const sectionId = current.getAttribute('id');
                const link = navLinksMap[sectionId];

                if (link) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            });
        });

        if (scrollBtn) {
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    /* --- Typing Effect --- */
    let typingTimer = null;

    function startTyping(text) {
        const target = document.getElementById('typed');
        if (!target) return;
        // stop previous
        if (typingTimer) clearInterval(typingTimer);
        target.textContent = '';
        let i = 0;
        typingTimer = setInterval(() => {
            target.textContent = text.slice(0, i++);
            if (i > text.length) clearInterval(typingTimer);
        }, 40);
    }

    /* --- Animations (Scroll Reveal) --- */
    function setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    }

    /* --- 3D Tilt Effect (Atmosphere) --- */
    function setupTilt() {
        const cards = document.querySelectorAll('.cert-card, .project-card, .hero-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate rotation based on cursor position
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -8; // Max -8deg to 8deg
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    /* --- Lightbox Gallery Logic --- */
    function setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        let currentImages = [];
        let currentIndex = 0;

        function showImage(index) {
            if (index < 0) index = currentImages.length - 1;
            if (index >= currentImages.length) index = 0;
            currentIndex = index;
            lightboxImg.src = currentImages[currentIndex];
        }

        document.querySelectorAll('.gallery-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // قراءة مصفوفة الصور من الـ data attribute
                const imgs = JSON.parse(btn.getAttribute('data-images') || '[]');
                if (imgs.length > 0) {
                    currentImages = imgs;
                    currentIndex = 0;
                    showImage(currentIndex);
                    lightbox.classList.add('active');
                }
            });
        });

        // Close
        closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });

        // Navigation
        nextBtn.addEventListener('click', () => showImage(currentIndex + 1)); // اليسار في العربي هو التالي
        prevBtn.addEventListener('click', () => showImage(currentIndex - 1)); // اليمين في العربي هو السابق
    }

    /* --- Ripple Effect --- */
    function setupRipple() {
        const buttons = document.querySelectorAll('button, .btn-link, .cv-btn, .cert-btn, .social');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const circle = document.createElement('span');
                const diameter = Math.max(this.clientWidth, this.clientHeight);
                const radius = diameter / 2;
                const rect = this.getBoundingClientRect();

                circle.style.width = circle.style.height = `${diameter}px`;
                circle.style.left = `${e.clientX - rect.left - radius}px`;
                circle.style.top = `${e.clientY - rect.top - radius}px`;
                circle.classList.add('ripple');

                const ripple = this.getElementsByClassName('ripple')[0];
                if (ripple) ripple.remove();
                this.appendChild(circle);
            });
        });
    }

    /* ================= Form Logic ================= */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{8,15}$/;

    function setFieldError(fieldEl, errorEl, msg) {
        if (!fieldEl || !errorEl) return;
        if (msg) {
            fieldEl.parentElement.setAttribute('aria-invalid', 'true');
            errorEl.textContent = msg;
        } else {
            fieldEl.parentElement.removeAttribute('aria-invalid');
            errorEl.textContent = '';
        }
    }

    function validateForm(showAll = false) {
        const t = translations[currentLang];
        const nameEl = document.getElementById('nameInput');
        const emailEl = document.getElementById('emailInput');
        const contactEl = document.getElementById('contactInfo');
        const msgEl = document.getElementById('messageInput');

        const nameErr = document.getElementById('nameError');
        const emailErr = document.getElementById('emailError');
        const contactErr = document.getElementById('contactError');
        const messageErr = document.getElementById('messageError');

        let valid = true;

        // Name required
        if (!nameEl.value.trim()) {
            setFieldError(nameEl, nameErr, t.err_required);
            valid = false;
        } else setFieldError(nameEl, nameErr, '');

        // Message required
        if (!msgEl.value.trim()) {
            setFieldError(msgEl, messageErr, t.err_required);
            valid = false;
        } else setFieldError(msgEl, messageErr, '');

        // Email / contact - at least one
        const email = emailEl.value.trim();
        const phone = contactEl.value.trim();

        if (!email && !phone) {
            setFieldError(emailEl, emailErr, t.err_email_or_phone);
            setFieldError(contactEl, contactErr, t.err_email_or_phone);
            valid = false;
        } else {
            // Email check if provided
            if (email) {
                if (!emailRegex.test(email)) {
                    setFieldError(emailEl, emailErr, t.err_email_invalid);
                    valid = false;
                } else setFieldError(emailEl, emailErr, '');
            } else setFieldError(emailEl, emailErr, '');

            // Phone check if provided
            if (phone) {
                if (!phoneRegex.test(phone)) {
                    setFieldError(contactEl, contactErr, t.err_phone_invalid);
                    valid = false;
                } else setFieldError(contactEl, contactErr, '');
            } else setFieldError(contactEl, contactErr, '');
        }

        if (showAll && !valid) {
            formStatus.textContent = t.err_email_or_phone;
            setTimeout(() => formStatus.textContent = '', 4000);
        }
        return valid;
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (!form) return;

        if (!validateForm(true)) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        const t = translations[currentLang];

        formStatus.textContent = currentLang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...';
        submitBtn.disabled = true;

        try {
            const data = new FormData(form);
            const res = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                formStatus.textContent = currentLang === 'ar' ? 'تم الإرسال بنجاح. شكراً لك!' : 'Sent — thank you!';
                form.reset();
            } else {
                const json = await res.json().catch(() => null);
                console.warn('Formspree response:', json);
                formStatus.textContent = currentLang === 'ar' ? 'حصل خطأ أثناء الإرسال. حاول لاحقاً.' : 'There was an error sending the message.';
            }
        } catch (err) {
            console.error(err);
            formStatus.textContent = currentLang === 'ar' ? 'حصل خطأ في الاتصال. حاول لاحقاً.' : 'Network error. Try again later.';
        } finally {
            submitBtn.disabled = false;
            setTimeout(() => formStatus.textContent = '', 5000);
        }
    }

    // Per-field live validation
    ['nameInput', 'emailInput', 'contactInfo', 'messageInput'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input', () => validateForm(false));
    });

    /* --- Tooltips --- */
    infoBtns.forEach(btn => {
        const tooltip = btn.parentElement.querySelector('.tooltip');
        if (!tooltip) return;
        btn.addEventListener('click', () => {
            tooltip.style.display = 'block';
            setTimeout(() => tooltip.style.display = 'none', 4000);
        });
    });

    /* ================= Initialization ================= */

    // Bind Global Events
    if (langBtn) langBtn.addEventListener('click', () => applyLanguage(currentLang === 'ar' ? 'en' : 'ar'));
    if (themeBtn) themeBtn.addEventListener('click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));
    form && form.addEventListener('submit', handleFormSubmit);

    // Run Setup
    setupNavbar();
    setupScroll();
    setupAnimations();
    setupTilt();
    setupRipple();
    setupLightbox();
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    setCertificatesTargets(currentLang);

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});