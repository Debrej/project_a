Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyDYe28qgwp2iuUEP9bqTAsAMvLgkqO4nRE"
    }
});

const host = "http://localhost:2424";

const app = new Vue({
    el: '#app',
    data () {
        return {
            value: null,
            center: {lat: 45.7802065, lng: 4.8729496},
            map_options: {
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                disableDefaultUi: false
            },
            name: null,
            description: null
        }
    },
    methods: {
        submit: function () {
            axios.post(host+'/location',{
                    "name": this.name,
                    "description": this.description
                })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
});