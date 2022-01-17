import {tokens} from "./exchange_tokens/tokens.js"

export default {
  namespaced: true,

  state: {
    step: {
      swap: true,
      swapmodal: false,
      swapper: false
    },

    swap: {},

    from: null,
    to: null,

    allTokens: [
      { 
        name: 'Binance Smart Chain Tokens', 
        icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png',
        tokens: tokens.bsctokens 
      },
      { 
        name: 'Ethereum Bridged Tokens', 
        icon: 'https://openfi.dev/tokens/default/ETH.png',
        tokens: tokens.ethtokens 
      }
    ],
    networks: [
      {
        name: 'Harmony Network',
        icon: 'https://openfi.dev/tokens/default/ONE.png',
      },
      {
        name: 'Binance Smart Chain',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png',
      },
      {
        name: 'Ethereum Network', 
        icon: 'https://openfi.dev/tokens/default/ETH.png',
      }
    ]
  },

  getters: {
    // Retrieves All tokens or by user input
    retrieveTokens: (state) => (search, chain) => {
      if (search === '') { 
        return state.allTokens
      }
      let filtered = [];
      let regex = RegExp(`\w?${search}`, 'i')
  
      state.allTokens.forEach(network => {
        let tokenFound = {}
        
        Object.entries(network.tokens[chain]).forEach(([k, v]) => {
          if (v.Symbol.match(regex) || v.name.match(regex)) {
            tokenFound[k] = v
          }
        });
        if (Object.keys(tokenFound).length > 0) {
          filtered.push({
            name: network.name,
            icon: network.icon,
            tokens: { [chain] : tokenFound }
          })
        }
      });
       return filtered
    },

    // It retrieves the exact token requested
    findToken: (state) => (token) => { 
      let found
      state.allTokens.forEach(network => {        
        Object.entries(network.tokens).forEach(([k, v]) => {
          if (v.Symbol.match(token)) {
            found = v
          }
        });
      });
      return found
    },

    // It retrieves the current state of token selection
    getToken: (state) => {
      return state.swap
    },

    // get current step state
    getStepState: (state) => (step) => {
      return state.step[step]
    },

    // get networks
    getNetworks: (state) => {
      return state.networks
    },

    getFromNetwork: (state) => {
      return state.from
    },

    getToNetwork: (state) => {
      return state.to
    },
  },
  
  actions: {
    // Navigate through Swap feature
    goTo({ commit }, value) {
      commit('_goTo', value)
    },

    // Triggers the 'twin' method in the mutations to
    // change the state.swap
    setToken({ commit }, value) {
      commit('_setToken', value)
    },

    // Switch Tokens before executing the swap
    switchTokens({ commit }) {
      commit('_switchTokens')
    },

    switchNetwork({ commit }) {
      commit('_switchNetwork')
    },

    setFromNetwork({ commit }, value) {
      
      commit('_setFromNetwork', value)
      
    },

    setToNetwork({ commit }, value) {
      commit('_setToNetwork', value)
    },

    resetNetworks({ commit }) {
      commit('_resetNetworks')
    },

    // Resets the token selection
    resetTokens({ commit }) {
      commit('_resetTokens')
    }
  },

  mutations: {
    _goTo: (state, value) => {
      Object.keys(state.step).forEach((s) => {
        s == String(value) ? state.step[s] = true : state.step[s] = false
      });
    },

    _setToken: (state, value) => {
      state.swap[value.tokenRef] = value.token
    },

    _setFromNetwork: (state, value) => {
 
      state.from = value
  
    },

    _setToNetwork: (state, value) => {
      state.to = value
    },

    _switchNetwork: (state) => {
      [state.from, state.to] = [state.to, state.from]
    },

    _switchTokens: (state) => {
      [state.swap.token1, state.swap.token2] = [state.swap.token2, state.swap.token1]
    },

    _resetNetworks: (state) => {
      state.from = null;
      state.to = null;
    }
  }
}