<script>
import {Card as PvCard} from "primevue";
import {TextileMachineService} from "../services/textilMachine.service.js";
import {TextileMachine} from "../model/textileMachine.entity.js";

export default {
  name: "textile-machine-list",
  components: {PvCard},
  data(){
    return {
      showForm: false,
      textileMachines: [],
      textileMachineService: null,
    }
  },
  methods: {
    goToConfiguration(machine) {
      console.log(machine.id);
      this.$router.push({
        name: 'machine-configuration',
        params: { id: machine.id },
      });
    },
  },
  created(){
    this.textileMachineService = new TextileMachineService();

    this.textileMachineService.getAll().then((response) => {
      this.textileMachines = response.data.map(elem => new TextileMachine(elem));
      console.log(this.textileMachines);
    }).catch((error) => {console.log(error)});
  }
}
</script>

<template>
  <div  class="card">
    <div class="flex" v-for="textileMachine in textileMachines" :key="textileMachine.id">
      <div id="header">
        <h3>{{textileMachine.name}} - {{textileMachine.serialNumber}}</h3>
      </div>
      <div id="content" class="template-content">
        <span>
          {{ $t('monitoring.status') }}: {{textileMachine.status}}
        </span>
        <span>
          {{ $t('monitoring.floor') }}: {{ textileMachine.floor }}
        </span>
        <span>
          {{ $t('monitoring.zone') }}: {{ textileMachine.zone }}
        </span>
        <span>
          {{ $t('monitoring.date-installation') }}: {{ textileMachine.dateInstallation }}
        </span>
      </div>
      <br>
      <i class="pi pi-cog" style="font-size: 20px;cursor: pointer" @click="goToConfiguration(textileMachine)"></i>
    </div>
  </div>
</template>

<style scoped>

.card{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  cursor: pointer;

  .flex{
    flex-basis: 20rem;
    flex-grow: 1;
    margin: 3rem;

    background-color: #1a1a1a;
    padding: 2rem;
    border-radius: 10px;
    flex-direction: column;
  }

  .template-content{
    display: flex;
    flex-direction: column;
  }
}


</style>