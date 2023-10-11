<template>
  <Button label="Stop" class="p-button-danger p-button-outlined" icon="pi pi-stop" @click="stopEvent"
    :disabled="enAttente" />
</template> 
  
<script lang="ts">

import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "StopButton",
  setup(props, { emit }) {
    const enAttente = ref(false);
    function stopEvent() {
      emit('stopTime');
    }

    return {
      enAttente,
      stopEvent
    };
  }
});
</script>
