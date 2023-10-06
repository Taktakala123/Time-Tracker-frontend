<template>
    <Button label="Stop" class="p-button-danger p-button-outlined" icon="pi pi-stop" @click="stopTime"/>
  </template> 
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import axios from "axios";
  export default defineComponent({
    name: "StopButton",
    props: {
      timeID: Number,
    },
    methods: {
      stopTime() { 
        
    },
}
  });
  </script>