<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="$emit('toggleDrawer')"/>
    <v-app-bar-title>
      {{ route.name }}
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn icon @click="$emit('customtheme')">
        <v-icon v-if="theme.global.name.value === 'dark'" icon="mdi-weather-sunny" />
        <v-icon v-else icon="mdi-weather-night" />
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import {useTheme} from "vuetify";
import { useRoute } from 'vue-router'

const theme = useTheme()
const route = useRoute()

</script>