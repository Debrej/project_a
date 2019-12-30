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
            hide () {
                this.create_isset = false;
                this.show_isset = false;
                this.affect_isset = false;
                document.getElementById("create").style.display = "none";
                document.getElementById("show").style.display = "none";
                document.getElementById("affect").style.display = "none";
            },
            create_task : function (){
                this.$router.push("/create/task");
                this.hide();
            },
            create_activity : function (){
                this.$router.push("/create/activity");
                this.hide();
            },
            create_event : function (){
                this.$router.push("/create/event");
                this.hide();
            },
            create_location : function (){
                this.$router.push("/create/location");
                this.hide();
            },
            create_equipment : function (){
                this.$router.push("/create/equipment");
                this.hide();
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