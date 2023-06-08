<template>
    <h1>Register</h1>
    <form @submit="handleSubmit">
        <label for="username">Username: </label>
        <input type="text" v-model="username" id="username" name="username" required>

        <label for="password">Password: </label>
        <input type="password" v-model="password" id="password" name="password" required>

        <label for="password2">Confirm your password: </label>
        <input type="password" v-model="password2" id="password2" name="password2" required>

        <button type="submit">Register</button>
    </form>
</template>
<script>
import { ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router";
export default ({
    name: "RegisterView",
    setup() {
        const store = useStore();
        const router = useRouter();
        const username = ref("");
        const password = ref("");
        const password2 = ref("");
        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                await store.dispatch("registerUser", {username: username.value, password:password.value});
                router.push("home");
            } catch(err){
                console.log("There was an error with the request, this is a server error: " + err);
            }
        }
        return {
            username, password, password2, handleSubmit
        }
    }

})
</script>