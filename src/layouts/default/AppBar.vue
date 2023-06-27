<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="$emit('toggleDrawer')"/>
    <v-app-bar-title>
      {{ route.name }}
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn icon>
        <v-icon icon="mdi-dots-vertical" />
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