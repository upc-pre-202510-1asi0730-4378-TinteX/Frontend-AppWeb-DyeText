<script>
/**
 * Import the base create-and-edit component to extend its functionality
 */
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

/**
 * @component
 * @description A specialized dialog component for creating and editing Category entities.
 * This component wraps the generic create-and-edit component and adds category-specific
 * UI elements and validation.
 */
export default {
  name: "assign-user-item-create-and-edit",
  components: {CreateAndEdit},
  props: {
    /**
     * @type {AssignUser|null}
     * @description The category item being created or edited
     */
    item: null,

    /**
     * @type {Boolean}
     * @description Controls the visibility of the dialog
     */
    visible: false,
  },

  /**
   * @event cancel-requested - Emitted when the cancel action is triggered
   * @event save-requested - Emitted when the save action is triggered with the category item
   */
  emits: ['cancel-requested', 'save-requested'],

  /**
   * @returns {Object} Component data
   */
  data() {
    return {
      /**
       * @type {Boolean}
       * @description Tracks whether the form has been submitted for validation purposes
       */
      submitted: false
    }
  },
  methods: {
    /**
     * Handles the cancel request from the create-and-edit component
     * Emits the cancel-requested event to the parent component
     */
    onCancelRequested() {
      this.$emit('cancel-requested');
    },

    /**
     * Handles the save request from the create-and-edit component
     * Sets submitted flag for validation and emits the save-requested event with the category item
     */
    onSaveRequested() {
      this.submitted = true;
      this.item.card_id = "";
      this.item.subscription_active=false
      this.$emit('save-requested', this.item);
    }
  }
}
</script>
<template>
  <create-and-edit :entity="item" :visible="visible"  :edit="$props.edit" entity-name="AssignUser"
                   @cancel-action-requested="onCancelRequested"
                   @save-action-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <pv-input-text id="name" v-model="item.name" :class="{ 'p-invalid': submitted && !item.name }"/>
            <label for="name">Name</label>
          </pv-float-label>
        </div>

        <div class="field">
          <pv-float-label>
            <pv-input-text id="email" v-model="item.email" :class="{ 'p-invalid': submitted && !item.email }"/>
            <label for="email">Email</label>
          </pv-float-label>
        </div>

        <div class="field">
          <pv-float-label>
            <pv-input-text id="phone" v-model="item.phone" :class="{ 'p-invalid': submitted && !item.phone }"/>
            <label for="phone">Phone</label>
          </pv-float-label>
        </div>

        <div class="field">
          <pv-float-label>
            <pv-input-text id="start_date" v-model="item.start_date" :class="{ 'p-invalid': submitted && !item.start_date }"/>
            <label for="start_date">Start Date</label>
          </pv-float-label>
        </div>

        <div class="field">
          <pv-float-label>
            <pv-input-text id="plant" v-model="item.plant" :class="{ 'p-invalid': submitted && !item.plant }"/>
            <label for="plant">Plant</label>
          </pv-float-label>
        </div>

        <div class="field">
          <pv-float-label>
            <pv-input-text id="role" v-model="item.role" :class="{ 'p-invalid': submitted && !item.role }"/>
            <label for="role">Role</label>
          </pv-float-label>
        </div>

        <div class="field">
          <pv-float-label>
            <pv-input-text id="permission" v-model="item.permission" :class="{ 'p-invalid': submitted && !item.permission }"/>
            <label for="permission">Permission</label>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>


<style scoped>

</style>