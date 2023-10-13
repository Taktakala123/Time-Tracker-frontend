<template>
  <Button label="Start new" class="p-button-success p-button-outlined" icon="pi pi-stopwatch" @click="startEvent" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "StartButton",
  setup(props, { emit }) {

    function startEvent() {
      emit('startTime');
    }

    return {
      startEvent
    };
  },
});
</script>
