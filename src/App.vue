<template>
  <div>
    <BackgroundAnimation v-if="path === '/'"/>
    <NavigationDrawer v-if="path !== '/'" />
    <v-container :class="{'login': path === '/'}">
      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="12" :md=" path === '/' ? 8 : ''">
          <v-card>
            <!-- Render the card title only when not on the login page -->
            <v-card-title v-if="path == '/'">
              <span class="headline">Welcome</span>
            </v-card-title>
            <v-card-subtitle v-if="path == '/'">
              <!-- Render router-view to switch between pages -->
              <router-view />
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BackgroundAnimation from '@components/BackgroundAnimation.vue';
import NavigationDrawer from '@components/NavigationDrawer.vue';
const route = useRoute();
const path = computed(() => route.path);
</script>

<style lang="scss" scoped>
.login {
  transform: translateY(15%);
}

/* Style for BackgroundAnimation to ensure it displays properly */
.background-animation {
  position: absolute; /* Ensure background is correctly positioned */
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1; /* Place background behind other content */
}
</style>
