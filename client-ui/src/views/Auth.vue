<template>
    <div>
        <sign-up v-if="isSignUp" />
        <sign-in v-else />
        <Button @click="isSignUp = !isSignUp">
            {{
                isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account yet? Sign Up"
            }}
        </Button>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import signUp from "../components/auth/signUp.vue";
import signIn from "../components/auth/signIn.vue";

const isSignUp = ref(true);


</script>
  
<style scoped></style>
  