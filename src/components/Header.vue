<template>
  <v-app-bar app>
    <v-toolbar-title>My Application</v-toolbar-title>
    <v-spacer />
    <v-switch
      v-model="isNightMode"
      :label="isNightMode ? 'Night Mode' : 'Day Mode'"
      @change="toggleNightMode"
      class="ml-4"
    />
    <v-btn @click="logout" color="primary" class="ml-4">Logout</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isNightMode = ref(localStorage.getItem("nightMode") === "true");
let varCheck = false;
const toggleNightMode = () => {
  isNightMode.value =
    varCheck !== isNightMode.value ? isNightMode.value : !isNightMode.value;
  varCheck = isNightMode.value;
  document.documentElement.setAttribute(
    "data-theme",
    isNightMode.value ? "dark" : "light"
  );
  localStorage.setItem("nightMode", isNightMode.value.toString());
};

// Apply the theme when the component mounts
onMounted(() => {
  document.documentElement.setAttribute(
    "data-theme",
    isNightMode.value ? "dark" : "light"
  );
});

const logout = () => {
  router.push("/");
  // Implement logout logic here
};
</script>

<style scoped>
/* Styling for the switch and button, if necessary */
.v-switch {
  margin-left: 16px;
}
.v-app-bar {
  position: fixed; /* Đảm bảo thanh header cố định khi cuộn */
  top: 0;
  width: 100%;
  z-index: 1000; /* Đảm bảo thanh header nằm trên các phần tử khác */
}

.v-toolbar-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.v-btn {
  margin-left: 16px;
}
:deep(.v-input__control) {
  position: absolute;
  bottom: 3px;
  right: 120px;
}
:deep(.v-toolbar__content) {
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
