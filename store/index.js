const state = () => ({
  lat: null,
  lng: null,
  ip: null,
  location: null,
  timezone: null,
  isp: null,
})

const getters = {
  lat(state) {
    return state.lat
  },
  lng(state) {
    return state.lng
  },
  ip(state) {
    return state.ip
  },
  location(state) {
    return state.location
  },
  timezone(state) {
    return state.timezone
  },
  isp(state) {
    return state.isp
  },
}

const mutations = {
  SET_LAT(state, lat) {
    state.lat = lat
  },
  SET_LNG(state, lng) {
    state.lng = lng
  },
  SET_IP(state, ip) {
    state.ip = ip
  },
  SET_LOCATION(state, location) {
    state.location = location
  },
  SET_TIMEZONE(state, timezone) {
    state.timezone = timezone
  },
  SET_ISP(state, isp) {
    state.isp = isp
  },
}

const actions = {
  async nuxtServerInit({ dispatch }) {
    const data = await this.$axios.$get('http://ipinfo.io/json')
    await dispatch('fetchIp', data.ip)
  },

  async fetchIp({ commit }, inputIp) {
    try {
      const data = await this.$axios.$get(
        'https://geo.ipify.org/api/v1?apiKey=at_bizS8q7KAMB4nBhU0rGOuW43wVQwu&ipAddress=' +
          inputIp
      )
      commit('SET_LAT', data.location.lat)
      commit('SET_LNG', data.location.lng)
      commit('SET_IP', data.ip)
      commit(
        'SET_LOCATION',
        data.location.city +
          ', ' +
          data.location.region +
          ', ' +
          data.location.country
      )
      commit('SET_TIMEZONE', data.location.timezone)
      commit('SET_ISP', data.isp)
    } catch (e) {
      alert('Wrong IP')
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
