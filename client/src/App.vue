<template>
  <nav :style="{ 'grid-template-columns': (!isSmall ? '30% 40% 30%' : '50% 50%'), 'padding': '1rem 2rem' }">
    <h1 :style="{ 'font-size': (isSmall ? '16px' : 'default') }"><router-link to="/">Beverages Of The World</router-link>
      <router-link to="/admin/create" v-if="user && user.admin"><a title="Admin: Create a new Beverage"
          :style="{ 'color': 'lightgreen', 'cursor': 'pointer' }">+</a></router-link>
    </h1>
    <input id='searchbar' type="text" v-model="search" placeholder="Search..." v-if="!isSmall" :style="{'visibility':'hidden'}"/>
    <div :style="{ 'margin-left': 'auto' }" v-if="!token && !isSmall">
      <router-link to="/login">
        <button :style="{ 'background-color': 'transparent', 'border-color': '#FFF', 'margin-right': '1rem' }">LOG
          IN
        </button>
      </router-link>
      <router-link to="/register">
        <button :style="{ 'background-color': 'transparent', 'border-color': '#FFF' }">REGISTER</button>
      </router-link>

    </div>
    <div :style="{ 'display': 'flex', 'align-items': 'center', 'margin-left': 'auto' }" v-else-if="!isSmall">
      <font-awesome-icon icon="user" />
      <p :style="{ 'margin-left': '0.5rem' }">{{ user.username }}</p>
      <button :style="{ 'background-color': '#FFF', 'margin': 'auto 1rem', 'color': '#6C6A66' }" id="cart">
        <font-awesome-icon @click="switchCart" icon="cart-shopping" />
      </button>
      <button @click="logout" :style="{ 'background-color': 'transparent', 'border-color': '#FFF' }">LOGOUT</button>
    </div>
    <div v-if="isSmall" :style="{ 'margin-left': 'auto' }" id="bars">
      <font-awesome-icon icon="bars" @click="switchMenu" />
    </div>
  </nav>
  <div v-if="isSmall & openMenu" id="side-menu">
    <div class="menu-item" v-if="!token">
      <router-link to="/register"><button>Register</button></router-link>
    </div>
    <div class="menu-item" v-if="!token">
      <router-link to="/login"><button>Login</button></router-link>
    </div>
    <div class="menu-item" v-if="token">
      <font-awesome-icon icon="user" />
      <h1>{{ user.username }}</h1>
    </div>
    <div class="menu-item" v-if="token">
      <button @click="switchCart"> <font-awesome-icon icon="cart-shopping" /> &nbsp; CART ({{ itemsTotal }})</button>
    </div>
    <div class="menu-item" v-if="token">
      <button> <font-awesome-icon icon="right-from-bracket" /> &nbsp; LOGOUT</button>
    </div>
  </div>
  <div v-if="cartOpen" class="cart">
    <div>
      <h2 :style="{'display':'inline'}">Cart</h2>
      <small @click="switchCart">&times;</small>
    </div>
    <div v-for="item in user.cart" class="cart-item">
      <div>
      <img :src="item.picture"/>
      <p>{{ item.name }}</p>
      <b> {{ item.amount }}</b>
      </div>
      <div>
        <button class="darkgrey" @click="handleRemove(item.id, item.amount)">-</button>
        <input class="form-input" type="number" v-model="wants" />
        <button class="darkgrey" @click="handleAdd(item.id)">+</button>
        <button class="darkgrey" @click="handleDeleteItem(item.id)">&times;</button>
      </div>
    </div>
    <div :style="{'margin-top':'1.5rem', 'display':'flex'}">
      <h2 :style="{'display':'inline'}">Total: </h2>
      <h2 :style="{'margin-left':'auto'}">$ {{ priceTotal }}</h2>
    </div>
    <button :style="{'margin-top':'1rem', 'width':'100%', 'background-color':'transparent', 'color':'#6C6A66', 'border-color':'#6C6A66'}" @click="handlePurchase">PROCEED TO PAY</button>
  </div>
  <router-view />
  <footer>
    <router-link to="/terms">About Us</router-link>
    <router-link to="/terms">Contact</router-link>
    <router-link to="/terms">Terms of Service</router-link>
    <router-link to="/terms">Privacy Policy</router-link>
    <a href="https://facebook.com/"><img src="https://logodix.com/logo/1058183.png" :style="{ 'width': '50px' }"></a>
    <a href="https://instagram.com/"><img src="https://pngimg.com/uploads/instagram/instagram_PNG9.png"
        :style="{ 'width': '50px' }"></a>
    <a href="https://twitter.com/"><img src="https://logos-download.com/wp-content/uploads/2016/02/Twitter_Logo_new.png"
        :style="{ 'width': '50px' }"></a>
  </footer>
