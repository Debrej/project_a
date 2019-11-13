<template>
    <div class="menu" id="affect">
        <div class="button" v-on:click="affect_by_task()">
            By task
        </div>
        <div class="button" v-on:click="affect_by_user()">
            By user
        </div>
        <div class="button" v-on:click="affect_by_equipment()">
            By equipment
        </div>
    </div>
</template>

<script>
    export default {
        name: "Affect",
        methods: {
            affect_by_task : function () {
                window.location.href = "/affect/task";
            },
            affect_by_user : function(){
                window.location.href = "/affect/user";
            },
            affect_by_equipment: function(){
                window.location.href = "/affect/equipment";
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

    div.menu#affect{
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