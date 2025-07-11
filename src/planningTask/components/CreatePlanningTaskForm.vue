<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <h2>🆕 Crear nueva tarea</h2>

    <div v-if="successMessage" class="alert success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="alert error">{{ errorMessage }}</div>

    <div class="form-group">
      <label for="name">Nombre</label>
      <input v-model="form.name" type="text" id="name" required />
    </div>

    <div class="form-group">
      <label for="description">Descripción</label>
      <textarea v-model="form.description" id="description" />
    </div>

    <div class="form-group">
      <label for="machine">Máquina</label>
      <select v-model="form.textileMachineId" id="machine" required>
        <option disabled value="">Selecciona una máquina</option>
        <option v-for="machine in machines" :key="machine.id" :value="machine.id">
          {{ machine.name }}
        </option>
      </select>
    </div>

    <button type="submit">Crear tarea</button>
    <button type="button" @click="goBack" class="secondary">🔙 Ver lista</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PlanningTaskService from '../../planningTask/services/PlanningTask.service.js';
import axios from "axios";


/// <summary>
/// Router to allow navigation after form submit.
/// </summary>
const router = useRouter();

/// <summary>
/// Reactive form data for task creation.
/// </summary>
const form = ref({
  name: '',
  description: '',
  textileMachineId: ''
});

/// <summary>
/// List of machines to populate the select input.
/// </summary>
const machines = ref([]);
const successMessage = ref('');
const errorMessage = ref('');

/// <summary>
/// Loads available machines on mount.
/// </summary>
const fetchMachines = async () => {
  const response = await axios.get('/api/v1/machines');
  machines.value = response.data;
};

/// <summary>
/// Submits the form and creates a new task.
/// </summary>
const handleSubmit = async () => {
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await PlanningTaskService.create(form.value);
    successMessage.value = '✅ Tarea creada con éxito';
    form.value = { name: '', description: '', textileMachineId: '' };
  } catch (err) {
    errorMessage.value = '❌ Error al crear la tarea';
    console.error(err);
  }
};

/// <summary>
/// Navigates back to the planning task list.
/// </summary>
const goBack = () => {
  router.push({ name: 'planningTasks' });
};

onMounted(fetchMachines);
</script>

<style scoped>
.task-form {
  max-width: 600px;
  margin: auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.alert {
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  font-weight: 600;
}

.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

button.secondary {
  background-color: #6c757d;
  margin-left: 1rem;
}

button.secondary:hover {
  background-color: #5a6268;
}
</style>
