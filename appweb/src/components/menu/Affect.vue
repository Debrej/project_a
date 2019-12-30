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
            hide () {
                this.create_isset = false;
                this.show_isset = false;
                this.affect_isset = false;
                document.getElementById("create").style.display = "none";
                document.getElementById("show").style.display = "none";
                document.getElementById("affect").style.display = "none";
            },
            affect_by_task : function () {
                this.$router.push("/affect/task");
                this.hide();
            },
            affect_by_user : function(){
                this.$router.push("/affect/user");
                this.hide();
            },
            affect_by_equipment: function(){
                this.$router.push("/affect/equipment");
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
        background-color: #41C5E5;
    }

    div.menu#show > div.button{
        background-color: #FFCB29;
    }

    div.menu#affect > div.button{
        background-color: #ED1D45;
    }

    div.button:hover{
        filter: brightness(85%);
        cursor: pointer;
    }
</style>