<template>
  <router-view />
</template>
 
<script setup lang="ts" >
import { onMounted } from 'vue';
import { useAuthStore } from './store/useAuth';

let { getCurrent } = useAuthStore();

onMounted(async () => {
  await getCurrent();
  });

</script>
 