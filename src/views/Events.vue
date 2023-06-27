<template>
    <div>
        <v-list v-if="records != null" lines="two">
            <event v-for="item in records" :key="item.id" :item="item" :locations="locations"
                :categories="categories" />
        </v-list>
        <v-list v-else>
            <v-skeleton-loader v-for="n in 3" type="avatar, text" />
        </v-list>
    </div>
</template>

<script setup>
import { usepb } from "@/plugins/pocketbase";
import { onMounted } from 'vue';
import { ref, reactive } from 'vue';
import event from '@/components/event.vue'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
const pb = usepb()


let records = ref(null)
let locations = reactive({})
let categories = reactive({})
onMounted(async () => {
    let r = await pb.collection('events').getFullList({
        sort: 'start',
    });
    for (const record of r) {
        const l = await pb.collection('locations').getOne(record.location)
        locations[l.id] = l
        const c = await pb.collection('categories').getOne(record.category)
        categories[c.id] = c
    }
    records.value = r
})



</script>