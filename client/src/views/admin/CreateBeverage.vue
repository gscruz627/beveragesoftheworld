<template>
    <div class="centered">
        <h1 :style="{ 'margin-bottom': '0.5rem' }">Create a new beverage</h1>
        <hr>
        <form @submit="handleSubmit" class="form-build" enctype="multipart/form-data">
            <label for="bname" :style="{ 'margin-top': '1rem' }">Name: </label>
            <input class="form-input" type="text" v-model="name" id="bname" name="bname" required>

            <label for="price">Initial Price: </label>
            <input class="form-input" type="number" v-model="price" id="price" name="price" required>

            <label for="country">Country: </label>
            <input class="form-input" type="text" v-model="country" id="country" name="country" required>

            <label for="type">Type of Beverage: </label>
            <input type="text" id="type" name="type" class="form-input" v-model="typeb" required/>

            <label for="picture">Picture: </label>
            <input type="file" id="picture" @change="handlePictureChange($event, index)" required />

            <button :style="{ 'width': '85%', 'margin': 'auto auto' }" type="submit" class="darkgrey">Create</button>

        </form>
    </div>
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
        const typeb = ref("");
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
                    await store.dispatch("createBeverage", { name, price, country, file, token: token.value, id: user.value._id, type:typeb })
                    router.push("/")
                } else {
                    alert("can't proceed, error filling values")
                }
            } catch (err) {
                console.log("error with handle submit form" + err)
            }
        }
        return {
            name, price, country, typeb, handlePictureChange, handleSubmit
        }
    }
}
</script>