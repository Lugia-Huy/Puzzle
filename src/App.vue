<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-link">
        <router-link to="/">Home</router-link>
      </div>
      <div class="nav-link">
        <router-link to="Ranking">Ranking</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
:root {
  background-image: linear-gradient(to bottom right, rgb(41, 159, 255) 0%, rgb(255, 72, 231) 100%);
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#app {
  font-family: 'Press Start 2P', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

.navbar{
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.nav-link{
  margin: 10px 10px;
  display: flex;
}

a {
  color: #fff;
}

a:hover {
  color: #000030;
}
</style>
