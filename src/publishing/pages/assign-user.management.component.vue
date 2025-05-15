<script>
import { AssignUser } from "../model/assign-user.entity.js";
import { AssignUserService } from "../services/assign-user.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import AssignUserItemCreateAndEditDialog from "../components/assign-user-item-create-and-edit.component.vue";

export default {
  name: "assign-user-management",
  components: { AssignUserItemCreateAndEditDialog, DataManager },

  data() {
    return {
      title: { singular: "AssignUser", plural: "AssignUsers" },
      assignUsers: [],
      assignUser: new AssignUser({}),
      selectedAssignUsers: [],
      assignUserService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    };
  },

  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    },

    findIndexById(id) {
      return this.assignUsers.findIndex(u => u.id === id);
    },

    onNewItem() {
      this.assignUser = new AssignUser({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      this.assignUser = new AssignUser(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItem(item) {
      this.assignUser = { ...item };
      this.deleteAssignUser();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedAssignUsers = selectedItems;
      this.deleteSelectedAssignUsers();
    },

    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequested(item) {
      this.submitted = true;
      if (item.name.trim()) {
        if (item.id) {
          this.updateAssignUser();
        } else {
          this.createAssignUser();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },

    createAssignUser() {
      this.assignUserService.create(this.assignUser).then(response => {
        const created = new AssignUser(response.data);
        this.assignUsers.push(created);
        this.notifySuccessfulAction("AssignUser Created");
      }).catch(error => console.error(error));
    },

    updateAssignUser() {
      this.assignUserService.update(this.assignUser.id, this.assignUser).then(response => {
        const index = this.findIndexById(this.assignUser.id);
        this.assignUsers[index] = new AssignUser(response.data);
        this.notifySuccessfulAction("AssignUser Updated");
      }).catch(error => console.error(error));
    },

    deleteAssignUser() {
      this.assignUserService.delete(this.assignUser.id).then(() => {
        const index = this.findIndexById(this.assignUser.id);
        this.assignUsers.splice(index, 1);
        this.notifySuccessfulAction("AssignUser Deleted");
      }).catch(error => console.error(error));
    },

    deleteSelectedAssignUsers() {
      const deletions = this.selectedAssignUsers.map(user =>
          this.assignUserService.delete(user.id)
      );
      Promise.all(deletions).then(() => {
        this.assignUsers = this.assignUsers.filter(
            user => !this.selectedAssignUsers.some(sel => sel.id === user.id)
        );
        this.notifySuccessfulAction("AssignUsers Deleted");
      }).catch(error => console.error(error));
    }
  },

  created() {
    this.assignUserService = new AssignUserService();
    this.assignUserService.getAll().then(response => {
      this.assignUsers = response.data.map(item => new AssignUser(item));
    }).catch(error => console.error(error));
  }
};
</script>

<template>
  <div class="w-full">
    <data-manager :title="title"
                  :items="assignUsers"
                  @new-item-requested="onNewItem"
                  @edit-item-requested="onEditItem($event)"
                  @delete-item-requested="onDeleteItem($event)"
                  @delete-selected-items-requested="onDeleteSelectedItems($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id" header="ID" style="min-width: 12rem" />
        <pv-column :sortable="true" field="name" header="Name" style="min-width: 12rem" />
        <pv-column :sortable="true" field="email" header="Email" style="min-width: 24rem" />
        <pv-column :sortable="true" field="phone" header="Phone" style="min-width: 24rem" />
        <pv-column :sortable="true" field="start_date" header="Start_date" style="min-width: 24rem" />
        <pv-column :sortable="true" field="plant" header="Plant" style="min-width: 24rem" />
        <pv-column :sortable="true" field="role" header="Role" style="min-width: 24rem" />
        <pv-column :sortable="true" field="permission" header="Permission" style="min-width: 24rem" />
      </template>
    </data-manager>

    <assign-user-item-create-and-edit-dialog
        :edit="isEdit"
        :item="assignUser"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested($event)" />
  </div>
</template>

<style scoped>
</style>
