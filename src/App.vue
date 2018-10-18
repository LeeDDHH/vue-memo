<template>
  <div id="app">
    <v-app>
      <v-toolbar app class='yellow darken-2'>
        <h1>カモメモ</h1>
      </v-toolbar>
      <v-content class='grey lighten-4'>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app,
#top,
.container,
.editor {
  height: 100%;
}
h1 {
  font-family: "Nico Moji";
  font-size: 31px;
  padding-bottom: 7px;
}
</style>
