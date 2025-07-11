<template>
  <section class="create-maintenance-page">
    <h1>📅 Nuevo Mantenimiento</h1>
    <CreateMaintenanceForm />
  </section>
</template>

<script setup>
/// <summary>
/// Page that embeds the maintenance creation form.
/// </summary>
import CreateMaintenanceForm from '../../../../xd/Frontend-AppWeb-DyeTextvF/src/maintenance/components/CreateMaintenanceForm.vue';
</script>

<style scoped>
.create-maintenance-page {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}
</style>
