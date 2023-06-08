<template>
    <form enctype="multipart/form-data" @submit="handleSubmit">
        <h1>Create a new Beverage</h1>

        <label for="bname">Name: </label>
        <input type="text" name="bname" id="bname" v-model="name" required />

        <label for="price">Initial Price: </label>
        <input type="number" name="price" id="price" v-model="price" requied />

        <label for="country">Country: </label>
        <input type="text" name="country" id="country" v-model="country" required>

        <label for="picture">Picture: </label>
        <input type="file" id="picture" @change="handlePictureChange($event, index)" required />

        <button type="submit">CREATE</button>
    </form>
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
export default {
    name: "CreateBeverage",
    setup() {
        const store = useStore();
        const router = useRouter();
        const name = ref("");
        const price = ref(0);
        const country = ref("");
        const token = computed({
            get: () => store.state.token,
            set: (value) => store.commit('setToken', value),
        });
        const user = computed({
            get: () => store.state.user,
            set: (value) => store.commit('setUser', value),
        });
        let file = null;
        const handlePictureChange = (evt, index) => {
            file = evt.target.files[0];
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                if (name.value && price.value && country.value && file) {
                    await store.dispatch("createBeverage", { name, price, country, file, token: token.value, id:user.value._id })
                    router.push("home")
                } else {
                    alert("can't proceed, error filling values")
                }
            } catch (err) {
                console.log("error with handle submit form" + err)
            }
        }
        return {
            name, price, country, handlePictureChange, handleSubmit
        }
    }
}
</script>