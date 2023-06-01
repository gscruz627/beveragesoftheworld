<template>
    <section id="hero">
    <div id="hero-container">
      <img src="../assets/banner6.jpg" alt="Hero section image">
    </div>
  </section>
  <p>Browse beverages from around the globe, soft drinks, wines, and others.</p>
  <button>Browser all Beverages</button>
  <h2>Today's Featured Drinks</h2>
  <BeverageCardCollection source="featured"/>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
    BeverageCardCollection,
  },
  setup(){
    return {

    }
  }
}
</script>
