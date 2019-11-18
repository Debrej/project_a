<template>
    <div class="content">
        <div class="title">Events</div>
        <div class="scrollable">
            <EventCard
                    v-for="event in events"
                    :key="event.id"
                    :name="event.name"
                    :start_date="$moment.utc(event.start_date).local().format('DD-MM-YYYY HH:mm')"
                    :end_date="$moment.utc(event.end_date).local().format('DD-MM-YYYY HH:mm')"
                    :description="event.description"
            ></EventCard>
        </div>
    </div>
</template>

<script>
    import EventCard from '../card/Event';

    export default {
        name: "Event",
        components: {
            EventCard
        },
        data () {
            return {
                events: null
            }
        },
        mounted () {
            this.$axios.get(this.$host + '/event')
                .then(res => {
                    this.events = res.data.events;
                })
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