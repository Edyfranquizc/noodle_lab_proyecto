/* carrito.js — Cards de producto y carrito.
   Depende de: tienda-datos.js (MENU, precios) y de la librería Lucide. */


/* TIENDA — ESTADO */

const cart = {};

let productState = { id: null, qty: 1, extra: false, returnable: false };

let cartView = 'cart';

let confirmedTotal = 0;

/* Para devolver el foco al botón que abrió la card (accesibilidad con teclado) */
let lastFocusedEl = null;

let toastTimer = null;


/* TIENDA — REFERENCIAS AL DOM */

const overlayEl = document.getElementById('overlay');

const productModal = document.getElementById('product-modal');

const cartDrawer = document.getElementById('cart-drawer');

const cartBtn = document.getElementById('cart-btn');

const cartCountEl = document.getElementById('cart-count');

const cartBodyEl = document.getElementById('cart-body');

const cartFootEl = document.getElementById('cart-foot');

const toastEl = document.getElementById('toast');

const toastTextEl = document.getElementById('toast-text');


/* TIENDA — CÁLCULOS

   Siempre calculamos la cantidad y el total DESDE el carrito, en vez de
   guardarlos aparte. Así nunca se desincronizan. */

const cartCount = () => Object.values(cart).reduce((sum, qty) => sum + qty, 0);

const cartTotal = () => Object.entries(cart).reduce((sum, [key, qty]) => {

    const { id, returnable } = parseKey(key);

    return sum + unitPriceOf(id, returnable) * qty;

}, 0);


/* TIENDA — CONTADOR DEL ÍCONO DEL CARRITO */

function updateBadge(bump = false) {

    const count = cartCount();

    cartCountEl.textContent = count;

    cartCountEl.classList.toggle('has-items', count > 0);

    cartBtn.setAttribute('aria-label', `Abrir carrito (${count} productos)`);

    if (bump) {

        cartBtn.classList.remove('bump');

        void cartBtn.offsetWidth;

        cartBtn.classList.add('bump');

    }

}


/* TIENDA — ABRIR Y CERRAR PANELES (card y carrito comparten overlay) */

function openPanel(panel) {

    lastFocusedEl = document.activeElement;

    closePanels(false);   /* por si había otro panel abierto */

    overlayEl.classList.add('is-open');

    panel.classList.add('is-open');

    panel.setAttribute('aria-hidden', 'false');

    document.body.classList.add('lock-scroll');

    cartBtn.setAttribute('aria-expanded', String(panel === cartDrawer));

    /* Mandamos el foco al botón cerrar para que el teclado quede dentro del panel */
    requestAnimationFrame(() => panel.querySelector('[data-close]')?.focus());

}

function closePanels(restoreFocus = true) {

    [productModal, cartDrawer].forEach((panel) => {

        panel.classList.remove('is-open');

        panel.setAttribute('aria-hidden', 'true');

    });

    overlayEl.classList.remove('is-open');

    document.body.classList.remove('lock-scroll');

    cartBtn.setAttribute('aria-expanded', 'false');

    /* Esto es -> si cierras el carrito después de confirmar, la próxima vez que se abra
       tiene que verse el carrito normal (vacío), no el cartel de éxito */
    cartView = 'cart';

    if (restoreFocus) {

        lastFocusedEl?.focus();

    }

}


/* TIENDA — CARD DE PRODUCTO */

