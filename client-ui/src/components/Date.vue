<template>
  <h1>Today, {{ formattedDate }}</h1>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Date",
  setup() {
    const currentDate = ref(new Date());

    function getMonthName(monthIndex: number): string {
      const months = [
        'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
        'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'
      ];
      return months[monthIndex];
    }

    const formattedDate = `${currentDate.value.getDate()} ${getMonthName(currentDate.value.getMonth())}`;

    return {
      formattedDate
    };
  }
});
</script>


