<script>
import TextilMachineSearchContent from "../component/textilMachine-item-search.component.vue";
import TextilMachineCreateComponent from "../component/textilMachine-item-create.component.vue";
import {TextileMachine} from "../model/textileMachine.entity.js";
import {TextileMachineService} from "../services/textilMachine.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import {Button as PvButton} from "primevue";
import TextileMachineList from "../component/textile-machine-list.component.vue";

export default {
  name: "textilMachine-management",
  components: {
    TextileMachineList,
    PvButton,
    TextilMachineCreateComponent,
    TextilMachineSearchContent,
    DataManager
  },
  data(){
    return {
      showForm: false,
    }
  },
  methods: {
    handleSave(item){
      this.showForm = false;
    }
  },

}
</script>

<template>
  <textil-machine-search-content/>
  <div>
    <pv-button role="button" type="button" class="btn-add-sensor" @click="showForm = true">
      <h3>{{ $t('add') }} {{ $t('new') }} {{ $t('machine') }}</h3>
      <i class="pi pi-plus"></i>
    </pv-button>
  </div>
  <textil-machine-create-component
      v-if="showForm"
      :visible="showForm"
      @cancel-requested="showForm = false"
      @save-requested="handleSave"
  />
  <h2 style="color: #1a1a1a">{{ $t('monitoring.featured-machines') }}</h2>
  <textile-machine-list/>
</template>

<style scoped>
h2{
  margin: 20px 0;
}
</style>
