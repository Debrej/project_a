<template>
    <div class="content">
        <div class="title">Activities</div>
        <div class="scrollable">
            <ActivityCard
                    v-for="activity in activities"
                    :key="activity.id"
                    :id="activity.id"
                    :name="activity.name"
                    :start_date="$moment.utc(activity.start_date).local().format('DD-MM-YYYY HH:mm')"
                    :end_date="$moment.utc(activity.end_date).local().format('DD-MM-YYYY HH:mm')"
                    :description="activity.description"
                    :event_name="events.find(e => e.id === activity.event_id).name"
                    :supervisor="users.find(u => u.id === activity.supervisor_id).first_name + ' ' + users.find(u => u.id === activity.supervisor_id).last_name"
            ></ActivityCard>
        </div>
    </div>
</template>

<script>
    import ActivityCard from "../card/Activity";

    export default {
        name: "Activity",
        components: {
            ActivityCard
        },
        data () {
            return {
                activities: null,
                events: null,
                users: null
            }
        },
        mounted () {
            this.$axios.get(this.$host+"/event")
                .then(res => {
                    this.events = res.data.events;
                });
            this.$axios.get(this.$host+"/user")
                .then(res => {
                    this.users = res.data.users;
                });
            this.$axios.get(this.$host+"/activity")
                .then(res => {
                    this.activities = res.data.activity;
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