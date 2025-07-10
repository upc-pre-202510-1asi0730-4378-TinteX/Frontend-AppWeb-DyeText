<script>
import {TextileMachineService} from "../../monitoring/services/textilMachine.service.js";
import {TextileMachine} from "../../monitoring/model/textileMachine.entity.js";
import {MachineInformationService} from "../service/machine-information.service.js";
import {MachineInformation} from "../model/machine-information.entity.js";
import MaintenanceMachineStatus from "../components/maintenance-machine-status.component.vue";

export default {
  name: "maintenance-management",
  components: {MaintenanceMachineStatus},
  data(){
    return {
      textileMachines: [],
      machinesInformation: [],
      textileMachineService: null,
      machineInformationService: null,
      selectedMachine: null,
    }
  },
  methods: {
    getMachineInformation(id) {
      const machine = this.machinesInformation.find(m => m.id === id);
      return machine ? machine.amountFailure : '-';
    },
    selectMachine(machine){
      console.log('Machine selected:', machine);
      this.selectedMachine = machine;
    }
  },
  created() {
    this.textileMachineService = new TextileMachineService();
    this.machineInformationService = new MachineInformationService();

    this.textileMachineService.getAll().then((response) => {
      this.textileMachines = response.data.map(elem => new TextileMachine(elem));
    }).catch((error) => {console.log(error)});

    this.machineInformationService.getAll().then((response) => {
      this.machinesInformation = response.data.map(elem => new MachineInformation(elem));
    }).catch((error) => {console.log(error)});
  }
}
</script>

<template>
  <div class="assets-container">
    <h2>Assets</h2>
    <div class="assets-list-container">
      <ul class="assets-list">
        <li class="assets-item"
            v-for="textileMchn in textileMachines"
            :key="textileMchn.id"
            @click="selectMachine(textileMchn)">
          <div class="machine-info">
            <div>
              <div class="background-i">
                <i class="pi pi-cog"></i>
              </div>
            </div>
            <div>
              {{textileMchn.serialNumber}}
            </div>
          </div>
          <div class="failure-info-container">
            <span>{{ $t('maintenance.estimated-failure') }}</span>
            {{getMachineInformation(textileMchn.machineInformationId)}}
            <span>{{ $t('maintenance.days') }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <maintenance-machine-status
      :machine="selectedMachine"
      :machines-information="machinesInformation"
      v-if="selectedMachine"
      @close="selectedMachine = null"/>
</template>

<style scoped>

.assets-container{
  color: #1a1a1a;
  width: 35rem;

  .machine-info{
    display: flex;
  }

  li{
    cursor: pointer;
    padding: 10px;
    border-bottom: #1a1a1a 1px solid;
    display: flex;
    justify-content: space-between;
  }

  .failure-info-container{
    width: 5rem;
    font-size: 12px;
  }
}

.background-i{
  background-color: rgba(173, 171, 171, 0.43);
  padding: 5px;
  width: 35px;
  border-radius: 100%;
  margin: 5px;
}

h2{
  color: darkblue;
}
</style>