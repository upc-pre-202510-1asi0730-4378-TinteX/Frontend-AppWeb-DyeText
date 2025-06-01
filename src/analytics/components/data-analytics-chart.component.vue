<script setup>
import { ref, onMounted, computed } from 'vue';
import { Bar, Line } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const machines = ref([]);
const machinesInfo = ref([]);
const tasks = ref([]);
const notifications = ref([]);

const barDataA = ref(null);
const barDataB = ref(null);
const barDataC = ref(null);
const lineDataD = ref(null);

const chartOptions = {
  responsive: true,
  plugins: { legend: { display: true } }
};

const isReady = computed(() =>
    barDataA.value && barDataB.value && barDataC.value && lineDataD.value
);

onMounted(async () => {

  const machinesRes = await fetch('http://localhost:3000/textile_machines');
  machines.value = await machinesRes.json();
  const infoRes = await fetch('http://localhost:3000/machines_information');
  machinesInfo.value = await infoRes.json();
  const tasksRes = await fetch('http://localhost:3000/tasks');
  tasks.value = await tasksRes.json();
  const notifRes = await fetch('http://localhost:3000/notifications');
  notifications.value = await notifRes.json();

  barDataA.value = {
    labels: machines.value.map(m => m.name),
    datasets: [{
      label: 'Failure Rate (%)',
      backgroundColor: '#42A5F5',
      data: machines.value.map(m => {
        const info = machinesInfo.value.find(i => i.id === m.machine_information_id);
        return info ? info.failure_rate : 0;
      })
    }]
  };

  barDataB.value = {
    labels: machines.value.map(m => m.name),
    datasets: [{
      label: 'Number of Failures',
      backgroundColor: '#66BB6A',
      data: machines.value.map(m => {
        const info = machinesInfo.value.find(i => i.id === m.machine_information_id);
        return info ? info.amount_failure : 0;
      })
    }]
  };

  const estados = [...new Set(tasks.value.map(t => t.status))];
  barDataC.value = {
    labels: estados,
    datasets: [{
      label: 'Number of Tasks',
      backgroundColor: '#FFA726',
      data: estados.map(e => tasks.value.filter(t => t.status === e).length)
    }]
  };

  const fechas = notifications.value.map(n => n.dateTime.split('T')[0]);
  const fechasUnicas = [...new Set(fechas)];
  lineDataD.value = {
    labels: fechasUnicas,
    datasets: [{
      label: 'Notifications',
      borderColor: '#AB47BC',
      backgroundColor: 'rgba(171,71,188,0.2)',
      data: fechasUnicas.map(f => fechas.filter(x => x === f).length),
      fill: true,
      tension: 0.4
    }]
  };
});
</script>

<template>
  <div>
    <div class="charts-grid">
      <div class="chart-card">
        <h3>{{ $t('analytics.graphA') }}</h3>
        <Bar v-if="barDataA" :data="barDataA" :options="chartOptions" />
      </div>
      <div class="chart-card">
        <h3>{{ $t('analytics.graphB') }}</h3>
        <Bar v-if="barDataB" :data="barDataB" :options="chartOptions" />
      </div>
      <div class="chart-card">
        <h3>{{ $t('analytics.graphC') }}</h3>
        <Bar v-if="barDataC" :data="barDataC" :options="chartOptions" />
      </div>
      <div class="chart-card">
        <h3>{{ $t('analytics.graphD') }}</h3>
        <Line v-if="lineDataD" :data="lineDataD" :options="chartOptions" />
      </div>
    </div>
    <div class="legend">
      <h4>{{ $t('analytics.legendTitle') }}</h4>
      <ul>
        <li><b>{{ $t('analytics.graphA') }}:</b> {{ $t('analytics.legendA') }}</li>
        <li><b>{{ $t('analytics.graphB') }}:</b> {{ $t('analytics.legendB') }}</li>
        <li><b>{{ $t('analytics.graphC') }}:</b> {{ $t('analytics.legendC') }}</li>
        <li><b>{{ $t('analytics.graphD') }}:</b> {{ $t('analytics.legendD') }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}
.chart-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 16px;
  max-width: 400px;
  margin: auto;
}
.chart-card canvas {
  max-height: 250px !important;
}
.legend {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin-top: 24px;
}
.legend ul {
  margin: 0;
  padding-left: 20px;
}
</style>