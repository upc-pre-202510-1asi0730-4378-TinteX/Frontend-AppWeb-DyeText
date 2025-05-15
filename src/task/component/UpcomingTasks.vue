<template>
  <div>
    <h1>Upcoming Tasks</h1>
    <TaskList />
  </div>
</template>

<script>
import TaskList from '/src/task/component/TaskList.vue';

export default {
  components: {TaskList},
};
</script>