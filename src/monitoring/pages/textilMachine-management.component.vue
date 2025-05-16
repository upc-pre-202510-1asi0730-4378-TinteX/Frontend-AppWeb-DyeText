<script>
import TextilMachineSearchContent from "../component/textilMachine-item-search.component.vue";
import TextilMachineCreateComponent from "../component/textilMachine-item-create.component.vue";
import {TextileMachine} from "../model/textileMachine.entity.js";
import {TextileMachineService} from "../services/textilMachine.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";

export default {
  name: "textilMachine-management",
  components: {TextilMachineCreateComponent, TextilMachineSearchContent, DataManager},

  /**
   * @returns {Object} Component data
   */
  data() {
    return {
      title: {singular: "Machine", plural: "Machines"},
      machines: [],
      machine: new TextileMachine({}),
      selectedMachines: [],
      machineService: null,
      createAndEditDialogIsVisible: false,
      submitted: false,
      isEdit: false,
    }
  },
  methods:{
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },
    findIndexById(id) {
      return this.machines.findIndex(machine => machine.id === id);
    },
    onNewItem() {
      this.machine = new TextileMachine({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
      console.log(this.createAndEditDialogIsVisible);
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (item.name.trim()) {
        if (item.id) {
          this.updateMachine();
        } else {
          this.createMachine();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },


    createMachine() {
      const statuses = ['Active', 'Maintenance', 'Stopped'];
      this.machine.status = statuses[Math.floor(Math.random() * statuses.length)];
      this.machine.dateInstalation = new Date().toISOString().split('T')[0];

      this.machineService.create(this.machine).then(response => {
        let created  = new TextileMachine(response.data);
        this.machines.push(created);
        this.notifySuccessfulAction("Machine Created");
      }).catch(error => console.error(error));
    },

    /**
     * Updates an existing category via the API
     * Updates the local category in the array on success
     */
    updateMachine() {
      this.machineService.update(this.machine.id, this.machine).then(response => {
        console.log('updateMachine');
        let index = this.findIndexById(this.machine.id);
        this.machines[index] = new TextileMachine(response.data);
        console.log(this.machines);
        this.notifySuccessfulAction("Machine Updated");
      }).catch(error => console.error(error));
    },



    onDeleteItem(item) {
      this.machine = {...item};
      this.deleteMachine();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedMachines = selectedItems;
      this.deleteSelectedMachines();
    },

    deleteMachine() {
      this.machineService.delete(this.machine.id).then(() => {
        let index = this.findIndexById(this.machine.id);
        this.machines.splice(index, 1);
        this.notifySuccessfulAction("Category Deleted");
      }).catch(error => console.error(error));
    },

    deleteSelectedMachines() {
      this.deleteSelectedMachines.forEach((machine) => {
        this.machineService.delete(machine.id).then(() => {
          this.machines = this.machines.filter((t) => t.id !== this.machine.id);
        });
      });
      this.notifySuccessfulAction("Categories Deleted");
    }
  },
  created() {
    this.machineService = new TextileMachineService();
    this.machineService.getAll().then(response => {
      this.machines = response.data.map(item => new TextileMachine(item));
      console.log(this.machines);
    }).catch(error => console.error(error));
  },
}
</script>

<template>
  <textil-machine-search-content></textil-machine-search-content>
  <div class="w-full">
    <data-manager :title=title
                  :items="machines"
                  @new-item-requested="onNewItem"
                  @delete-item-requested="onDeleteItem($event)"
                  @delete-selected-items-requested="onDeleteSelectedItems($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 12rem" />
        <pv-column :sortable="true" field="name" header="Name" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="numberMachine" header="Number Machine" style="min-width: 12rem" />
        <pv-column :sortable="true" field="zone" header="Zone" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="status" header="Status"  style="min-width: 12rem" />
        <pv-column :sortable="true" field="dateInstalation" header="Installation Date"  style="min-width: 12rem"/>
      </template>
    </data-manager>
    <textil-machine-create-component
        :edit="isEdit"
        :item="machine"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested($event)"/>
  </div>
</template>

<style scoped>

</style>