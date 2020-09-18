import Api from './api'

export default {

    getMenuItems () {
        return Api().get('/api/menuitems')
    },

    getMenuItembyId (params) {
        return Api().get('/api/menuitems/' + params.Id)
    },

    getOrders () {
        return Api().get('/api/orders')
    },

    getOrder (params) {
        return Api().get('/api/orders/' + params.Id)
    },

    createOrder(params) {
        return Api().post('/api/orders', params);
    },

    deleteOrder(params){
        return Api().delete('/api/orders/' + params.Id);
    },

    getOrdersByUser (params) {
        return Api().get('/api/orders/user/' + params.UserName)
    },

    updateOrder(id, order) {
        return Api().put('api/orders/' + id, order) 
    }
    // getMenuItems () {
    //     return Api().get('/menu')
    // },

    // getOrders () {
    //     return Api().get('/order')
    // },

    // deleteOrder(params){
    //     return Api().delete('/order/' + params.Id);
    // },

    // getOrdersByUser (params) {
    //     return Api().get('/order/my/' + params.UserName)
    // },

    //getWord (params) {
    //    return Api().get('/menu/' + params.id)
    //}


}