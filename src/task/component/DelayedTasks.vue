<template>
  <div>
    <h2>Tareas Atrasadas</h2>
    <ul v-if="delayedTasks.length">
      <li v-for="task in delayedTasks" :key="task.id">
        {{ task.description }} - {{ task.status }}
        <button @click="finishTask(task.id)">Finish and Save</button>
      </li>
    </ul>
    <p v-else>No hay tareas atrasadas.</p>
    <button @click="goHome">Regresar al Home</button>
  </div>
</template>

<script>
import { getTasks, updateTask } from '/src/task/services/task.service.js';

export default {
  data() {
    return {
      tasks: [],
    };
  },
  computed: {
    delayedTasks() {
      return this.tasks.filter((task) => task.status === 'delayed');
    },
  },
  methods: {
    async fetchData() {
      try {
        this.tasks = await getTasks();
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    },
    async finishTask(taskId) {
      try {
        await updateTask(taskId, { status: 'completed' });
        this.fetchData();
      } catch (error) {
        console.error('Error al actualizar la tarea:', error);
      }
    },
    goHome() {
      this.$router.push('/');
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>