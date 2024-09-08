<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="headline">Employee List</span>
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
        <div v-else-if="!employees.length" class="no-data">
          No data available
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
            <tr v-for="employee in paginatedEmployees" :key="employee.id" class="table-row">
              <td>{{ employee.id }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.position }}</td>
              <td>{{ employee.email }}</td>
              <td class="actions">
                <v-btn @click="editEmployee(employee)" color="primary">Edit</v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card-subtitle>
      <!-- Pagination and Record Count -->
      <v-card-actions>
        <div class="pagination-container">
          <span>{{ `Showing ${paginatedEmployees.length} of ${totalItems} records` }}</span>
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
    <!-- Dialog for editing employee details -->
    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Employee</span>
        </v-card-title>
        <v-card-subtitle class="custom-subtitle">
          <v-form>
            <!-- Form fields for employee details -->
            <v-text-field
              v-model="selectedEmployee.name"
              label="Name"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="selectedEmployee.position"
              label="Position"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="selectedEmployee.email"
              label="Email"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-subtitle>
        <v-card-actions>
          <!-- Buttons to cancel or confirm changes -->
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="confirm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const showDialog = ref(false);
const selectedEmployee = ref<any>(null);
const page = ref(1); // Initialize with the default page number
const limit = 10; // Number of items per page
const loading = ref(true); // New loading state

// Compute the employees based on the current page and limit
const employees = computed(() => store.getters.employees);
const totalItems = computed(() => store.getters.totalItems); // Assuming you have totalItems in your store
const totalPages = computed(() => Math.ceil(totalItems.value / limit));

const paginatedEmployees = computed(() => employees.value.slice((page.value - 1) * limit, page.value * limit));

// Function to handle editing employee details
const editEmployee = (employee: any) => {
  selectedEmployee.value = { ...employee }; // Create a copy of the employee data
  showDialog.value = true; // Show the dialog
};

// Function to cancel editing
const cancel = () => {
  showDialog.value = false; // Hide the dialog
};

// Function to confirm changes
const confirm = async () => {
  try {
    await store.dispatch('updateEmployee', { id: selectedEmployee.value.id, data: selectedEmployee.value });
    showDialog.value = false; // Hide the dialog after successful update
    // Optionally refetch the current page to get the latest data
    fetchEmployees(page.value);
  } catch (error) {
    console.error('Error updating employee:', error);
  }
};

// Function to handle page change
const handlePageChange = (newPage: number) => {
  page.value = newPage;
  fetchEmployees(newPage); // Fetch employees for the new page
};

// Function to fetch employees from the API
const fetchEmployees = async (currentPage: number) => {
  loading.value = true; // Set loading state to true
  try {
    await store.dispatch('fetchEmployees', { page: currentPage, limit });
  } finally {
    loading.value = false; // Set loading state to false after fetching data
  }
};

// Fetch employees when component mounts
onMounted(() => {
  fetchEmployees(page.value);
});

// Watch for changes in the page number and fetch new data
watch(page, (newPage) => {
  fetchEmployees(newPage);
});
</script>
<style lang="scss" scoped>
/* Container for the table to ensure proper scrolling */
.custom-subtitle {
  position: relative;
  max-height: 400px; /* Set a specific height */
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
  top: 0px;
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
  background-color: #f0f0f0; /* Hover effect for rows */
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
