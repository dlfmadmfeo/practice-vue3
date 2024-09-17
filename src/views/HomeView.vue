<script setup lang="ts">
import { reactive, ref, toValue, watch, watchEffect } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import CustomButton from './CustomButton.vue';
import { getTestResults } from "@/api/index.ts";

const input = ref<HTMLInputElement | null>(null);

const counter = ref(0);

const title = ref("");

const CustomHeader = {
  template: `<h1>wtf</h1>`
}

const test = ref("");

function showTestResults() {
  getTestResults().then((response) => {
    console.log("response: ", response);
    test.value = response.data;

  }).catch((err) => console.error(err));
}

</script>

<template>
  <div>
    <p>{{ test }}</p>
    <button @click="showTestResults">테스트 클릭</button>
    <h2>맛집 리스트</h2>
    <ul>
      <li>
        <a href="https://place.map.kakao.com/12421976">아마 신촌본점</a>
      </li>
      <li>
        <a href="https://place.map.kakao.com/690123759">룸익스케이프 인디고블루점 </a>
      </li>
    </ul>
    <!-- {{ title }} -->
    <!-- <CustomButton v-model:title="title"></CustomButton> -->
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