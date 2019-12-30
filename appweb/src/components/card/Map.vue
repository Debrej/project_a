<template>
    <div class="content">
        <div class="name">
            {{ location_name }}
        </div>
        <div class="map">
            <l-map ref="location_map"
                   :center="center"
                   :zoom="zoom">
                <l-tile-layer :url="url"></l-tile-layer>
                <l-marker :lat-lng="center"></l-marker>
            </l-map>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Map",
        data () {
            return {
                url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
                zoom: 16
            }
        },
        props: [
            "location_name",
            "center"
        ],
        mounted () {
            this.$nextTick(() => {
                this.$refs.location_map.mapObject.center = this.center;
            })
        }
    }
</script>

<style scoped>
    div.content{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    div.name, div.map{
        width: 100%;
    }

    div.map{
        height: 100%;
        display: flex;
        justify-content: center;
    }
</style>