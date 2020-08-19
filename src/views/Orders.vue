<template>
 <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Order Date</th>
          <th>Total</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <edit-order v-for="order in myOrders" :key="order.OrderNumber" :order="order" @deleteOrder = "deleteOrder" :readonly="true"/>
      </tbody>
    </table>

  </div> <!-- /container -->    
</template>
<script>
import EditOrder from '../components/EditOrder.vue'
import { mapState, mapGetters } from 'vuex'

export default {
    components:{
      EditOrder
    },
    computed: {
        ...mapState(['CurrentUser']),
        ...mapGetters(['myOrders'])
      // Orders() {
      //    return this.$store.getters.myOrders
      // }
    },
    data() {
      return { disabled: true   }
    },
    methods:{
     deleteOrder(order) {
        // let index = this.orders.indexOf(order);
        // if (index > -1) {
        //     this.orders.splice(index, 1);
        // }
        this.$store.commit('deleteOrder',order);
        console.log("delete order: " + order.OrderNumber)
      },
    }
}
</script>
