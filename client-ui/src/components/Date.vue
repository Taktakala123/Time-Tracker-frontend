<template>
  <h1>Today, {{ formattedDate }}</h1>
</template>

<script setup lang="ts">
import {ref,computed} from "vue";

const currentDate = ref(new Date());

function getMonthName(monthIndex: number): string {
  const months = [
    'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
    'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'
  ];
  return months[monthIndex];
}

const formattedDate = computed(() => {
  return `${currentDate.value.getDate()} ${getMonthName(currentDate.value.getMonth())}`;
});

</script>
