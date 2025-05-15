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
      title: { singular: "Notification", plural: "Notifications" },
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
    findIndexById(id) {
      return this.notifications.findIndex(n => n.id === id);
    },
    onNewItem() {
      this.notification = {
        id: '',
        message: '',
        dateTime: '',
        textilMachine: '',
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
      if (!item.message.trim() || !item.dateTime) {
        return;
      }

      if (item.id) {
        this.notificationService.update(item.id, item)
            .then(response => {
              const index = this.findIndexById(item.id);
              this.notifications.splice(index, 1, new Notification(response.data));
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
      this.isEdit = false;
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
    >
      <template #custom-columns>
        <pv-column field="id" header="ID" sortable style="min-width:12rem" />
        <pv-column field="message" header="Message" sortable style="min-width:24rem" />
        <pv-column field="dateTime" header="Date & Time" sortable style="min-width:20rem" />
        <pv-column field="textilMachine" header="Textil Machine" style="min-width:20rem" />
        <pv-column field="markAsRead" header="Read" style="min-width:8rem" />
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

<style scoped></style>