</template>

<script>
import { computed } from 'vue';
import { useMedia } from "../useMedia.js"
import { useStore } from "vuex"
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { VDivider, VTextField } from 'vuetify/lib/components/index.mjs';
export default ({
  name: "App",
  setup() {
    const isSmall = useMedia("(max-width: 768px)");
    const store = useStore();
    const router = useRouter();
    const cartOpen = ref(false);
    const wants = ref(0);
    const search = ref("")
    const openMenu = ref(false);
    const token = computed({
      get: () => store.state.token,
      set: (value) => store.commit("setToken", value),
    });
    const user = computed({
      get: () => store.state.user,
      set: (value) => store.commit("setUser", value)
    });
    const itemsTotal = computed({
      get: () => user.value.cart.reduce( (acc, cur) =>  acc + cur.amount, 0)
    })
    const priceTotal = computed({
      get: () => user.value.cart.reduce( (acc, cur) =>  acc + (cur.price * cur.amount), 0)
    })
    const logout = async () => {
      await store.dispatch("logout");
      window.location.reload();
    };
    const handleAdd = (id) => {
      if (wants.value > 0) {
        store.dispatch("addToCart", { amount: wants.value, userId: user.value._id, beverageId: id, token: token });
      }
      else {
        alert("Can't add 0 items to cart");
      }
    };
    const handleRemove = (id, currAmount) => {
      if(currAmount - wants.value <= 0){
        store.dispatch("removeFromCart", { userId: user.value._id, beverageId: id, token:token});
      }
      else if (wants.value > 0) {
        store.dispatch("addToCart", { amount: (0 - wants.value), userId: user.value._id, beverageId: id, token: token });
      }
      else {
        alert("Can't remove 0 items from cart");
      }
    };
    const handleDeleteItem = (id) => {
      store.dispatch("removeFromCart", { userId: user.value._id, beverageId: id, token:token })
    }
    const switchCart = () => cartOpen.value = !cartOpen.value;
    const switchMenu = () => {
      openMenu.value = !openMenu.value;
    };
    const handlePurchase = () => {
      store.dispatch("cleanCart", {userId: user.value._id, token:token});
      alert("Thank You For Your Purchase! :)");
    }
    return {
      isSmall,
      user,
      logout,
      token,
      cartOpen,
      switchCart,
      wants,
      handleAdd,
      handleRemove,
      search,
      switchMenu,
      openMenu,
      itemsTotal,
      priceTotal,
      handleDeleteItem,
      handlePurchase
    };
  },
})

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

* {
  font-family: "Fira Sans";
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

a:visited {
  color: #FFF;
}

body,
html {
  margin: 0 !important;
}

body {
  background-color: #d8d8d8;
}

svg {
  font-size: 18px;
}

[v-cloak] {
  display: none
}

.mainbody {
  display: grid;
  grid-template-columns: 20% 80%;
  column-gap: 1rem;
}

h1 {
  font-style: italic
}

button {
  padding: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px solid;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  color: #FFF
}

button.darkgrey {
  background-color: #6C6A66;
}

button:hover {
  background-color: #FFF !important;
  color: #6C6A66;
  cursor: pointer;
}

input[type='text'],
input[type='password'],
input[type="number"],
input[type="file"],
.alert {
  height: 60px;
  border-radius: 5px;
  padding: 1rem;
  outline: none;
  border: none;
  box-shadow: none;
}

.alert {
  margin-top: 1rem;
  border: 1px solid red;
  background-color: rgb(233, 192, 192);
  color: red;
}

input[type='text']#searchbar {
  background-color: #5c5a58;
  color: #FFF;
}

