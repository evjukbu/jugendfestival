<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item title="Jugendfestival 2023"
        subtitle="Evangelische Jugend in den Kirchenkreisen Burgwedel-Langenhagen und Burgdorf" />
      <v-divider />


      <v-list dense nav>
        <v-list-item rounded to="/" color="primary" title="Home">
          <template v-slot:prepend>
            <v-icon icon="mdi-home" />
          </template>
        </v-list-item>
        <v-list-item rounded to="/posts" color="primary" title="Aktuelles" :exact="false">
          <template v-slot:prepend>
            <v-icon icon="mdi-newspaper" />
          </template>
        </v-list-item>
        <v-list-item rounded to="/events" color="primary" title="Veranstaltungen" :exact="false">
          <template v-slot:prepend>
            <v-icon icon="mdi-format-list-bulleted" />
          </template>
        </v-list-item>
        <v-list-item rounded to="/categories" color="primary" title="Kategorien" :exact="false">
          <template v-slot:prepend>
            <v-icon icon="mdi-tag" />
          </template>
        </v-list-item>
        <div v-for="page in pages" :key="page.id">
          <v-list-item v-if="(!page.needsFeatureKey || (cookies.isKey('keys') && cookies.get('keys')[page.featureKey])) && page.isRedirect" rounded color="primary" :title="page.name" :exact="false" :href="page.redirectUrl">
            <template v-slot:prepend>
              <v-icon :icon="page.icon" />
            </template>
          </v-list-item>
          <v-list-item v-else-if="(!page.needsFeatureKey || (cookies.isKey('keys') && cookies.get('keys')[page.featureKey])) && page.isInternalRedirect" rounded color="primary" :title="page.name" :exact="false" :to="page.redirectUrl">
            <template v-slot:prepend>
              <v-icon :icon="page.icon" />
            </template>
          </v-list-item>
          <v-list-item v-if="(!page.needsFeatureKey || (cookies.isKey('keys') && cookies.get('keys')[page.featureKey])) && !page.isInternalRedirect && !page.isRedirect" rounded :to="'/pages/' + page.id" color="primary"
            :title="page.name" :exact="false">
            <template v-slot:prepend>
              <v-icon :icon="page.icon" />
            </template>
          </v-list-item>
        </div>


      </v-list>
    </v-navigation-drawer>
    <default-bar @customtheme="customTheme()" @toggleDrawer="toggleDrawer()" />

    <default-view />

  </v-app>
</template>

<script setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import { onMounted, ref, inject } from "vue";
import { useTheme } from "vuetify";
import { usepb } from "@/plugins/pocketbase";

let drawer = ref(false)
const theme = useTheme()
const cookies = inject('$cookies');
let useCustomTheme = false

const pb = usepb();
function toggleDrawer() {
  drawer.value = !drawer.value
}

function customTheme() {
  useCustomTheme = true
  theme.global.name.value = theme.global.current.value.dark ? 'bulabutheme' : 'bulabuthemedark'
}

const pages = ref(null)

onMounted(async () => {
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

  pb.collection('posts').subscribe('*', function (e) {
    alert(e.record.title);
  });
  console.log("Subscribed to posts")
  const records = await pb.collection('pages').getFullList({});
  pages.value = records
})

</script>