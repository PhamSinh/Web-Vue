<script setup lang="ts">
import { useCustomizerStore } from "@store/customizer";
// Icon Imports
import { SettingsIcon, Menu2Icon } from "vue-tabler-icons";

// dropdown imports
import ProfileDD from "./ProfileDD.vue";

const customizer = useCustomizerStore();
</script>

<template>
  <v-app-bar elevation="0" height="80" class="wrapper-header">
    <v-btn
      class="hidden-md-and-down text-secondary"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up text-secondary ms-3"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>

    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn
          class="profileBtn text-primary"
          color="lightprimary"
          variant="flat"
          rounded="pill"
          v-bind="props"
        >
          <v-avatar size="30" class="mr-2 py-2">
            <img src="@assets/profile/user-round.svg" alt="Julia" />
          </v-avatar>
          <SettingsIcon stroke-width="1.5" />
        </v-btn>
      </template>
      <v-sheet rounded="md" width="330" elevation="12">
        <ProfileDD />
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>
<style lang="scss" scoped>
:deep(.v-toolbar__content) {
  justify-content: space-between !important;
  padding-top: 20px;
}
.wrapper-header {
  padding-left: 25px;
  padding-right: 25px;
  outline: 1px solid #E9F4F4;
}
</style>
