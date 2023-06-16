<template>
  <div class="centered">
    <h1>This is an about page</h1>
    <p>Beverages of the World is a sample website, it is not a real use website, it is just a
      test, You can view all the beverages, and select by country, select by type, soft drink,
      alcohol, etc, and also filter by price and alphabetically, you can also login and register,
      as well as add items to your cart and remove them, any amount, also you can simulate buying
      the items in your cart, to display a message and restore your cart.</p>
    <br>
    <h2>Privacy Policy</h2>
    <p>We do not collect any personal data, but your username and password, we do not require any legal
      name of any sort, nor any legal information.
    </p>
    <br>
    <h2>Contact and About Me</h2>
    <p>You can contact me in <a :style="{ 'color': '#000', 'font-weight': 'bold' }"
        href="https://github.com/gscruz627">Github</a>, or by email: gscruz627@proton.me</p>

  </div>
</template>
<script>
export default {
  name: "AboutView"
}
</script>
