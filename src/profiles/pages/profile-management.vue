<template>
  <pv-card class="profile-card">
    <template #title>
      <div class="profile-header">
        <span class="pi pi-user profile-avatar"></span>
        <span>{{ isEditing ? 'Editar Perfil' : 'Perfil de Usuario' }}</span>
        <pv-button icon="pi pi-pencil" class="p-button-text edit-btn" v-if="!isEditing" @click="isEditing = true"/>
      </div>
    </template>
    <template #content>
      <form @submit.prevent="saveProfile">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-6">
            <label for="fullName">Nombre completo</label> <br>
            <pv-input-text id="fullName" v-model="profile.fullName" :disabled="!isEditing"/>
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="email">Email</label> <br>
            <pv-input-text id="email" v-model="profile.email" :disabled="!isEditing"/>
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="phone">Teléfono</label> <br>
            <pv-input-text id="phone" v-model="profile.phone" :disabled="!isEditing"/>
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label>Membresía</label> <br>
            <pv-tag :value="profile.membershipActive ? 'Activa' : 'Inactiva'" :severity="profile.membershipActive ? 'success' : 'danger'"/>
          </div>

          <!-- Campo Tema con botón de alternancia -->
          <div class="p-field p-col-12 p-md-6 theme-wrapper">
            <div style="flex: 1;">
              <label for="theme">Tema</label> <br>
              <pv-dropdown
                  id="theme"
                  v-model="profile.theme"
                  :options="themes"
                  option-label="label"
                  option-value="value"
                  @change="onThemeChange"
                  :disabled="!isEditing"
              />
              <pv-tag
                  :value="profile.theme === 'light' ? 'Claro' : 'Oscuro'"
                  :severity="profile.theme === 'light' ? 'info' : 'warning'"
                  style="margin-top: 0.5rem;"
              />
            </div>
            <div>
              <pv-button
                  v-if="isEditing"
                  :label="`Cambiar a tema ${profile.theme === 'light' ? 'oscuro' : 'claro'}`"
                  icon="pi pi-refresh"
                  class="p-button-secondary"
                  type="button"
                  @click="toggleTheme"
              />
            </div>
          </div>
        </div>
        <div class="profile-actions">
          <pv-button label="Cambiar contraseña" icon="pi pi-key" class="p-button-secondary" type="button" @click="onChangePassword"/>
          <pv-button v-if="isEditing" label="Guardar" icon="pi pi-save" class="p-button-success" type="submit"/>
          <pv-button v-if="isEditing" label="Cancelar" icon="pi pi-times" class="p-button-text" type="button" @click="cancelEdit"/>
        </div>
      </form>
    </template>
  </pv-card>
</template>

<script>
import { ProfileService } from '../services/profile.services.js'

export default {
  data() {
    return {
      profile: {},
      originalProfile: {},
      isEditing: false,

      themes: [
        { label: 'Claro', value: 'light' },
        { label: 'Oscuro', value: 'dark' }
      ]
    }
  },
  async created() {
    const service = new ProfileService();
    this.profile = await service.getProfile("1");
    if (!this.profile.theme) this.profile.theme = 'light';
    if (!this.profile.timezone) this.profile.timezone = 'America/Lima';
    this.originalProfile = { ...this.profile };
    this.applyTheme(this.profile.theme);
  },
  methods: {
    onChangePassword() {
      this.$toast.add({severity:'info', summary:'Funcionalidad', detail:'Funcionalidad de cambio de contraseña', life: 3000});
    },
    async saveProfile() {
      const service = new ProfileService();
      await service.updateProfile(this.profile.id, this.profile);
      this.isEditing = false;
      this.originalProfile = { ...this.profile };
      this.$toast.add({severity:'success', summary:'Perfil actualizado', detail:'Los cambios han sido guardados', life: 3000});
    },
    cancelEdit() {
      this.profile = { ...this.originalProfile };
      this.isEditing = false;
    },
    onThemeChange() {
      this.applyTheme(this.profile.theme);
    },
    applyTheme(theme) {
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(`theme-${theme}`);
    },
    async toggleTheme() {
      this.profile.theme = this.profile.theme === 'light' ? 'dark' : 'light';
      this.applyTheme(this.profile.theme);
      const service = new ProfileService();
      await service.updateProfile(this.profile.id, this.profile);
      this.$toast.add({severity:'success', summary:'Tema actualizado', detail:`Tema cambiado a ${this.profile.theme}`, life: 2000});
    }
  }
}
</script>

<style scoped>
.profile-card {
  max-width: 600px;
  margin: 2rem auto;
}
.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.profile-avatar {
  font-size: 2.5rem;
  color: #2196f3;
}
.edit-btn {
  margin-left: auto;
}
.profile-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: flex-end;
}
.theme-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}
.theme-wrapper > div {
  flex: 1;
  min-width: 150px;
}
</style>

<style>
body.theme-light {
  background: #f4f6fa;
  color: #222;
}
body.theme-dark {
  background: #181818;
  color: #f4f6fa;
}
body.theme-dark .p-card, body.theme-dark .p-inputtext, body.theme-dark .p-dropdown, body.theme-dark .p-tag {
  background: #23272b !important;
  color: #f4f6fa !important;
  border-color: #333 !important;
}
body.theme-dark .p-button {
  background: #333 !important;
  color: #f4f6fa !important;
  border: none !important;
}
</style>
