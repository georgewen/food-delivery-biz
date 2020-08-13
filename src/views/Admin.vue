<template>

 <div class="container">
  
   <div class="row">
    <table class="table">
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Order Date</th>
          <th>Total</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <edit-order v-for="order in Orders" :key="order.OrderNumber" :order="order" @deleteOrder = "deleteOrder"/>
      </tbody>
    </table>
  </div>
   <div class="row">
    <div class="col">
      <svg width="500" height="400"></svg>
    </div>
    <div class="col">
    </div>
  </div>
</div> <!-- /container -->    
</template>
<script>
import * as d3 from "d3";

import EditOrder from '../components/EditOrder.vue'
import { mapState } from 'vuex'

export default {
    components:{
      EditOrder
    },
    computed: {
        ...mapState(['Orders']),
        Orders() {
          return this.$store.getters.myOrders
        }
    },
    data() {
      return { disabled: true   }
    },
    mounted() {
      this.generateChart()
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

      generateChart(){

       this.Orders.forEach(order => 
        { 
          //parseInt(ordernumbers.push(order.OrderNumber))
          order.OrderLines.forEach(line=> console.log(line))
       
        })

        var data = [
                {browser: 'Chrome', percent: 73.7},
                {browser: 'IE', percent: 4.90},
                {browser: 'Firefox', percent: 15.40},
                {browser: 'Safari', percent: 3.60},
                {browser: 'Opera', percent: 1.00}                  
        ]

        var svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = Math.min(width, height) / 2;
        
        var g = svg.append("g")
                   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

        var pie = d3.pie().value(function(d) { 
                return d.percent; 
            });

        var path = d3.arc()
                     .outerRadius(radius - 10)
                     .innerRadius(0);

        var label = d3.arc()
                      .outerRadius(radius)
                      .innerRadius(radius - 80);

            var arc = g.selectAll(".arc")
                       .data(pie(data))
                       .enter().append("g")
                       .attr("class", "arc");

            arc.append("path")
               .attr("d", path)
               .attr("fill", function(d) { return color(d.data.browser); });
        
            console.log(arc)
        
            arc.append("text")
               .attr("transform", function(d) { 
                        return "translate(" + label.centroid(d) + ")"; 
                })
               .text(function(d) { return d.data.browser; });
            //}//);

            svg.append("g")
               .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
               .append("text")
               .text("Browser use statistics - Jan 2017")
               .attr("class", "title")
      }
    }
}
</script>
