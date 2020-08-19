import Vue from 'vue'
import Vuex from 'vuex'
//import * as notification from '../store/modules/notification.js' // <-- import it

Vue.use(Vuex)

let cart = window.localStorage.getItem('cart');
let nextId = 1

export default new Vuex.Store({
  //modules: {
  //    notification
  //},
  state: {
    notifications: [],
    CurrentUser: 'george',
    cartItems: cart ? JSON.parse(cart) : [],
    Orders: [          
      {OrderNumber:1, OrderDate: '2020-07-01', SubTotal: 59.24, Status: 'Processing',UserName: 'george', OrderLines: [{id:1,name: "english breakfast",restaurant: 'Macdonald',qty:1, price: 12.34},{id:2,name: "pizza",restaurant: 'Domino',qty:2,price:23.45}] },
      {OrderNumber:2, OrderDate: '2020-07-02', SubTotal: 59.24, Status: 'Delivered' ,UserName: 'ethan',  OrderLines: [{id:1,name: "english breakfast",restaurant: 'Macdonald',qty:1, price: 12.34},{id:2,name: "pizza",restaurant: 'Domino',qty:2,price:23.45}] },
      {OrderNumber:3, OrderDate: '2020-07-03', SubTotal: 59.24, Status: 'Processing',UserName: 'george', OrderLines: [{id:1,name: "english breakfast",restaurant: 'Macdonald',qty:1, price: 12.34},{id:5,name: "special beef noodle",restaurant: 'Ms Pho',qty:2,price:23.45}] },
      {OrderNumber:4, OrderDate: '2020-07-04', SubTotal: 37.24, Status: 'Delivered' ,UserName: 'ethan',  OrderLines: [{id:1,name: "english breakfast",restaurant: 'Macdonald',qty:1, price: 12.34},{id:6,name: "rice rool",restaurant: 'Ms Pho',qty:2,price:12.45}] }
    ],
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
          price: 16.95,
          qty:1,
          restaurant: 'Domino',
          image: "img/2.jpg",
          //image: "http://via.placeholder.com/400x300",
          description: "????"
      },
      {
          Id: 3,
          name: "hamburger",
          price: 15.45,
          qty:1,
          restaurant: 'Macdonald',
          image: "img/3.jpg",
          //image: "http://via.placeholder.com/400x300",
          description: "????"
      },
      {
          Id: 4,
          name: "Hash Brown",
          price: 5.45,
          qty:1,
          restaurant: 'Macdonald',
          image: "img/10.jpeg",
          //image: "http://via.placeholder.com/400x300",
          description: "????"
      },
      {
          Id: 5,
          name: "Special Beef Noodle",
          price: 12.95,
          qty:1,
          restaurant: 'Ms Pho',
          image: "img/20.jpeg",
          //image: "http://via.placeholder.com/400x300",
          description: "????"
      },
      {
          Id: 6,
          name: "Rice Roll",
          price: 11.45,
          qty:1,
          restaurant: 'Ms Pho',
          image: "img/21.jpeg",
          //image: "http://via.placeholder.com/400x300",
          description: "????"
      },
      {
          Id: 7,
          name: "Chicken Noodle",
          price: 13.45,
          qty:1,
          restaurant: 'Ms Pho',
          image: "img/22.jpeg",
          //image: "http://via.placeholder.com/400x300",
          description: "????"
      },                                                
      {
          Id: 8,
          name: "Crispy Chicken Rice",
          price: 14.45,
          qty:1,
          restaurant: 'Ms Pho',
          image: "img/23.jpeg",
          //image: "http://via.placeholder.com/400x300",
          description: "????"
      },                
  ]    
  },
  mutations: {

    PUSH_NOTIFICATION(state, notification) {
      state.notifications.push({
        ...notification,
        id: nextId++
      })
    },
    DELETE_NOTIFICATION(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationToRemove.id
      )
    },

    addToCart(state,itemToAdd){

      // Add the item or increase qty
			let itemInCart = state.cartItems.filter(item => item.Id===itemToAdd.Id);
			let isItemInCart = itemInCart.length > 0;

      if (isItemInCart === false) {
        state.cartItems.push(Vue.util.extend({}, itemToAdd));
      } else {
				itemInCart[0].qty += itemToAdd.qty;
			}

      itemToAdd.qty = 1;

      this.commit('saveCart');

    },

    removeItem(state,item) {
      let index = state.cartItems.indexOf(item);
      if (index > -1) {
          //let product = state.cartItems[index];
          state.cartItems.splice(index, 1);
      }
      
      this.commit('saveCart');

    },

    saveCart(state) {
      window.localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    //create order from shopping cart items

      updateOrderStatus(state,OrderNum) {
        //let orderToUpdate = state.Orders.filter(order => order.OrderNumber===OrderNum);
        var idx = state.Orders.findIndex(obj => obj.OrderNumber === OrderNum)
        state.Orders[idx].Status = "Processing"
        console.log("update status")
      },

      CREATE_ORDER(state) {

      //console.log(state.cartItems.length)

      var today = new Date();

      var ordernumbers =[];
      state.Orders.forEach(order => parseInt(ordernumbers.push(order.OrderNumber)))
      var maxId =  Math.max(...ordernumbers) + 1 
      //var maxId = Math.floor(Math.random() * 100000)

      var lines = []
      var subtotal = 0
      state.cartItems.forEach(line=> {        
        lines.push({Id: line.Id, name: line.name, qty: line.qty, price: line.price, restaurant: line.restaurant})
          subtotal += line.qty*line.price
        }
      )

      let neworder = {
        OrderNumber: maxId,
        OrderDate: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
        SubTotal: subtotal,
        Status: 'Received',
        UserName: state.CurrentUser,
        OrderLines: lines          //loop thru order lines        
      }

      state.Orders.push(neworder)
      state.cartItems = []
      
      //update after 5 sec
      //setTimeout(function(){ alert("Hello"); }, 3000);

      console.log(neworder) 

      //state.Orders.push();

    },

    DELETE_ORDER(state,order){
      let index = state.Orders.indexOf(order);
      if (index > -1) {
          state.Orders.splice(index, 1);
      }
      
    }

  },
  actions: {
    
    addNotification({ commit }, notification) {
      commit('PUSH_NOTIFICATION', notification)
    },
    removeNotification({ commit }, notificationToRemove) {
      commit('DELETE_NOTIFICATION', notificationToRemove)
    },

    createOrder({ commit }) {
      commit('CREATE_ORDER')
    },

    deleteOrder({ commit }, order) {
      commit('DELETE_ORDER',order)
    }

  },
  modules: {
  },
  getters: {
    cartLength: state => {
      return state.cartItems.length
    },
    //filter by current userid
    myOrders: (state) => {
      return state.Orders.filter(order => order.UserName === state.CurrentUser)
    }
  }
})
