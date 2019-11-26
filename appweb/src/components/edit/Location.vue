<template>
    <div class="form">
        <div class="form_title">Location</div>
        <div class="container_name_map">
            <div class="name">
                <div class="label">Name</div>
                <input type="text" name="name" placeholder="The name of this beautiful (I hope) place" v-model="location.name" style="width: 80%;"/>
            </div>
            <div class="map">
                <div class="label">Map</div>
                <l-map ref="location_map"
                       :center="center"
                       :zoom="zoom"
                       @update:zoom="zoomUpdated"
                       @update:center="centerUpdated">
                    <l-tile-layer :url="url"></l-tile-layer>
                    <l-marker :lat-lng="center"></l-marker>
                </l-map>
            </div>
        </div>
        <div class="description">
            <div class="label">Description</div>
            <textarea name="description" class="description" placeholder="The best description of all times" v-model="location.description">
        </textarea>
        </div>
        <div class="submit">
            <div class="button" style="width: 20%;" v-on:click="submit">
                Submit
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LocationEdit",
        el: '#app',
        data () {
            return {
                id: null,
                center: null,
                url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
                zoom: 16,
                location: null
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.$axios.get(this.$host+'/location/id/'+this.id)
                .then(res => {
                    this.location = res.data.location;
                    this.center = [this.location.gps_lat, this.location.gps_long];
                    this.$nextTick(() => {
                        this.$refs.location_map.mapObject.center = this.center;
                    })
                });
        },
        methods: {
            submit () {
                this.$axios.put(this.$host+'/location/'+this.id,{
                    "name": this.location.name,
                    "description": this.location.description,
                    "gps_long": this.center.lng,
                    "gps_lat": this.center.lat
                })
                    .then(() => {
                        window.location.href = "/show/location/"+this.id;
                    })
                    .catch(err => {
                        /* eslint-disable no-console */
                        console.log(err);
                        /* eslint-enable no-console */
                    });

            },
            zoomUpdated (zoom) {
                this.zoom = zoom;
            },
            centerUpdated (center) {
                this.center = center;
            }
        }
    }
</script>

<style scoped>
    div.form{
        height: 90%;
        width: 60%;
        display: flex;
        flex-direction: column;
    }

    div.form_title{
        font-size: 1.5em;
    }

    div.container_name_map{
        display: flex;
        flex-grow: 2;
    }

    div.name{
        flex-grow: 1;
    }

    div.map{
        flex-grow: 1;
        height: 100%;
    }

    div.description{
        flex-grow: 3;
    }

    div.label{
        font-size: 1.2em;
    }

    div.submit{
        display: flex;
        justify-content: flex-end;
    }

    div.submit > div.button{
        flex-grow: unset;
        flex-basis: unset;

        display: flex;
        justify-content: center;

        cursor: pointer;

        border-radius: 2%;
        padding: 1%;
    }

    div.submit > div.button:hover{
        flex-grow: unset;
        flex-basis: unset;

        background-color: #d6d5ae;
    }

    input.description{
        height: 80%;
        margin: 0;
    }

    input[type=text], input[type=password]{
        border: none;
        border-bottom: 1px solid #99987b;
        background: none;
        padding: 3% 2%;
        margin-bottom: 5%;
        width: 100%;
        font-size: 1.2em;
    }

    textarea.description{
        border: none;
        border-bottom: 1px solid #99987b;
        background: none;
        margin-top: 2%;
        width: 100%;
        height: 80%;
        font-size: 1.2em;
        resize: none;
    }
</style>