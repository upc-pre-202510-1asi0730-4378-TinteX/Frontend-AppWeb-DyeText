<script>
 import LanguageSwitcher from "./public/components/language-switcher.component.vue";
 import {defineComponent} from "vue";

 export default defineComponent({
   name: "App",
   components: {LanguageSwitcher},
   data(){
     return {
       drawer: false,
       items: [
         {label: "option.home", to: "/home"},
         {label: "option.monitoring", to: "/monitoring"},
         {label: "option.maintenance", to: "/maintenance"},
         {label: "option.data-analytics", to: "/data-analytics"},
        {label: "option.assign-user", to: "/assignUser"},
         { label: 'option.categories', to: '/publishing/notifications' }
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
          <i class="pi pi-bell" style="font-size: 2rem"></i>
          <i class="pi pi-user" style="font-size: 2rem"></i>
        </div>
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


</style>
