<template>
    <form @submit.prevent="signup" class="card flex justify-content-center">
        <div>
            <img src="/public/tekabdev.png">
        </div>
        <div class="flex flex-column gap-2 mt-5">
            <label for="Email">Email</label>
            <InputText id="Email" class="inputField" required type="email" v-model="email" />
            <label for="Password">Password</label>
            <Password id="Password" :feedback="false" required type="password" v-model="password" toggleMask />
            <label for="confirmPassword">Confirm Password</label>
            <Password id="confirmPassword" :feedback="false" required type="password" v-model="confirmPassword"
                toggleMask />
            <Button type="submit" label="Sign Up" class="button block" />
        </div>
    </form>
    <router-link to="signin">Already have account sign in !</router-link>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { useToast } from "primevue/usetoast";
import { ref } from 'vue'

import { useAuthStore } from "@/store/useAuth";
import { useRouter } from 'vue-router';

const email = ref('')
const password = ref('')
const confirmPassword = ref("");
const Auth = useAuthStore();
const router = useRouter();
const toast = useToast();

const signup = async () => {
    try {
        if (password.value != confirmPassword.value) {
            await toast.add({ severity: 'error', summary: 'Error Message', detail: 'Wrong confirm password', life: 3000 });
            return;
        }
        if (password.value.length < 8) {
            await toast.add({ severity: 'error', summary: 'Error Message', detail: 'Short Password', life: 3000 });
            return;
        }
        await toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successful Sign Up', life: 3000 });
        await Auth.signup(email.value, password.value)
        router.push({ name: "signin" });
    } catch (error) {
        console.log(error)
    }
}
</script>