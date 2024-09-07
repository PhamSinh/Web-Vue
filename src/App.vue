<template>
  <v-container>
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <!-- <v-card-title>
            <span class="headline">{{ $t('login.title') }}</span>
          </v-card-title> -->
          <v-card-subtitle>
            <!-- Use router-view to render the current route's component -->
            <router-view />
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';

// Theme toggle function
const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>

<style scoped>
/* Add styles here if needed */
</style>
