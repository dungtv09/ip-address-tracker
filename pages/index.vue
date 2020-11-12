<template>
  <div>
    <div class="page__top">
      <h1 class="page__title">Ip Address Tracker</h1>
      <div class="page__search">
        <div class="input-group mb-3">
          <input
            v-model="inputIp"
            type="text"
            class="form-control"
            placeholder="Search for any IP address or domain"
            aria-describedby="button-addon"
          />
          <div class="input-group-append">
            <button
              id="button-addon"
              class="btn btn-outline-secondary"
              type="button"
              @click="fetchIp"
            >
              >
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="ip-information">
        <ul class="info-list">
          <li class="info-item">
            <h6 class="info__title">IP</h6>
            <p class="info__content">{{ ip }}</p>
          </li>
          <li class="info-item">
            <h6 class="info__title">LOCATION</h6>
            <p class="info__content">{{ location }}</p>
          </li>
          <li class="info-item">
            <h6 class="info__title">TIMEZONE</h6>
            <p class="info__content">{{ timezone }}</p>
          </li>
          <li class="info-item">
            <h6 class="info__title">ISP</h6>
            <p class="info__content">{{ isp }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div id="map-wrap" class="page__bottom">
      <client-only>
        <l-map :zoom="15" :center="[lat, lng]">
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-marker :lat-lng="[lat, lng]"></l-marker>
        </l-map>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      inputIp: '',
    }
  },

  computed: {
    ...mapGetters(['lat', 'lng', 'ip', 'location', 'timezone', 'isp']),
  },

  methods: {
    fetchIp() {
      this.$store.dispatch('fetchIp', this.inputIp)
    },
  },
}
</script>

<style scoped>
.page__title {
  color: #fff;
  margin-top: 25px;
}
.input-group {
  margin-top: 10px;
  width: 700px;
}
#button-addon {
  background-color: #000;
  width: 45px;
  color: #fff;
}
#button-addon:hover {
  color: grey;
}
.page__top {
  background-image: url(~assets/images/pattern-bg.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.page__bottom {
  background-color: yellow;
  width: 100%;
  height: 70vh;
  position: relative;
  z-index: 1;
}

.ip-information {
  background-color: white;
  margin: 0;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: auto;
  border-radius: 10px;
  z-index: 2;
}
.info-list {
  display: flex;
  justify-content: space-around;
  padding: 25px 0;
}
.info__title {
  color: grey;
}
.info__content {
  font-size: 20px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.info-item {
  padding: 0 25px;
}
.info-item:not(:first-child) {
  border-left: solid lightgray 2px;
}
</style>
