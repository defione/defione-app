import defione from "@/shared/defione.js";
export default {
  namespaced: true,
  modules: {
    farmData: {
      namespaced: true,
      state: {
        farmData: {},
        soloData: {},
        farmPair:{},
        customData: {},
        onePrice: 0,
        DONEPrice: 0
      },
      getters: {
        // get current step state
        getFarmData: (state) => {
          return state.farmData
        },
        getPoolData: (state, pid) => {
          return state.farmData[pid]
        },
        getSoloData: (state) => {
          return state.soloData
        },
        getStateOnePrice: (state) => {
          return state.onePrice
        },
        getStateDONEPrice: (state) => {
          return state.DONEPrice
        },
        getFarmPair: (state) => {
          return state.farmPair
        }
      },
      actions: {
        setFarmDataState({ commit }, value) {
          commit('_setFarmDataState', value)
        },
        setSoloDataState({ commit }, value) {
          commit('_setSoloDataState', value)
        },
        setCustomDataState({ commit }, value) {
          commit('_setCustomDataState', value)
        },
        setPoolDataState({ commit }, value) {
          commit('_setPoolDataState', value)
        },
        setToken1Amount({ commit }, value) {
          commit('_setToken1Amount', value)
        },
        setDONEPrice({ commit }, value) {
          commit('_setDONEprice', value)
        },
        setOnePrice({ commit }, value) {
          commit('_setOnePrice', value)
        },
        setFarmPair({ commit }, value) {
          commit('_setFarmPair', value)
        }
      },
      mutations: {
        _setFarmDataState: (state, value) => {
          state.farmData = value
        },
        _setSoloDataState: (state, value) => {
          state.soloData = value
        },
        _setCustomDataState: (state, value) => {
          state.customData = value
        },
        _setPoolDataState: (state, value) => {
          state.farmData[value.i] = value.data
        },
        _setToken1Amount: (state, value) => {
          state.token1 = value
        },
        _setDONEprice: (state, value) => {
          state.DONEPrice = value
        },
        _setOnePrice: (state, value) => {
          state.onePrice = value
        },
        _setFarmPair: (state, value) => {
          state.farmPair = value
        }
      }
    }
  }
}