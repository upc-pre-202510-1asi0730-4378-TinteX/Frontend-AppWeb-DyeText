<template>
  <form @submit.prevent="onTestConnection" class="connection-form">
    <div class="form-group">
      <label for="protocol">{{ $t('machine-configuration.protocol') }}</label>
      <select v-model="config.protocol" id="protocol">
        <option value="MQTT">MQTT</option>
        <option value="Modbus">Modbus</option>
        <option value="HTTP">HTTP</option>
      </select>
    </div>

    <div class="form-group">
      <label for="updateFrequency">{{ $t('machine-configuration.updateFrequency') }}</label>
      <input v-model="config.updateFrequency" id="updateFrequency" type="number" required min="1" />
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <button type="submit" class="test-button">{{ $t('machine-configuration.testConnection') }}</button>
  </form>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      errorMessage: '',
    };
  },
  methods: {
    onTestConnection() {
      if (this.config.updateFrequency <= 0) {
        this.errorMessage = this.$t('machine-configuration.connectionFailure') + ': ' + this.$t('machine-configuration.updateFrequency');
        return;
      }
      this.errorMessage = '';
      this.$emit('test-connection', this.config);
    },
  },
};
</script>

<style scoped>
.connection-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

input, select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #333;
}

input:focus, select:focus {
  outline: none;
  border-color: #007bff;
  background-color: #ffffff;
}

.test-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.test-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #dc3545;
  font-weight: bold;
}
</style>