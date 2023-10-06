<template>

<div class="flex justify-content-start flex-wrap">
    <Date/>
</div>

<div class="flex justify-content-end flex-wrap">
 <div class="flex align-items-center justify-content-center m-2">
    <StartButton/>
 </div>
 <div class="flex align-items-center justify-content-center m-2">
    <StopButton />
 </div>
</div>

<TimeLog/>
    
</template>

<script setup lang="ts">
import Date from './components/Date.vue';
import TimeLog from './components/TimeLog.vue';
</script>


