<template>
  <div class="task-list">
    <h2>Máquinas y Tareas</h2>
    <div v-for="machine in machines" :key="machine.id" class="machine-card">
      <h3>Máquina {{ machine.textil_machine }} (ID: {{ machine.id }})</h3>
      <ul v-if="getTasksByMachine(machine.id).length" class="task-list">
        <li v-for="task in getTasksByMachine(machine.id)" :key="task.id" class="task-item">
          {{ task.description }} - {{ task.status }}
        </li>
      </ul>
      <p v-else>No hay tareas para esta máquina.</p>
      <button @click="openModal(machine.id)" class="btn-add-task">Añadir Tarea</button>
    </div>
    <button @click="finishAllTasks(machine.id)" class="btn-finish-tasks">Finish and Save</button>
    <br>
    <br>
    <button @click="goHome">Regresar al Home</button>

    <AddTaskModal
        v-if="showModal"
        :machineId="selectedMachineId"
        @close="closeModal"
        @task-added="fetchData"
    />
  </div>
</template>

<script>
import { getTasks, updateTask } from '/src/task/services/task.service.js';
import { getMachines } from '/src/task/services/machine.service.js';
import AddTaskModal from '/src/task/component/AddTaskModel.vue';

export default {
  components: { AddTaskModal },
  data() {
    return {
      machines: [],
      tasks: [],
      showModal: false,
      selectedMachineId: null,
    };
  },
  methods: {
    async fetchData() {
      this.machines = await getMachines();
      this.tasks = await getTasks();
    },
    getTasksByMachine(machineId) {
      return this.tasks.filter((task) => task.machine_id === machineId);
    },
    openModal(machineId) {
      this.selectedMachineId = machineId;
      this.showModal = true;
    },
    goHome() {
      this.$router.push('/');
    },
    closeModal() {
      this.showModal = false;
    },
    async finishAllTasks(machineId) {
      const tasksToFinish = this.getTasksByMachine(machineId);
      for (const task of tasksToFinish) {
        await updateTask(task.id, {status: 'completed'});
      }
      this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
