<template>
  <div class="configuration-container">
    <h1 class="configuration-title">{{ $t('machine-configuration.title') }}: {{ machineConfig.name }}</h1>
    <div class="form-container">
      <ConnectionForm :config="machineConfig" @test-connection="handleTestConnection" />
    </div>
    <div v-if="connectionResult" class="connection-result">
      <p v-if="connectionResult.success" class="success-message">{{ $t('machine-configuration.connectionSuccess') }}</p>
      <p v-else class="error-message">{{ $t('machine-configuration.connectionFailure') }}: {{ connectionResult.error }}</p>
      <p v-if="connectionResult.details" class="details-message">{{ connectionResult.details }}</p>
      <button v-if="connectionResult.success" class="continue-button" @click="goToTestConnection">{{ $t('machine-configuration.continue') }}</button>
    </div>
  </div>
</template>

<script>
import ConnectionForm from '../components/ConnectionForm.vue';
import {testConnection, getMachineInformation} from '../services/connection.service';

export default {
  components: {ConnectionForm},
  props: {
    machine: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      connectionResult: null,
      machineConfig: {
        name: '',
        protocol: 'HTTP',
        updateFrequency: 0,
      },
    };
  },
  async created() {
    if (!this.machine.id) {
      console.error('El ID de la máquina no está definido.');
      return;
    }
    try {
      const machineInfo = await getMachineInformation(this.machine.id);
      this.machineConfig.name = machineInfo.name;
      this.machineConfig.updateFrequency = machineInfo.updateFrequency;
    } catch (error) {
      console.error('Error al cargar la información de la máquina:', error.message);
    }
  },
  methods: {
    async handleTestConnection(config) {
      try {
        const result = await testConnection(config);
        this.connectionResult = {success: true, details: result.details};
      } catch (error) {
        this.connectionResult = {success: false, error: error.message};
      }
    },
    goToTestConnection() {
      this.$router.push({name: 'test-connection'});
    },
  },
};
</script>

<style scoped>
.configuration-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.configuration-title {
  font-size: 2rem;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.form-container {
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.connection-result {
  margin-top: 1.5rem;
  text-align: center;
}

.success-message {
  color: #28a745;
  font-weight: bold;
}

.error-message {
  color: #dc3545;
  font-weight: bold;
}

.details-message {
  color: #6c757d;
  margin-top: 0.5rem;
}

.continue-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.continue-button:hover {
  background-color: #0056b3;
}
</style>