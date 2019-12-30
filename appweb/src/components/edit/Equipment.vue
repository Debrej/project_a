<template>
    <div class="form">
        <div class="form_title">Equipment</div>
        <div class="name">
            <div class="label">Name</div>
            <input type="text" name="name" placeholder="The name of this beautiful (I hope) equipment" v-model="equipment.name"/>
        </div>
        <div class="quantity_locations">
            <div class="quantity">
                <div class="label">Quantity</div>
                <input type="number" name="quantity" v-model="equipment.quantity" min="1"/>
            </div>
            <div class="location">
                <div class="label">Pickup Location</div>
                <v-select v-model="pickup_location" as="name::id" :from="locations"></v-select>
            </div>
            <div class="location">
                <div class="label">Drop Location</div>
                <v-select v-model="drop_location" as="name::id" :from="locations"></v-select>
            </div>
        </div>
        <div class="equipment_type">
            <div class="label">Equipment Type</div>
            <v-select v-model="equipment_type" as="name::id" :from="equipment_types"></v-select>
        </div>
        <div class="description">
            <div class="label">Description</div>
            <textarea name="description" class="description" placeholder="The best description of all times" v-model="equipment.description">
        </textarea>
        </div>
        <div class="submit">
            <div class="button" style="width: 20%;" v-on:click="cancel">
                Cancel
            </div>
            <div class="button" style="width: 20%;" v-on:click="submit">
                Submit
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Equipment",
        data () {
            return {
                value: null,
                id: null,
                equipment: null,
                equipment_types: null,
                equipment_type: null,
                locations: null,
                pickup_location: null,
                drop_location: null
            }
        },
        mounted: function () {
            this.id = this.$route.params.id;
            this.$axios.all([
                    this.$axios.get(this.$host+"/equipment_type"),
                    this.$axios.get(this.$host+"/location")
                ])
                .then(res => {
                    this.equipment_types = res[0].data.equipment_type;
                    this.locations = res[0].data.location;
                    
                    this.$axios.get(this.$host+"/equipment/id/"+this.id)
                        .then(res => {
                            this.equipment = res.data.equipment;
                            this.equipment_type = this.equipment_types[this.equipment.equipment_type_id];
                            this.pickup_location = this.locations[this.equipment.pickup_location];
                            this.drop_location = this.locations[this.equipment.drop_location];
                        });
                });

        },
        methods: {
            submit: function () {
                this.$axios.put(this.$host+'/equipment/'+this.id,{
                    "name": this.equipment.name,
                    "description": this.equipment.description,
                    "quantity": this.equipment.quantity,
                    "equipment_type_id": this.equipment_type.id,
                    "pickup_location": this.pickup_location.id,
                    "drop_location": this.drop_location.id
                })
                    .then(() => {
                        window.location.href = "/show/equipment/"+this.id;
                    })
                    .catch(() => {
                        window.location.href = "/error";
                    });
            },
            cancel () {
                window.location.href = "/show/event/"+this.id;
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

    div.name{
        width: 50%;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }

    div.quantity_locations{
        display: flex;
        flex-grow: 1;
        justify-content: space-evenly;
    }

    div.quantity, div.location{
        display: flex;
        width: 33%;
        flex-direction: column;
    }

    div.equipment_type{
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: space-evenly;
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

    input[type=number]{
        width: 95%;
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