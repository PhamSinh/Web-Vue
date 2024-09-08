<template>
  <v-app>
    <!-- Thanh Header -->
    <Header v-if="path !== '/'"/>
    
    <!-- Thanh Navigation Drawer -->
    <NavigationDrawer v-if="path !== '/'"/>
    
    <!-- Nội dung chính của trang -->
    <v-main>
      <v-container :class="{'login': path === '/'}" fluid>
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="12" :md=" path === '/' ? 8 : ''">
            <v-card>
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
/* Đảm bảo rằng nội dung chính không bị che phủ bởi header hoặc drawer */
.v-main {
  padding-top: 64px; /* Chiều cao của thanh header */
  padding-left: 256px; /* Chiều rộng của thanh navigation drawer */
}

/* Đối với trang đăng nhập, thêm margin-top để không bị che bởi header */
.login {
  margin-top: 64px; /* Chiều cao của thanh header */
}

/* Style cho thanh BackgroundAnimation để đảm bảo nó hiển thị đúng */
.background-animation {
  position: absolute; /* Đảm bảo background được định vị chính xác */
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1; /* Đặt background dưới các phần tử khác */
}
</style>
