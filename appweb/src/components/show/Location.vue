<template>
    <div class="content">
        <div class="title">Locations</div>
        <div class="scrollable">
            <LocationCard
                    v-for="location in locations"
                    :key="location.id"
                    :name="location.name"
                    :description="location.description"
                    :center="[location.gps_lat, location.gps_long]"
            >
            </LocationCard>
        </div>
    </div>
</template>

<script>
    import LocationCard from '../card/Location';

    export default {
        name: "Location",
        data () {
            return {
                locations: null,
            }
        },
        components: {
            LocationCard,
        },
        mounted () {
            this.$axios.get(this.$host+'/location')
                .then(res => {
                    this.locations = res.data.location;
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