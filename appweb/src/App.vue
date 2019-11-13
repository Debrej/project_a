<template>
  <div id="app">
    <HeaderMenu></HeaderMenu>
    <div class="container" v-on:click="on_click_container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import HeaderMenu from './components/Header-Menu.vue'

  export default {
    name: 'app',
    components: {
      HeaderMenu
    },
    methods: {
      on_click_container: function(){
        this.create_isset = false;
        this.show_isset = false;
        this.affect_isset = false;
        document.getElementById("create").style.display = "none";
        document.getElementById("show").style.display = "none";
        document.getElementById("affect").style.display = "none";
      }
    }
  }
</script>

<style>
div.container{
  height: 92vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

*{
  margin: 0;
  padding: 0;
  font-family: 'Oswald', sans-serif;
}

body{
  height: 100vh;
  width: 100vw;
}
</style>
