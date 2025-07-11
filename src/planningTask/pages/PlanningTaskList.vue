<template>
  <div class="planning-task-list">
    <div class="header">
      <h2>📋 Tareas planificadas</h2>
      <button @click="goToCreate">➕ Nueva tarea</button>
    </div>

    <PlanningTaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PlanningTaskService from '../services/PlanningTask.service.js';
import PlanningTaskCard from '../components/PlanningTaskCard.vue';

/// <summary>
/// Page to list all planning tasks.
/// </summary>

const tasks = ref([]);
const router = useRouter();

const goToCreate = () => {
  router.push({ name: 'createPlanningTask' });
};

onMounted(async () => {
  tasks.value = await PlanningTaskService.getAll();
});
</script>

<style scoped>
.planning-task-list {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

button {
  background-color: #007BFF;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
