<template>
    <form @submit.prevent="signup" class="card flex justify-content-center">
        <div class="flex flex-column gap-2 mt-5">
            <label for="Email">Email</label>
            <InputText id="Email" class="inputField" required type="email" v-model="email" />
            <label for="Password">Password</label>
            <Password id="Password" :feedback="false" required type="password" v-model="password" toggleMask />
            <Button type="submit" label="signup" class="button block" />
        </div>
    </form>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import supabase from '../../supabase.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const loading = ref(false)
const email = ref('')
const password = ref('')
const router = useRouter()


const signup = async () => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
        })
        if (error) throw error
    } catch (error) {
        console.log(error)
    } finally {
        router.push('/timer')
        loading.value = false
    }
}
</script>