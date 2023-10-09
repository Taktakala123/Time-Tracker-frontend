<template>
    <Button label="Stop" class="p-button-danger p-button-outlined" icon="pi pi-stop" @click="stopTime()"/>
  </template> 
  
  <script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "StopButton",
    methods: {
      stopTime() { 
        
    },
}
  });
  </script>