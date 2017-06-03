<template>
<div class="container">
  <table class="table">
    <thead>
      <tr>
        <td>ticker</td>
        <td>name</td>
        <td>high24</td>
        <td>low24</td>
        <td>current</td>
        <td>percentChange</td>
        <td>EMA1</td>
        <td>EMA2</td>
        <td>EMADelta</td>
      </tr>
    </thead>
    <tbody>
      <currency v-for="item in currencies" :key="item.name" v-bind:ticker="item.ticker" v-bind:name="item.name" v-bind:high24="item.high24" v-bind:low24="item.low24" v-bind:current="item.current" v-bind:percentChange="item.percentChange" v-bind:EMA1="item.chartData.EMA1"
          v-bind:EMA2="item.chartData.EMA2"></currency>
    </tbody>
  </table>
</div>
</template>

<script>
import axios from 'axios'

import Currency from '~components/Currency.vue'

export default {
  components: {
    Currency
  },
  data () {
    return {
      lastUpdatedCurrencyIndex: 0
    }
  },
  computed: {
    currencies: function () {
      return this.$store.state.currencies.sort(function (a, b) {
        return b.baseVolume - a.baseVolume
      })
    },
    nextUpdatedCurrency: function () {
      this.lastUpdatedCurrencyIndex = this.lastUpdatedCurrencyIndex + 1 < this.currencies.length ? this.lastUpdatedCurrencyIndex + 1 : 0
      return this.currencies[this.lastUpdatedCurrencyIndex]
    }
  },
  methods: {
    fetchChartData: function () {
      let ticker = this.nextUpdatedCurrency.ticker
      axios.get(`https://poloniex.com/public?command=returnChartData&currencyPair=${ticker}&start=1405699200&end=9999999999&period=900`)
        .then(response => {
          var data = response.data
          data.ticker = ticker
          this.$store.dispatch('TICKER_CHART_INFO_UPDATED', data)
          setTimeout(this.fetchChartData, 200)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  wamp: {
    subscribe: {
      'ticker' (args, kwArgs, details) {
        this.$store.dispatch('SOCKET_TICKER_INFO_UPDATED', args)
      }
    }
  },
  mounted () {
    this.fetchChartData()
  }
}
</script>
