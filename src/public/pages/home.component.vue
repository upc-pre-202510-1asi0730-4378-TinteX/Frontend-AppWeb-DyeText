<script>
import {Button as PvButton} from "primevue";
import {TextileMachineService} from "../../monitoring/services/textilMachine.service.js";
import {TextileMachine} from "../../monitoring/model/textileMachine.entity.js";

export default {
  name: "home",
  components: {PvButton},
  title: "Home",
  data(){
    return {
      textileMachines: [],
      textileMachineService: null,
      totalMachines: 0,
      healthyMachines: 0,
      criticalMachines: [],
    }
  },
  created(){
    this.textileMachineService = new TextileMachineService();

    this.textileMachineService.getAll().then((response) => {
      this.textileMachines = response.data.map(elem => new TextileMachine(elem));

      this.textileMachines.filter(elem => {
        if (elem.status === "Critical") {
          this.criticalMachines.push(elem);
        }
      })

      console.log(this.criticalMachines);

      this.totalMachines = this.textileMachines.length;
      this.textileMachines.filter(elem => elem.status === "Critical").forEach(elem => {
        this.healthyMachines += 1;
      })
    }).catch((error) => {console.log(error)});

  }
}
</script>

<template>
  <div class="w-full">
    <h1 style="margin: 10px">{{ $t('welcome-to') }} DyeTex</h1>
  </div>
  <section class="historical-machine-container">
    <div class="historical-machine">
      <h2> {{ $t('home.machine-insights') }} </h2>
      <template v-if="textileMachines.length > 0">
        <div class="machine-item"
             v-for="textileMachine in textileMachines"
             :key="textileMachine.id">
          <div class="machine-item-img">
            <img src="https://deltamaquinastexteis.com.br/wp-content/uploads/2023/10/maquinas-texteis-modelo-para-confeccao.jpg">
          </div>
          <span class="machine-name">Lathe Machine</span>
          <span class="machine-status">{{ $t('home.status') }}: {{ textileMachine.status }}</span>
        </div>
      </template>

      <template v-else>
        <p style="margin: 20px 0 0 20px">No available machines</p>
      </template>
    </div>
    <div class="machine-health">
      <h2> {{ $t('home.overall-m-h') }} </h2>
      <div class="machine-health-box">
        <div class="total-machine info-box">
          <span>{{ $t('home.total-machines') }}</span>
          <span class="value">{{ totalMachines }}</span>
        </div>
        <div class="healthy-machine info-box">
          <span>{{ $t('home.healthy-machines') }}</span>
          <span class="value">{{ healthyMachines }}</span>
        </div>
      </div>
    </div>
  </section>
  <section class="historical-alerts">
    <header>
      <h2> {{ $t('home.lastest-alerts') }} </h2>
      <pv-button>
        <span>{{ $t('home.view-more') }}</span>
        <i class="pi pi-angle-right" style="font-size: 1rem"></i>
      </pv-button>
    </header>
    <div class="alert-table">
      <div class="alert-info"
           v-for="alertMachine in criticalMachines"
           :key="alertMachine.id">
        <div class="start">
          <i class="pi pi-info-circle" style="font-size: 1.5rem"></i>
          <div class="start-text">
            <span class="subject">{{alertMachine.name}}</span>
            <span class="subject">Machine {{ alertMachine.numberMachine }}</span>
          </div>
        </div>
        <div class="end">
          {{ alertMachine.status }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
*{
  color: #003366;
}

.historical-machine-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  text-align: start;

  .historical-machine{
    padding: 10px 20px;
    width: 55rem;
    display: flex;
    flex-direction: column;
  }
  .machine-health{
    padding: 10px;
  }
}

.historical-machine-container .historical-machine-box{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.historical-machine-container .machine-item{
  display: flex;
  flex-direction: column;
  width: 15rem;
  margin: 15px;
  border-radius: 10px;
  border: 1px solid rgba(7, 7, 7, 0.151);
  position: relative;
  overflow: hidden;
  height: 12rem;
  box-shadow: inset 0 0 22px 1px rgba(7, 7, 7, 0.151);

  .machine-item-img{
    width: 100%;
    height: 70%;
    overflow: hidden;
  }
  h3{
    left: 2%;
    position:absolute;
  }
  img{
    width: 100%;
  }
  span{
    font-size: 13px;
    margin-left: 15px;
  }
}

.historical-machine-container .machine-item .machine-status{
  font-weight: bolder;
  font-size: 0.9rem;
}

.machine-health-box {
  display: flex;
  flex-direction: column;
  width: 100%;

  .info-box{
    border: 1px solid rgba(7, 7, 7, 0.151);
    padding: 10px;
    display: flex;
    flex-direction: column;
    margin: 15px;
    border-radius: 10px;
  }

  .value{
    font-size: 1.2rem;
    font-weight: bolder;
  }
}

.historical-alerts{
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;

  header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
  }
}

.alert-table{
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  .alert-info{
    padding: 10px;
    display: flex;
    justify-content: space-between;
    width: 50%;
    border-bottom: 1px solid rgba(7, 7, 7, 0.151);
  }
  .start{
    display: flex;
  }
  i{
    vertical-align: center;
    margin: 15px 10px 0;
  }
  .start-text{
    display: flex;
    flex-direction: column;
  }
}

</style>