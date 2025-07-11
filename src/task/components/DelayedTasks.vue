<template>
  <div class="delayed-container">
    <h2>⏰ Delayed Tasks</h2>

    <ul v-if="delayedTasks.length" class="task-list">
      <li v-for="task in delayedTasks" :key="task.id" class="task-item">
        <div class="task-info">
          <span>{{ task.description }}</span>
          <span class="status delayed">{{ task.status }}</span>
        </div>
        <button @click="finishTask(task.id)" class="btn-finish">✔ Mark as Completed</button>
      </li>
    </ul>

    <p v-else class="no-tasks">🎉 No delayed tasks at the moment.</p>

    <button @click="goHome" class="btn-home"> Back to Home</button>
  </div>
</template>

<script>
import { getTasks, updateTask } from '../services/task.service.js';

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
        console.error('Error fetching tasks:', error);
      }
    },
    async finishTask(taskId) {
      try {
        await updateTask(taskId, { status: 'completed' });
        this.fetchData();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    goHome() {
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.delayed-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  background: #fce4e4;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-info {
  display: flex;
  flex-direction: column;
}

.status.delayed {
  color: #e74c3c;
  font-weight: bold;
}

.btn-finish {
  background: #2ecc71;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.btn-finish:hover {
  background: #27ae60;
}

.no-tasks {
  font-style: italic;
  color: #777;
  margin: 1.5rem 0;
}

.btn-home {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
}

.btn-home:hover {
  background: #2980b9;
}
</style>
