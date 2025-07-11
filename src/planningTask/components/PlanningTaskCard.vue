<template>
  <div class="task-card">
    <h3>{{ task.name }}</h3>
    <p v-if="task.description">📝 {{ task.description }}</p>
    <p>Máquina: <strong>{{ task.textileMachineName }}</strong></p>
    <small>ID: {{ task.id }}</small>
  </div>
</template>

<script setup>
/// <summary>
/// Displays basic information about a planning task.
/// </summary>
/// <param name="task">A PlanningTask object passed as a prop.</param>

defineProps({
  task: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.task-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  background-color: #f9f9f9;
  margin-bottom: 1rem;
}
</style>
