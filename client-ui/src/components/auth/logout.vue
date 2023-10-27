<template>
    <div class="absolute top-0 right-0 text-white font-bold flex align-items-center justify-content-end w-4rem h-4rem mr-6">
    <Button @click="logout" label="logout" />
    </div>
</template>
<script setup lang="ts">
import supabase from '../../supabase.js'

import { useRouter } from 'vue-router';
const router = useRouter()
const logout = async () => {
    let { error } = await supabase.auth.signOut()
    router.push('/auth/login')
}
</script>