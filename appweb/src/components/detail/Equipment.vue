<template>
    <div class="content">
        <div class="line top">
            <div class="column">
                <div class="name">{{ equipment.name }}</div>
            </div>
            <div class="column equipment_type">
                <div class="label">Type</div>:&nbsp;{{ equipment_types.find(t => t.id === equipment.equipment_type_id).name }}
            </div>
        </div>
        <div class="line small">
            <div class="column quantity">
                <div class="label">Quantity</div>:&nbsp;{{ equipment.quantity }}
            </div>
            <div class="column description">
                <div class="label">Description</div>:&nbsp;{{ equipment.description }}
            </div>
        </div>
        <div class="line maps">
            <div class="column map">
                <Map
                        :center="[pickup_location.gps_lat, pickup_location.gps_long]"
                        :location_name="'From : '+pickup_location.name"
                >
                </Map>
            </div>
            <div class="column map">
                <Map
                        :center="[drop_location.gps_lat, drop_location.gps_long]"
                        :location_name="'To : '+drop_location.name"
                >
                </Map>
            </div>
        </div>
        <div class="line controls">
            <div class="button" style="width: 20%;" v-on:click="backEquipment">
                Back
            </div>
            <div class="button" style="width: 20%;" v-on:click="editEquipment">
                Edit
            </div>
            <div class="button delete" style="width: 20%;" v-on:click="deleteEquipment">
                Delete
            </div>
        </div>
    </div>
</template>

<script>
    import Map from "../card/Map";
    export default {
        name: "Equipment",
        components: {Map},
        data () {
            return {
                id: null,
                equipment: null,
                equipment_types: null,
                locations: null,
                pickup_location: null,
                drop_location: null
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.$axios.all([
                    this.$axios.get(this.$host+'/location'),
                    this.$axios.get(this.$host+'/equipment_type')
                ])
                .then(res => {
                    this.locations = res[0].data.location;
                    this.equipment_types = res[1].data.equipment_type;

                    this.$axios.get(this.$host+'/equipment/id/'+this.id)
                        .then(res => {
                            this.equipment = res.data.equipment;
                            this.pickup_location = this.locations.find(l => l.id === this.equipment.pickup_location);
                            this.drop_location = this.locations.find(l => l.id === this.equipment.drop_location);
                        });
                });

        },
        methods : {
            backEquipment () {
                window.location.href = '/show/equipments';
            },
            editEquipment () {
                window.location.href = '/edit/equipment/' + this.id;
            },
            deleteEquipment () {
                
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

    div.line.small{
        flex-basis: unset;
        padding: 2% 0;
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
        justify-content: flex-start;
    }

    div.column.map{
        justify-content: center;
    }

    div.column.quantity, div.column.description{
        flex-basis: unset;
        padding: 0 2% 0 2%;
    }

    div.column.equipment_type{
        justify-content: flex-end;
    }

    div.name{
        font-size: 2em;
    }

    div.label{
        text-decoration: underline;
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