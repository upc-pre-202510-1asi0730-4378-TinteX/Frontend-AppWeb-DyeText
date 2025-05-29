<script>
import {TextileMachineService} from "../../monitoring/services/textilMachine.service.js";
import {MachineInformationService} from "../service/machine-information.service.js";
import {TextileMachine} from "../../monitoring/model/textileMachine.entity.js";
import {MachineInformation} from "../model/machine-information.entity.js";
import {AssignUser} from "../../assignUsers/model/assign-user.entity.js";
import {AssignUserService} from "../../assignUsers/services/assign-user.service.js";

export default {
  name: "maintenance-machine-status",
  components: {},
  props: {
    machine: TextileMachine,
  },
  data(){
    return {
      textileMachines: [],
      users: [],
      machinesInformation: [],
      textileMachineService: null,
      machineInformationService: null,
      userService: null,
      showProductionStatus: false,
    }
  },
  methods: {
    machineInfo(){
      return this.machinesInformation.find(
          (element) => element.id === this.machine.machine_information_id
      );
    },
    getUserOfMachine(){
      return this.users.find((elem) => (elem.id).toString() === this.machinesInformation.find(
          (element) => element.id === this.machine.machine_information_id
      ).user_id)
    },
    showProduction() {
      this.showProductionStatus = true;

      this.$nextTick(() => {
        const container = this.$refs.scrollContainer;
        if (container) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
          });
        }
      });
    }
  },
  created() {
    this.textileMachineService = new TextileMachineService();
    this.machineInformationService = new MachineInformationService();
    this.assignUserService = new AssignUserService();

    this.textileMachineService.getAll().then((response) => {
      this.textileMachines = response.data.map(elem => new TextileMachine(elem));
    }).catch((error) => {console.log(error)});

    this.machineInformationService.getAll().then((response) => {
      this.machinesInformation = response.data.map(elem => new MachineInformation(elem));
    }).catch((error) => {console.log(error)});

    this.assignUserService.getAll().then((response) => {
      this.users = response.data.map(elem => new AssignUser(elem));
    }).catch((error) => {console.log(error)});
  }
}
</script>

<template>
  <div v-if="machine" class="machine-status-detail-container" ref="scrollContainer">
    <div class="flex">
      <i class="pi pi-arrow-circle-left" style="cursor: pointer" @click="$emit('close')"></i>
      <h2>{{ $t('machine') }} {{ $t('home.status') }}</h2>
    </div>
    <div>{{ $t('machine') }} {{ $t('monitoring.number') }} <strong>{{machine.number_machine}}</strong></div>
    <div>
      <h2 style="font-size: 50px">Detail</h2>
      <div v-if="machineInfo" class="machine-info-container">
        <div class="machine-info">
          <img src="../../../public/speed.png" alt="temperature">
          <span>{{ $t('maintenance.speed') }}: <br>  {{machineInfo().speed}} RPM</span>
        </div>
        <div class="machine-info">
          <img src="../../../public/energia.png" alt="energy">
          <span>{{ $t('maintenance.energy') }}: <br>  {{machineInfo().energy}} kWh</span>
        </div>
        <div class="machine-info">
          <img src="../../../public/temperature.png" alt="temperature">
          <span>{{ $t('maintenance.temperature') }}: <br>  {{machineInfo().temperature}} °C</span>
        </div>
        <div class="machine-info">
          <img src="../../../public/vibration.png" alt="temperature">
          <span>{{ $t('maintenance.vibration') }}: <br>  {{machineInfo().vibration}} Hz</span>
        </div>
      </div>
      <div v-else>
        Loading machine information...
      </div>
      <h3>{{ $t('maintenance.responsible-person') }}</h3>
      <div class="person-manager-container">
        <ul class="person-manager">
          <li v-if="getUserOfMachine" >
            {{getUserOfMachine().name}}
          </li>
        </ul>
      </div>
      <div class="btns-machines-config-container">
        <button class="btn btn-frt-cnt first-btn"  @click="showProductionStatus = true; showProduction">{{ $t('maintenance.production-status') }}</button>
        <button class="btn btn-frt-cnt second-btn active"  @click="showProductionStatus = true">{{ $t('maintenance.history') }}</button>
        <div>
          <button  class="btn btn-scn-cnt third-btn">
            {{ $t('off') }}
          </button>
          <button class="btn btn-scn-cnt fourth-btn active">
            {{ $t('on') }}
          </button>
        </div>
      </div>
    </div>
    <div style="margin-top: 50px" v-if="showProductionStatus && machineInfo">
      <div>
        <h2>{{  $t('maintenance.current-status') }}</h2>
        <span>{{  $t('home.status') }}: {{ machine.status }}</span> <br>
        <span>{{ $t('maintenance.time-spent') }}: {{ machineInfo().time_spent }}</span>
      </div>
      <div>
        <h2>{{ $t('maintenance.daily-metrics') }}</h2>
        <span>{{ $t('maintenance.day-progress') }}: {{ machineInfo().day_progress }}</span><br>
        <span>{{ $t('maintenance.failure-rate') }}: {{ machineInfo().failure_rate }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btns-machines-config-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .btn{
    background: transparent;
    border: #003366 1px solid;
    color: #003366;
    margin: 10px;

    &:focus{
      outline:none;
    }

    &:hover{
      background: #003366;
      color: #fff;
    }
  }

  .btn-frt-cnt{
    width: 300px;
  }
  .btn-scn-cnt{
    width: 140px;
  }
}


.person-manager{
  padding: 20px;
  li{
    background: #66b2ff;
    padding: 5px;
    color: #003366;
    list-style: none;
    width: 5rem;
    border-radius: 15px;
    margin: auto;
  }
}


.pi{
  font-size: 30px;
  margin: 5px;
}


.machine-status-detail-container{
  position: fixed;
  top: 0;
  right: 0;
  background: #9ec9f8;
  color: #1a1a1a;
  padding: 20px;
  width: 90%;
  height: 100%;
  overflow-y: auto;
  box-shadow: -10px 0 20px rgba(0, 0, 0, 0.2);  /*  shadow left */
  border-left: 1px solid rgba(255, 255, 255, 0.3);

  &::-webkit-scrollbar{
    width: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: rgba(103, 105, 110, 0.64); /* Color of scroll */
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track{
    background: transparent;
  }
}

.machine-info-container{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .machine-info{
    display: flex;
    margin: 15px;
    align-items: center;
    flex-direction: column;
    flex-basis: 20rem;
    border: rgba(59, 56, 56, 0.42) 1px solid;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(59, 56, 56, 0.42) 2px 2px 5px;

    span{
      text-align: start;
      width: 90%;
      padding: 2px;
    }
  }

  img{
    width: 100%;
    object-fit: cover;
    height: 100px;
  }
}


.active{
  background: #003366!important;
  color: #ffffff!important;
}
</style>