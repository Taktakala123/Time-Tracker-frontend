<template>
  <Button label="Stop" class="p-button-danger p-button-outlined" icon="pi pi-stop" @click=StopEvent() />
</template> 
  
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "StopButton",
  data() {
    return {

    };
  },
  methods: {
    StopEvent() {
      this.$emit('StopTime')
    }
  }
});
</script>