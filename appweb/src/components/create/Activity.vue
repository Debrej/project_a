<template>
    <div class="form">
        <div class="form_title">Activity</div>
        <div class="name">
            <div class="label">Name</div>
            <input type="text" name="name" placeholder="The name of this beautiful (I hope) activity" v-model="name"/>
        </div>
        <div class="supervisor_event">
            <div class="supervisor">
                <div class="label">Supervisor</div>
                <v-select v-model="supervisor" as="name::id" :from="users"></v-select>
            </div>
            <div class="event">
                <div class="label">Event</div>
                <v-select v-model="event" as="name::id" :from="events"></v-select>
            </div>
        </div>
        <div class="location">
            <div class="label">Location</div>
            <v-select v-model="location" as="name::id" :from="locations"></v-select>
        </div>
        <div class="dates">
            <div class="date">
                <div class="label">Starting date</div>
                <vue-ctk-date-time-picker v-model="start_date" label="" locale="fr" :minute-interval="15" :max-date="end_date"></vue-ctk-date-time-picker>
            </div>
            <div class="date">
                <div class="label">Ending date</div>
                <vue-ctk-date-time-picker v-model="end_date" label="" locale="fr" :minute-interval="15" :min-date="start_date"></vue-ctk-date-time-picker>
            </div>
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
        name: "Activity",
        data () {
            return {
                value: null,
                name: null,
                start_date: null,
                end_date: null,
                users: null,
                supervisor: null,
                events: null,
                event: null,
                locations: null,
                location: null,
                description: null
            }
        },
        created: function () {
            this.$axios.get(this.$host+"/location")
                .then(res => {
                    this.locations = res.data.location;
                })
                .catch(err => {
                    /* eslint-disable no-console */
                    console.log(err);
                    /* eslint-enable no-console */
                });
            this.$axios.get(this.$host+"/event")
                .then(res => {
                    this.events = res.data.events;
                })
                .catch(err => {
                    /* eslint-disable no-console */
                    console.log(err);
                    /* eslint-enable no-console */
                });
            this.$axios.get(this.$host+"/user")
                .then(res => {
                    for(let user in res.data.users){
                        res.data.users[user].name = res.data.users[user].first_name + " " + res.data.users[user].last_name;
                    }
                    this.users = res.data.users;
                })
                .catch(err => {
                    /* eslint-disable no-console */
                    console.log(err);
                    /* eslint-enable no-console */
                });
        },
        methods: {
            submit: function () {
                this.$axios.post(this.$host+'/activity',{
                    "name": this.name,
                    "description": this.description,
                    "start_date": this.start_date,
                    "end_date": this.end_date,
                    "supervisor_id": this.supervisor.id,
                    "event_id": this.event.id
                })
                    .then(() => {
                        window.location.href = "/show/activities"
                    })
                    .catch(err => {
                        /* eslint-disable no-console */
                        console.log(err);
                        /* eslint-enable no-console */
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
        justify-content: space-between;
    }

    div.form_title{
        font-size: 1.5em;
    }

    div.name{
        width: 50%;
    }

    div.supervisor_event{
        display: flex;
    }

    div.supervisor, div.activity{
        flex-basis: 100%;
        padding-right: 2%;
    }

    div.dates{
        display: flex;
    }

    div.date{
        flex-basis: 100%;
        padding-right: 2%;
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