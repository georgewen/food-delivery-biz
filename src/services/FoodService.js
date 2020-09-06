import Api from './api'

export default {
    getMenuItems () {
        return Api().get('/menu')
    },
    getOrders () {
        return Api().get('/order')
    },
    getOrdersByUser (params) {
        console.log(params.UserName);
        return Api().get('/order/my/' + params.UserName)
    },
    getWord (params) {
        return Api().get('/menu/' + params.id)
    }


}