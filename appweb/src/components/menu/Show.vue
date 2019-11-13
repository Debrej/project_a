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
            show_tasks: function (){
                window.location.href = "/show/tasks";
            },
            show_activities: function (){
                window.location.href = "/show/activities";
            },
            show_events: function (){
                window.location.href = "/show/events";
            },
            show_locations: function (){
                window.location.href = "/show/locations";
            },
            show_equipments: function (){
                window.location.href = "/show/equipments";
            },
            show_users: function (){
                window.location.href = "/show/users";
            },
            show_shifts: function (){
                window.location.href = "/show/shifts";
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
        background-color: rgba(137, 138, 255, 0.69);
    }

    div.menu#show > div.button{
        background-color: rgba(119, 255, 119, 0.69);
    }

    div.menu#affect > div.button{
        background-color: rgba(255, 172, 80, 0.69);
    }

    div.button:hover{
        filter: brightness(85%);
        cursor: pointer;
    }
</style>