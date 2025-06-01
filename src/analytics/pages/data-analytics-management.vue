<template>
  <div>
    <h2>{{ $t('option.data-analytics') }}</h2>
    <DataAnalyticsCharts />
  </div>
</template>

<script setup>
import DataAnalyticsCharts from '../components/data-analytics-chart.component.vue';
</script>