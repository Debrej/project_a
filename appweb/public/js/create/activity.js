Vue.component('vue-ctk-date-time-picker', window['vue-ctk-date-time-picker']);

const host = "http://localhost:2424";

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
            events: null,
            event: null,
            locations: null,
            location: null,
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
        axios.get(host+"/event")
            .then(res => {
                this.events = res.data.events;
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
            axios.post(host+'/activity',{
                "name": this.name,
                "description": this.description,
                "start_date": this.start_date,
                "end_date": this.end_date,
                "supervisor_id": this.supervisor.id,
                "event_id": this.event.id
            })
                .then(res => {
                    console.log(res.data.activity);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
});