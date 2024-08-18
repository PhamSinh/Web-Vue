<script setup lang="ts">
import { computed, readonly, ref } from 'vue';
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const page = ref(1)
const itemsPerPage = ref(5)
const headers: Readonly<Record<string, unknown>[]> = readonly([
  {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Dessert (100g serving)',
  },
  { title: 'Calories', key: 'calories' },
  { title: 'Fat (g)', key: 'fat' },
  { title: 'Carbs (g)', key: 'carbs' },
  { title: 'Protein (g)', key: 'protein' },
  { title: 'Iron (%)', key: 'iron' },
])
const desserts = readonly([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: 1,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: 1,
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: 7,
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: 8,
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: 16,
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: 0,
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: 2,
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: 45,
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: 22,
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: 6,
  },
])

const pageCount = computed(() => {
  return Math.ceil(desserts.length / itemsPerPage.value)
})
</script>

<template>
  <v-layout ref="app">
    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar title="Application bar">
      <v-btn icon="mdi-alarm-light" @click="toggleTheme" />
      <v-select v-model="$i18n.locale" :items="[{ label: 'vi', value: 'vi' }, { label: 'en', value: 'en' }]"
        item-title="label" item-value="value" />
    </v-app-bar>

    <v-main>
      <div>{{ $t('hello') }}</div>
      <div>{{ $d(new Date) }}</div>
      <div>{{ $d(new Date, { dateStyle: 'long' }) }}</div>
      <div>{{ $n(99999) }}</div>
      <div>{{ $n(99999, 'currency') }}</div>
      <div>{{ $n(0.99, 'percent') }}</div>
      <div>{{ $n(12.3451, 'decimal') }}</div>
      <v-icon icon="mdi-home" />
      <v-date-picker hide-header />

      <v-data-table v-model:page="page" :headers="headers" :items="desserts" :items-per-page="itemsPerPage">
        <template v-slot:top>
          <v-text-field :model-value="itemsPerPage" class="pa-2" label="Items per page" max="15" min="-1" type="number"
            hide-details @update:model-value="itemsPerPage = parseInt($event, 10)"></v-text-field>
        </template>

        <template v-slot:bottom>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </template>
      </v-data-table>
    </v-main>

    <v-footer app>
      &copy;Copy right by SinhPV
    </v-footer>
  </v-layout>
</template>

<style lang="scss"></style>

<i18n></i18n>
