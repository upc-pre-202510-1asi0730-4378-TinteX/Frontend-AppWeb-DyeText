<script>
import { Button as PvButton } from "primevue";

export default {
  name: "home",
  components: { PvButton },
  title: "Home",
  methods: {
    goToMachineConfiguration() {
      this.$router.push({ name: "machine-configuration" });
    },
  },
};
</script>

<template>
  <div class="w-full">
    <h1 style="margin: 10px">Welcome to DyeTex</h1>
  </div>
  <section class="historical-machine-container">
    <div class="historical-machine">
      <h2> Machine Insights </h2>
      <div class="historical-machine-box">
        <div class="machine-item">
          <h3>Maintance due in 2 weeks</h3>
          <div class="machine-item-img">
            <img src="https://deltamaquinastexteis.com.br/wp-content/uploads/2023/10/maquinas-texteis-modelo-para-confeccao.jpg" />
          </div>
          <span class="machine-name">Lathe Machine</span>
          <span class="machine-status">Status: Normal</span>
        </div>
      </div>
    </div>
    <div class="machine-health">
      <h2> Overall Machine Health </h2>
      <div class="machine-health-box">
        <div class="total-machine info-box">
          <span>Total Machines</span>
          <span class="value">25</span>
        </div>
        <div class="healthy-machine info-box">
          <span>Healthy Machines</span>
          <span class="value">18</span>
        </div>
      </div>
    </div>
  </section>
  <section class="historical-alerts">
    <header>
      <h2> Lastest Alerts </h2>
      <pv-button>
        <span>View more</span>
        <i class="pi pi-angle-right" style="font-size: 1rem"></i>
      </pv-button>
    </header>
    <div class="alert-table">
      <div class="alert-info">
        <div class="start">
          <i class="pi pi-info-circle" style="font-size: 1.5rem"></i>
          <div class="start-text">
            <span class="subject">Machine Overheting</span>
            <span class="subject">Machine 3</span>
          </div>
        </div>
        <div class="end">Critical</div>
      </div>
    </div>
  </section>
  <section class="configure-machine">
    <button @click="goToMachineConfiguration">Configurar Máquina</button>
  </section>
</template>

<style scoped>
* {
  color: #003366;
}

.historical-machine-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  text-align: start;

  .historical-machine {
    padding: 10px 20px;
    width: 75%;
    display: flex;
    flex-direction: column;
  }
  .machine-health {
    padding: 10px;
  }
}

.historical-machine-container .historical-machine-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.historical-machine-container .machine-item {
  display: flex;
  flex-direction: column;
  width: 15rem;
  margin: 15px;
  border-radius: 10px;
  border: 1px solid rgba(7, 7, 7, 0.151);
  position: relative;
  overflow: hidden;
  height: 12rem;
  box-shadow: inset 0 0 22px 5px rgba(7, 7, 7, 0.151);

  .machine-item-img {
    width: 100%;
    height: 70%;
    overflow: hidden;
  }
  h3 {
    left: 2%;
    position: absolute;
  }
  img {
    width: 100%;
  }
  span {
    margin-left: 15px;
  }
}

.historical-machine-container .machine-item .machine-status {
  font-weight: bolder;
  font-size: 1.2rem;
}

.machine-health-box {
  display: flex;
  flex-direction: column;
  width: 100%;

  .info-box {
    border: 1px solid rgba(7, 7, 7, 0.151);
    padding: 10px;
    display: flex;
    flex-direction: column;
    margin: 15px;
    border-radius: 10px;
  }

  .value {
    font-size: 1.2rem;
    font-weight: bolder;
  }
}

.historical-alerts {
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

.alert-table {
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  .alert-info {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    width: 50%;
    border-bottom: 1px solid rgba(7, 7, 7, 0.151);
  }
  .start {
    display: flex;
  }
  i {
    vertical-align: center;
    margin: 15px 10px 0;
  }
  .start-text {
    display: flex;
    flex-direction: column;
  }
}

.configure-machine {
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: var(--button-hover-color);
  }
}
</style>