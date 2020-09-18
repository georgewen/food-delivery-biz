<template>
  <div class="about">
    <hr />
    <h1>COSC560 Assignment 2</h1>
    <h2>George Wen</h2>
    <h2>Student Number: 220211478</h2>
    
    <h3> Please enter order number to query its status: </h3>

    <input v-model="orderid" name="orderId" id="orderId"/> <button @click="sendMsg">Send</button>

  </div>
</template>

<script>
import { mapState} from 'vuex'

// // Create WebSocket connection.
// const socket = new WebSocket('ws://localhost:9000/api/ws');

// // Connection opened
// socket.addEventListener('open', function (event) {
//   // socket.send('Hello Server!');
//   console.log("websocket is open!")
// });
// // Listen for messages
// socket.addEventListener('message', function (event) {

//     console.log('Message from server ', event.data);
//     Add_Notification(event.data);

// });


export default {
    data: function() {
      return {
        orderid:"",
        connection: null
      }
    },
    created: function() {

      //let self = this

        var add_notification = function(evt) {
          const notification = {
                type: 'Notification',
                message: evt.data
          }
          this.$store.dispatch('addNotification', notification)
        }
        var addNotification = add_notification.bind(this);

        this.connection = new WebSocket('ws://localhost:9000/api/ws')

        var heartbeat_msg = '--heartbeat--', heartbeat_interval = null, missed_heartbeats = 0;

        this.connection.onmessage = function(event) {
          
            console.log(event);
            if (event.data === heartbeat_msg) {
              // reset the counter for missed heartbeats
              missed_heartbeats = 0;
              return;
            }

            addNotification(event);

            //(function() { add_notification(event) })();
        }

        this.connection.onopen = function(event) {
          console.log(event)
          console.log("Successfully connected to the echo websocket server...")

          let ws = this;
          if (heartbeat_interval === null) {
                missed_heartbeats = 0;
                heartbeat_interval = setInterval(function() {
                    try {
                        missed_heartbeats++;
                        if (missed_heartbeats >= 3)
                            throw new Error("Too many missed heartbeats.");
                        ws.send(heartbeat_msg);
                    } catch(e) {
                        clearInterval(heartbeat_interval);
                        heartbeat_interval = null;
                        console.warn("Closing connection. Reason: " + e.message);
                        ws.close();
                    }
                }, 5000);
            }

        }

    },

    methods:{
      sendMsg() {
          //alert(this.orderid)
          this.connection.send(this.orderid)
        }

    }
}
</script>