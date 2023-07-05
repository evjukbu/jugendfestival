<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="$emit('toggleDrawer')" />
    <v-app-bar-title>
      {{ route.name }}
    </v-app-bar-title>
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon icon="mdi-dots-vertical" />
          </v-btn> </template>

        <v-list>
          <v-list-item to="/access">
            <v-list-item-title>Berechtigungsschlüssel</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </template>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from "vuetify";
import { useRoute } from 'vue-router'

const theme = useTheme()
const route = useRoute()

</script>