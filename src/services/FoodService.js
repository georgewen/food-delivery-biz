import Api from './api'

export default {

    getMenuItems () {
        return Api().get('/menu')
    },

    getOrders () {
        return Api().get('/order')
    },

    deleteOrder(params){
        return Api().delete('/order/' + params.Id);
    },

    getOrdersByUser (params) {
        return Api().get('/order/my/' + params.UserName)
    },

    //getWord (params) {
    //    return Api().get('/menu/' + params.id)
    //}


}