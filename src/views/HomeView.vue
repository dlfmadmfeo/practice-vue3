<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, toValue, watch, watchEffect } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import CustomButton from './CustomButton.vue';
import { getTestResults } from "@/api/index";
// import SockJS from "sockjs-client"; // Vue2에서는 에러발생
// @ts-ignore
import SockJS from 'sockjs-client/dist/sockjs.min.js' // Vue3용
import { Stomp } from "@stomp/stompjs";

const input = ref<HTMLInputElement | null>(null);

const counter = ref(0);

const title = ref("");

const CustomHeader = {
  template: `<h1>wtf</h1>`
}

const test = ref("");

const stompClient = ref<any>(null);

const message = ref("");
const sentMessage = ref("");

const messages = ref([]);

function showTest() {
  getTestResults().then((response) => {
    console.log("response: ", response);
    if (response.status == 200) {
      test.value = response.data;
    }

  }).catch((err) => console.error(err)).finally(() => {

  });
}

function openChat() {
  // const socketJS = new SockJS(`ws://localhost:8080/ws`);
  // const socketJS = new SockJS(`ws://http://43.203.215.72:8080/ws`);
  const socketJS = new SockJS(`${import.meta.env.VITE_APP_SERVER_IP}/ws`);
  stompClient.value = Stomp.over(socketJS);

  stompClient.value?.connect(
    {},
    (frame: Object) => {
      console.log("connected: ", frame);
      stompClient.value?.subscribe("/topic/greetings", (message: any) => {
        console.log("메시지: ", JSON.parse(message.body));
        sentMessage.value = JSON.parse(message.body);
        messages.value = JSON.parse(message.body);
      });
    },
  );
}

// 메시지를 서버로 전송하는 메서드
function sendMessage() {
  if (!message.value?.trim()) {
    return;
  }
  if (stompClient.value && stompClient.value.connected) {
    stompClient.value.send(
      '/app/hello', // 서버의 @MessageMapping 경로에 메시지 전송
      {},
      JSON.stringify({ content: message.value }) // 메시지 내용 전송
    );
    message.value = ''; // 입력 필드를 비웁니다.
  } else {
    console.error('STOMP client is not connected.');
  }
};

onBeforeUnmount(() => {
  if (stompClient.value) {
    stompClient.value.disconnect(); // 연결 종료
  }
})

onMounted(() => {
  openChat();
});

</script>

<template>
  <div class="chat">
    <div class="body">
      <!-- <p>{{ test }}</p> -->
      <!-- <button @click="showTest">영채야 클릭해바</button> -->
      <div class="content">
        <div class="connect">
          <button @click="openChat" class="btn-connect">채팅 연결</button>
        </div>
        <div class="messages">
          <div class="item" v-for="item in messages">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="send">
        <textarea placeholder="텍스트를 입력하세요." v-model="message" @keypress.enter.exact="sendMessage"></textarea>
        <button class="send-button" @click="sendMessage">전송</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clsss {
  /* background-attachment: fixed; */
}

.connect {
  position: relative;
  text-align: right;
}

.chat {
  position: absolute;
  background-color: #9bbbd4;
  top: 0;
  left: 0;
}

.chat>.body {
  width: 100vw;
  height: 100vh;
}

.send {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: white;
  width: 100vw;
  height: 120px;
}

.send>textarea {
  width: calc(100vw);
  border: none;
  height: 80px;
  padding: 10px;
  /* border: 2px solid skyblue; */
}

.send>textarea:focus {
  outline: none;
  border: 2px solid skyblue;
}

.send>.send-button {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 30px;
  width: 50px;
  /* background-color: red; */
}

.messages {
  margin-top: 30px;
  margin-left: 10px;
  box-sizing: border-box;
}

.messages>.item {
  background-color: white;
  max-width: 500px;
  min-height: 20px;
  border-radius: 6px;
  padding-left: 10px;
  font-size: 14px;
  margin: 10px;
  min-height: 40px;
  display: flex;
  align-items: center;
}

.content {
  overflow-y: scroll;
  height: calc(100vh - 120px);
}
</style>