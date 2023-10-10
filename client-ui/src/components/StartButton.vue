<template>
    <div class="flex align-items-center justify-content-center m-2">
        <Button label="Start new" class="p-button-success p-button-outlined" icon="pi pi-stopwatch" @click="StartEvent" :disabled="enAttente" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "StartButton",
  data() {
    return {
      enAttente: false,
    };
  },
  methods:{
      StartEvent() {
        this.$emit('StartTime')
    }
  },
  
});
</script>

