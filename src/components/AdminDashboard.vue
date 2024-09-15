<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="headline">Admin</span>
      </v-card-title>
      <v-card-subtitle class="custom-subtitle">
        <!-- Loading spinner -->
        <div v-if="loading" class="loading-container">
          <v-progress-circular
            indeterminate
            color="primary"
            class="loading-spinner"
          ></v-progress-circular>
        </div>

        <!-- No data message -->
        <div v-else-if="!items.length" class="no-data">
          Empty
        </div>

        <!-- Fixed header table -->
        <table v-else class="fixed-header-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Email</th>
              <th class="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedItems" :key="item.id" class="table-row">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.position }}</td>
              <td>{{ item.email }}</td>
              <td class="actions">
                <v-btn @click="confirmDelete(item.id)" color="red">Delete</v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card-subtitle>
      <!-- Pagination and Record Count -->
      <v-card-actions>
        <div class="pagination-container">
          <span>{{ `Showing ${paginatedItems.length} of ${totalItems} records` }}</span>
          <v-pagination
            v-model:page="page"
            :length="totalPages"
            class="pagination"
            total-visible="7"
            @update:page="handlePageChange"
          />
        </div>
      </v-card-actions>
    </v-card>
    <!-- Confirmation Dialog -->
    <v-dialog v-model="showConfirmDialog" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Confirm Deletion</span>
        </v-card-title>
        <v-card-subtitle>
          Are you sure you want to delete this item?
        </v-card-subtitle>
        <v-card-actions>
          <v-btn @click="cancelDelete">Cancel</v-btn>
          <v-btn color="red" @click="deleteItem">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const page = ref(1); // Initialize with the default page number
const limit = 10; // Number of items per page
const loading = ref(true); // New loading state
const showConfirmDialog = ref(false); // Show confirmation dialog
const itemToDelete = ref<number | null>(null); // ID of item to delete

// Compute the items based on the current page and limit
const items = computed(() => store.getters.items);
const totalItems = computed(() => store.getters.totalItems); // Assuming you have totalItems in your store
const totalPages = computed(() => Math.ceil(totalItems.value / limit));

const paginatedItems = computed(() => items.value.slice((page.value - 1) * limit, page.value * limit));

// Function to handle confirming deletion
const confirmDelete = (id: number) => {
  itemToDelete.value = id; // Set the ID of the item to delete
  showConfirmDialog.value = true; // Show the confirmation dialog
};

// Function to cancel deletion
const cancelDelete = () => {
  showConfirmDialog.value = false; // Hide the confirmation dialog
  itemToDelete.value = null; // Clear the item ID
};

// Function to handle actual deletion
const deleteItem = async () => {
  if (itemToDelete.value !== null) {
    try {
      await store.dispatch('deleteItem', itemToDelete.value);
      fetchItems(page.value); // Fetch the updated list after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      showConfirmDialog.value = false; // Hide the confirmation dialog
      itemToDelete.value = null; // Clear the item ID
    }
  }
};

// Function to handle page change
const handlePageChange = (newPage: number) => {
  page.value = newPage;
  fetchItems(newPage); // Fetch items for the new page
};

// Function to fetch items from the API
const fetchItems = async (currentPage: number) => {
  loading.value = true; // Set loading state to true
  try {
    await store.dispatch('fetchItems', { page: currentPage, limit });
  } finally {
    loading.value = false; // Set loading state to false after fetching data
  }
};

// Fetch items when component mounts
onMounted(() => {
  fetchItems(page.value);
});

// Watch for changes in the page number and fetch new data
watch(page, (newPage: any) => {
  fetchItems(newPage);
});
</script>

<style lang="scss" scoped>
/* Container for the table to ensure proper scrolling */
.custom-subtitle {
  position: relative;
  max-height: 60vh; /* Adjust height as needed */
  overflow-y: auto; /* Enable vertical scrolling */
}

.fixed-header-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.fixed-header-table thead th {
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  top: 0;
  background-color: #f5f5f5; /* Match the header background color */
  z-index: 1; /* Ensure the header stays above the table body */
  outline: 1px solid #ddb;
}

.fixed-header-table th,
.fixed-header-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.fixed-header-table th {
  font-weight: bold;
}

/* Center align the content in the Actions column */
.fixed-header-table th.actions,
.fixed-header-table td.actions {
  text-align: center;
}

.table-row:hover {
  background-color: var(--hover); /* Hover effect for rows */
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Adjust height as needed */
}

.loading-spinner {
  display: block;
}

.no-data {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: #888;
}

.custom-subtitle {
  color: var(--text-color);
  opacity: 1;
  max-height: 60vh;
}
/* Example for card background */
.v-card {
  background-color: var(--background-color);
  color: var(--text-color);
}

/* Example for table headers */
.fixed-header-table thead th {
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
