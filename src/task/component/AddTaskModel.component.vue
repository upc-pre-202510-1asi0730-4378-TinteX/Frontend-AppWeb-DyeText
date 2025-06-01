<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Añadir Tarea</h3>
      <form @submit.prevent="addTask">
        <div>
          <label for="machine">Máquina:</label>
          <select v-model="selectedMachineId" id="machine" required>
            <option v-for="machine in machines" :key="machine.id" :value="machine.id">
              {{ machine.name }} (ID: {{ machine.id }})
            </option>
          </select>
        </div>
        <div>
          <label for="description">Descripción:</label>
          <input v-model="description" id="description" type="text" required />
        </div>
        <div>
          <label for="status">Estado:</label>
          <select v-model="status" id="status" required>
            <option value="pending">Pendiente</option>
            <option value="in-progress">En Progreso</option>
            <option value="completed">Completada</option>
          </select>
        </div>
        <button type="submit">Guardar</button>
        <button type="button" @click="$emit('close')">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    machines: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedMachineId: null,
      description: '',
      status: 'pending',
    };
  },
  methods: {
    addTask() {
      const task = {
        id: Date.now(), // Generar un ID único
        machineId: this.selectedMachineId,
        description: this.description,
        status: this.status,
      };
      this.$emit('task-added', task); // Emitir la tarea creada
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #2f8069;
  padding: 20px;
  border-radius: 5px;
}
</style>