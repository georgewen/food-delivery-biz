<template>
<main role="main">
  <!-- Main jumbotron for a primary marketing message or call to action -->
  <div class="jumbotron">
    <div class="container">
      <h1 class="display-3">Best food delivery service in town!</h1>
      <p>After hearing the success of food delivery start-ups, our client, Karen, decided to start her own company, DropBearEats (think Menulog, Deliveroo, Uber Eats, etc.) She has already told your manager the specification of the project. You, as the only software developer, are responsible for developing this single page web application. To keep our client happy, you have to meet all the listed requirements.</p>
      <!-- <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p> -->
    </div>
  </div>  
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
      <!-- <MenuItem v-for="i in menuitems" :key="i.menuId" :name="i.name" :image="i.image"       /> -->
        <div  v-for="item in menuitems" :key="item.Id" class="col mb-4">
        <div class="card">
          <img :src="item.image" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{item.name}}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="text-center"><input v-model="item.qty" type="number" class="form-control" placeholder="Qty" min="1" hidden /></p>
            <button class="btn btn-primary mt-auto" @click="addToCart(item)">Add</button>
          </div>
        </div>
      </div>    

    </div>
  </div>
</main>
</template>

<script>
// @ is an alias to /src
//import MenuItem from '@/components/MenuItem.vue'

export default {
  name: 'Home',
  components: {
    //MenuItem
  },
   data() {
        return {
            menuitems: [
                {
                    Id: 1,
                    name: "english breakfast",
                    price: 12.34,
                    qty:1,
                    image: "/images/1.jpg",
                    description: "???"
                },
                {
                    Id: 2,
                    name: "pizza",
                    price: 23.45,
                    qty:1,
                    image: "/images/2.jpg",
                    description: "????"
                },
                {
                    Id: 3,
                    name: "hamburger",
                    price: 23.45,
                    qty:1,
                    image: "/images/3.jpg",
                    description: "????"
                },
                {
                    Id: 4,
                    name: "pizza 2",
                    price: 23.45,
                    qty:1,
                    image: "https://via.placeholder.com/500x400.jpg",
                    description: "????"
                },
                {
                    Id: 5,
                    name: "pizza 3",
                    price: 23.45,
                    qty:1,
                    image: "https://via.placeholder.com/500x400.jpg",
                    description: "????"
                },
                {
                    Id: 6,
                    name: "pizza 4",
                    price: 23.45,
                    qty:1,
                    image: "https://via.placeholder.com/500x400.jpg",
                    description: "????"
                },
                {
                    Id: 7,
                    name: "pizza 5",
                    price: 23.45,
                    qty:1,
                    image: "https://via.placeholder.com/500x400.jpg",
                    description: "????"
                },                                                
                {
                    Id: 8,
                    name: "pizza 6",
                    price: 23.45,
                    qty:1,
                    image: "https://via.placeholder.com/500x400.jpg",
                    description: "????"
                },                
            ]
        }
    },
     methods:{
      addToCart(item){
        this.$store.commit('addToCart',item);
      },
    }
}
</script>
 