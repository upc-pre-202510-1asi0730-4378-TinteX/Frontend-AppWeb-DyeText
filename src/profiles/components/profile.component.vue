<template>
  <div>
    <h2>{{ profile.fullName }}</h2>
    <p>{{ profile.email }}</p>
    <p>{{ profile.phone }}</p>
    <p>Membresía: <b>{{ profile.membershipActive ? 'Activa' : 'Inactiva' }}</b></p>

    <label for="timezone">Zonas horarias:</label>
    <select id="timezone" v-model="profile.timezone">
      <option value="America/Lima">America/Lima</option>
      <option value="Europe/Madrid">Europe/Madrid</option>
    </select>

    <label for="theme">Tema:</label>
    <select id="theme" v-model="profile.theme" @change="onThemeChange">
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
import { ProfileService } from '../services/profile.services.js';

export default {
  data() {
    return {
      profile: {
        id: '',
        fullName: '',
        email: '',
        phone: '',
        membershipActive: true,
        theme: 'light',
        timezone: 'America/Lima'
      }
    };
  },
  async created() {
    const service = new ProfileService();
    const data = await service.getProfile("1");
    this.profile = {
      ...this.profile,
      ...data
    };

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
    async onThemeChange() {
      this.applyTheme(this.profile.theme);
      await this.saveProfile();
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
};
</script>

<style>
body.theme-light {
  background: #f4f6fa;
  color: #222;
}
body.theme-dark {
  background: #181818;
  color: #f4f6fa;
}
</style>