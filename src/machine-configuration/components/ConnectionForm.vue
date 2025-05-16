<template>
  <form @submit.prevent="onTestConnection">
    <label for="protocol">Connection Protocol:</label>
    <select v-model="config.protocol" id="protocol">
      <option value="MQTT">MQTT</option>
      <option value="Modbus">Modbus</option>
      <option value="HTTP">HTTP</option>
    </select>

    <div v-if="config.protocol === 'HTTP'">
      <label for="ipAddress">IP Address:</label>
      <input v-model="config.ipAddress" id="ipAddress" type="text" required />

      <label for="updateFrequency">Data Update Frequency (s):</label>
      <input v-model="config.updateFrequency" id="updateFrequency" type="number" required />
    </div>

    <div v-else>
      <label for="networkId">Network ID:</label>
      <input v-model="config.networkId" id="networkId" type="text" required />
    </div>

    <button type="submit">Test Connection</button>
  </form>
</template>

<script>
import { ConnectionConfig } from '../model/connection.model';

export default {
  data() {
    return {
      config: new ConnectionConfig(),
    };
  },
  methods: {
    onTestConnection() {
      this.$emit('test-connection', this.config);
    },
  },
};
</script>