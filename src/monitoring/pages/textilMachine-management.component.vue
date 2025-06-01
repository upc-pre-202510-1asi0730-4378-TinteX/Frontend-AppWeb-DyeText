<script>
// Import necessary components and services
import TextilMachineSearchContent from "../component/textilMachine-item-search.component.vue";
import TextilMachineCreateComponent from "../component/textilMachine-item-create.component.vue";
import {TextileMachine} from "../model/textileMachine.entity.js";
import {TextileMachineService} from "../services/textilMachine.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import {Button as PvButton} from "primevue";
import TextileMachineList from "../component/textile-machine-list.component.vue";
import AddTaskModal from "../../task/component/AddTaskModel.component.vue";

export default {
  name: "textilMachine-management",
  components: {
    TextileMachineList,
    PvButton,
    TextilMachineCreateComponent,
    TextilMachineSearchContent,
    DataManager,
    AddTaskModal,
  },
  data() {
    return {
      showForm: false, // Controls the visibility of the machine creation form
      showTaskModal: false, // Controls the visibility of the task modal
      selectedMachineId: null, // Stores the selected machine ID
      tasks: [], // List of tasks
      machines: [], // List of machines
    };
  },
  methods: {
    handleSave() {
      this.showForm = false; // Close the form after saving
    },
    openTaskModal() {
      this.showTaskModal = true; // Open the task modal
    },
    closeTaskModal() {
      this.showTaskModal = false; // Close the task modal
    },
    addTask() {
      this.tasks.push({}); // Eliminado el parámetro 'task'
    },
    fetchMachines() {
      // Fetch the list of machines from the service
      const textileMachineService = new TextileMachineService();
      textileMachineService.getAll().then((response) => {
        this.machines = response.data.map((machine) => new TextileMachine(machine));
      });
    },
    getTasksForMachine(machineId) {
      return this.tasks.filter(task => task.machineId === machineId);
    }
  },
  created() {
    this.fetchMachines(); // Fetch machines when the component is created
  },
};
</script>

<template>
  <!-- Search content for textile machines -->
  <textil-machine-search-content />
  <div>
    <!-- Button to add a new machine -->
    <pv-button role="button" type="button" class="btn-add-sensor" @click="showForm = true">
      <h3>{{ $t('add') }} {{ $t('new') }} {{ $t('machine') }}</h3>
      <i class="pi pi-plus"></i>
    </pv-button>
  </div>
  <div class="centered-button">
    <!-- Button to open the task modal -->
    <pv-button role="button" type="button" class="btn-add-task" @click="openTaskModal">
      <h3>Añadir Tarea</h3>
      <i class="pi pi-plus"></i>
    </pv-button>
  </div>
  <!-- Machine creation form -->
  <textil-machine-create-component
      v-if="showForm"
      :visible="showForm"
      @cancel-requested="showForm = false"
      @save-requested="handleSave"
  />
  <h2 style="color: #1a1a1a">{{ $t('monitoring.featured-machines') }}</h2>
  <!-- List of textile machines -->
  <textile-machine-list />
  <!-- Task modal -->
  <AddTaskModal
      v-if="showTaskModal"
      :machines="machines"
      @close="closeTaskModal"
      @task-added="addTask"
  />
  <div class="task-list">
    <h2>Lista de Tareas</h2>
    <!-- Group tasks by machine -->
    <div v-for="machine in machines" :key="machine.id" class="machine-task-group">
      <h3>Máquina {{ machine.name }} (ID: {{ machine.id }})</h3>
      <ul>
        <!-- Display tasks for each machine -->
        <li
            v-for="task in getTasksForMachine(machine.id)"
            :key="task.id"
            class="task-item"
        >
          <div class="task-details">
            <span class="task-description">{{ task.description }}</span>
            <span class="task-status">{{ task.status }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Styling for the task list */
.task-list {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #006d77; /* Dark turquoise background */
  color: white;
}

.machine-task-group {
  margin-bottom: 20px;
}

.task-item {
  display: flex;
  justify-content: center; /* Center align task details */
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-weight: bold; /* Bold text */
}

.task-item:last-child {
  border-bottom: none;
}

.task-details {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align text */
}

.task-description {
  font-weight: bold;
  color: white;
  text-align: center; /* Center align text */
}

.task-status {
  font-size: 0.9rem;
  color: #d4f1f4; /* Lighter color for status */
  text-align: center; /* Center align text */
}
</style>