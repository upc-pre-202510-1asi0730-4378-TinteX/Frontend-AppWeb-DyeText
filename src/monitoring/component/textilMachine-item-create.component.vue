<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "textilMachine-create-component",
  components: { CreateAndEdit},
  props: {
    item: null,
    visible: false,
    machines: {
      type: Array,
      default: () => []
    }
  },

  emits: ['cancel-requested', 'save-requested'],

  data(){
    return {
      submitted: false,
    }
  },

  methods: {
    onCancelRequested(){
      this.$emit('cancel-requested');
    },

    onSaveRequested(){
      this.submitted = true;
      this.$emit('save-requested', this.item);
    },

  }
}
</script>

<template>
  <div>
    <create-and-edit :entity="item" :visible="visible" entity-name="TextileMachine"
                     @cancel-action-requested="onCancelRequested"
                     @save-action-requested="onSaveRequested">
      <template #content>
        <div class="pi-fluid">
          <div class="field mt-5">
            <pv-float-label>
              <label for="name">Name</label>
              <pv-input-text id="name" v-model="item.name" :class="{'p-invalid': submitted && !item.name}"></pv-input-text>
            </pv-float-label>
          </div>

          <div class="field">
            <pv-float-label>
              <label for="numberMachine">Number Machine</label>
              <pv-input-text id="numberMachine" v-model="item.numberMachine" :class="{'p-invalid': submitted && !item.numberMachine}"></pv-input-text>
            </pv-float-label>
          </div>

          <div class="field">
            <pv-float-label>
              <label for="floor">floor</label>
              <pv-input-text id="floor" v-model="item.floor" :class="{'p-invalid': submitted && !item.floor}"></pv-input-text>
            </pv-float-label>
          </div>

          <div class="field">
            <pv-float-label>
              <label for="zone">zone</label>
              <pv-input-text id="zone" v-model="item.zone" :class="{'p-invalid': submitted && !item.zone}"></pv-input-text>
            </pv-float-label>
          </div>
        </div>
      </template>
    </create-and-edit>
  </div>

</template>

<style scoped>

.device-historical{
  margin-top: 10px;
}

pv-float-label{
  margin: 10px 0;
}

.device-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.device-card {
  background-color: #e6f0ff;
  border-radius: 12px;
  padding: 1rem;
  width: 200px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}


.device-info h3 {
  font-size: 1rem;
  margin-top: 0.5rem;
}

.device-info p {
  margin: 0.25rem 0 0;
  color: #333;
  font-size: 0.9rem;
}
</style>