function openProduct(id) {

    const item = MENU[id];

    if (!item) return;

    /* Cada vez que se abre una card, arranca de cero: 1 unidad, botella nueva y sin extra */
    productState = { id, qty: 1, extra: false, returnable: false };

    const isExtra = id === EXTRA_ID;

    /* Zona de imagen: foto de la botella, o ícono de llama si es el extra picante */
    const heroHTML = isExtra
        ? `<div class="product-hero product-hero--picante"><i data-lucide="flame"></i></div>`
        : `<div class="product-hero"><img src="${item.image}" alt="${item.name}"></div>`;

    /* .map() convierte cada ingrediente en un <li>; .join('') los une en un solo texto.
       Si un producto no tiene ingredientes (el extra picante), no mostramos el bloque "Fórmula". */
    const formulaHTML = item.ingredients.length === 0 ? '' : `
        <div>
            <h4 class="product-sub">Fórmula</h4>
            <ul class="ingredient-list">
                ${item.ingredients.map((ingredient) => `<li><i data-lucide="check"></i>${ingredient}</li>`).join('')}
            </ul>
        </div>`;

    /* Selector de envase: solo para los caldos (el extra picante no tiene versión retornable) */
    const bottleHTML = !item.priceReturn ? '' : `
        <div>
            <h4 class="product-sub">Envase</h4>
            <div class="option-group" role="radiogroup" aria-label="Tipo de envase">
                <button type="button" class="option is-active" role="radio" aria-checked="true" data-bottle="new">
                    <strong>Botella nueva</strong>
                    <span>${formatPrice(item.price)}</span>
                </button>
                <button type="button" class="option" role="radio" aria-checked="false" data-bottle="ret">
                    <strong><i data-lucide="recycle"></i> Traigo mi botella</strong>
                    <span>${formatPrice(item.priceReturn)}</span>
                </button>
            </div>
        </div>`;

    /* El selector de extra picante NO aparece en la card del propio picante */
    const extraHTML = isExtra ? '' : `
        <label class="extra-row">
            <input type="checkbox" id="extra-toggle">
            <span class="extra-info">
                <strong>Extra picante</strong>
                <small>Se suma aparte</small>
            </span>
            <span class="extra-price">+ ${formatPrice(MENU[EXTRA_ID].price)}</span>
        </label>`;

    productModal.innerHTML = `
        <button type="button" class="modal-close" data-close aria-label="Cerrar"><i data-lucide="x"></i></button>

        ${heroHTML}

        <div class="product-body">
            <span class="product-tag">[ ${item.num} · ${item.symbol} ] ${item.category.toUpperCase()}</span>

            <div class="product-head">
                <div>
                    <h3 id="product-title">${item.name}</h3>
                    <span class="product-subtitle">${item.subtitle}</span>
                </div>
                <span class="product-price" id="product-price">${formatPrice(item.price)}</span>
            </div>

            <p class="product-desc">${item.description}</p>

            ${formulaHTML}

            ${bottleHTML}

            ${extraHTML}

            <div class="product-row">
                <div class="product-total">
                    <span>TOTAL</span>
                    <strong id="product-total"></strong>
                </div>

                <div class="stepper" aria-label="Cantidad">
                    <button type="button" data-qty="-1" aria-label="Quitar una unidad"><i data-lucide="minus"></i></button>
                    <span id="product-qty">1</span>
                    <button type="button" data-qty="1" aria-label="Sumar una unidad"><i data-lucide="plus"></i></button>
                </div>
            </div>

            <button type="button" class="add-btn" id="add-btn">
                <span>Agregar al carrito</span>
                <span class="add-plus"><i data-lucide="plus"></i></span>
            </button>
        </div>
    `;

    /* Si la imagen es horizontal (una foto), la mostramos completa de borde a borde.
       Si es vertical (la botella sola), conserva su recuadro con margen.
       Hay que esperar a que cargue para conocer sus medidas (naturalWidth / naturalHeight):
       con CSS solo no se puede saber si una imagen es horizontal o vertical. */
    const heroImg = productModal.querySelector('.product-hero img');

    if (heroImg) {

        const markIfPhoto = () => {
            heroImg.parentElement.classList.toggle('product-hero--photo', heroImg.naturalWidth > heroImg.naturalHeight);
        };

        if (heroImg.complete) {
            markIfPhoto();
        } else {
            heroImg.addEventListener('load', markIfPhoto, { once: true });
        }

    }

    /* Los <i data-lucide> recién creados todavía no son íconos: hay que pedirle a Lucide que los dibuje */
    lucide.createIcons();

    updateProductTotal();

    openPanel(productModal);

}

/* Recalcula el precio y el total de la card según envase, cantidad y extra */
function updateProductTotal() {

    const { id, qty, extra, returnable } = productState;

    const basePrice = unitPriceOf(id, returnable);

    const unitPrice = basePrice + (extra ? MENU[EXTRA_ID].price : 0);

    document.getElementById('product-price').textContent = formatPrice(basePrice);

    document.getElementById('product-qty').textContent = qty;

    document.getElementById('product-total').textContent = formatPrice(unitPrice * qty);

}

