<template>
    <div class="content">
        <div class="line top">
            <div class="column">
                <div class="line name">{{ location.name }}</div>
                <div class="line description">
                    {{ location.description }}
                </div>
            </div>
        </div>
        <div class="line map">
            <l-map ref="location_map"
                   :center="center"
                   :zoom="zoom">
                <l-tile-layer :url="url"></l-tile-layer>
                <l-marker :lat-lng="center"></l-marker>
            </l-map>
        </div>
        <div class="line controls">
            <div class="button" style="width: 20%;" v-on:click="backLocation">
                Back
            </div>
            <div class="button" style="width: 20%;" v-on:click="editLocation">
                Edit
            </div>
            <div class="button delete" style="width: 20%;" v-on:click="deleteLocation">
                Delete
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LocationDetail",
        data () {
            return {
                url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
                zoom: 16,
                id: null,
                location: null,
                center: null
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.$axios.get(this.$host+"/location/id/"+this.id)
                .then(res => {
                    this.location = res.data.location;
                    this.center = [this.location.gps_lat, this.location.gps_long];
                    this.$nextTick(() => {
                        this.$refs.location_map.mapObject.center = this.center;
                    })
                });
        },
        methods : {
            backLocation () {
                this.$router.push('/show/locations');
            },
            editLocation () {
                this.$router.push('/edit/location/'+this.id);
            },
            deleteLocation () {

            }
        }
    }
</script>

<style scoped>
    div.content{
        display: flex;
        flex-direction: column;
        width: 70%;
        height: 90%;
    }

    div.line{
        display: flex;
        align-items: center;
        width: 90%;
        flex-basis: 100%;
    }

    div.line.map{
        flex-grow: 6;
        flex-basis: unset;
        padding: 2%;
    }

    div.line.top{
        flex-basis: unset;
        border-bottom: solid darkgray 1px;
        padding: 2% 0 2% 0;
    }

    div.line.controls{
        flex-basis: unset;
        border-top: solid darkgray 1px;
        justify-content: space-between;
        padding-top: 1%;
    }

    div.column{
        display: flex;
        flex-basis: 100%;
        height: 100%;
        align-items: center;
        flex-direction: column;
    }

    div.description{
        padding: 2% 5%;
        justify-content: flex-start;
        align-items: flex-start;
    }

    div.name{
        font-size: 2em;
    }

    img{
        height: auto;
        max-width: 80%;
    }

    div.button{
        flex-grow: unset;
        flex-basis: unset;

        display: flex;
        justify-content: center;

        cursor: pointer;

        padding: 1%;

        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
    }

    div.button:hover{
        flex-grow: unset;
        flex-basis: unset;

        background-color: #d6d5ae;
    }

    div.button.delete:hover{
        flex-grow: unset;
        flex-basis: unset;

        background-color: #8a0200;
    }

</style>