<template>
    <router-view />
</template>
 
<script lang="ts">
import { defineComponent } from 'vue';
import Timer from './Views/Timer.vue';
import Repports from './Views/Repports.vue';

export default defineComponent({
  name: "App",
  components: {
    Timer,
    Repports,
    
  },
});
</script>
 