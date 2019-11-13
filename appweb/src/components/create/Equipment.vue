<template>
    <div class="form">
        <div class="form_title">Equipment</div>
        <div class="name">
            <div class="label">Name</div>
            <input type="text" name="name" placeholder="The name of this beautiful (I hope) equipment" v-model="name"/>
        </div>
        <div class="quantity_locations">
            <div class="quantity">
                <div class="label">Quantity</div>
                <input type="number" name="quantity" value=1 v-model="quantity" min="1"/>
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
            <textarea name="description" class="description" placeholder="The best description of all times" v-model="description">
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
        name: "Equipment",
        data () {
            return {
                value: null,
                name: null,
                equipment_type: null,
                equipment_types: null,
                locations: null,
                pickup_location: null,
                drop_location: null,
                quantity: null,
                description: null
            }
        },
        mounted: function () {
            this.$axios.get(this.$host+"/equipment_type")
                .then(res => {
                    this.equipment_types = res.data.equipment_type;
                    /* eslint-disable no-console */
                    console.log(res.data.equipment_type);
                    /* eslint-enable no-console */
                })
                .catch(() => {
                    window.location.href = "/error_equipment_type"
                });
            this.$axios.get(this.$host+"/location")
                .then(res => {
                    this.locations = res.data.location;
                })
                .catch(() => {
                    window.location.href = "/error_location"
                });
        },
        methods: {
            submit: function () {
                this.$axios.post(this.$host+'/equipment',{
                    "name": this.name,
                    "description": this.description,
                    "quantity": this.quantity,
                    "equipment_type_id": this.equipment_type.id,
                    "pickup_location": this.pickup_location.id,
                    "drop_location": this.drop_location.id
                })
                    .then(() => {
                        window.location.href = "/"
                    })
                    .catch(() => {
                        window.location.href = "/error"
                    });
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

        cursor: pointer;

        border-radius: 2%;
    }

    div.submit > div.button:hover{
        flex-grow: unset;
        flex-basis: unset;

        cursor: pointer;

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