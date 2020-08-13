<template>
  <div id="app1"> 
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="Orders">My Orders</router-link> |
      <router-link to="Cart">Cart  ({{ $store.getters.cartLength }}) </router-link> |
      <router-link to="Admin">Admin</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>