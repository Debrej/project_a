const app = new Vue({
    el: '#app',
    data () {
        return {
            value: null,
            name: null,
            equipment_type: null,
            equipment_types: null,
            locations: null,
            pickup_location: null,
            drop_location: null,
            quantity: null,
            description: null
        }
    },
    components: { vSelect: VueSelect.vSelect },
    created: function () {
        axios.get(host+"/equipment_type")
            .then(res => {
                this.equipment_types = res.data.equipment_type;
            })
            .catch(err => {
                console.log(err);
            });
        axios.get(host+"/location")
            .then(res => {
                this.locations = res.data.location;
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        submit: function () {
            axios.post(host+'/equipment',{
                    "name": this.name,
                    "description": this.description,
                    "quantity": this.quantity,
                    "equipment_type_id": this.equipment_type.id,
                    "pickup_location": this.pickup_location.id,
                    "drop_location": this.drop_location.id
                })
                .then(res => {
                    console.log(res.data.equipment);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
});