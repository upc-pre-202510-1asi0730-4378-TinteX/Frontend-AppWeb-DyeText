<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
import {TextileMachineService} from "../services/textilMachine.service.js";
import {TextileMachine} from "../model/textileMachine.entity.js";
import {uuid} from "@primevue/core";

export default {
  name: "textilMachine-create-component",
  components: { CreateAndEdit},
  data(){
    return {
      submitted: false,
      textileMachines: [],
      textileMachineService: null,
      name: '',
      zone: '',
      floor: '',
      type: '',
      numberMachine: '',
    }
  },
  props: {
    item: null,
    visible: false,
    machines: {
      type: Array,
      default: () => []
    }
  },
  emits: ['cancel-requested', 'save-requested'],
  methods: {
    onCancelRequested(){
      this.$emit('cancel-requested');
    },

    onSaveRequested(){

      this.submitted = true;
      this.$emit('save-requested', this.item);

      const id = uuid()
      const status = ["Operational","Under Maintenance","Offline"];

      const newMachine = {
        id: id,
        name: this.name,
        asset_type: this.type,
        status: status[Math.floor(Math.random() * status.length)],
        number_machine: this.numberMachine,
        floor: this.floor,
        zone: this.zone,
        date_installation: new Date().toDateString(),
      }

      this.textileMachineService.create(newMachine)
    },
  },
  created() {
    this.textileMachineService = new TextileMachineService();

    this.textileMachineService.getAll().then((response) => {
      this.textileMachines = response.map(elem => new TextileMachine(elem));
      console.log(this.textileMachines);
    }).catch((error) => {console.log(error)});
  }
}
</script>

<template>
  <div :class="['add-machine-container', visible ? 'return-to-show' : 'return-to-hide']"  >
    <button class="icon-btn" @click="onCancelRequested">
      <i class="pi pi-plus-circle"></i>
    </button>
   <form @submit.prevent="onSaveRequested" class="form-add-machine">
     <h2>{{ $t('add') }} {{ $t('machine') }}</h2>
     <div class="form-group">
       <label for="name">{{ $t('monitoring.name') }}</label>
       <input id="name" type="text" v-model="name" required/>
     </div>
     <div class="form-group">
       <label for="number-machine">{{ $t('monitoring.number') }} <br> Machine</label>
       <input id="number-machine" type="text" v-model="numberMachine" required/>
     </div>
     <div class="form-group">
       <label for="floor">{{ $t('monitoring.floor') }}</label>
       <input id="floor" type="text" v-model="floor" required/>
     </div>
     <div class="form-group">
       <label for="zone">{{ $t('monitoring.zone') }}</label>
       <input id="zone" type="text" v-model="zone" required/>
     </div>
     <div class="form-group">
       <label for="type">{{ $t('monitoring.asset-type') }}</label>
       <input id="type" type="text" v-model="type" required/>
     </div>
     <button role="button" type="button" class="btn-form"  @click="onSaveRequested">
       {{ $t('monitoring.register') }}
     </button>
   </form>
  </div>
</template>

<style scoped>

.add-machine-container{
  background: rgba(0, 0, 0, 0.71);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .icon-btn{
    position: absolute;
    right: 1rem;
    top: 1rem;
    background: #CCE6FF;
  }

  .pi-plus-circle{
    transform: rotateZ(135deg);
    font-size: 50px;
    color: #1a1a1a;
  }

  form{
    width: 25rem;
    background: #ffffff;
    color: #000000;
    margin: 10rem auto;
    padding: 1.5rem;
    border-radius: 10px;

    button{
      margin-top: 10px;
    }
  }

  .form-group{
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
  }

  label{
    margin-right: 20px;
  }

  input{
    background: #66b2ff;
    border-radius: 10px;
    border: none;
    color: black;
    padding: 10px;
    &:focus{
      outline: none;
    }
  }
}


.return-to-hide{
  display: none;
}

.return-to-show{
  display: block;
}

</style>