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

    onNewItem() {
      const maxId = this.notifications.reduce((max, n) => {
        const currentId = parseInt(n.id, 10);
        return isNaN(currentId) ? max : Math.max(max, currentId);
      }, 0);

      this.notification = {
        id: String(maxId + 1),
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
      // validaciones básicas
      if (!item.message.trim() || !item.dateTime) {
        return;
      }

      // siempre crear
      this.notificationService.create(item)
          .then(response => {
            // response.data tendrá el nuevo objeto con su id asignado por el backend
            this.notifications.push(new Notification(response.data));
            this.notifySuccessfulAction("Notification Created");
          })
          .catch(console.error);

      // cerrar diálogo
      this.createAndEditDialogIsVisible = false;
    },
    onDeleteSelected(items) {
      if (!items || !items.length) return;

      const idsToDelete = items.map(i => i.id);

      // Eliminar del backend
      Promise.all(idsToDelete.map(id => this.notificationService.delete(id)))
          .then(() => {
            // Eliminar del estado local
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
      // Llamas al servicio de notificaciones
      this.notificationService
          .delete(item.id)
          .then(() => {
            // Actualizas tu lista local quitando la notificación borrada
            this.notifications = this.notifications.filter(n => n.id !== item.id);
            // Muestras un toast de confirmación
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
