<template>
  <l-map class="map" ref="location_map" :center="center" :zoom="17">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker :lat-lng="center"></l-marker>
  </l-map>
</template>

<script>
export default {
  name: "Map",
  props: ["center"],
  data: () => ({
    url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  }),
  mounted() {
    this.$nextTick(function() {
      this.$refs.location_map.mapObject.center = this.center;
      this.$refs.location_map.mapObject.invalidateSize();
    });
  }
};
</script>

<style scoped lang="scss">
.map {
  min-height: 300px;
  width: 100%;
  z-index: 0;
}
</style>
