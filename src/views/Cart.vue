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
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required="">
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" required="">
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
          </div>
  
          <div class="mb-3">
            <label for="email">Email <span class="text-muted">(Optional)</span></label>
            <input type="email" class="form-control" id="email" placeholder="you@example.com">
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>
  
          <div class="mb-3">
            <label for="address">Address</label>
            <input type="text" class="form-control" id="address" placeholder="1234 Main St" required="">
            <div class="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>
   
          <div class="row">
            <div class="col-md-4 mb-3">
              <label for="state">State</label>
              <select class="custom-select d-block w-100" id="state" required="">
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
              <input type="text" class="form-control" id="zip" placeholder="" required="">
              <div class="invalid-feedback">
                Zip code required.
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <label for="zip">Phone</label>
              <input type="text" class="form-control" id="phone" placeholder="" required="">
              <div class="invalid-feedback">
                Phone number is required.
              </div>
            </div>            
          </div>
          <hr class="mb-4">
 
          <h4 class="mb-3">Payment</h4>
  
          <div class="d-block my-3">
            <div class="custom-control custom-radio">
              <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked="" required="">
              <label class="custom-control-label" for="credit">Credit card</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required="">
              <label class="custom-control-label" for="debit">Cash</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="cc-name">Name on card</label>
              <input type="text" class="form-control" id="cc-name" placeholder="" required="">
              <small class="text-muted">Full name as displayed on card</small>
              <div class="invalid-feedback">
                Name on card is required
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="cc-number">Credit card number</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" required="">
              <div class="invalid-feedback">
                Credit card number is required
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 mb-3">
              <label for="cc-expiration">Expiration</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" required="">
              <div class="invalid-feedback">
                Expiration date required
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label for="cc-cvv">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" required="">
              <div class="invalid-feedback">
                Security code required
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

        removeItem(item){
            this.$store.commit('removeItem',item);
        },
        validateForm() {
          var form = document.getElementById("modalPayForm")
          if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
          }
          else
          {
            //create order
            document.getElementById("btnClose").click()
            event.preventDefault()
            this.$store.commit('submitOrder')            
          }
          form.classList.add('was-validated')

            // }
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
