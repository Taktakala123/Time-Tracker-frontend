<template>
    <div class="flex align-items-center justify-content-center m-2">
        <Button label="Start new" class="p-button-success p-button-outlined" icon="pi pi-stopwatch" @click="$emit('myEvent')" :disabled="enAttente" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import service from "../../service/index"
export default defineComponent({
  name: "StartButton",
  data() {
    return {
      enAttente: false,
    };
  },

  methods:{
    async  StartTime() {
      try {
            const response = await service.start.timeLogControllerStartNewTimeLog({ format: 'json' });
        }
        catch (error) {
            console.log(error);
        }
    }
  },
  
});
</script>

