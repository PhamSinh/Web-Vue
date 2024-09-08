<template>
  <v-app>
    <!-- Thanh Header -->
    <Header />

    <!-- Thanh Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      class="navigation-drawer"
      :class="{ collapsed: !drawer }"
      :width="drawer ? '240px' : '72px'"
    >
      <!-- Collapse Button -->
      <v-btn @click="toggleDrawer" class="collapse-btn" icon>
        <v-icon>{{ drawer ? "mdi-chevron-left" : "mdi-chevron-right" }}</v-icon>
      </v-btn>

      <!-- Navigation Items -->
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          class="menu-item"
          :class="{ active: $route.path === item.route }"
        >
          <v-list-item-icon>
            <v-icon :class="{ 'icon-active': $route.path === item.route }">{{
              item.icon
            }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content v-if="drawer">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Nội dung chính -->
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import Header from '@components/Header.vue'; // Import Header component

const drawer = ref(true);
const route = useRoute();

const items = [
  { title: "Dashboard", route: "/dashboard", icon: "mdi-view-dashboard" },
  { title: "New Screen", route: "/new-screen", icon: "mdi-account-group" },
  { title: "Settings", route: "/settings", icon: "mdi-cog" },
];

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<style lang="scss" scoped>
.navigation-drawer {
  background-color: #2e3b4e;
  color: #ffffff;
  transition: width 0.3s ease;
  position: fixed;
  top: 64px; /* Chiều cao của header */
  left: 0;
  bottom: 0;
  padding-top: 64px; /* Đảm bảo nội dung không bị che khuất */
}

.navigation-drawer.collapsed {
  width: 72px;
}

.menu-item {
  border-radius: 8px;
  margin: 4px 0;
  display: flex;
  align-items: center;
  padding: 8px 16px;
}

.menu-item:hover {
  background-color: #1f2a38;
  cursor: pointer;
}

.menu-item.active {
  background-color: #004d40;
}

.v-list-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  margin-right: 16px;
}

.v-list-item-content {
  color: #ffffff;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
}

.v-list-item-title {
  font-weight: 500;
  white-space: nowrap;
}

.icon-active {
  animation: fadeInOut 1.5s infinite;
}

@keyframes fadeInOut {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

.collapse-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  transition: all 0.3s ease;
  background-color: #004d40;
  color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.navigation-drawer:not(.collapsed) .collapse-btn {
  right: 50%;
  transform: translateX(50%);
}

.navigation-drawer.collapsed .v-list-item-content {
  display: none;
}

:deep(.v-list-item__content) {
  display: flex;
  gap: 1rem;
  .v-list-item-title {
    margin-top: 3px;
  }
}
</style>
