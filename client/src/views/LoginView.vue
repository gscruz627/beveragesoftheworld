<template>
    <div class="centered">
        <h1 :style="{ 'margin-bottom': '0.5rem' }">Register</h1>
        <hr>
        <form @submit="handleSubmit" class="form-build">
            <div class="alert" v-if="authError === true">
            Username or Password incorrect, try again.
            </div>
            <label for="username" :style="{ 'margin-top': '1rem' }">Username: </label>
            <input class="form-input" type="text" v-model="username" id="username" name="username" required>

            <label for="password">Password: </label>
            <input class="form-input" type="password" v-model="password" id="password" name="password" required>

            <button :style="{'width':'85%', 'margin': 'auto auto'}" type="submit" class="darkgrey">Login</button>
        </form>
    </div>
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
        const authError = ref(null);

        const store = useStore();
        const router = useRouter();

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await store.dispatch("loginUser", { username: username.value, password: password.value });
                router.push("/");
            } catch (err) {
                authError.value = true;
            }
        }
        return {
            username, password, handleSubmit, authError
        }
    }
}
</script>