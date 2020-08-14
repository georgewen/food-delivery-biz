<template>
         <tr>
          <td>{{ order.OrderNumber}}</td>
          <td>{{ order.OrderDate }}</td>
          <td>{{ order.SubTotal }}</td>
          <td>{{ order.UserName }}</td>
          <td>
            <div v-for="line in order.OrderLines" :key="line.Id">
              <p>{{line.restaurant}} / {{line.name}} / {{line.qty}} / {{line.price}} </p>
            </div>
          </td>
          <td>
            <select v-model="order.Status" :disabled="disabled">
              <option>Received</option>
              <option>Processing</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </td>
          <!-- <th><router-link to="/EditOrder" tag="button" class="btn btn-primary align-right">Edit</router-link></td> -->          
          <td v-if="!readonly"><button class="btn btn-primary" @click="edit">Edit</button></td>
          <td v-if="!readonly"><button @click="deleteOrder(order)" class="btn btn-primary">Delete</button></td>
        </tr>
</template>
<script>
export default {
    data()
    {
        return { //order: { OrderNumber:1, OrderDate: '2020-07-01', SubTotal: 25.56, Status: 'Delivered'},
                 disabled: true,
                 //readonly: false
        }
    },
    props: {
       order: {
         type: Object
        // required: true
     },
      readonly: Boolean
    },
    methods:{
     deleteOrder(order) {
        this.$emit('deleteOrder', order)
        //console.log("delete order: " + order.OrderNumber)
      },
      edit() {
          this.disabled = ! this.disabled;
        }
    }
}
</script>