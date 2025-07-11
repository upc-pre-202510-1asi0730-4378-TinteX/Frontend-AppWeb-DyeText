<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "notification-item-create-and-edit-dialog",
  components: { CreateAndEdit },
  props: {
    item: Object,
    visible: Boolean,
    edit: Boolean
  },
  emits: ['cancel-requested', 'save-requested', 'update:visible'],
  data() {
    return {
      localItem: {
        id: '',
        message: '',
        createdAt: '',
        textileMachine: '',
        markAsRead: false,
        ...this.item
      },
      submitted: false
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(nuevo) {
        this.localItem = {
          id: '',
          message: '',
          createdAt: '',
          textileMachine: '',
          markAsRead: false,
          ...nuevo
        };
      }
    }
  },
  methods: {
    onCancelRequested() {
      this.$emit('update:visible', false);
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested', { ...this.localItem });
      this.$emit('update:visible', false);
    }
  }
};
</script>

<template>
  <create-and-edit
      :visible="visible"
      :entity="localItem"
      entity-name="Notification"
      :edit="edit"
      @update:visible="val => $emit('update:visible', val)"
      @cancel-action-requested="onCancelRequested"
      @save-action-requested="onSaveRequested"
  >
    <template #content>
      <div class="form-content">

        <div class="field">
          <pv-float-label>
            <label for="message">Message</label>
            <pv-input-text
                id="message"
                v-model="localItem.message"
                :class="{ 'p-invalid': submitted && !localItem.message }"
            />
          </pv-float-label>
        </div>

        <!-- Textile Machine -->
        <div class="field">
          <pv-float-label>
            <label for="textileMachine">Textile Machine</label>
            <pv-input-text
                id="textileMachine"
                v-model="localItem.textileMachine"
            />
          </pv-float-label>
        </div>

        <!-- Mark As Read -->
        <div class="field checkbox-field">
          <pv-checkbox
              id="markAsRead"
              v-model="localItem.markAsRead"
              binary
          />
          <label for="markAsRead">Mark as Read</label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>