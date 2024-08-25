<script setup lang="ts">
import { reactive, ref, toValue, watch, watchEffect } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import CustomButton from './CustomButton.vue';

const input = ref<HTMLInputElement | null>(null);

const counter = ref(0);

const title = ref("");

const CustomHeader = {
  template: `<h1>wtf</h1>`
}

</script>

<template>
  <div>
    <h1>김약국</h1>
    {{ title }}
    <CustomButton v-model:title="title"></CustomButton>
  </div>
  <!-- <main>
    <TheWelcome />
  </main> -->
</template>

<style scoped>
.clsss {
  background-attachment: fixed;
}
</style>