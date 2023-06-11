<template>
    <div class="centered">
        <h1 :style="{'margin-bottom':'0.5rem'}">Register</h1>
        <hr>
        <form @submit="handleSubmit" class="form-build">
            <label for="username" :style="{'margin-top':'1rem'}">Username: </label>
            <small>At least 3 characters</small>
            <input class="form-input" type="text" v-model="username" id="username" name="username" required>
        
            <label for="password">Password: </label>
            <small>8+ characters, 1 Uppercase and 1 Number</small>
            <input class="form-input" type="password" v-model="password" id="password" name="password" required>

            <label for="password2">Confirm your password: </label>
            <input class="form-input" type="password" v-model="password2" id="password2" name="password2" required>

            <button type="submit">Register</button>
        </form>
    </div>
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
        const isUsernameValid = ref(null);

        const password = ref("");
        const isPasswordValid = ref(null);

        const password2 = ref("");
        const doPasswordsMatch = ref(null);

        const handleSubmit = async (e) => {
            e.preventDefault();

            if(username.value.length < 3){
                isUsernameValid.value = false;
                return;
            } else {
                isUsernameValid.value = true;
            }

            if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password.value)){
                isPasswordValid.value = true;
            } else {
                isPasswordValid.value = false;
                return;
            }

            if(password.value === password2.value){
                
            }
            try {
                await store.dispatch("registerUser", { username: username.value, password: password.value });
                router.push("home");
            } catch (err) {
                console.log("There was an error with the request, this is a server error: " + err);
            }
        }
        return {
            username, password, password2, handleSubmit
        }
    }

})
</script>