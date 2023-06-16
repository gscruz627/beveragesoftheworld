<template>
  <section class="hero">
    <div class="hero-container">
      <img src="../assets/banner4.jpg" alt="Hero section image" id="hero-image" :style="{ width: '100%' }">
      <router-link to="all"><button class="darkgrey">Browser all Beverages</button></router-link>
    </div>
  </section>
  <hr /><br><br>
  <h1 :style="{ 'text-align': 'center' }">Featured Drinks</h1>
  <div v-if="beverages" class="card-wrapper">
    <BeverageCard v-for="(beverage, i) in beverages" :key="beverage.id" :beverage="beverage"></BeverageCard>
  </div>
</template>

<script>
import BeverageCard from "../components/BeverageCard.vue"
import { useStore } from "vuex";
import { computed, onMounted, onUpdated } from "vue";
import { useRoute } from "vue-router";
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import banner4 from '../assets/banner4.jpg';
import banner5 from '../assets/banner5.jpg';
import banner6 from '../assets/banner6.jpg';
export default {
  name: 'HomeView',
  components: {
    BeverageCard
  },
  setup() {
    const route = useRoute();
    let slideshowInt = 0;
    const listofSrc = [
      banner1,banner2,banner3,banner4,banner5,banner6]
      if (route.fullPath === "/") {
        try{
      setInterval(() => {
        if (slideshowInt = 5) {
          slideshowInt = 0;
        } else {
          slideshowInt = slideshowInt + 1;
        };
        if(document.getElementById("hero-image")){document.getElementById("hero-image").src = listofSrc[slideshowInt]}
      }, 10000)} catch(err){}
    }
    
    
    const store = useStore();
    const beverages = computed({
      get: () => store.state.beverages,
      set: (value) => store.commit('setBeverages', value),
    });
    onMounted(() => {
      store.dispatch("loadBeverages", { filter: "all" })
    })
    return {
      beverages,
    }
  }
}
</script>
<style>
#hero-image {
  object-fit: cover;
  height: 400px;
}

.hero {
  width: 80%;
  margin: 1rem auto;
  height: 400px;
}

.hero-container {
  position: relative;
  height: 400px;
}

.hero-container img {
  border-radius: 5px;
}
.hero-container button {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}
</style>
