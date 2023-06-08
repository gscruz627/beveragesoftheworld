<template>
    <h1>Log In</h1>
    <form @submit="handleSubmit">
        <label for="username">Username: </label>
        <input type="text" v-model="username" id="username" name="username" required>

        <label for="password">Password: </label>
        <input type="password" v-model="password" id="password" name="password" required>

        <button type="submit">LOGIN</button>
    </form>
</template>
<script>
import { ref } from "vue"
import { useStore } from "vuex";
import { useRouter } from "vue-router"
export default {
    name: "LoginView",
    setup() {
        const username = ref("");
        const password = ref("");
        const store = useStore();
        const router = useRouter();

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await store.dispatch("loginUser", { username: username.value, password: password.value });
                router.push("home");
            } catch (err) {
                console.log("There was an error with the request, this is a server error: " + err);
            }
        }
        return {
            username, password, handleSubmit
        }
    }
}
</script>