<script setup lang="ts">
import { reactive, ref, toValue, watch, watchEffect } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import CustomButton from './CustomButton.vue';
import { getTestResults } from "@/api/index";

const input = ref<HTMLInputElement | null>(null);

const counter = ref(0);

const title = ref("");

const CustomHeader = {
  template: `<h1>wtf</h1>`
}

const test = ref("");

function showTest() {
  getTestResults().then((response) => {
    console.log("response: ", response);
    if (response.status == 200) {
      test.value = response.data;
    }

  }).catch((err) => console.error(err)).finally(() => {

  });
}

</script>

<template>
  <div>
    <p>{{ test }}</p>
    <button @click="showTest">영채야 클릭해바</button>

    <h2>맛집 리스트</h2>
    <ul>
      <li>
        <a href="https://place.map.kakao.com/838476128#review">강남쌀국수</a>
      </li>
      <li>
        <a href="https://place.map.kakao.com/1023111229#review">해탄(오징어)</a>
      </li>
      <li>
        <a href="https://place.map.kakao.com/459642234">키이스케이프 메모리컴퍼니 </a>
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