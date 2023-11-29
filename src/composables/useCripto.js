import { ref, onMounted, computed } from 'vue'

export default function useCripto() {

    const criptomonedas = ref([]);

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar' },
        { codigo: 'EUR', texto: 'Euro' },
        { codigo: 'GBP', texto: 'Libra' }
    ])

    const cotizacion = ref({});
    const loader = ref(false);

    // Computed properties
    const mostrarResultado = computed(() => {
        return Object.values(cotizacion.value).length > 0
    })

    // LifeCylce hooks
    onMounted(() => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(({ Data }) => {
                criptomonedas.value = Data
            })
    })

    const obtenerCotizacion = async (cotizar) => {
        // Construir url
        loader.value = true;
        const { crypto, moneda } = cotizar;
        let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        //console.log(data.DISPLAY[crypto][moneda])
        cotizacion.value = data.DISPLAY[crypto][moneda]
        loader.value = false;
    }

    return {
        monedas,
        criptomonedas,
        obtenerCotizacion,
        cotizacion,
        loader,
        mostrarResultado
    }
}