<template>
    <div class="menu" id="show">
        <div class="button" v-on:click="show_tasks()">
            Tasks
        </div>
        <div class="button" v-on:click="show_activities()">
            Activities
        </div>
        <div class="button" v-on:click="show_events()">
            Events
        </div>
        <div class="button" v-on:click="show_locations()">
            Locations
        </div>
        <div class="button" v-on:click="show_equipments()">
            Equipments
        </div>
        <div class="button" v-on:click="show_users()">
            Users
        </div>
        <div class="button" v-on:click="show_shifts()">
            Shifts
        </div>
    </div>
</template>

<script>
    export default {
        name: "Show",
        methods: {
            hide () {
                this.create_isset = false;
                this.show_isset = false;
                this.affect_isset = false;
                document.getElementById("create").style.display = "none";
                document.getElementById("show").style.display = "none";
                document.getElementById("affect").style.display = "none";
            },
            show_tasks: function (){
                this.$router.push("/show/tasks");
                this.hide();
            },
            show_activities: function (){
                this.$router.push("/show/activities");
                this.hide();
            },
            show_events: function (){
                this.$router.push("/show/events");
                this.hide();
            },
            show_locations: function (){
                this.$router.push("/show/locations");
                this.hide();
            },
            show_equipments: function (){
                this.$router.push("/show/equipments");
                this.hide();
            },
            show_users: function (){
                this.$router.push("/show/users");
                this.hide();
            },
            show_shifts: function (){
                this.$router.push("/show/shifts");
                this.hide();
            },
        }
    }
</script>

<style scoped>
    div.menu{
        height: 8vh;
        width: 100vw;
        display: flex;

        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
    }

    div.menu#show{
        position: absolute;
        top: 8vh;
        display: none;
    }

    div.button{
        height: 100%;
        display: flex;
        flex-basis: 100%;
        justify-content: center;
        align-items: center;
        flex-grow: 1;

        font-family: 'Oswald', sans-serif;
        font-size: 2em;

        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
    }

    div.menu#create > div.button{
        background-color: #41C5E5;
    }

    div.menu#show > div.button{
        background-color: #FFCB29;
    }

    div.menu#affect > div.button {
        background-color: #ED1D45;
    }

    div.button:hover{
        filter: brightness(85%);
        cursor: pointer;
    }
</style>