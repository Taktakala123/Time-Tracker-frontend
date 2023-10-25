<template>
  <Button label="Start new" class="p-button-success p-button-outlined" icon="pi pi-stopwatch" @click="startEvent" />
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";
const emit = defineEmits(['startTime']);

function startEvent() {
  emit('startTime');
}



</script>
