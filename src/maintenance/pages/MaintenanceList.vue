<template>
  <div class="maintenance-list">
    <div class="header">
      <h2>📅 Mantenimientos programados</h2>
      <button @click="goToCreate">➕ Nuevo mantenimiento</button>
    </div>

    <MaintenanceCard
        v-for="item in maintenances"
        :key="item.id"
        :maintenance="item"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MaintenanceService from '../../Maintenance/services/Maintenance.service.js';
import MaintenanceCard from '../../../../xd/Frontend-AppWeb-DyeTextvF/src/maintenance/components/MaintenanceCard.vue';

const maintenances = ref([]);
const router = useRouter();

const goToCreate = () => {
  router.push({ name: 'createMaintenance' });
};

onMounted(async () => {
  maintenances.value = await MaintenanceService.getAll();
});
</script>

<style scoped>
.maintenance-list {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
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