/* Pasa lo elegido en la card al carrito */
function addFromProduct() {

    const { id, qty, extra, returnable } = productState;

    const withExtra = extra && id !== EXTRA_ID;

    addToCart(cartKey(id, returnable), qty);

    /* El extra picante viaja como producto APARTE (tiene su propia línea y su propio +/−) */
    if (withExtra) {

        addToCart(EXTRA_ID, qty);

    }

    cartView = 'cart';

    updateBadge(true);

    renderCart();

    closePanels();

    showToast(`${MENU[id].name} × ${qty} agregado${withExtra ? ' + extra picante' : ''}`);

}


/* TIENDA — OPERACIONES DEL CARRITO */

function addToCart(key, qty) {

    cart[key] = Math.min(MAX_QTY, (cart[key] || 0) + qty);

}

/* delta = +1 o −1. Si la cantidad llega a 0, el producto sale del carrito */
function changeQty(key, delta) {

    cart[key] = Math.min(MAX_QTY, (cart[key] || 0) + delta);

    if (cart[key] <= 0) {

        delete cart[key];

    }

    updateBadge();

    renderCart();

}

function clearCart() {

    Object.keys(cart).forEach((key) => delete cart[key]);

    updateBadge();

    renderCart();

}

/* No hay servidor todavía: "confirmar" guarda el total, vacía el carrito y muestra el cartel de éxito */
function confirmOrder() {

    confirmedTotal = cartTotal();

    Object.keys(cart).forEach((key) => delete cart[key]);

    cartView = 'success';

    updateBadge();

    renderCart();

}


/* TIENDA — DIBUJAR EL CARRITO */

function renderCart() {

    /* Pantalla de pedido confirmado */
    if (cartView === 'success') {

        cartBodyEl.innerHTML = `
            <div class="cart-success">
                <span class="success-icon"><i data-lucide="check"></i></span>
                <h4>¡Pedido en el laboratorio!</h4>
                <p>Recibimos tu pedido por ${formatPrice(confirmedTotal)}. Ya estamos preparando la fórmula.</p>
            </div>`;

        cartFootEl.innerHTML = `
            <button type="button" class="btn-cta btn-block" data-close>Seguir pidiendo</button>`;

        lucide.createIcons();

        return;

    }

    const keys = Object.keys(cart);

    /* Carrito vacío */
    if (keys.length === 0) {

        cartBodyEl.innerHTML = `
            <div class="cart-empty">
                <i data-lucide="flask-conical"></i>
                <h4>Tu probeta está vacía</h4>
                <p>Elegí un caldo y armá tu fórmula.</p>
            </div>`;

        cartFootEl.innerHTML = '';

        lucide.createIcons();

        return;

    }

    /* Carrito con productos: una fila por producto */
    cartBodyEl.innerHTML = keys.map((key) => {

        const { id, returnable } = parseKey(key);

        const item = MENU[id];

        const qty = cart[key];

        const unitPrice = unitPriceOf(id, returnable);

        const thumbHTML = item.image
            ? `<div class="cart-thumb"><img src="${item.image}" alt=""></div>`
            : `<div class="cart-thumb cart-thumb--picante"><i data-lucide="flame"></i></div>`;

        /* Etiqueta del envase, solo si es retornable */
        const tagHTML = returnable ? `<span class="cart-tag"><i data-lucide="recycle"></i> Retornable</span>` : '';

        /* Con 1 sola unidad, el botón "−" pasa a ser un tacho: restar ahí = quitar el producto */
        const minusIcon = qty === 1 ? 'trash-2' : 'minus';

        const minusLabel = qty === 1 ? `Quitar ${item.name}` : `Restar una unidad de ${item.name}`;

        return `
            <div class="cart-item">
                ${thumbHTML}

                <div class="cart-info">
                    <span class="cart-name">${item.name}</span>
                    ${tagHTML}
                    <span class="cart-unit">${formatPrice(unitPrice)} c/u</span>
                </div>

                <div class="cart-line">
                    <div class="stepper stepper--sm">
                        <button type="button" data-action="dec" data-id="${key}" aria-label="${minusLabel}"><i data-lucide="${minusIcon}"></i></button>
                        <span>${qty}</span>
                        <button type="button" data-action="inc" data-id="${key}" aria-label="Sumar una unidad de ${item.name}"><i data-lucide="plus"></i></button>
                    </div>
                    <span class="cart-subtotal">${formatPrice(unitPrice * qty)}</span>
                </div>
            </div>`;

    }).join('');

    cartFootEl.innerHTML = `
        <div class="cart-total">
            <span>TOTAL</span>
            <strong>${formatPrice(cartTotal())}</strong>
        </div>
        <button type="button" class="btn-cta btn-block" data-action="confirm">
            Confirmar pedido
            <i data-lucide="flask-conical"></i>
        </button>
        <button type="button" class="cart-clear" data-action="clear">Vaciar carrito</button>`;

    lucide.createIcons();

}


