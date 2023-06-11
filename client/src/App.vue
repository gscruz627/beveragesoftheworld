<template>
  <nav :style="{ 'grid-template-columns': (!isSmall ? '30% 40% 30%' : '50% 50%'), 'padding': '1rem 2rem' }">
    <h1 :style="{ 'font-size': (isSmall ? '16px' : 'default') }">Beverages Of The World</h1>
    <input id='searchbar' type="text" v-model="search" placeholder="Search..." v-if="!isSmall" />
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
      <button :style="{ 'background-color': '#FFF', 'margin': 'auto 1rem', 'color': '#6C6A66' }">
        <font-awesome-icon icon="cart-shopping" />
      </button>
      <button @click="logout" :style="{ 'background-color': 'transparent', 'border-color': '#FFF' }">LOGOUT</button>
    </div>
    <div v-if="isSmall" :style="{ 'margin-left': 'auto' }" id="bars">
      <font-awesome-icon icon="bars" @click="switchMenu" />
    </div>
  </nav>
  <div v-if="isSmall & openMenu" id="side-menu">
    <div class="menu-item" v-if="!token">
      <button>Register</button>
    </div>
    <div class="menu-item" v-if="!token">
      <button>Login</button>
    </div>
    <div class="menu-item" v-if="token">
      <font-awesome-icon icon="user" />
      <h1>{{ user.username }}</h1>
    </div>
    <div class="menu-item" v-if="token">
      <button> <font-awesome-icon icon="cart-shopping" /> &nbsp; CART (N)</button>
    </div>
    <div class="menu-item" v-if="token">
      <button> <font-awesome-icon icon="right-from-bracket" /> &nbsp; LOGOUT</button>
    </div>
  </div>
  <!--
            
          <div v-if="user.admin">
            <router-link to="/admin/create">Add a new Beverage</router-link>
            <button @click="switchCart">Cart</button>
            <p>cart: {{ cartOpen }}</p>
            <div v-if="cartOpen">
              <div v-for="item in user.cart">
                <p>{{ item.name }}</p>
                <p>{{ item.amount }}</p>
                <img :src="item.picture" :alt="item.name" />
                <button @click="handleRemove(item.id)">X</button>
                <input type="number" v-model="wants" />
                <button @click="handleAdd(item.id)">+</button>
              </div>
            </div>
          </div>
        </div>
      </nav>-->
  <section v-if="!isSmall">
    <router-link to="/all">All Drinks</router-link>
    <a href="#">Shop by Country</a>
    <a href="#">Soft Drink (Pop)</a>
    <a href="#">Wines and Alcohol</a>
    <a href="#">Other Drinks</a>
  </section>
  <router-view />
  <footer>
    <router-link to="/about">About Us</router-link>
    <router-link to="/about">Contact</router-link>
    <router-link to="/terms">Terms of Service</router-link>
    <router-link to="/terms">Privacy Policy</router-link>
    <router-link to="/terms">FB</router-link>
    <router-link to="/terms">IG</router-link>
    <router-link to="/terms">TWTR</router-link>
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
    const handleRemove = (id) => {
      if (wants.value > 0) {
        store.dispatch("addToCart", { amount: (0 - wants.value), userId: user.value._id, beverageId: id, token: token });
      }
      else {
        alert("Can't remove 0 items from cart");
      }
    };
    const switchCart = () => cartOpen.value = !cartOpen.value;
    const switchMenu = () => {
      openMenu.value = !openMenu.value;
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
      openMenu
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

body,
html {
  margin: 0 !important;
}

svg {
  font-size: 18px;
}

[v-cloak] {
  display: none
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

button:hover {
  background-color: #FFF !important;
  color: #6C6A66;
  cursor: pointer;
}

input[type='text'], input[type='password'] {
  height: 60px;
  border-radius: 5px;
  padding: 1rem;
  outline: none;
  border: none;
  box-shadow: none;
}
input[type='text']#searchbar{
 background-color: #5c5a58;
color: #FFF; 
}

input[type='text']#searchbar:focus {
  border: 1px solid #FFF;
}

.form-input{
  border:1px solid #6C6A66 !important;
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
  background-color: transparent;
  color: #6C6A66;
  border-color: #6C6A66;
  width: 75%;
}

.menu-item>div {
  display: flex;
  align-items: center;
  font-size: 24px;
}

.centered{
  max-width:500px;
  text-align:center;
  margin: auto auto;
  margin-top: 1rem;
}
.form-build{
  display:grid;
  grid-template-columns: 100%;
  row-gap:1rem;
}
@media screen and (max-width: 768px){
  .form-input{
    width:85%;
    margin:auto auto;
  }
}
</style>
