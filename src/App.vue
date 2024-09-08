<template>
  <v-app>
    <Header v-if="path !== '/'"/>
    
    <NavigationDrawer v-if="path !== '/'"/>
    
    <v-main>
    <BackgroundAnimation v-if="path == '/'"/>
      <v-container :class="{'login': path === '/'}" fluid>
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="12" :md=" path === '/' ? 8 : ''">
            <v-card>
              <v-card-title v-if="path == '/'">
                <span class="headline">Welcome</span>
              </v-card-title>
              <v-card-subtitle v-if="path == '/'">
                <router-view />
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BackgroundAnimation from '@components/BackgroundAnimation.vue';
import NavigationDrawer from '@components/NavigationDrawer.vue';
import Header from '@components/Header.vue';

const route = useRoute();
const path = computed(() => route.path);
</script>

<style lang="scss" scoped>

.v-main {
  padding-top: 64px;
  padding-left: 256px;
}

.login {
  margin-top: 64px;
  margin-left: -74px;
}

.background-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1; 
}
:deep(.v-navigation-drawer) {
  position: fixed !important;
}
:deep(.v-card) {
  background-color: var(--background-color);
  color: var(--text-color);
}

/* Example for table headers */
:deep(.fixed-header-table thead th) {
  background-color: var(--background-color);
  color: var(--text-color);
}
:deep(.v-main) {
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
