Vue.component('vue-ctk-date-time-picker', window['vue-ctk-date-time-picker']);

const host = "http://localhost:2424";

const app = new Vue({
    el: '#app',
    data () {
        return {
            value: null,
            start_date: null,
            end_date: null,
            name: null,
            description: null
        }
    },
    methods: {
        submit: function () {
            axios.post(host+'/event',{
                "name": this.name,
                "description": this.description,
                "start_date": this.start_date,
                "end_date": this.end_date
            })
                .then(res => {
                    console.log(res.data.event);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
});