<template>
    <v-list>
        <Event v-if="records != null" v-for="record in records" :key="record.id" :item="record" :locations="locations" :categories="categories"></Event>
        <v-skeleton-loader v-else v-for="n in 3" type="avatar, text"/>
    </v-list>
</template>

<script setup>
import { usepb } from '@/plugins/pocketbase';
import { ref, reactive, onMounted } from 'vue';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import { useRoute } from 'vue-router'
import Event from '@/components/event.vue';

const route = useRoute()
const pb = usepb();

const records = ref(null);
let locations = reactive({})
let categories = reactive({})
onMounted(async () => {
    const r = await pb.collection('events').getFullList({
        sort: '-start',
        filter: 'category = "' + route.params.id + '"'
    });
    for (const record of r) {
        const l = await pb.collection('locations').getOne(record.location)
        locations[l.id] = l
        const c = await pb.collection('categories').getOne(record.category)
        categories[c.id] = c
    }
    records.value = r
});
</script>