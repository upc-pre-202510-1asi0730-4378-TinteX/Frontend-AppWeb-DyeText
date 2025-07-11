<script>
// Import necessary components and services
import TextilMachineSearchContent from "../component/textilMachine-item-search.component.vue";
import TextilMachineCreateComponent from "../component/textilMachine-item-create.component.vue";
import {TextileMachine} from "../model/textileMachine.entity.js";
import {TextileMachineService} from "../services/textilMachine.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import {Button as PvButton} from "primevue";
import TextileMachineList from "../component/textile-machine-list.component.vue";
import CreateTaskForm from "../../task/components/CreatePlanningTaskForm.vue";

export default {
  name: "textilMachine-management",
  components: {
    TextileMachineList,
    PvButton,
    TextilMachineCreateComponent,
    TextilMachineSearchContent,
    DataManager,
    CreateTaskForm
  },
  data() {
    return {
      showForm: false, // Controls the visibility of the machine creation form
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
    <pv-button role="button" type="button" class="btn-add-machine" @click="showForm = true">
      <h3>{{ $t('add') }} {{ $t('new') }} {{ $t('machine') }}</h3>
      <i class="pi pi-plus"></i>
    </pv-button>
  </div>
  <div class="centered-button">
    <!-- Button to open the task modal -->
    <pv-button role="button" type="button" class="btn-add-task" @click="openTaskModal">
      <h3>{{ $t('add') }} Task</h3>
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

  <div v-if="showTaskForm" class="task-form-wrapper">
    <CreateTaskForm />
  </div>
  <h2 style="color: #1a1a1a">{{ $t('monitoring.featured-machines') }}</h2>
  <!-- List of textile machines -->
  <textile-machine-list />
  <!-- Task modal -->
</template>

<style scoped>

.btn-add-machine{
  margin-bottom: 20px;
}
.centered-button {
  text-align: center;
  margin-bottom: 20px;
}

.task-form-wrapper {
  margin: 0 auto;
  max-width: 600px;
}
</style>