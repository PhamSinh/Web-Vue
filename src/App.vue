<template>
  <video autoplay muted loop id="background-video">
    <source src="@assets/bg-login.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <v-container :class="path !== '/' ? '' : 'login'">
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title v-if="path !== '/'">
            <span class="headline">{{ $t("login.title") }}</span>
          </v-card-title>
          <v-card-subtitle>
            <!-- Use transition for route changes -->
            <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
              <router-view />
            </transition>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from 'vuetify';

// Theme toggle function
const theme = useTheme();
const path = computed(() => window.location.pathname);

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}

// Transition Hooks
function beforeEnter(el: HTMLElement) {
  el.style.opacity = '0';
}

function enter(el: HTMLElement, done: () => void) {
  el.offsetHeight; // trigger reflow
  el.style.transition = 'opacity 0.5s';
  el.style.opacity = '1';
  done();
}

function leave(el: HTMLElement, done: () => void) {
  el.style.transition = 'opacity 0.5s';
  el.style.opacity = '0';
  done();
}
</script>

<style lang="scss" scoped>
:deep(.v-card-subtitle) {
  opacity: 1 !important;
}

.login {
  transform: translateY(15%);
}

#background-video {
  position: fixed; /* Đảm bảo video luôn nằm ở nền */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Đảm bảo video không bị bóp méo và phủ toàn bộ màn hình */
  z-index: -1; /* Đặt video phía dưới các phần tử khác */
}

/* Transition for fade effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
