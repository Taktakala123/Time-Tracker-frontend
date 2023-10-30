<template>
    <form @submit.prevent="signup" class="card flex justify-content-center">
        <div class="flex flex-column gap-2 mt-5">
            <label for="Email">Email</label>
            <InputText id="Email" class="inputField" required type="email" v-model="email" />
            <label for="Password">Password</label>
            <Password id="Password" :feedback="false" required type="password" v-model="password" toggleMask />
            <Button type="submit" label="Sign Up" class="button block" />
        </div>
    </form>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/store/useAuth";



const email = ref('')
const password = ref('')
const router = useRouter()
const Auth =useAuthStore();


const signup = async () => {
    try {
        const { data, error } = Auth.signup(email.value,password.value)
        if (error) throw error
    } catch (error) {
        console.log(error)
    } 
}
</script>