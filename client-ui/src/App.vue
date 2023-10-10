<template>
   <Timer />
 </template>
 
 <script lang="ts">
 import { defineComponent } from 'vue';
 import Timer from './Views/Timer.vue';
 
 export default defineComponent({
   name: "App",
   components: {
     Timer,
   },
 });
 </script>
 