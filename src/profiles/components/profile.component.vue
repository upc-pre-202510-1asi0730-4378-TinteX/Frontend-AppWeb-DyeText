<template>
  <div>
    <h2>{{ profile.full_name }}</h2>
    <p>{{ profile.email }}</p>
    <p>{{ profile.phone }}</p>
    <p>Membresía: <b>{{ profile.membership_active ? 'Activa' : 'Inactiva' }}</b></p>
    <label>Zonas horarias:</label>
    <select v-model="profile.timezone">
      <option value="America/Lima">America/Lima</option>
      <option value="Europe/Madrid">Europe/Madrid</option>
    </select>
    <label>Tema:</label>
    <select v-model="profile.theme" @change="onThemeChange">
      <option value="light">Claro</option>
      <option value="dark">Oscuro</option>
    </select>
    <button @click="toggleTheme">
      Cambiar a tema {{ profile.theme === 'light' ? 'oscuro' : 'claro' }}
    </button>
    <button @click="onChangePassword">Cambiar contraseña</button>
    <button @click="saveProfile">Guardar cambios</button>
  </div>
</template>

<script>
import { ProfileService } from '../services/profile.services.js'

export default {
  data() {
    return {
      profile: {}
    }
  },
  async created() {
    const service = new ProfileService();
    this.profile = await service.getProfile("1");
    if (!this.profile.theme) {
      this.profile.theme = 'light';
    }
    this.applyTheme(this.profile.theme);
  },
  methods: {

    onChangePassword() {
      alert('Funcionalidad de cambio de contraseña');
    },
    applyTheme(theme) {
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(`theme-${theme}`);
    },
    onThemeChange() {
      this.applyTheme(this.profile.theme);
      this.saveProfile();
    },
    async toggleTheme() {
      this.profile.theme = this.profile.theme === 'light' ? 'dark' : 'light';
      await this.saveProfile();
      this.applyTheme(this.profile.theme);
    },
    async saveProfile() {
      const service = new ProfileService();
      await service.updateProfile(this.profile.id, this.profile);
      alert('Perfil actualizado');
    }
  }
}
</script>