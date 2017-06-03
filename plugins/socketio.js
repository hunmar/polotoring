import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import store from '~store'

Vue.use(VueSocketio, 'https://poloniex-socketio-proxy-glrydwdmnv.now.sh', store)
