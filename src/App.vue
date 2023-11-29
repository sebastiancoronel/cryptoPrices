<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import Alerta from './components/Alerta.vue'
import Spinner from './components/spinner.vue'
import useCripto from './composables/useCripto'



const cotizar = reactive({
  moneda: '',
  crypto: ''
});

const error = ref('');


/* Composables */
const { monedas, criptomonedas, obtenerCotizacion, mostrarResultado, cotizacion, loader } = useCripto()

/* Functions */

//Validate form
const cotizarCrypto = () => {
  if (Object.values(cotizar).includes('')) {
    console.log('Nada seleccionado')
    error.value = 'Todos los campos son obligatorios'
  } else {
    error.value = ''
    obtenerCotizacion(cotizar)
  }
}

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo"> <span>Criptos</span> </h1>
    <div class="contenido">
      <Alerta v-if="error">{{ error }}</Alerta>
      <form @submit.prevent="cotizarCrypto" action="" class="formulario">
        <div class="campo">
          <label for="modena">
            <select id="moneda" v-model="cotizar.moneda">
              <option value="">-- Selecciona --</option>
              <option v-for="moneda in monedas" :value=moneda.codigo>{{ moneda.texto }}</option>
            </select>
          </label>
        </div>
        <div class="campo">
          <label for="cryptos">
            <select id="cryptos" v-model="cotizar.crypto">
              <option value="">-- Selecciona --</option>
              <option v-for="criptomoneda in criptomonedas" :value=criptomoneda.CoinInfo.Name>{{
                criptomoneda.CoinInfo.FullName }}</option>
            </select>
          </label>
        </div>
        <input type="submit" class="" value="Cotizar">
      </form>
      <Spinner v-if="loader === true"></Spinner>

      <div v-if="mostrarResultado && loader != true" class="contenedor-resultado">
        <h2>Cotización</h2>
        <div class="resultado">
          <img :src="'https://www.cryptocompare.com' + cotizacion.IMAGEURL" alt="">
          <div>
            <p>Price: <span>{{ cotizacion.PRICE }}</span></p>
            <p>High price: <span>{{ cotizacion.HIGHDAY }}</span></p>
            <p>Low price: <span>{{ cotizacion.LOWDAY }}</span></p>
            <p>Vary price last 24hs: <span>{{ cotizacion.CHANGEPCT24HOUR }}%</span></p>
            <p>Last update: <span>{{ cotizacion.LASTUPDATE }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

