Vue.component('vue-ctk-date-time-picker', window['vue-ctk-date-time-picker']);

const app = new Vue({
    el: '#app',
    data () {
        return {
            value: null,
            name: null,
            start_date: null,
            end_date: null,
            users: null,
            supervisor: null,
            activities: null,
            activity: null,
            locations: null,
            location: null,
            teams: null,
            team: null,
            description: null
        }
    },
    components: { vSelect: VueSelect.vSelect },
    created: function () {
        axios.get(host+"/location")
            .then(res => {
                this.locations = res.data.location;
            })
            .catch(err => {
                console.log(err);
            });
        axios.get(host+"/activity")
            .then(res => {
                this.activities = res.data.activity;
            })
            .catch(err => {
                console.log(err);
            });
        axios.get(host+"/team")
            .then(res => {
                this.teams = res.data.team;
            })
            .catch(err => {
                console.log(err);
            });
        axios.get(host+"/user")
            .then(res => {
                for(let user in res.data.users){
                    res.data.users[user].name = res.data.users[user].first_name + " " + res.data.users[user].last_name;
                }
                this.users = res.data.users;
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        submit: function () {
            axios.post(host+'/task',{
                "name": this.name,
                "description": this.description,
                "start_date": this.start_date,
                "end_date": this.end_date,
                "supervisor_id": this.supervisor.id,
                "team_id": this.team.id,
                "location_id": this.location.id,
                "activity_id": this.activity.id
            })
                .then(res => {
                    console.log(res.data.team);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
});