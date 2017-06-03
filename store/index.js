import _ from 'lodash'
import talib from 'ta-lib'

export const state = () => ({
  locales: ['en', 'fr'],
  locale: 'en',
  currencies: [{ticker: 'BTC_XMR', chartData: {}}]
})

export const mutations = {
  TICKER_INFO_UPDATED: function (state, payload) {
    let currencyIndex = state.currencies.findIndex(function (elem) {
      return elem.ticker === payload.ticker
    })

    if (currencyIndex !== -1) {
      payload.chartData = state.currencies[currencyIndex].chartData
      state.currencies.splice(currencyIndex, 1, payload)
    } else {
      state.currencies.push(payload)
    }
  },

  TICKER_CHART_INFO_UPDATED: function (state, payload) {
    let currencyIndex = state.currencies.findIndex(function (elem) {
      return elem.ticker === payload.ticker
    })

    let oldData = state.currencies[currencyIndex]
    oldData.chartData = payload
    state.currencies.splice(currencyIndex, 1, oldData)
  }
}

export const actions = {
  SOCKET_TICKER_INFO_UPDATED: function (state, payload) {
    const ticker = {
      ticker: payload[0],
      current: payload[1],
      lowestAsk: payload[2],
      highestBid: payload[3],
      percentChange: payload[4],
      baseVolume: payload[5],
      quoteVolume: payload[6],
      isFrozen: payload[7],
      high24: payload[8],
      low24: payload[9],
      chartData: {}
    }

    state.commit('TICKER_INFO_UPDATED', ticker)
  },

  TICKER_CHART_INFO_UPDATED: function (state, payload) {
    var marketData = {
      open: _.map(payload, 'open'),
      close: _.map(payload, 'close'),
      high: _.map(payload, 'high'),
      low: _.map(payload, 'low'),
      volume: _.map(payload, 'volume'),
      weightedAverage: _.map(payload, 'weightedAverage'),
      ticker: payload.ticker
    }

    marketData.EMA1 = talib.EMA(marketData.close.reverse(), 120).shift()
    marketData.EMA2 = talib.EMA(marketData.close, 240).shift()

    console.log(marketData)

    state.commit('TICKER_CHART_INFO_UPDATED', marketData)
  }
}
