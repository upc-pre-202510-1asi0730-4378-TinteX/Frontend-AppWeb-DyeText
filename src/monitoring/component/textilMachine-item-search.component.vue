<script>
import DataManager from "../../shared/components/data-manager.component.vue";
import {TextileMachineService} from "../services/textilMachine.service.js";
import {TextileMachine} from "../model/textileMachine.entity.js";

export default {
  name: "textilMachine-search-content",
  components: {
    DataManager,
  },
  data(){
    return {
      machineName: '',
      textileMachines: [],
      textileMachineService: null,
      usedNumber: new Set(),
      isFocused: false,
      selectedStatus: null,
    }
  },
  computed:{
    filteredMachines() {
      const query = this.machineName.toLowerCase();

      if (!query) return this.textileMachines;

      return this.textileMachines.filter(machine => {
        return (
            machine.numberMachine.toLowerCase().includes(this.machineName.toLowerCase()) ||
            machine.status.toLowerCase().includes(this.machineName.toLowerCase()) ||
            machine.zone.toLowerCase().includes(this.machineName.toLowerCase()) ||
            machine.assetType.toLowerCase().includes(this.machineName.toLowerCase()) ||
            machine.name.toLowerCase().includes(this.machineName.toLowerCase())
        )
      });
    },
    randomNumber(){
      let arrayTime = ["min", "hour", "sec"]
      let newNumber;
      let timeVl = arrayTime[Math.floor(Math.random() * arrayTime.length)];
      let attempts = 0;

      if (timeVl === "hour"){
        do {
          newNumber = Math.floor(Math.random() * 24);
          attempts++;
          if (attempts > 100) break;
        } while (this.usedNumber.has(newNumber));
      }else{
        do {
          newNumber = Math.floor(Math.random() * 60);
          attempts++;
          if (attempts > 100) break;
        } while (this.usedNumber.has(newNumber));
      }

      this.usedNumber.add(newNumber);

      return {
        number: newNumber,
        time: timeVl
      }
    },
    uniqueZones() {
      const zones = new Set();
      return this.textileMachines
          .map(m => m.zone)
          .filter(zone => {
            if (zones.has(zone)) return false;
            zones.add(zone);
            return true;
          });
    },
    uniqueStatuses(){
      const see = new Set();
      return this.textileMachines.map(machine => machine.status)
          .filter(status => {
            if (see.has(status))
              return false;
            see.add(status);
            return true;
          })
    },
    uniqueAssetType(){
      const see = new Set();
      return this.textileMachines.map(machine => machine.assetType)
          .filter(assetType => {
            if (see.has(assetType))
              return false;
            see.add(assetType);
            return true;
          })
    }
  },
  methods: {
    applyFilter(value) {
      this.machineName = value;
    }
  },
  created(){
    this.textileMachineService = new TextileMachineService();

    this.textileMachineService.getAll().then((response)=>{
      this.textileMachines = response.data.map(r => new TextileMachine(r));
    }).catch((err)=>{ console.log(err); });
  }
}
</script>

<template>
  <div class="filter-search-container">
    <div class="filter-box">
      <div class="filter">
        <h3>{{ $t('monitoring.status') }}</h3>
        <div class="filter-type">
          <ul>
            <li v-for="status in uniqueStatuses"
                :key="status"
                @click="selectedStatus = status; applyFilter(status)"
                :class="{ 'active': selectedStatus === status }">
              {{ status }}
            </li>
          </ul>
        </div>
      </div>
      <div class="filter">
        <h3>{{ $t('monitoring.asset-type') }}</h3>
        <div class="filter-type">
          <ul>
            <li v-for="assetType in uniqueAssetType"
                :key="assetType"
                @click="selectedStatus = assetType; applyFilter(assetType)"
                :class="{ 'active': selectedStatus === assetType }">
                {{ assetType }}
            </li>
          </ul>
        </div>
      </div>
        <div class="filter">
          <h3>{{ $t('monitoring.zone') }}</h3>
          <div class="filter-type">
            <ul>
              <li v-for="zone in uniqueZones"
                  :key="zone"
                  @click="selectedStatus = zone; applyFilter(zone)"
                  :class="{ 'active': selectedStatus === zone }" >
                {{ zone }}
              </li>
            </ul>
          </div>
        </div>
    </div>
    <div class="search-box">
      <form>
          <div class="search-input-container"
               :class="{ focused: isFocused }">
            <input
                class="search"
                v-model="machineName"
                placeholder="search device"
                @focus="isFocused = true"
                @blur="isFocused = false"
                required>
            <i  class="pi pi-search"></i>
          </div>
      </form>
      <h2>{{ $t('monitoring.available-machines') }}</h2>
      <div class="machines-summary">
        <div class="machines-summary-item" v-for="textileMachine in filteredMachines" :key="textileMachine.id">
          <div class="machines-summary-info">
            <i class="pi pi-exclamation-circle"></i>
            <div>
              <span>{{ $t('machine') }}: {{ textileMachine.serialNumber }} </span>
              <span> {{ textileMachine.status }} </span>
            </div>
          </div>
          <div class="machines-summary-activity">
            {{ $t('monitoring.last-activity') }}: <br>
            {{ randomNumber.number }} {{ randomNumber.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .filter-search-container{
    display: flex;
    flex-direction: row;
    padding: 20px;
    justify-content: space-around;
    width: 100%;
  }
  .filter-box{
    width: 30rem;
  }
  .filter{
    margin: 20px 0;
    text-align: start;
    color: #003366;
    ul{
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      padding-top: 10px;

      li{
        background-color: #66b2ff;
        padding: 5px 10px;
        border-radius: 5px;
        margin: 10px 10px;
        cursor: pointer;
      }
    }
  }
  .search-box{
    width: 40rem;
    padding: 10px;
    display: flex;
    justify-content: start;
    flex-direction: column;
    color: #000000;

    h2{
      margin: 10px 0;
    }

  }
  .search-input-container{
    border-bottom: 1px solid #003366;
    border-radius: 5px;
    width: 30rem;

    &.focused {
      border: 1px solid #003366;
    }

    input{
      width: 80%;
      background-color: transparent;
      outline: none;
      border: none;
      padding: 10px;
      color: #000000;
      &:focus{
        border: none;
      }
    }

    i{
      color: #000000;
      cursor: pointer;
    }
  }

  .machines-summary{
    height: 15rem;
    overflow-y: scroll;


    .machines-summary-item{
      border-bottom: 1px solid #003366;
      display: flex;
      justify-content: space-between;

      div{
        padding: 5px;
      }
    }

    .machines-summary-info{
      display: flex;

      div{
        display: flex;
        flex-direction: column;
      }

      i{
        margin-top: 20px;
      }
    }
  }

  .machines-summary::-webkit-scrollbar{
    width: 4px;
  }

  .machines-summary::-webkit-scrollbar-track {
    background: transparent; /* Background of scroll */
  }

  .machines-summary::-webkit-scrollbar-thumb {
    background-color: rgba(103, 105, 110, 0.64); /* Color of scroll */
    border-radius: 4px;
  }


  .active{
    background-color: #003366!important;
    color: #fff;
  }
</style>