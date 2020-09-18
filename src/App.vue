<template>
  <div id="app1"> 
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="Orders">My Orders</router-link> |
      <router-link to="Cart">Cart  ({{ $store.getters.cartLength }}) </router-link> |
      <router-link to="Admin">Admin</router-link> |
      <router-link to="About">About</router-link>
    </div>
    <router-view/>
    <NotificationContainer/>
  </div>
</template>
<script>
import NotificationContainer from './components/NotificationContainer.vue'

export default {
    components: {
    NotificationContainer
  }
}
</script>
<style lang="scss" scoped>
#app1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>