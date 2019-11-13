<template>
    <div class="menu" id="create">
        <div class="button" v-on:click="create_task()">
            Task
        </div>
        <div class="button" v-on:click="create_activity()">
            Activity
        </div>
        <div class="button" v-on:click="create_event()">
            Event
        </div>
        <div class="button" v-on:click="create_location()">
            Location
        </div>
        <div class="button" v-on:click="create_equipment()">
            Equipment
        </div>
    </div>
</template>

<script>
    export default {
        name: "create",
        methods: {
            create_task : function (){
                window.location.href = "/create/task"
            },
            create_activity : function (){
                window.location.href = "/create/activity"
            },
            create_event : function (){
                window.location.href = "/create/event"
            },
            create_location : function (){
                window.location.href = "/create/location"
            },
            create_equipment : function (){
                window.location.href = "/create/equipment"
            }
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

    div.menu#create{
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