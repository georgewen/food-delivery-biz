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
            <h6 class="card-text">From: {{item.restaurant}}</h6>
            <h6 class="card-text">Price: {{item.price}}</h6>
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
                    restaurant: 'Macdonald',
                    image: "img/1.jpg",
                    //image: "http://via.placeholder.com/400x300",
                    description: "???"
                },
                {
                    Id: 2,
                    name: "pizza",
                    price: 23.45,
                    qty:1,
                    restaurant: 'Domino',
                    image: "img/2.jpg",
                    //image: "http://via.placeholder.com/400x300",
                    description: "????"
                },
                {
                    Id: 3,
                    name: "hamburger",
                    price: 23.45,
                    qty:1,
                    restaurant: 'Macdonald',
                    image: "img/3.jpg",
                    //image: "http://via.placeholder.com/400x300",
                    description: "????"
                },
                {
                    Id: 4,
                    name: "Hash Brown",
                    price: 23.45,
                    qty:1,
                    restaurant: 'Macdonald',
                    image: "img/10.jpeg",
                    //image: "http://via.placeholder.com/400x300",
                    description: "????"
                },
                {
                    Id: 5,
                    name: "Special Beef Noodle",
                    price: 23.45,
                    qty:1,
                    restaurant: 'Ms Pho',
                    image: "img/20.jpeg",
                    //image: "http://via.placeholder.com/400x300",
                    description: "????"
                },
                {
                    Id: 6,
                    name: "Rice Roll",
                    price: 12.45,
                    qty:1,
                    restaurant: 'Ms Pho',
                    image: "img/21.jpeg",
                    //image: "http://via.placeholder.com/400x300",
                    description: "????"
                },
                {
                    Id: 7,
                    name: "Chicken Noodle",
                    price: 12.45,
                    qty:1,
                    restaurant: 'Ms Pho',
                    image: "img/22.jpeg",
                    //image: "http://via.placeholder.com/400x300",
                    description: "????"
                },                                                
                {
                    Id: 8,
                    name: "Crispy Chicken Rice",
                    price: 15.45,
                    qty:1,
                    restaurant: 'Ms Pho',
                    image: "img/23.jpeg",
                    //image: "http://via.placeholder.com/400x300",
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
 