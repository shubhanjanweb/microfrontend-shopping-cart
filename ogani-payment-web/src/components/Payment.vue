<template>
  <main>
    <section class="breadcrumb-section set-bg">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <div class="breadcrumb__text">
              <h2>Checkout</h2>
              <div class="breadcrumb__option">
                <a href="/dashboard/home">Home</a>
                <span>Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="checkout spad">
      <div class="container">
        <div class="checkout__form">
          <h4>Billing Details</h4>
          <form action="#">
            <div class="row">
              <div class="col-lg-8 col-md-6">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="checkout__input">
                      <p>Fist Name<span>*</span></p>
                      <input type="text">
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="checkout__input">
                      <p>Last Name<span>*</span></p>
                      <input type="text">
                    </div>
                  </div>
                </div>
                <div class="checkout__input">
                  <p>Country<span>*</span></p>
                  <input type="text">
                </div>
                <div class="checkout__input">
                  <p>Address<span>*</span></p>
                  <input type="text" placeholder="Street Address" class="checkout__input__add">
                  <input type="text" placeholder="Apartment, suite, unite ect (optinal)">
                </div>
                <div class="checkout__input">
                  <p>Town/City<span>*</span></p>
                  <input type="text">
                </div>
                <div class="checkout__input">
                  <p>Country/State<span>*</span></p>
                  <input type="text">
                </div>
                <div class="checkout__input">
                  <p>Postcode / ZIP<span>*</span></p>
                  <input type="text">
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="checkout__input">
                      <p>Phone<span>*</span></p>
                      <input type="text">
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="checkout__input">
                      <p>Email<span>*</span></p>
                      <input type="text">
                    </div>
                  </div>
                </div>
                <div class="checkout__input__checkbox">
                  <label for="acc">
                    Create an account?
                    <input type="checkbox" id="acc">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <p>Create an account by entering the information below. If you are a returning customer please login at
                  the top of the page</p>
                <div class="checkout__input">
                  <p>Account Password<span>*</span></p>
                  <input type="text">
                </div>
                <div class="checkout__input__checkbox">
                  <label for="diff-acc">
                    Ship to a different address?
                    <input type="checkbox" id="diff-acc">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="checkout__input">
                  <p>Order notes<span>*</span></p>
                  <input type="text" placeholder="Notes about your order, e.g. special notes for delivery.">
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="checkout__order">
                  <h4>Your Order</h4>
                  <div class="checkout__order__products">Products <span>Total</span></div>
                  <ul v-if="shoppings.length > 0">
                    <li v-for="shopping in shoppings">{{ shopping.productName }}<span>
                        {{ toINR(shopping.price) }}</span>
                    </li>
                  </ul>
                  <div v-else>No item added</div>
                  <div class="checkout__order__subtotal">Subtotal <span>{{ toINR(total) }}</span></div>
                  <div class="checkout__order__total">Total <span>{{ toINR(total) }}</span></div>
                  <div class="checkout__input__checkbox">
                    <label for="acc-or">
                      Create an account?
                      <input type="checkbox" id="acc-or">
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adip elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua.</p>
                  <div class="checkout__input__checkbox">
                    <label for="payment">
                      Check Payment
                      <input type="checkbox" id="payment">
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="checkout__input__checkbox">
                    <label for="paypal">
                      Paypal
                      <input type="checkbox" id="paypal">
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <button type="submit" class="site-btn">PLACE ORDER</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import ShoppingService from './shopping.service';
export default {
  name: 'Payment',
  data() {
    return {
      cart: {},
      total: 0,
      shoppings: []
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      ShoppingService.getCartDetails().then(
        (cart => {
          this.$set(this, "cart", cart);
          this.$set(this, "shoppings", cart.shoppings);
          console.log(cart.shoppings);
          this.$set(this, "total", cart.shoppings.reduce((total, item) => {
            return total = total + (item.price * item.quantity);
          }, 0));
        }).bind(this)
      );
    },
    toINR(val) {
      return ShoppingService.toInr(val);
    }
  }
}
</script>
<style scoped>
.set-bg {
  background-image: url("//localhost:9003/img/breadcrumb.jpg");
}
</style>
