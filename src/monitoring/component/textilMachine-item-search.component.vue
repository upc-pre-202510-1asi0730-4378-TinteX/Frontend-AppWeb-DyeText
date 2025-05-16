<script>
import DataManager from "../../shared/components/data-manager.component.vue";

export default {
  name: "textilMachine-search-content",
  components: {DataManager}
}
</script>

<template>
  <div class="filter-search-container">
    <div class="filter-box">
      <div class="filter">
        <h3>Estado</h3>
        <div class="filter-type">
          <ul>
            <li class="active">Active</li>
            <li>Maintenance</li>
            <li>Stopped</li>
          </ul>
        </div>
      </div>
      <div class="filter">
        <h3>Asset Type</h3>
        <div class="filter-type">
          <ul>
            <li>Type A</li>
            <li>Type B</li>
            <li>Type C</li>
          </ul>
        </div>
      </div>
        <div class="filter">
          <h3>Zone</h3>
          <div class="filter-type">
            <ul>
              <li>Zone 1</li>
              <li>Zone 2</li>
              <li>Zone 3</li>
            </ul>
          </div>
        </div>
    </div>
    <div class="search-box">
      <form>
          <div class="search-input-container">
            <input class="search" placeholder="search device">
            <i class="pi pi-search"></i>
          </div>
      </form>
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
      flex-direction: row;
      padding-top: 10px;

      li{
        background-color: #66b2ff;
        padding: 5px 10px;
        border-radius: 5px;
        margin: 0 10px;
      }
    }
  }
  .search-box{
    width: 40rem;
    padding: 10px;
    display: flex;
    justify-content: end;
  }
  .search-input-container{
    border: 1px solid #003366;
    border-radius: 5px;
    width: 30rem;


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
    }
  }


  .active{
    background-color: #003366!important;
    color: #fff;
  }
</style>