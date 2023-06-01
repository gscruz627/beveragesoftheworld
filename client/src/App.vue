<template>
  <nav>
    <img width="30px" src="#" alt="logo" />
    <v-form v-if="!isSmall">
      <input type="text" width="100px" />
    </v-form>
    <router-link to="/register">Register</router-link> |
    <router-link to="/login">Login</router-link>
    <a href="#">Cart (0)</a>
  </nav>
  <section v-if="!isSmall">
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
export default ({
  name: "App",
  setup() {
    const isSmall = useMedia("(max-width: 768px)");
    return {
      isSmall
    }
  }
})

</script>
<style></style>
