<script>
import { Notification } from "../model/notification.entity.js";
import { NotificationService } from "../services/notification.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import NotificationItemCreateAndEditDialog from "../components/notification-item-create-and-edit.component.vue";

export default {
  name: "notification-management",
  components: {
    DataManager,
    NotificationItemCreateAndEditDialog
  },
  data() {
    return {
      title: {
        singular: this.$t('alertSystem.notification'),
        plural: this.$t('alertSystem.notifications')
      },
      notifications: [],
      notification: new Notification(),
      selectedNotifications: [],
      notificationService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false
    };
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    },

    onNewItem() {
      const maxId = this.notifications.reduce((max, n) => {
        const currentId = parseInt(n.id, 10);
        return isNaN(currentId) ? max : Math.max(max, currentId);
      }, 0);

      this.notification = {
        id: String(maxId + 1),
        message: '',
        createdAt: null,
        textileMachine: '',
        markAsRead: false
      };

      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onEditItem(item) {
      this.notification = new Notification(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      this.submitted = true;

      if (!item.message.trim()) return;

      if (this.isEdit) {
        this.notificationService.update(item.id, item)
            .then(response => {
              const index = this.notifications.findIndex(n => n.id === item.id);
              if (index !== -1) {
                this.notifications.splice(index, 1, new Notification(response.data));
              }
              this.notifySuccessfulAction("Notification Updated");
            })
            .catch(console.error);
      } else {
        this.notificationService.create(item)
            .then(response => {
              this.notifications.push(new Notification(response.data));
              this.notifySuccessfulAction("Notification Created");
            })
            .catch(console.error);
      }

      this.createAndEditDialogIsVisible = false;
    },
    onDeleteSelected(items) {
      if (!items || !items.length) return;

      const idsToDelete = items.map(i => i.id);

      Promise.all(idsToDelete.map(id => this.notificationService.delete(id)))
          .then(() => {
            this.notifications = this.notifications.filter(n => !idsToDelete.includes(n.id));
            this.selectedNotifications = [];
            this.notifySuccessfulAction(`${idsToDelete.length} notification(s) deleted`);
          })
          .catch(error => {
            console.error(error);
            this.$toast.add({
              severity: "error",
              summary: "Error",
              detail: "Could not delete selected notifications",
              life: 3000
            });
          });
    },
    onDeleteItem(item) {
      this.notificationService
          .delete(item.id)
          .then(() => {
            this.notifications = this.notifications.filter(n => n.id !== item.id);
            this.notifySuccessfulAction("Notification Deleted");
          })
          .catch(err => {
            console.error(err);
            this.$toast.add({
              severity: "error",
              summary: "Error",
              detail: "Could not delete notification",
              life: 3000
            });
          });
    }
  },

  created() {
    this.notificationService = new NotificationService();
    this.notificationService.getAll()
        .then(response => {
          this.notifications = response.data.map(n => new Notification(n));
        })
        .catch(console.error);
  }
};
</script>

<template>
  <div class="w-full">
    <data-manager
        :title="title"
        :items="notifications"
        @new-item-requested="onNewItem"
        @edit-item-requested="onEditItem"
        @delete-item-requested="onDeleteItem"
        @delete-selected-items-requested="onDeleteSelected"
    >
      <template #custom-columns>
        <pv-column field="id" header="ID" sortable style="min-width:12rem" />
        <pv-column
            field="message"
            :header="$t('alertSystem.message')"
            sortable
            style="min-width:24rem"
        />
        <pv-column
            field="createdAt"
            :header="$t('alertSystem.createdAt')"
            sortable
            style="min-width:20rem"
        />
        <pv-column
            field="textileMachine"
            :header="$t('alertSystem.textileMachine')"
            style="min-width:20rem"
        />
        <pv-column
            field="markAsRead"
            :header="$t('alertSystem.markAsRead')"
            style="min-width:8rem"
        />
      </template>
    </data-manager>

    <notification-item-create-and-edit-dialog
        :edit="isEdit"
        :item="notification"
        v-model:visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested"
    />
  </div>
</template>