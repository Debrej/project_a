<template>
    <div class="content">
        <div class="title">Tasks</div>
        <div class="scrollable">
            <TaskCard
                    v-for="task in tasks"
                    :key="task.id"
                    :id="task.id"
                    :name="task.name"
                    :start_date="$moment.utc(task.start_date).local().format('DD-MM-YYYY HH:mm')"
                    :end_date="$moment.utc(task.end_date).local().format('DD-MM-YYYY HH:mm')"
                    :description="task.description"
                    :activity_name="activities.find(a => a.id === task.activity_id).name"
                    :location_name="locations.find(l => l.id === task.location_id).name"
                    :team_name="teams.find(t => t.id === task.team_id).name"
                    :supervisor="users.find(u => u.id === task.supervisor_id).first_name + ' ' + users.find(u => u.id === task.supervisor_id).last_name"
            ></TaskCard>
        </div>
    </div>
</template>

<script>
    import TaskCard from '../card/Task';

    export default {
        name: "Task",
        components: {
            TaskCard
        },
        data () {
            return {
                tasks: null,
                activities: null,
                users: null,
                teams: null,
                locations: null
            }
        },
        mounted () {
            this.$axios.get(this.$host+"/activity")
                .then(res => {
                    this.activities = res.data.activity;
                });
            this.$axios.get(this.$host+"/user")
                .then(res => {
                    this.users = res.data.users;
                });
            this.$axios.get(this.$host+"/team")
                .then(res => {
                    this.teams = res.data.team;
                });
            this.$axios.get(this.$host+"/location")
                .then(res => {
                    this.locations = res.data.location;
                });
            this.$axios.get(this.$host+"/task")
                .then(res => {
                    this.tasks = res.data.task;
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