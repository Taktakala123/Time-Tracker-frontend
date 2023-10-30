<template>
    <form @submit.prevent="signIn" class="card flex justify-content-center">
        <div class="flex flex-column gap-2 mt-5">
            <label for="Email">Email</label>
            <InputText id="Email" class="inputField" required type="email" v-model="email" />
            <label for="Password">Password</label>
            <Password id="Password" :feedback="false" required type="password" v-model="password" toggleMask />
            <Button type="submit" label="Sign In" class="button block" />
        </div>
    </form>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/useAuth';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const email = ref('')
const password = ref('')
const Auth = useAuthStore();

const signIn = async () => {
    try {
        let { data, error } = Auth.signIn(email.value, password.value)
    } catch (error) {
        console.log(error)
    }
}
</script>