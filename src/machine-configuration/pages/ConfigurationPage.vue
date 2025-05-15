<template>
  <div>
    <h1>Device Configuration</h1>
    <ConnectionForm @test-connection="handleTestConnection" />
    <div v-if="connectionResult">
      <p v-if="connectionResult.success">¡Conexión exitosa!</p>
      <p v-else>Fallo en la conexión: {{ connectionResult.error }}</p>
      <p v-if="connectionResult.details">{{ connectionResult.details }}</p>
      <button v-if="connectionResult.success" @click="goToTestConnection">Continuar</button>
    </div>
  </div>
</template>

<script>
import ConnectionForm from '../components/ConnectionForm.vue';
import { testConnection } from '../services/connection.service';

export default {
  components: { ConnectionForm },
  data() {
    return {
      connectionResult: null,
    };
  },
  methods: {
    async handleTestConnection(config) {
      try {
        const result = await testConnection(config);
        this.connectionResult = { success: true, details: result.details };
      } catch (error) {
        this.connectionResult = { success: false, error: error.message };
      }
    },
    goToTestConnection() {
      this.$router.push({ name: 'test-connection' });
    },
  },
};
</script>