<template>
    <div class="content">
        <div class="title">Equipments</div>
        <div class="scrollable">
            <EquipmentCard
                    v-for="equipment in equipments"
                    :key="equipment.id"
                    :id="equipment.id"
                    :name="equipment.name"
                    :description="equipment.description"
                    :quantity="equipment.quantity"
                    :pickup_location="locations.find(l => l.id === equipment.pickup_location).name"
                    :drop_location="locations.find(l => l.id === equipment.drop_location).name"
                    :type_name="equipment_types.find(t => t.id === equipment.equipment_type_id).name"
            ></EquipmentCard>
        </div>
    </div>
</template>

<script>
    import EquipmentCard from '../card/Equipment';

    export default {
        name: "Equipment",
        components: {
            EquipmentCard
        },
        data () {
            return {
                equipments: null,
                locations: null,
                equipment_types: null
            }
        },
        mounted () {
            this.$axios.get(this.$host+"/equipment_type")
                .then(res => {
                    this.equipment_types = res.data.equipment_type;
                });
            this.$axios.get(this.$host+"/location")
                .then(res => {
                    this.locations = res.data.location;
                });
            this.$axios.get(this.$host+"/equipment")
                .then(res => {
                    this.equipments = res.data.equipments;
                });
        }
    }
</script>

<style scoped>
    div.content{
        height: 90%;
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div.title{
        font-size: 1.5em;
        width: 100%;
        margin-bottom: 2%;
    }

    div.scrollable{
        overflow: auto;
        width: 100%;
    }
</style>