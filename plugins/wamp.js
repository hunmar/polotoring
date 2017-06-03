import Vue from 'vue'
import VueWamp from 'vue-wamp'

Vue.use(VueWamp, {
  debug: true,
  url: 'wss://api.poloniex.com',
  realm: 'realm1',
  onopen: function (session, details) {
    console.log('WAMP connected', session, details)
  },
  onclose: function (reason, details) {
    console.log('WAMP closed: ' + reason, details)
  }
})
