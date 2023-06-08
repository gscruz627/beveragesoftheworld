<template>
  <VApp v-cloak>
    <VMain>
      <v-app-bar
        color="#6C6A66"
        :style="{color: 'white'}"
      >

        <v-app-bar-title>Beverages Of The World</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-text-field v-model="search" label="search" variant="outlined" center-affix="2">

        </v-text-field>
        <v-btn>
          Login
        </v-btn>
        <v-btn>
          Register
        </v-btn>

        <v-btn>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
        <!--
              <v-text-field model-value="search" label="Search" variant="outlined" :style="{ width: '100%' }"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-sheet class="pa-2 ma-2">
                .justify space between
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
        <img width="30px" src="#" alt="logo" />
        <form v-if="!isSmall">
          <input type="text" width="100px" />
        </form>
        <div v-if="!token">
          <router-link to="/register">Register</router-link> |
          <router-link to="/login">Login</router-link>
        </div>
        <div v-else>
          <p v-if="user">O: {{ user.username }}</p>
          <button @click="logout">Logout</button>
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
    </VMain>
  </VApp>
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
            search
        };
    },
    components: { VTextField, VDivider }
})

</script>
<style scoped>
* { font-family: "Fira Sans"}
[v-cloak]{ display: none}
.white { color: white }
.grey { color: grey};
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
nav {
  background-color: #6C6A66;
}
</style>
