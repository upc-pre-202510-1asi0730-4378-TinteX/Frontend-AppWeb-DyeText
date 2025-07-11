<template>
  <div>
    <h2 style="color: #1a1a1a; margin: 20px">{{ $t('option.data-analytics') }}</h2>
    <data-analytics-charts/>
  </div>
</template>

<script setup>
import DataAnalyticsCharts from '../components/data-analytics-chart.component.vue';
</script>