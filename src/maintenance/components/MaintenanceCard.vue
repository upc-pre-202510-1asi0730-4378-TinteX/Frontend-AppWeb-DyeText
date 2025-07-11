<template>
  <div class="maintenance-card">
    <h3>🛠️ {{ maintenance.description }}</h3>
    <p><strong>Fecha programada:</strong> {{ formatDate(maintenance.scheduledDate) }}</p>
    <p><strong>Máquina:</strong> {{ maintenance.machineName }}</p>
    <p><strong>Estado:</strong> {{ maintenance.status }}</p>
  </div>
</template>

<script setup>
/// <summary>
/// Displays a single maintenance record with its key info.
/// </summary>
/// <param name="maintenance">Maintenance object passed as prop.</param>

import { defineProps } from 'vue';

defineProps({
  maintenance: {
    type: Object,
    required: true
  }
});

/// <summary>
/// Formats the scheduled date into a readable string.
/// </summary>
const formatDate = (isoString) => {
  return new Date(isoString).toLocaleString('es-PE', {
    dateStyle: 'long',
    timeStyle: 'short'
  });
};
</script>

<style scoped>
.maintenance-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
}
</style>
