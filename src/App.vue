<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import {defineComponent} from "vue";
import AuthenticationSection from "./iam/components/authentication-section.component.vue";

export default defineComponent({
  name: "App",
  components: {AuthenticationSection, LanguageSwitcher},
  data(){
    return {
      drawer: false,
      items: [
        {label: "option.home", to: "/home"},
        {label: "option.monitoring", to: "/machine/monitoring"},
        {label: "option.maintenance", to: "/machine/maintenance"},
        {label: "option.data-analytics", to: "/machine/data-analytics"},
        {label: "option.assign-user", to: "/user/assign-user"}
      ]
    }
  },
  methods: {
    toggleDrawer(){
      this.drawer = !this.drawer;
    }
  }
})

</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header>
    <pv-toolbar class="bg-primary">
      <template #start>
        <pv-button class="p-button-text" icon="pi pi-bars" @click="toggleDrawer"/>
        <img class="logoDyeTex" src="../public/DyeTex.png" alt="logoDyeTex"/>
        <h3>DyeTex</h3>
      </template>
      <template #center>
        <div class="flex-column">
          <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps">
            <router-link :to="item.to" :class="slotProps['class']">{{ $t(item.label) }}</router-link>
          </pv-button>
        </div>
      </template>
      <template #end>
        <div class="toolbar-end">
          <router-link to="/machine/notifications">
            <i class="pi pi-bell" style="font-size: 2rem"></i>
          </router-link>
          <router-link to="/user/profile">
            <i class="pi pi-user" style="font-size: 2rem; cursor: pointer"></i>
          </router-link>
          <router-link to="/user/subscription">
            <i class="pi pi-money-bill" style="font-size: 2rem; cursor: pointer"></i>
          </router-link>
        </div>
        <authentication-section/>
        <language-switcher/>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer"/>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<style scoped>
.logoDyeTex{
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.bg-primary{
  width: 100%;
  border-radius: 0;
  border: none;
}

.toolbar-end i {
  margin: 0 10px;
}

header {
  display: flex;
  flex: 0 0 auto;
  width: 100vw;
}

main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.pi{
  color: #003366;

  &:hover{
    color: #2669ad;
  }
}

</style>
