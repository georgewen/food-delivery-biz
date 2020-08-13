<template>
      <div class="col mb-4">
        <div class="card">
          <img :src="image" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{name}}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button class="btn btn-primary mt-auto" :id="id" @click="addToCart(id)">Add</button>
          </div>
        </div>
      </div>    
</template>
<script>
export default {
    name: 'ExpenseComponent',
    props: {
        id: Number,
        name: String,
        amount: Number,
        image: String,
        descp: String
    },
    methods:{
      addToCart(id){
        this.$store.commit('addToCart',id);
      },
    }
}
</script>