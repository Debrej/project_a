<template>
    <div class="card" v-on:click="redirect">
        <div class="flexline">
            <div class="column">
                <div class="name">{{ name }}</div>
                <div class="description">{{ description }}</div>
            </div>
            <div class="column" v-on:click.stop>
                <l-map ref="location_map"
                       :center="center"
                       :zoom="zoom">
                    <l-tile-layer :url="url"></l-tile-layer>
                    <l-marker :lat-lng="center"></l-marker>
                </l-map>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LocationCard",
        data () {
          return {
              url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
              zoom: 16
          }
        },
        props : [
            'id',
            'name',
            'description',
            'center'
        ],
        mounted () {
            this.$nextTick(() => {
                this.$refs.location_map.mapObject.center = this.center;
            })
        },
        methods: {
            redirect () {
                this.$router.push("/show/location/"+this.id);
            }
        }
    }
</script>

<style scoped>
    div.card{
        display: flex;
        flex-direction: column;
        width: 90%;
        border: #d6d5b4 solid 1px;
        align-items: center;
        padding: 3%;
        margin-bottom: 2%;
        max-height: 20vh;
        min-height: 12vh;
        cursor: pointer;

        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
    }

    div.card:hover{
        background-color: #d0d0d0;
    }

    div.flexline{
        display: flex;
        align-items: center;
        width: 90%;
        height: 100%;
        min-height: 8vh;
    }

    div.description{
        flex-basis: 100%;
        width: 90%;
        padding: 2% 0 2% 0;
        max-height: 20vh;
    }

    div.name{
        flex-basis: 100%;
        font-size: 1.2em;
    }

    div.column{
        flex-basis: 100%;
        height: 100%;
        min-height: 180px
    }
</style>