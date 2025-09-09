<template>
  <div class="w-full max-w-md mx-auto">
    <input
      type="text"
      v-model="query"
      @input="onInput"
      placeholder="Search"
      class="w-full px-4 py-2 mb-2 border-gray-300 rounded-md text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-800"
    />
  </div>
</template>
<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

const query = ref(props.modelValue || "");

watch(
  () => props.modelValue,
  (newVal) => {
    query.value = newVal || "";
  }
);

function onInput() {
  emit("update:modelValue", query.value);
}
</script>
