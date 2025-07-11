<template>
  <div class="form-container">
    <h2>Create Task</h2>
    <form @submit.prevent="submitForm" class="task-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="task.name" type="text" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="task.description" required></textarea>
      </div>

      <div class="form-group">
        <label for="machine">Select Machine</label>
        <select id="machine" v-model="task.textileMachineId" required>
          <option disabled value="">-- Choose a machine --</option>
          <option v-for="machine in machines" :key="machine.id" :value="machine.id">
            {{ machine.name }}
          </option>
        </select>
      </div>

      <button type="submit" class="submit-button">Create Task</button>
    </form>
  </div>
</template>

<script>
import { TextileMachineService } from "../../monitoring/services/textilMachine.service.js";
import TaskService from "../services/task.service.js";

export default {
  name: "CreatePlanningTaskForm",
  data() {
    return {
      task: {
        name: "",
        description: "",
        textileMachineId: ""
      },
      machines: []
    };
  },
  async mounted() {
    try {
      const service = new TextileMachineService();
      const response = await service.getAll();
      this.machines = Array.isArray(response.data) ? response.data : response;
    } catch (error) {
      console.error("Error loading machines:", error);
    }
  },
  methods: {
    async submitForm() {
      const plainTask = {
        name: this.task.name,
        description: this.task.description,
        textileMachineId: this.task.textileMachineId
      };

      console.log("Payload send to backend:", JSON.stringify(this.task, null, 2));

      try {
        await TaskService.create(plainTask);
        this.$emit("created");


        this.task = {
          name: "",
          description: "",
          textileMachineId: ""
        };
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: auto;
}

.task-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #1f2937;
  font-weight: 600;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #fff;
  color: #111827;
}

.submit-button {
  padding: 0.7rem;
  background-color: #1f2937;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #111827cc;
}
</style>
