<template>
    <div class="centered">
        <h1 :style="{ 'margin-bottom': '0.5rem' }">Register</h1>
        <hr>
        <form @submit="handleSubmit" class="form-build">
            <div class="alert" v-if="authError === true">
            Username already taken, try again
            </div>
            <div class="alert" v-if="isUsernameValid === false">
            Username is not valid, try again
            </div>
            <label for="username" :style="{ 'margin-top': '1rem' }">Username: </label>
            <small>At least 3 characters</small>
            <input class="form-input" type="text" v-model="username" id="username" name="username" required>

            <div class="alert" v-if="isPasswordValid === false">
            Password is not valid, try again
            </div>
            <label for="password">Password: </label>
            <small>8+ characters, 1 Uppercase and 1 Number</small>
            <input class="form-input" type="password" v-model="password" id="password" name="password" required>

            <div class="alert" v-if="doPasswordsMatch === false">
            Passwords do not match, try again
            </div>
            <label for="password2">Confirm your password: </label>
            <input class="form-input" type="password" v-model="password2" id="password2" name="password2" required>

            <button :style="{'width':'85%', 'margin': 'auto auto'}" type="submit" class="darkgrey">Register</button>
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

        const authError = ref(null);

        const handleSubmit = async (e) => {
            e.preventDefault();

            if (username.value.length < 3) {
                isUsernameValid.value = false;
                return;
            } else {
                isUsernameValid.value = true;
            }

            if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password.value)) {
                isPasswordValid.value = true;
            } else {
                isPasswordValid.value = false;
                return;
            }

            if (password.value === password2.value) {
                doPasswordsMatch.value = true;
            } else {
                doPasswordsMatch.value = false;
                return;
            }
            if (doPasswordsMatch && isPasswordValid && isUsernameValid) {
                try {
                    await store.dispatch("registerUser", { username: username.value, password: password.value });
                    router.push("home");
                } catch (err) {
                    authError.value = true;
                }
            } else { alert("An error has occured"); return; }
        }
        return {
            username, password, password2, handleSubmit,
            isUsernameValid, isPasswordValid, doPasswordsMatch,
            authError
        }
    }
})
</script>