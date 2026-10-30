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


/* CONTACTO: TÍTULO ENTRA AL SCROLLEAR + ANIMACIÓN, VALIDACIÓN Y ENVÍO  */

const contactTitle = document.getElementById("contact-title");

if (contactTitle) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                contactTitle.classList.add("in-view");
                contactObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    });

    contactObserver.observe(contactTitle);
}

const contactForm = document.getElementById("contact-form");
const contactFeedback = document.getElementById("contact-feedback");

if (contactForm && contactFeedback) {

    // Solo los campos visibles (dentro de .contact-field).
    // Así el campo trampa (_gotcha) y el asunto oculto (_subject) no se validan.
    const fields = contactForm.querySelectorAll(
        ".contact-field input, .contact-field textarea"
    );

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const submitText = submitButton.querySelector(".submit-text");

    // Validación visual de cada campo
    function validateField(field) {
        const wrapper = field.closest(".contact-field");
        const error = wrapper.querySelector(".field-error");
        const value = field.value.trim();

        let message = "";

        if (field.required && !value) {
            message = "Este campo es obligatorio.";
        } else if (field.validity.typeMismatch) {
            message = "Ingresá un email válido.";
        } else if (field.name === "celular" && value) {
            const digits = value.replace(/\D/g, "");

            if (/[^\d+\s()-]/.test(value)) {
                message = "Ingresá solo números.";
            } else if (digits.length < 8 || digits.length > 15) {
                message = "Ingresá un número válido (entre 8 y 15 dígitos).";
            }
        }

        wrapper.classList.toggle("is-invalid", Boolean(message));
        wrapper.classList.toggle("is-valid", !message && value.length > 0);

        error.textContent = message;
        field.setAttribute("aria-invalid", String(Boolean(message)));

        return !message;
    }

    fields.forEach((field) => {
        field.addEventListener("blur", () => {
            validateField(field);
        });

        field.addEventListener("input", () => {
            const wrapper = field.closest(".contact-field");

            // Celular: borra al instante todo lo que no sea número, +, espacio, paréntesis o guion
            if (field.name === "celular") {
                const cleaned = field.value.replace(/[^\d+\s()-]/g, "");
                if (cleaned !== field.value) {
                    field.value = cleaned;
                }
            }

            if (wrapper.classList.contains("is-invalid") || field.value.trim()) {
                validateField(field);
            } else {
                wrapper.classList.remove("is-valid");
            }

            contactFeedback.textContent = "";
            delete contactFeedback.dataset.status;
        });
    });

    // Envío real a Formspree
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        let formIsValid = true;

        fields.forEach((field) => {
            if (!validateField(field)) {
                formIsValid = false;
            }
        });

        if (!formIsValid) {
            contactForm.querySelector(".is-invalid input, .is-invalid textarea")?.focus();
            return;
        }

        submitButton.disabled = true;
        submitText.textContent = "Enviando...";
        contactFeedback.textContent = "";
        delete contactFeedback.dataset.status;

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            // Leemos la respuesta de Formspree (si no es JSON, queda vacía)
            let data = {};
            try {
                data = await response.json();
            } catch (_) {}

            if (!response.ok) {
                const detail =
                    data.errors?.map((e) => e.message).join(", ") ||
                    data.error ||
                    "Error " + response.status;
                throw new Error(detail);
            }

            contactForm.reset();

            fields.forEach((field) => {
                const wrapper = field.closest(".contact-field");
                wrapper.classList.remove("is-valid", "is-invalid");
                field.removeAttribute("aria-invalid");
                wrapper.querySelector(".field-error").textContent = "";
            });

            contactFeedback.textContent = "¡Gracias por compartir tu experiencia! 🍜";
            contactFeedback.dataset.status = "success";

        } catch (error) {
            contactFeedback.textContent =
                "No pudimos enviar tu mensaje. Intentá nuevamente.";
            contactFeedback.dataset.status = "error";

            // El motivo real queda acá (F12 → Consola)
            console.error("Error de contacto:", error.message);

        } finally {
            submitButton.disabled = false;
            submitText.textContent = "Enviar mensaje";
        }
    });
}


/* DELIVERY + PREGUNTAS FRECUENTES */


/* REVEAL: LOS ELEMENTOS CON .reveal APARECEN AL ENTRAR EN PANTALLA
   Un solo observer sirve para todos: cada vez que un .reveal entra, le sumamos .in-view
   y dejamos de observarlo (unobserve) porque la animación ya cumplió su trabajo. */

const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }

        });

    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));

}


/* FAQ: ACORDEÓN (se abre una pregunta a la vez)
   Al hacer click en una pregunta: cerramos todas, y abrimos la clickeada
   salvo que ya estuviera abierta (en ese caso queda todo cerrado). */

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {

    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {

        const willOpen = !item.classList.contains('is-open');

        faqItems.forEach((other) => {
            other.classList.remove('is-open');
            other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        if (willOpen) {
            item.classList.add('is-open');
            question.setAttribute('aria-expanded', 'true');
        }

    });

});