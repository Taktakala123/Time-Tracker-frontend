<template>
  <Button label="Stop" class="p-button-danger p-button-outlined" icon="pi pi-stop" @click="stopEvent" />
</template> 
  
<script setup lang="ts">
import { defineEmits } from "vue";
const emit = defineEmits(['stopTime']);

function stopEvent() {
  emit('stopTime');
}

</script>