<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import FooterContent from "./public/components/footer-content.component.vue";

export default {
  name: 'App',
  components: { FooterContent, LanguageSwitcher },
  data() {
    return {
      drawer: false,
      items: [
        { label: 'option.home', to: '/home' },
        { label: 'option.about', to: '/about' },
        { label: 'option.categories', to: '/publishing/notifications' }
      ]
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>

<template>
  <pv-toast />
  <pv-confirm-dialog />
  <div class="app-container">
    <header>
      <pv-toolbar class="bg-primary">
        <template #start>
          <pv-button class="p-button-text" icon="pi pi-bars" @click="toggleDrawer" />
          <h3>Dytex</h3>
        </template>
        <template #center>
          <div class="flex-column">
            <pv-button
                v-for="item in items"
                :key="item.label"
                as-child
                v-slot="slotProps"
            >
              <router-link :to="item.to" :class="slotProps['class']">{{ $t(item.label) }}</router-link>
            </pv-button>
          </div>
        </template>
        <template #end>
          <language-switcher />
        </template>
      </pv-toolbar>
      <pv-drawer v-model:visible="drawer" />
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <footer-content />
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  flex: 0 0 auto;
}

main {
  flex: 1 1 auto;
  padding: 1rem;
  overflow-y: auto;
}

footer {
  flex-shrink: 0;
  padding: 10px;
  background-color: #f8f8f8;
}
</style>
