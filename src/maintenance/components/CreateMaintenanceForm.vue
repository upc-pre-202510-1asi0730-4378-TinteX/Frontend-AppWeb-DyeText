<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MaintenanceService from '../../Maintenance/services/Maintenance.service.js';
import axios from "axios";


const router = useRouter();

const form = ref({
  description: '',
  scheduledDate: '',
  machineId: ''
});

const machines = ref([]);
const successMessage = ref('');
const errorMessage = ref('');

const fetchMachines = async () => {
  const response = await axios.get('/api/v1/machines');
  machines.value = response.data;
};

const handleSubmit = async () => {
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await MaintenanceService.create(form.value);
    successMessage.value = '✅ Mantenimiento registrado con éxito.';
    form.value = { description: '', scheduledDate: '', machineId: '' };
  } catch (err) {
    errorMessage.value = '❌ Error al registrar el mantenimiento.';
    console.error(err);
  }
};

const goBack = () => {
  router.push({ name: 'maintenanceList' });
};

onMounted(fetchMachines);
</script>

<template>
  <form @submit.prevent="handleSubmit" class="maintenance-form">
    <h2>🛠️ Nuevo mantenimiento</h2>

    <div v-if="successMessage" class="alert success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="alert error">{{ errorMessage }}</div>

    <!-- campos de formulario aquí -->

    <button type="submit">Registrar mantenimiento</button>
    <button type="button" @click="goBack" class="secondary">🔙 Ver lista</button>
  </form>
</template>

<style scoped>
button.secondary {
  background-color: #6c757d;
  margin-left: 1rem;
}

button.secondary:hover {
  background-color: #5a6268;
}
</style>
