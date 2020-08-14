<template>
<div>

<div class="modal" tabindex="-1" role="dialog" id="modalCheckoutForm">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header text-center">
        <h4 class="modal-title w-100 font-weight-bold">Check Out</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnClose">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body mx-3">

       <form class="needs-validation" novalidate="" @submit="validateForm" id="modalPayForm">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">First name</label>
              <input type="text" class="form-control" id="firstName" placeholder="" v-model="formInput.firstname" required="">
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input type="text" class="form-control" id="lastName" placeholder="" v-model="formInput.lastname" required="">
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
          </div>
  
          <div class="mb-3">
            <label for="email">Email <span class="text-muted">(Optional)</span></label>
            <input type="email" class="form-control" id="email" placeholder="you@example.com" v-model="formInput.email">
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>
  
          <div class="mb-3">
            <label for="address">Address</label>
            <input type="text" class="form-control" id="address" placeholder="1234 Main St" required="" v-model="formInput.address">
            <div class="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>
   
          <div class="row">
            <div class="col-md-4 mb-3">
              <label for="state">State</label>
              <select class="custom-select d-block w-100" id="state" required="" v-model="formInput.state">
                <option value="">Choose...</option>
                <option>ACT</option>
                <option>NSW</option>
                <option>QLD</option>
                <option>VIC</option>
                <option>WA</option>
                <option>SA</option>
                <option>NT</option>
                <option>TAS</option>
              </select>
              <div class="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <label for="zip">Zip</label>
              <input type="text" class="form-control" id="zip" placeholder="" required="" v-model="formInput.zip">
              <div class="invalid-feedback">
                Zip code required.
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <label for="zip">Phone</label>
              <input type="text" class="form-control" id="phone" placeholder="" required="" v-model="formInput.phone">
              <div class="invalid-feedback">
                Phone number is required.
              </div>
            </div>            
          </div>
          <hr class="mb-4">
 
          <h4 class="mb-3">Payment</h4>
  
          <div class="d-block my-3">
            <div class="custom-control custom-radio">
              <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked="" required="" v-model="formInput.paymentmethod" value="credit">
              <label class="custom-control-label" for="credit">Credit card</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required="" v-model="formInput.paymentmethod" value="cash">
              <label class="custom-control-label" for="debit">Cash</label>
            </div>
          </div>
      <div id="cc" v-bind:style="{ display: formInput.paymentmethod=='cash'? 'none':'block' }">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="cc-name">Name on card</label>
              <input type="text" class="form-control" id="cc-name" placeholder="" :required="formInput.paymentmethod=='credit'? true: false" :value="formInput.firstname + ' ' + formInput.lastname">
              <small class="text-muted">Full name as displayed on card</small>
              <div class="invalid-feedback">
                Name on card is required
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="cc-number">Credit card number</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" :required="formInput.paymentmethod=='credit'? true: false" v-model="formInput.cc">
              <div class="invalid-feedback">
                Credit card number is required
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 mb-3">
              <label for="cc-expiration">Expiration</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" :required="formInput.paymentmethod=='credit'? true: false" v-model="formInput.Expiry">
              <div class="invalid-feedback">
                Expiration date required
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label for="cc-cvv">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" :required="formInput.paymentmethod=='credit'? true: false" v-model="formInput.cvv">
              <div class="invalid-feedback">
                Security code required
              </div>
            </div>
          </div>
    </div>
          <hr class="mb-4">
          <button class="btn btn-primary btn-lg btn-block" type="submit">Pay</button>
        </form>

      </div>

    </div>
  </div>
</div>

    <table class="table table-cart">
        <tr v-for="(item, index) in cartItems" :key="index">
        <td>{{item.name}}</td>
        <td>{{item.restaurant}}</td>
        <td>QTY: <input v-model="item.qty" class="form-control input-qty" type="number" size="10">
        </td>
        <td class="text-right">${{item.price}}</td>
        <td>
            <button @click="removeItem(item)"><span class="glyphicon glyphicon-trash">Delete</span></button>
        </td>
        </tr>
        <tr v-show="cartItems.length === 0">
        <td colspan="5" class="text-center">Cart is empty</td>
        </tr>
        <tr v-show="cartItems.length > 0">
            <td></td>            
            <td></td>
            <td class="text-right">Cart Total</td>
            <td class="text-right">${{Total}}</td>
            <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>          <td></td>

          <td>
              <a href="" class="btn btn-primary align-right" data-toggle="modal" data-target="#modalCheckoutForm">Check Out</a>
              </td>
          <!-- <td><router-link to="/CheckOut" tag="button" class="btn btn-primary align-right">CheckOut</router-link></td> -->
        </tr>        
    </table>
</div>    
</template>

<script>
import { mapState } from 'vuex'

export default {
    //name:'ShoppingCart',
    //props: ['items'],    
    data() {
      return {
        timeout: null,
        formInput: {
          firstname: "George",
          lastname: "Wen",
          email: "qwen@myune.edu.au",
          address: "Sydney",
          state: "NSW",
          zip: "2000",
          phone: "99998888",
          paymentmethod: "credit",
          cc: "1234123412341234",
          Expiry: "2022-12-31",
          cvv: 100        
        }
      }
    },
    computed:{
        cartLength() { return this.$store.getters.cartLength },
        ...mapState(['cartItems']),

        Total() {
            let total = 0;
            this.cartItems.forEach(item => {
                total += (item.price * item.qty);
            });
            return total.toFixed(2);
            }
        
    },

    methods:{

        choosePayment() {

          if (document.getElementById("credit").checked)
          {
              document.getElementById("cc").style.display="none"
          }
          if (document.getElementById("cash").checked)
          {
              document.getElementById("cc").style.display="block"
          }
        },

        removeItem(item){
            this.$store.commit('removeItem',item);
        },

        validateForm() {

          var form = document.getElementById("modalPayForm")
          if (form.checkValidity() === false) { //} && this.formInput.paymentmethod != "cash") {
            event.preventDefault()
            event.stopPropagation()
          }
          else
          {
            //custom validation logic here...

            //create order
            document.getElementById("btnClose").click()
            event.preventDefault()
            this.$store.dispatch("createOrder")

            //set timeer here
            var ordernumbers =[];
            this.$store.state.Orders.forEach(order => parseInt(ordernumbers.push(order.OrderNumber)))
            var maxId =  Math.max(...ordernumbers)

            this.timeout = setTimeout(() => this.$store.commit('updateOrderStatus',maxId), 5000)

          }
          form.classList.add('was-validated')

            // }
        },
        beforeDestroy() {
          clearTimeout(this.timeout)
        },        
    }
}

</script>
<style scoped>
.container{
  padding:20px;
  max-width:600px;
}

.input-qty {
  width: 60px;
  float: right
}

.table-cart > tr > td {
  vertical-align: middle !important;
}

</style>
