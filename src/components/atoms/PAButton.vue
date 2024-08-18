<template>
  <v-btn
    :class="[
      'pa-button',
      { 'pa-button--rounded': isRounded },
      { 'pa-button--shadow': hasShadow },
    ]"
    :disabled="isDisabled"
    :style="{ display: isHidden ? 'none' : 'inline-flex' }"
    @click="handleClick"
  >
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Props {
  isDisabled?: boolean;
  isHidden?: boolean;
  isRounded?: boolean;
  hasShadow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  isHidden: false,
  isRounded: false,
  hasShadow: false,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>

<style lang="scss" scoped>
.pa-button {
  &--rounded {
    color: red;
    border-radius: 20px;
  }

  &--shadow {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
</style>