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
          <th>Items</th>
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
      <svg id="piechart" width="500" height="400"></svg>
    </div>
    <div class="col">
      <div id="my_dataviz"></div>
      <!-- <button @click="generateChart">Refresh</button> -->
    </div>
  </div>
</div> <!-- /container -->    
</template>
<script>
import * as d3 from "d3";

import EditOrder from '../components/EditOrder.vue'
import { mapState} from 'vuex'

export default {
    components:{
      EditOrder
    },
    computed: {
        ...mapState(['Orders']),
      //  ...mapGetters(['myOrders'])
        //Orders() {
          //return this.$store.getters.myOrders
        //}
    },
    watch :{
      Orders(val) {
        this.generatePieChart()
        this.generateLineChart()
      }
    },
    data() {
      return { 
        disabled: true ,
        timerId: null
        }
    },
    mounted() {
      this.generatePieChart()
      this.generateLineChart()
     /// this.startInterval()
    },
    created() {
      //this.$store.dispatch('getMyOrders');
      this.$store.dispatch('getOrders');
    }, 
    beforeDestroy () {
    //  clearInterval(this.timerId)
    },

    methods:{

     deleteOrder(order) {
        // let index = this.orders.indexOf(order);
        // if (index > -1) {
        //     this.orders.splice(index, 1);
        // }
        this.$store.dispatch('deleteOrder',order)
        //this.$store.commit('deleteOrder',order);
        console.log("delete order: " + order.OrderNumber)      
        const notification = {
            type: 'Notification',
            message: 'Order No. ' + order.OrderNumber + ' deleted!'
          }
        this.$store.dispatch('addNotification', notification)

      },

      startInterval: function () {
                this.timerId = 
                   setInterval(() => {
                        this.generateLineChart();
                        this.generatePieChart();
                   }, 1000);
      },


      generateLineChart(){

        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        d3.select("#my_dataviz").selectAll("*").remove()

        var svg = d3.select("#my_dataviz")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

          var n = this.Orders.length;
          //console.log("number of ORders = " + n)
       
          // 5. X scale will use the index of our data
          var xScale = d3.scaleLinear()
              .domain([0, n-1]) // input
              .range([0, width]); // output

          // 6. Y scale will use the randomly generate number 
          var yScale = d3.scaleLinear()
              .domain([0, 100]) // input 
              .range([height, 0]); // output 

          // 7. d3's line generator
          var line = d3.line()
              .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
              .y(function(d) { return yScale(d.SubTotal); }) // set the y values for the line generator 
              .curve(d3.curveMonotoneX) // apply smoothing to the line

          // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
          
          ///var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
          
          var dataset = this.Orders;

         // console.log(JSON.stringify(dataset))

          // 3. Call the x axis in a group tag
          svg.append("g")
              //.attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(xScale)) // Create an axis component with d3.axisBottom
              //.showXAxis(false);

          // 4. Call the y axis in a group tag
          svg.append("g")
             // .attr("class", "y axis")
              .call(d3.axisLeft(yScale)) // Create an axis component with d3.axisLeft

          // 9. Append the path, bind the data, and call the line generator 

            svg.append("path")
            .datum(dataset)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line)

            // 12. Appends a circle for each datapoint 
            svg.selectAll(".dot")
                .data(dataset)
              .enter().append("circle") // Uses the enter().append() method
                .attr("class", "dot") // Assign a class for styling
                .attr("cx", function(d, i) { return xScale(i) })
                .attr("cy", function(d) { return yScale(d.SubTotal) })
                .attr("r", 5)

            svg.append("g")
               .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
               .append("text")
               .text("amount per order")
               .attr("class", "title")

      },

      generatePieChart(){

        d3.select("#piechart").selectAll("*").remove()
        
        var lines = []
        this.Orders.forEach(order => 
        { 
          order.OrderLines.forEach(line=> 
          {
            lines.push(line)
          }
          )
       
        })

        //console.log(JSON.stringify(lines))

          var data = d3.nest()
          .key(function(d) { return d.restaurant; })
          .rollup(function(v) { return d3.sum(v, function(d) { return parseFloat(d.qty)*parseFloat(d.price); }); })
          .entries(lines);
        
        //console.log(JSON.stringify(data));

        // var data = [
        //         {browser: 'Chrome', percent: 73.7},
        //         {browser: 'IE', percent: 4.90},
        //         {browser: 'Firefox', percent: 15.40},
        //         {browser: 'Safari', percent: 3.60},
        //         {browser: 'Opera', percent: 1.00}                  
        // ]

        var svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = Math.min(width, height) / 2;
        
        var g = svg.append("g")
                   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

        var pie = d3.pie().value(function(d) { 
                return d.value; 
            });

        var path = d3.arc()
                     .outerRadius(radius - 10)
                     .innerRadius(0);

        var label = d3.arc()
                      .outerRadius(radius)
                      .innerRadius(radius - 80);

        var amt = d3.arc()
                      .outerRadius(radius - 120) 
                      .innerRadius(radius - 120);

            var arc = g.selectAll(".arc")
                       .data(pie(data))
                       .enter().append("g")
                       .attr("class", "arc");

            arc.append("path")
               .attr("d", path)
               .attr("fill", function(d) { return color(d.data.key); });
        
            console.log(arc)
        
            arc.append("text")
               .attr("transform", function(d) { 
                        return "translate(" + label.centroid(d) + ")"; 
                })
               .text(function(d) { return d.data.key; });
            //}//);

              // Labels
              var  formatDecimal = d3.format(".2f")
              arc.append("text")
                  .attr("transform", function (d) {
                  return "translate(" + amt.centroid(d) + ")";
              })
                  .attr("text-anchor", "middle")
                  .text(function (d) {
                  return formatDecimal(d.value);
              });

            svg.append("g")
               .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
               .append("text")
               .text("sales by restaurant")
               .attr("class", "title")
      }
    }
}
</script>
<style scoped>

    body {
    padding-top: 3.5rem;
    }

    .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    }

    @media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
    }
</style>