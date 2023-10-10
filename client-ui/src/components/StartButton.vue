<template>
  <div class="flex align-items-center justify-content-center m-2">
    <Button label="Start new" class="p-button-success p-button-outlined" icon="pi pi-stopwatch" @click="startEvent" :disabled="enAttente" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "StartButton",
  setup(props, { emit }) {
    const enAttente = ref(false);

    function startEvent() {
      emit('startTime');
    }

    return {
      enAttente,
      startEvent
    };
  },
});
</script>
