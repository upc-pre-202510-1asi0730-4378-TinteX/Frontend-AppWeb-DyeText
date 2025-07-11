<script>
import {TextileMachineService} from "../../monitoring/services/textilMachine.service.js";

import {TextileMachine} from "../../monitoring/model/textileMachine.entity.js";

import {AssignUser} from "../../assignUsers/model/assign-user.entity.js";
import {AssignUserService} from "../../assignUsers/services/assign-user.service.js";

export default {
  name: "maintenance-machine-status",
  props: {
    machine: TextileMachine,
    machinesInformation: {
      type: Array,
      default: () => []
    }

  },
  data() {
    return {
      textileMachines: [],
      users: [],

      textileMachineService: null,

      assignUserService: null,
      showProductionStatus: false,
    }
  },
  computed: {
    machineInfo() {
      console.log('machine_information_id:', this.machine.machineInformationId);
      console.log('machinesInformation:', this.machinesInformation);

      if (!this.machine) return null;
      return this.machinesInformation.find(
          (element) => String(element.id) === String(this.machine.machineInformationId)
      );
    },
    getUserOfMachine() {
      if (!this.machineInfo) return null;
      return this.users.find(
          (elem) => String(elem.id) === String(this.machineInfo.userId)
      );
    }
  },
  methods: {
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

    this.assignUserService = new AssignUserService();

    this.textileMachineService.getAll().then((response) => {
      this.textileMachines = response.data.map(elem => new TextileMachine(elem));
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
    <div>{{ $t('machine') }} {{ $t('monitoring.number') }} <strong>{{machine.serialNumber}}</strong></div>
    <div>
      <h2 class="detail-page-title" style="font-size: 50px">Detail</h2>
      <div v-if="machineInfo" class="machine-info-container">
        <div class="machine-info">
          <img src="../../../public/speed.png" alt="temperature">
          <span>{{ $t('maintenance.speed') }}: <br>  {{machineInfo.speed}} RPM</span>
        </div>
        <div class="machine-info">
          <img src="../../../public/energia.png" alt="energy">
          <span>{{ $t('maintenance.energy') }}: <br>  {{machineInfo.energy}} kWh</span>
        </div>
        <div class="machine-info">
          <img src="../../../public/temperature.png" alt="temperature">
          <span>{{ $t('maintenance.temperature') }}: <br>  {{machineInfo.temperature}} °C</span>
        </div>
        <div class="machine-info">
          <img src="../../../public/vibration.png" alt="temperature">
          <span>{{ $t('maintenance.vibration') }}: <br>  {{machineInfo.vibration}} Hz</span>
        </div>
      </div>
      <div v-else>
      </div>
      <h3>{{ $t('maintenance.responsible-person') }}</h3>
      <div class="person-manager-container">
        <ul class="person-manager">
          <li v-if="getUserOfMachine">
            {{getUserOfMachine.name}}
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
    <div  class="main-dashboard-container" style="margin-top: 50px" v-if="showProductionStatus && machineInfo">
      <div class="status-card">
        <h2 class="card-title">{{ $t('maintenance.current-status') }}</h2>
        <p class="card-item"><span class="label-bold"> {{ $t('home.status') }} </span>: <span class="status-value">{{ machine.status }}</span></p>
        <p class="card-item"><span class="label-bold"> {{ $t('maintenance.time-spent') }} </span>: <span class="data-value">{{ machineInfo.timeSpent }}</span></p>
      </div>

      <div class="metrics-card">
        <h2 class="card-title">{{ $t('maintenance.daily-metrics') }}</h2>
        <p class="card-item"><span class="label-bold">{{ $t('maintenance.day-progress') }}</span>: <span class="data-value">{{ machineInfo.dayProgress }}</span></p>
        <p class="card-item"><span class="label-bold">{{ $t('maintenance.failure-rate') }}</span>: <span class="data-value">{{ machineInfo.failureRate }}</span></p>
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

.label-bold {
  font-weight: 700;
  color: inherit;
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

  .detail-page-title{
    font-size: 3.5em;
    color: #333;
    text-align: center;
    display: flex;

    &::before,
    &::after {
      content: '';
      flex-grow: 1;
      height: 2px;
      margin: 40px 45px;
      background-color: #000000;
    }

  }

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
    flex-basis: 25rem;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: rgba(59, 56, 56, 0.13) 2px 2px 5px;
    background: rgba(192, 194, 199, 0.41);

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

.main-dashboard-container {
  position: relative;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.status-card,
.metrics-card {
  background-color: rgba(123, 141, 147, 0.39);
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
  flex: 1;
  min-width: 280px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 2.2em;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 600;
}

.card-item {
  font-size: 1.3em;
  color: #34495e;
  margin-bottom: 10px;
  line-height: 1.5;
  font-weight: normal;
}

.card-item:last-child {
  margin-bottom: 0;
}

.status-value {
  font-weight: 700;
  color: #e74c3c;
}

.data-value {
  font-weight: 600;
  color: #ffffff;
}

.active{
  background: #003366!important;
  color: #ffffff!important;
}
</style>