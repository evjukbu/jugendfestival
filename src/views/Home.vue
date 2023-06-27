<template>
    <logo />
    <searchbar />
    <br />
    <v-row no-gutters>
        <v-col style="max-width:100%;" cols="12" md="6">
          <eventlist />
        </v-col>
        <v-col style="max-width:100%;" cols="12" md="6">
          <postlist />
        </v-col>
    </v-row>
</template>

<script setup>
  import logo from '@/components/homepage/logo.vue'
  import searchbar from '@/components/homepage/searchbar.vue'
  import eventlist from '@/components/homepage/event-list.vue'
  import postlist from '@/components/homepage/post-list-widget.vue'

</script>
