<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
    >
      <v-list-item title="Jugendfestival 2023" subtitle="Evangelische Jugend in den Kirchenkreisen Burgwedel-Langenhagen und Burgdorf"/>
      <v-divider/>


      <v-list
        dense
        nav
      >
        <v-list-item rounded to="/" color="primary" title="Home">
          <template v-slot:prepend>
            <v-icon icon="mdi-home"/>
          </template>
        </v-list-item>
        <v-list-item rounded to="/posts" color="primary" title="Aktuelles" :exact="false">
          <template v-slot:prepend>
            <v-icon icon="mdi-newspaper"/>
          </template>
        </v-list-item>
  
      </v-list>
    </v-navigation-drawer>
    <default-bar @customtheme="customTheme()" @toggleDrawer="toggleDrawer()"/>

    <default-view/>


  </v-app>
</template>

<script setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import {onMounted, ref} from "vue";
import {useTheme} from "vuetify";

let drawer = ref(false)
const theme = useTheme()
let useCustomTheme = false

function toggleDrawer() {
  drawer.value = !drawer.value
}

function customTheme() {
  useCustomTheme = true
  theme.global.name.value = theme.global.current.value.dark ? 'bulabutheme' : 'bulabuthemedark'
}



onMounted(() => {
  if (!useCustomTheme) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme.global.name.value = "bulabuthemedark"
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if (!useCustomTheme) {
        theme.global.name.value = event.matches ? "bulabuthemedark" : "bulabutheme"
      }
    });
  }
})
</script>