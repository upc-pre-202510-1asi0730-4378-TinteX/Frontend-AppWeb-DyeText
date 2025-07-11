<script>
import { Bar, Line } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import {TextileMachineService} from "../../monitoring/services/textilMachine.service.js";
import {TextileMachine} from "../../monitoring/model/textileMachine.entity.js";
import {MachineInformationService} from "../../maintenance/service/machine-information.service.js";
import {MachineInformation} from "../../maintenance/model/machine-information.entity.js";
Chart.register(...registerables);
export default {
  name: 'data-analytics-charts',
  components: { Bar, Line },
  data() {
    return {
      showForm: false,
      machinesInformation: [],
      textileMachines: [],
      textileMachineService: null,
      machineInformationService: null,
      tasks: [],
      notifications: [],
      barDataA: null,
      barDataB: null,
      barDataC: null,
      lineDataD: null,
      chartOptions: {
        responsive: true,
        plugins: {legend: {display: true}}
      }
    };
  },
  async created() {
    this.textileMachineService = new TextileMachineService();
    this.machineInformationService = new MachineInformationService();

    try {
      // Fetch all necessary data concurrently
      const [
        machinesInfoResponse,
        textileMachinesResponse
      ] = await Promise.all([
        this.machineInformationService.getAll(),
        this.textileMachineService.getAll()
      ]);

      this.machinesInformation = machinesInfoResponse.data.map(elem => new MachineInformation(elem));
      this.textileMachines = textileMachinesResponse.data.map(elem => new TextileMachine(elem));

      this.barDataA = {
        labels: this.textileMachines.map(m => m.name),
        datasets: [{
          label: 'Failure Rate (%)',
          backgroundColor: '#42A5F5',
          data: this.textileMachines.map(m => {
            const info = this.machinesInformation.find(i => i.id === m.machineInformationId);
            return info ? info.failureRate : 0;
          })
        }]
      };

      this.barDataB = {
        labels: this.textileMachines.map(m => m.name),
        datasets: [{
          label: 'Number of Failures',
          backgroundColor: '#66BB6A',
          data: this.textileMachines.map(m => {
            const info = this.machinesInformation.find(i => i.id === m.machineInformationId);
            return info ? info.amountFailure : 0;
          })
        }]
      };

      console.log("barDataA populated:", this.barDataA);
      console.log("barDataB populated:", this.barDataB);

    } catch (error) {
      console.error('Error fetching data for charts:', error);
    }
  }
}

</script>

<template>
  <div>
    <div class="charts-grid">
      <div class="chart-card">
        <h3 > {{ $t('analytics.graphA') }}</h3>
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
  background: rgba(49, 47, 47, 0.37);
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
  background: rgba(50, 72, 84, 0.63);
  border-radius: 8px;
  padding: 16px;
  margin: auto;
  width: 55%;
  ul{
    list-style: none;
    li{
      margin: 16px 0;
    }
  }
}
.legend ul {
  margin: 0;
  padding-left: 20px;
}
</style>