/* TIENDA — AVISO CORTO ("toast") */

function showToast(message) {

    toastTextEl.textContent = message;

    toastEl.classList.add('is-visible');

    clearTimeout(toastTimer);   /* si ya había un aviso, reiniciamos el reloj */

    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2400);

}


/* TIENDA — EVENTOS */

/* 1) Click en un caldo de "Elige tu caldo" → abre su card */
document.querySelectorAll('.min-card[data-flavor]').forEach((card) => {

    card.addEventListener('click', () => openProduct(card.dataset.flavor));

});

/* 2) Dentro de la card: envase, +/−, extra picante y agregar */
productModal.addEventListener('click', (event) => {

    const button = event.target.closest('button');

    if (!button) return;

    /* Elegir envase: marcamos el botón activo y recalculamos precios */
    if (button.dataset.bottle) {

        productState.returnable = button.dataset.bottle === 'ret';

        productModal.querySelectorAll('.option').forEach((option) => {

            const isActive = option === button;

            option.classList.toggle('is-active', isActive);

            option.setAttribute('aria-checked', String(isActive));

        });

        updateProductTotal();

    }

    if (button.dataset.qty) {

        const next = productState.qty + Number(button.dataset.qty);

        productState.qty = Math.min(MAX_QTY, Math.max(1, next));

        updateProductTotal();

    }

    if (button.id === 'add-btn') {

        addFromProduct();

    }

});

productModal.addEventListener('change', (event) => {

    if (event.target.id === 'extra-toggle') {

        productState.extra = event.target.checked;

        updateProductTotal();

    }

});

/* 3) Dentro del carrito: sumar, restar, vaciar y confirmar */
cartDrawer.addEventListener('click', (event) => {

    const button = event.target.closest('button[data-action]');

    if (!button) return;

    const { action, id } = button.dataset;

    if (action === 'inc') changeQty(id, 1);

    if (action === 'dec') changeQty(id, -1);

    if (action === 'clear') clearCart();

    if (action === 'confirm') confirmOrder();

});

/* 4) Ícono del carrito en el nav */
cartBtn.addEventListener('click', () => {

    /* Si el menú hamburguesa estaba abierto, lo cerramos para que no se superponga con el carrito.
       Buscamos los elementos acá mismo en vez de usar las variables de main.js:
       así este archivo funciona solo, sin depender de otro. */
    const mobileMenu = document.getElementById('nav-menu');

    const mobileToggle = document.getElementById('hamburger');

    mobileMenu?.classList.remove('active');

    mobileToggle?.classList.remove('active');

    mobileToggle?.setAttribute('aria-expanded', 'false');

    renderCart();

    openPanel(cartDrawer);

});

/* 5) Cerrar: botón X (cualquier [data-close]), click en el fondo oscuro o tecla Escape */
document.addEventListener('click', (event) => {

    if (event.target.closest('[data-close]')) {

        closePanels();

    }

});

overlayEl.addEventListener('click', () => closePanels());

document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {

        closePanels();

    }

});

/* Estado inicial del contador y del carrito */
updateBadge();

renderCart();