input[type='text']#searchbar:focus {
  border: 1px solid #FFF;
}

.form-input {
  border: 1px solid #6C6A66 !important;
}

nav {
  color: #FFF;
  background-color: #6C6A66;
  height: 100px;
  display: grid;
  align-items: center;

}

#bars svg {
  font-size: 24px;
}

#side-menu {
  position: absolute;
  width: 100vw;
  display: grid;
  grid-template-columns: 100%;
  row-gap: 1rem;
  padding: 1rem;
  background-color: #FFF;
  top: 100px;
  left: 0;
  z-index: 1;
  text-align: center;
}

.menu-item {
  width: 100%;
  height: 70px;
  color: #6C6A66;
  font-weight: bold;
  border-bottom: 1px solid #6C6A66;
}

.menu-item>*:not(h1) {
  border-bottom: 1px solid #6C6A66;
}

.menu-item svg {
  font-size: 24px;
}

.menu-item button {
  color: #6C6A66;
  border-color: #6C6A66;
  width: 75%;
}

.menu-item>div {
  display: flex;
  align-items: center;
  font-size: 24px;
}

.centered {
  max-width: 500px;
  text-align: center;
  margin: auto auto;
  margin-top: 1rem;
  padding-bottom: 1rem;
}

.form-build {
  display: grid;
  grid-template-columns: 100%;
  row-gap: 1rem;
}

.card-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-columns: 1fr;
  gap: 1rem;
  margin: 1rem;
  margin-top:5rem;
}

footer {
  width: 100%;
  background-color: #6C6A66;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.cart {
  width: min(300px, 100%);
  background-color: #FFF;
  z-index: 1;
  padding: 1rem;
  min-height: 100vh;
  height:100%;
  position: absolute;
  top: 0;
  right: 0;
  padding-right:1rem;
}
.cart > div:first-child{
  width:100%;
  display:flex;
  align-items:center;
  margin-bottom:0.5rem;
}
.cart > div:first-child > small{
  margin-left:auto;
  font-size:48px;
  cursor:pointer;
}
.cart img{
  width:40px;
}
.cart-item{
  width:100%;
  display:grid;
  grid-template-columns: 100%;
  padding-top: 2rem;
  padding-bottom:2rem;
  border-bottom: 1px solid #6C6A66
}
.cart-item > * {
  display:inline;
}
.cart-item > div:first-child{
  display:flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom:1rem;
}
.cart-item > div:last-child{
  display:flex;
  align-items: center;
  justify-content: center;
  width:100%;
}
.cart-item input{
  width:80px;
}
.cart-item input, .cart-item button{
  height:35px;
}
.cart-item button{
  padding-top:10px;
}
.cart-item > div:last-child button:last-child{
  margin-left: auto;
}
.dropbtn {
  background-color: #c2c2c2;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
ul, li{
  list-style-type: none;
}
li{
  cursor:pointer;
}
#cart{
  transition: all 0.1s;
}

.dropdown {
  position:absolute;
  display: inline-block;
  top:7rem;
  right:3rem;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content li {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content li:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown:hover .dropbtn {
  background-color: #919191;
}
@media screen and (max-width:1252px) {
  .card-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width:900px) {
  .card-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 768px) {
  footer {
    flex-direction: column;
    justify-content: center;
  }

  footer>* {
    margin: 1rem auto
  }

  .form-input {
    width: 85%;
    margin: auto auto;
  }

  .card-wrapper {
    grid-template-columns: 100%;
  }

  .mainbody {
    grid-template-columns: 100%;
  }
}</style>
