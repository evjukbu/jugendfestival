<template>
  <v-container>
    <v-row>
      <v-col v-if="records !== null" v-for="record in records" cols="12" md="4">
        <event-card :record="record" :key="record.id"/>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { usepb } from "@/plugins/pocketbase";
import { onMounted } from 'vue';
import { ref } from 'vue';
import EventCard from './EventCard.vue';

let records = ref(null)

onMounted(async () => {
    

const pb = usepb();

records.value = await pb.collection('events').getFullList({
    sort: '-created',
});
console.log(records.value);
})


</script>
