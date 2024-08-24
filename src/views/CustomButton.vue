<script setup lang="ts">
const props = defineProps(["title"])
const emit = defineEmits(["update:title"]);
</script>

<template>
    <input type="text" :value="props.title" @input="(e: any): void => emit('update:title', e.target?.value)">
    <!-- <button @click="emit('increment')">Click</button> -->
</template>