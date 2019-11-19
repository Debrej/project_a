<template>
    <div class="menu" id="main">
        <div class="button create" v-on:click="create_menu()">
            Create
        </div>
        <div class="button show" v-on:click="show_menu()" style="">
            Show
        </div>
        <div class="button affect" v-on:click="affect_menu()" style="">
            Affect
        </div>
        <Create></Create>
        <Show></Show>
        <Affect></Affect>
    </div>
</template>

<script>
    import Create from './menu/Create.vue'
    import Show from './menu/Show.vue'
    import Affect from './menu/Affect.vue'

    export default {
        name: "header-menu",
        components: {
            Create,
            Show,
            Affect
        },
        data () {
          return {
              create_isset: false,
              show_isset: false,
              affect_isset: false
          }
        },
        methods: {
            create_menu: function(){
                this.create_isset = !this.create_isset;
                this.show_isset = false;
                this.affect_isset = false;
                if(this.create_isset){
                    document.getElementById("create").style.display = "flex";
                }
                else{
                    document.getElementById("create").style.display = "none";
                }
                document.getElementById("show").style.display = "none";
                document.getElementById("affect").style.display = "none";
            },
            show_menu: function(){
                this.show_isset = !this.show_isset;
                this.create_isset = false;
                this.affect_isset = false;
                if(this.show_isset){
                    document.getElementById("show").style.display = "flex";
                }
                else{
                    document.getElementById("show").style.display = "none";
                }
                document.getElementById("create").style.display = "none";
                document.getElementById("affect").style.display = "none";
            },
            affect_menu: function(){
                this.affect_isset = !this.affect_isset;
                this.create_isset = false;
                this.show_isset = false;
                if(this.affect_isset){
                    document.getElementById("affect").style.display = "flex";
                }
                else{
                    document.getElementById("affect").style.display = "none";
                }
                document.getElementById("create").style.display = "none";
                document.getElementById("show").style.display = "none";
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

    div.menu#main{
        z-index: 1000;
    }

    div.menu#affect, div.menu#create, div.menu#show{
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

    div.create, div.menu#create > div.button{
        background-color: #41C5E5;
    }

    div.show, div.menu#show > div.button{
        background-color: #FFCB29;
    }

    div.affect, div.menu#affect > div.button {
        background-color: #ED1D45;
    }

    div.button:hover{
        filter: brightness(85%);
        cursor: pointer;
    }
</style>