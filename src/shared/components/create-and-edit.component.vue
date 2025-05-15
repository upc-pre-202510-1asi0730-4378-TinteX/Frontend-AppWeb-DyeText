<!-- src/shared/components/create-and-edit.component.vue -->
<script>
const defaultStyle = { width: '400px' };

export default {
  name: "create-and-edit",
  props: {
    entity: null,
    visible: Boolean,
    entityName: String,
    edit: Boolean,
    size: { type: String, default: 'default' }
  },
  emits: ['cancel-action-requested', 'save-action-requested', 'update:visible'],
  computed: {

    modelVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      }
    }
  },
  methods: {
    onCancel() {
      // Cierra el diálogo y notifica al padre
      this.modelVisible = false;
      this.$emit('cancel-action-requested');
    },
    onSave() {
      this.$emit('save-action-requested', this.entity);
    },
    getHeaderTitle() {
      return `${this.edit ? 'Edit' : 'New'} ${this.entityName}`;
    },
    getSubmitLabel() {
      return this.edit ? 'Update' : 'Create';
    },
    getDialogStyle() {
      if (this.size === 'standard') return { width: '600px' };
      if (this.size === 'large')    return { width: '900px' };
      return defaultStyle;
    }
  }
};
</script>

<template>
  <pv-dialog
      v-model:visible="modelVisible"
      :modal="true"
      :style="getDialogStyle()"
      class="p-fluid"
      :header="entityName"
      @hide="onCancel"
  >
    <template #header>
      <div class="flex justify-content-start">
        <div>{{ getHeaderTitle() }}</div>
      </div>
    </template>

    <slot name="content"></slot>

    <template #footer>
      <div class="flex justify-content-end">
        <pv-button
            type="button"
            :label="getSubmitLabel()"
            class="p-button-text"
            icon="pi pi-check"
            @click="onSave"
        />
        <pv-button
            type="button"
            label="Cancel"
            severity="secondary"
            class="p-button-text"
            icon="pi pi-times"
            @click="onCancel"
        />
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>
</style>
