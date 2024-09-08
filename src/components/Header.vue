<template>
  <v-app-bar app>
    <!-- Language Select Box -->
    <v-toolbar-title>My Application</v-toolbar-title>
    <v-select
      v-model="selectedLanguage"
      :items="languages"
      item-title="name"
      item-value="code"
      label="Language"
      @update:model-value="changeLanguage"
      class="ml-4 relative"
      return-object
    ></v-select>

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
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { locale } = useI18n();
const router = useRouter();

const isNightMode = ref(localStorage.getItem("nightMode") === "true");
const varCheck = ref(isNightMode.value);

// Language options
const languages = [
  { code: "en", name: "English" },
  { code: "vi", name: "Vietnamese" },
];
const selectedLanguage = ref(
  languages.find((lang) => lang.code === locale.value) || languages[0]
);

const toggleNightMode = () => {
  isNightMode.value =
    varCheck.value !== isNightMode.value
      ? isNightMode.value
      : !isNightMode.value;
  varCheck.value = isNightMode.value;
  document.documentElement.setAttribute(
    "data-theme",
    isNightMode.value ? "dark" : "light"
  );
  localStorage.setItem("nightMode", isNightMode.value.toString());
};

const changeLanguage = (lang: { code: string; name: string }) => {
  locale.value = lang.code;
  selectedLanguage.value = lang;
};

const logout = () => {
  document.documentElement.setAttribute(
    "data-theme", "light"
  );
  localStorage.setItem("nightMode", "light".toString());
  router.push("/");
  // Implement logout logic here
};

// Apply the theme when the component mounts
onMounted(() => {
  document.documentElement.setAttribute(
    "data-theme",
    isNightMode.value ? "dark" : "light"
  );
});
</script>

<style scoped>
/* Styling for the select box, switch, and button, if necessary */
.v-select {
  margin-left: 16px;
}

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
.relative {
  position: relative;
  align-self: end;
  height: 0;
  right: -300px;
}
/* .v-select {
  max-width: 150px;
}

:deep(.v-select__selection) {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
} */
</style>
