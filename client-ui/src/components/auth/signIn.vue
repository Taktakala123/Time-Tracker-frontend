<template>
    <form @submit.prevent="signIn" class="card flex justify-content-center">
        <div>
            <img src="/public/tekabdev.png">
        </div>
        <div class="flex flex-column gap-2 mt-5">
            <label for="Email">Email</label>
            <InputText id="Email" class="inputField" required type="email" v-model="email" />
            <label for="Password">Password</label>
            <Password id="Password" :feedback="false" required type="password" v-model="password" toggleMask />
            <div></div>
            <Button type="submit" label="Sign In" class="button block" />
        </div>
    </form>
    <router-link to="signup">You don't have account sign up !</router-link>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/store/useAuth';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { ref } from 'vue'
import { useToast } from "primevue/usetoast";


const email = ref('')
const password = ref('')
const Auth = useAuthStore();
const toast = useToast();


const signIn = async () => {
    try {
        await Auth.signIn(email.value, password.value);
        if (Auth.errors) {
            await toast.add({ severity: 'error', summary: 'Error Message', detail: ' Login failed', life: 3000 });
            Auth.errors = ""; 
            return;
        }
        else {
            await toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successful Login', life: 3000 });
            await router.push({ name: "dashboard" });
        }
    } catch (error) {
        console.log(error);
    }
};
</script>