/* Evita que el navegador restaure el scroll viejo al refrescar la página */

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);


/* INICIALIZACIÓN DE LUCIDE */

lucide.createIcons();


/* HERO CONTENT: preparado acá, pero se activa recién cuando el splash termine */

const heroContentEl = document.querySelector('.hero-content');
let heroObserver = null;

if (heroContentEl) {

    heroObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {
            heroContentEl.classList.toggle('in-view', entry.isIntersecting);
        });

    }, { threshold: 0.3 });

}


/* SPLASH SCREEN */

const splashScreen = document.getElementById('splash-screen');

if (splashScreen) {

    window.addEventListener('load', () => {

        setTimeout(() => {

            splashScreen.classList.add('hidden');

            /* Recién acá empieza a observarse el hero, para que la animación
               se vea justo cuando el splash desaparece */
            if (heroContentEl && heroObserver) {
                heroObserver.observe(heroContentEl);
            }

            splashScreen.addEventListener('transitionend', () => {
                splashScreen.remove();
            }, { once: true });

        }, 2300);

    });

}


/* NAV: SOMBRA SUTIL AL SCROLLEAR */

const navEl = document.querySelector('nav');

if (navEl) {

    window.addEventListener('scroll', () => {
        navEl.classList.toggle('scrolled', window.scrollY > 10);
    });

}


/* MENÚ HAMBURGUESA */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {

    hamburger.addEventListener('click', () => {

        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        const isOpen = navMenu.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isOpen);

    });

}


/* CERRAR MENÚ AL HACER CLICK EN UN ENLACE (y liberar scroll si el nav se usó primero) */

const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach((link) => {

    link.addEventListener('click', () => {

        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
        hamburger?.setAttribute('aria-expanded', 'false');

        document.body.classList.remove('no-scroll');

    });

});


/* TABLA PERIÓDICA INTERACTIVA */

const portadaBtn = document.getElementById('portada-btn');
const tablaFlotante = document.getElementById('tabla-flotante');
const heroBottlesSection = document.getElementById('hero-bottles-section');
const marqueeStrip = document.getElementById('marquee-strip');
const clickHint = document.getElementById('click-hint');

if (portadaBtn) {

    portadaBtn.addEventListener('click', () => {

        if (tablaFlotante) {
            tablaFlotante.classList.toggle('is-visible');
        }

        if (clickHint) {
            clickHint.style.display = 'none';
        }

    });

    portadaBtn.addEventListener('keydown', (event) => {

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            portadaBtn.click();
        }

    });

}


/* SCROLL REVEAL: BOTELLAS APARECEN ESCALONADAS AL ENTRAR EN PANTALLA */

const heroBottles = document.querySelector('.hero-bottles');

if (heroBottles) {

    const bottlesObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                heroBottles.classList.add('in-view');
                bottlesObserver.unobserve(entry.target);
            }

        });

    }, { threshold: 0.3 });

    bottlesObserver.observe(heroBottles);

}


/* CLICK EN ELEMENTOS DE LA TABLA PERIÓDICA → DESBLOQUEA SCROLL + BOTELLAS + FRANJA */

const elementosQuimicos = document.querySelectorAll('.elemento-quimico');

elementosQuimicos.forEach((elemento) => {

    const irABotella = () => {

        document.body.classList.remove('no-scroll');

        const yaEstaVisible = heroBottlesSection?.classList.contains('is-visible');

        heroBottlesSection?.classList.add('is-visible');
        marqueeStrip?.classList.add('is-visible');

        const delay = yaEstaVisible ? 0 : 550;

        setTimeout(() => {
            heroBottlesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, delay);

        const flavor = elemento.dataset.flavor;

        if (flavor) {

            const bottle = document.querySelector(`.bottle-item[data-flavor="${flavor}"]`);

            if (bottle) {
                bottle.classList.add('highlight');
                setTimeout(() => bottle.classList.remove('highlight'), 1800);
            }

        }

    };

    elemento.addEventListener('click', irABotella);

    elemento.addEventListener('keydown', (event) => {

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            irABotella();
        }

    });

});

/* NOSOTROS: TEXTO E IMAGEN ENTRAN AL SCROLLEAR */

const aboutContent = document.querySelector('.about-content');
const aboutImage = document.querySelector('.about-image-wrapper');

if (aboutContent && aboutImage) {

    const aboutObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                aboutObserver.unobserve(entry.target);
            }

        });

    }, { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });

    aboutObserver.observe(aboutContent);
    aboutObserver.observe(aboutImage);

}


/* CONTACTO: TÍTULO ENTRA AL SCROLLEAR + ENVÍO DEL FORMULARIO */

const contactTitle = document.getElementById('contact-title');

if (contactTitle) {

    const contactObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                contactTitle.classList.add('in-view');
                contactObserver.unobserve(entry.target);
            }

        });

    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    contactObserver.observe(contactTitle);

}

const contactForm = document.getElementById('contact-form');

if (contactForm) {

    contactForm.addEventListener('submit', (event) => {

        event.preventDefault();
        alert('¡Gracias! Tu mensaje fue enviado.');
        contactForm.reset();

    });

}