<template>
  <div class="modal">
    <h3>Añadir Nueva Tarea</h3>
    <form @submit.prevent="addTask">
      <label for="description">Descripción:</label>
      <input id="description" v-model="description" required />

      <label for="status">Estado:</label>
      <select id="status" v-model="status">
        <option value="pending">Pendiente</option>
        <option value="completed">Completada</option>
      </select>

      <button type="submit">Añadir</button>
      <button type="button" @click="$emit('close')">Cancelar</button>
    </form>
  </div>
</template>

<script>
import { addTask } from '/src/task/services/task.service.js';

export default {
  props: {
    machineId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      description: '',
      status: 'pending',
    };
  },
  methods: {
    async addTask() {
      await addTask({
        machineId: this.machineId,
        description: this.description,
        status: this.status,
      });
      this.$emit('task-added');
      this.$emit('close');
    },
  },
};
</script>