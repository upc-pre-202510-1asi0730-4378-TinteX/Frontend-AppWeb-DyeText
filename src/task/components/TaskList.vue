<template>
  <div class="task-list-container">
    <h2>Machines and Their Tasks</h2>

    <div
        v-for="machine in machines"
        :key="machine.id"
        class="machine-card"
    >
      <h3>{{ machine.textil_machine }} <span class="machine-id">#{{ machine.id }}</span></h3>

      <ul v-if="getTasksByMachine(machine.id).length" class="task-list">
        <li
            v-for="task in getTasksByMachine(machine.id)"
            :key="task.id"
            class="task-item"
        >
          <strong>{{ task.description }}</strong> — <span :class="'status ' + task.status.toLowerCase()">{{ task.status }}</span>
        </li>
      </ul>

      <p v-else class="no-task">No tasks available for this machine.</p>

      <button @click="openModal(machine.id)" class="btn-add-task">
        + Add Task
      </button>
    </div>

    <AddTaskModal
        v-if="showModal"
        :machineId="selectedMachineId"
        :machines="machines"
        @close="closeModal"
        @task-added="fetchData"
    />
  </div>
</template>

<script>
import { getTasks } from '/src/task/services/task.service.js';
import { getMachines } from '/src/task/services/machine.service.js';
import AddTaskModal from './CreatePlanningTaskForm.vue';

export default {
  components: {
    AddTaskModal
  },
  data() {
    return {
      machines: [],
      tasks: [],
      showModal: false,
      selectedMachineId: null
    };
  },
  methods: {
    async fetchData() {
      this.machines = await getMachines();
      this.tasks = await getTasks();
    },
    getTasksByMachine(machineId) {
      return this.tasks.filter((task) => task.textileMachineId === machineId);
    },
    openModal(machineId) {
      this.selectedMachineId = machineId;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.task-list-container {
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

.machine-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  padding: 1.5rem;
  text-align: left;
}

.machine-card h3 {
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.machine-id {
  font-size: 0.9rem;
  color: #888;
  margin-left: 0.5rem;
}

.task-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: 1rem;
}

.task-item {
  padding: 0.5rem;
  border-left: 4px solid #2ecc71;
  margin-bottom: 0.5rem;
  background-color: #f8f8f8;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.status.completed {
  color: #2ecc71;
}
.status.pending {
  color: #e67e22;
}
.status.failed {
  color: #e74c3c;
}

.no-task {
  font-style: italic;
  color: #999;
  margin-bottom: 1rem;
}

.btn-add-task {
  background-color: #3498db;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
}

.btn-add-task:hover {
  background-color: #2980b9;
}
</style>
