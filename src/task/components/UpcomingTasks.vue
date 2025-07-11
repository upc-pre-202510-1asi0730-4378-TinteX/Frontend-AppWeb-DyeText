<template>
  <div class="upcoming-container">
    <h2> Upcoming Tasks</h2>
    <TaskList />
  </div>
</template>

<script>
import TaskList from '../components/TaskList.vue';

export default {
  components: {
    TaskList
  }
};
</script>

<style scoped>
.upcoming-container {
  max-width: 960px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fdfdfd;
  border-radius: 10px;
  text-align: center;
}
</style>
