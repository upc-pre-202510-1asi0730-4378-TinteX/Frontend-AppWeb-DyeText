<script>
import { AssignUser } from "../model/assign-user.entity.js";
import { AssignUserService } from "../services/assign-user.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import { v4 as uuidv4 } from 'uuid';
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
          if (!this.assignUser.id) {
            this.assignUser.id = uuidv4();
          }
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
  <div class="assign-user-container">
    <h2 class="page-title">{{ $t('assignUser.title') }}</h2>
    <button class="add-btn" @click="onNewItem">{{ $t('assignUser.add') }}</button>
    <div class="cards-grid">
      <div v-for="user in assignUsers" :key="user.id" class="card">
        <h3>{{ user.name }}</h3>
        <p><strong>{{ $t('assignUser.email') }}:</strong> {{ user.email }}</p>
        <p><strong>{{ $t('assignUser.phone') }}:</strong> {{ user.phone }}</p>
        <p><strong>{{ $t('assignUser.startDate') }}:</strong> {{ user.startDate }}</p>
        <p><strong>{{ $t('assignUser.plant') }}:</strong> {{ user.plant }}</p>
        <p><strong>{{ $t('assignUser.role') }}:</strong> {{ user.role }}</p>
        <p><strong>{{ $t('assignUser.permission') }}:</strong> {{ user.permission }}</p>
        <div class="actions">
          <button @click="onEditItem(user)">{{ $t('assignUser.edit') }}</button>
          <button @click="onDeleteItem(user)">{{ $t('assignUser.delete') }}</button>
        </div>
      </div>
    </div>
    <assign-user-item-create-and-edit-dialog
        :edit="isEdit"
        :item="assignUser"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested($event)" />
  </div>
</template>

<style scoped>
.assign-user-container {
  margin-top: 1rem;
  width: 100%;
}
.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #222;
}
.add-btn {
  margin-bottom: 1.5rem;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 4px;
  background: #1976d2;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.add-btn:hover {
  background: #1565c0;
}
.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #222;
}
.card h3, .card p, .card strong {
  color: #222;
}
.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #1976d2;
  color: #fff;
  cursor: pointer;
}
button:hover {
  background: #1565c0;
}
</style>
