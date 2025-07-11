<script setup>
/* Imports */
import { ref } from 'vue'
import CreateTaskForm from '../components/CreatePlanningTaskForm.vue'

/* Reactive toggle to show/hide the form */
const showForm = ref(false)
const showSnackbar = ref(false)

/* Toggle logic for showing the form */
function toggleForm() {
  showForm.value = !showForm.value
}
function handleTaskCreated() {
  showForm.value = false
  showSnackbar.value = true
  setTimeout(() => {
    showSnackbar.value = false
  }, 3000)
}
</script>

<template>
  <div class="task-container">
    <h2>Task Management</h2>

    <!-- Toggle button -->
    <button @click="toggleForm" class="toggle-btn">
      {{ showForm ? 'Hide Task Form' : 'Add Task +' }}
    </button>

    <!-- Form -->
    <div v-if="showForm" class="form-section">
      <CreateTaskForm @taskCreated="handleTaskCreated" />
    </div>

    <!-- Snackbar -->
    <div v-if="showSnackbar" class="snackbar">
      Task successfully created!
    </div>
  </div>
</template>

<style scoped>
.task-container {
  padding: 20px;
  text-align: center;
}

.toggle-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  margin-bottom: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.form-section {
  margin-top: 20px;
}

/* Snackbar */
.snackbar {
  margin-top: 20px;
  background-color: #2ecc71;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  display: inline-block;
  animation: fadeInOut 2.5s ease-in-out;
}

/* Animation */
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(20px); }
}
</style>