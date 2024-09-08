<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>My Application</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="logout" icon>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  // Xử lý logout logic ở đây (xóa session, token, v.v.)
  router.push('/'); // Điều hướng về trang chủ
};
</script>

<style scoped>
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
  color: white;
}
</style>
