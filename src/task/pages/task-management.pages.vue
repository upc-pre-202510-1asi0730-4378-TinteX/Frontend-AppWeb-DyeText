<script setup>
import { ref } from "vue";

const tasks = ref([]);
const newTask = ref("");

function addTask() {
  if (newTask.value.trim()) {
    tasks.value.push({ id: tasks.value.length + 1, name: newTask.value });
    newTask.value = "";
  }
}
</script>

<template>
  <div class="task-container">
    <h2>Gestión de Tareas</h2>
    <div class="task-input">
      <input
          v-model="newTask"
          type="text"
          placeholder="Escribe una nueva tarea"
      />
      <button @click="addTask">Añadir Tarea</button>
    </div>
    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.task-container {
  padding: 20px;
  text-align: center;
}

.task-input {
  margin-bottom: 20px;
}

.task-input input {
  padding: 10px;
  width: 60%;
  margin-right: 10px;
}

.task-input button {
  padding: 10px 20px;
  background-color: #66b2ff;
  color: #ab5757;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-list li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>