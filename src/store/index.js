import Vue from 'vue'
import Vuex from 'vuex'
import FoodService from '../services/FoodService'

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
     // {"OrderNumber":1, "OrderDate": "2020-07-01", "SubTotal": 59.24, "Status": "Processing","Username": "george", "OrderLines": [{"Id":1,"name": "english breakfast","restaurant": "Macdonald","qty":1, "price": 12.34},{"Id":2,"name": "pizza","restaurant": "Domino","qty":2,"price":23.45}] },
     // {"OrderNumber":2, "OrderDate": "2020-07-02", "SubTotal": 59.24, "Status": "Delivered" ,"Username": "ethan",  "OrderLines": [{"Id":1,"name": "english breakfast","restaurant": "Macdonald","qty":1, "price": 12.34},{"Id":2,"name": "pizza","restaurant": "Domino","qty":2,"price":23.45}] },
     // {"OrderNumber":3, "OrderDate": "2020-07-03", "SubTotal": 59.24, "Status": "Processing","Username": "george", "OrderLines": [{"Id":1,"name": "english breakfast","restaurant": "Macdonald","qty":1, "price": 12.34},{"Id":5,"name": "special beef noodle","restaurant": "Ms Pho","qty":2,"price":23.45}] },
     // {"OrderNumber":4, "OrderDate": "2020-07-04", "SubTotal": 37.24, "Status": "Delivered" ,"Username": "ethan",  "OrderLines": [{"Id":1,"name": "english breakfast","restaurant": "Macdonald","qty":1, "price": 12.34},{"Id":6,"name": "rice rool","restaurant": "Ms Pho","qty":2,"price":12.45}] }
    ],
    myOrders: [], 
    menuitems: [],
    lastOrderNumber: 0,
  },
  mutations: {

    updateLastOrderNumber(state,lastorder) {
      state.lastOrderNumber = lastorder
    },

    PULL_MENUITEMS(state, items){
      
      console.log(items);

      state.menuitems = items;
    },

    PULL_ORDERS(state, items){
      state.Orders = items;
    },

    PULL_MYORDERS(state, items){
      state.myOrders = items;
    },

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
      //console.log(itemToAdd.id);

			let itemInCart = state.cartItems.filter(item => item.id===itemToAdd.id);
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
        var idx = state.myOrders.findIndex(obj => obj._id === OrderNum)
        //TODO: need to update database 
        state.myOrders[idx].status = "Processing"
      },

      CREATE_ORDER(state, neworder) {

        state.Orders.push(neworder)
        state.cartItems = []      
        window.localStorage.removeItem('cart')

        //update after 5 sec
        //setTimeout(function(){ alert("Hello"); }, 3000);
    },

    DELETE_ORDER(state,order){

      let index = state.Orders.indexOf(order);
      if (index > -1) {
          state.Orders.splice(index, 1);
      }     
    }
  },

  actions: {
    
    getMenuItems({commit}) {
     
      FoodService.getMenuItems().then(result => {
        commit('PULL_MENUITEMS',result.data.data);
      })
    },

    getOrders({commit}) {
      FoodService.getOrders().then(result => {
        commit("PULL_ORDERS", result.data.data);
      })

    },

    getMyOrders({commit}) {
      FoodService.getOrdersByUser({UserName: "george"}).then(result => {
        commit("PULL_MYORDERS", result.data.data);
      })

    },

    deleteOrder({commit}, order) {
      FoodService.deleteOrder({Id: order._id}).then( () => {
        commit("DELETE_ORDER",order);
      })
    },

    addNotification({ commit }, notification) {
      commit('PUSH_NOTIFICATION', notification)
    },
    removeNotification({ commit }, notificationToRemove) {
      commit('DELETE_NOTIFICATION', notificationToRemove)
    },

    createOrder({ commit }, order) {
      FoodService.createOrder(order).then( (result) => {
        //var neworder = result.data
        var lastOrderNumber = result.data.data._id
        
        console.log(lastOrderNumber)

        commit('CREATE_ORDER', result.data.data)        

        this.timeout = setTimeout(() => commit('updateOrderStatus',lastOrderNumber), 5000)

      })
    },

  },
  modules: {
  },
  getters: {
    cartLength: state => {
      return state.cartItems.length
    },
    //filter by current userid
    // myOrders: (state) => {
    //   return state.Orders.filter(order => order.UserName === state.CurrentUser)
    // }
  }
})
