<template>
  <section class="create-task-page">
    <h1>🧩 Nueva planificación</h1>
    <CreatePlanningTaskForm />
  </section>
</template>

<script setup>
/// <summary>
/// Page to create a new planning task.
/// Embeds the reusable CreatePlanningTaskForm component.
/// </summary>
import CreatePlanningTaskForm from '../components/CreatePlanningTaskForm.vue';
</script>

<style scoped>
.create-task-page {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}
</style>
