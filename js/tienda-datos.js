/* TIENDA — DATOS DEL MENÚ

   Salen de tu carta oficial (Noodle-Lab_Menu_FINAL.pdf).

   Es el ÚNICO lugar donde viven los datos: si cambia un precio, lo cambiás

   acá y se actualiza solo en la card, el carrito y el total.



   - price       = precio con botella NUEVA

   - priceReturn = precio si el cliente TRAE su botella (retornable)

   - Los precios van en número (sin puntos ni símbolo): 32000, no "$32.000".

   - La clave (cerdo, pollo...) tiene que coincidir con el data-flavor del HTML. */



const MENU = {



    picante: {

        name: 'Extra Picante',

        subtitle: 'Se suma aparte',

        num: '01',

        symbol: 'Pi',

        category: 'Sabor',

        price: 800,   /* ⚠️ ESTE PRECIO NO ESTÁ EN TU PDF: es provisorio, poné el real */

        priceReturn: null,

        image: null,   /* sin foto: usamos el ícono de llama */

        description: 'Un toque de fuego para cualquier caldo. Se agrega aparte al que elijas.',

        ingredients: []

    },



    cerdo: {

        name: 'Caldo Cerdo',

        subtitle: 'Tonkotsu Intenso',

        num: '02',

        symbol: 'Ce',

        category: 'Proteína',

        price: 32000,

        priceReturn: 22000,

        image: 'img/Botella-cerdo-noodle-lab.png',

        description: '12hs de cocción con colágeno. Fideos incluidos.',

        ingredients: ['Caldo tonkotsu intenso', '12hs de cocción con colágeno', 'Fideos incluidos']

    },



    pollo: {

        name: 'Caldo Pollo',

        subtitle: 'Tori Paitan',

        num: '03',

        symbol: 'Po',

        category: 'Proteína',

        price: 32000,

        priceReturn: 22000,

        image: 'img/Botella-pollo-noodle-lab.png',

        description: 'Emulsión cremosa de pollo con aceite de sésamo.',

        ingredients: ['Emulsión cremosa de pollo', 'Aceite de sésamo']

    },



    vegano: {

        name: 'Caldo Vegano',

        subtitle: 'Miso Shiitake',

        num: '04',

        symbol: 'Vg',

        category: 'Plant-Based',

        price: 29000,

        priceReturn: 19000,

        image: 'img/Botella-vegano-noodle-lab.png',

        description: 'Miso blanco, hongos shiitake y kombu.',

        ingredients: ['Miso blanco', 'Hongos shiitake', 'Kombu']

    },



    pescado: {

        name: 'Caldo Pescado',

        subtitle: 'Dashi & Ostra',

        num: '05',

        symbol: 'Pe',

        category: 'Proteína',

        price: 32000,

        priceReturn: 22000,

        image: 'img/Botella-pescado-noodle-lab.png',

        description: 'Dashi tradicional de katsuobushi.',

        ingredients: ['Dashi de katsuobushi', 'Ostra']

    },



    res: {

        name: 'Caldo Res',

        subtitle: 'Shoyu Umami',

        num: '06',

        symbol: 'Re',

        category: 'Proteína',

        price: 32000,

        priceReturn: 22000,

        image: 'img/Botella-res-noodle-lab.png',

        description: 'Caldo limpio de res, soja madurada y jengibre.',

        ingredients: ['Caldo limpio de res', 'Soja madurada', 'Jengibre']

    }



};



/* El extra picante es un producto más del menú, identificado por esta clave */

const EXTRA_ID = 'picante';



/* Tope de unidades por producto, para que nadie escriba un pedido de 9999 caldos sin querer */

const MAX_QTY = 99;





/* TIENDA — FORMATO DE PRECIOS

   Intl.NumberFormat convierte 32000 → "$ 32.000" con el formato argentino.

   Lo creamos UNA vez y lo reutilizamos (crearlo cada vez sería más lento). */



const priceFormatter = new Intl.NumberFormat('es-AR', {

    style: 'currency',

    currency: 'ARS',

    maximumFractionDigits: 0

});



const formatPrice = (value) => priceFormatter.format(value);





/* TIENDA — CLAVES DEL CARRITO

   Un mismo caldo puede estar en el carrito con DOS precios (botella nueva y retornable),

   así que no alcanza con usar el id. La "clave" del carrito es:

       'cerdo'      → Caldo Cerdo con botella nueva

       'cerdo:ret'  → Caldo Cerdo retornable (el cliente trae su botella) */



const cartKey = (id, returnable) => (returnable ? `${id}:ret` : id);



const parseKey = (key) => {

    const [id, variant] = key.split(':');

    return { id, returnable: variant === 'ret' };

};



/* Precio unitario según el envase. Si el producto no tiene precio retornable (el extra picante), usa el normal */

const unitPriceOf = (id, returnable) => (returnable && MENU[id].priceReturn ? MENU[id].priceReturn : MENU[id].price);
