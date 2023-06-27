<template>
    <v-card v-if="record != null" variant="flat">
        <v-card-subtitle>{{ new Intl.DateTimeFormat('de', {weekday: 'long', hour: 'numeric', minute: 'numeric'}).format(new Date(record.start)) }} - {{ new Intl.DateTimeFormat('de', {hour: 'numeric', minute: 'numeric'}).format(new Date(record.end)) }}</v-card-subtitle>
        <v-card-title>{{ record.name }}</v-card-title>
        
        <v-card-item>
            <v-chip variant="outlined" class="event-chip" color="blue" prepend-icon="mdi-map-marker">
                {{ location.name }}
            </v-chip>
            <v-chip variant="outlined" class="event-chip" color="amber-darken-4" prepend-icon="mdi-tag">
                {{ category.name }}
            </v-chip>
            <v-chip v-if="record.overload" variant="outlined" color="error" class="event-chip"
                prepend-icon="mdi-alert">
                Überfüllt
            </v-chip>
            <v-card v-if="record.image != ''" variant="flat">
                <v-img :src="pb.files.getUrl(record, record.image)"></v-img>
            </v-card>
            <br />
            <div v-html="record.description"></div><br />
        </v-card-item>
    </v-card>
</template>

<script setup>
import { usepb } from '@/plugins/pocketbase';
import { ref, onMounted } from 'vue';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import { useRoute } from 'vue-router';

const route = useRoute()
const pb = usepb();

const record = ref(null);
let location = ref(null)
let category = ref(null)

onMounted(async () => {
    const r = await pb.collection('events').getOne(route.params.id)
    location.value = await pb.collection('locations').getOne(r.location)
    category.value = await pb.collection('categories').getOne(r.category)
    record.value = r
});
</script>

<style scoped>
.event-chip {
    margin-bottom: 0.5rem;
    margin-right: 0.2rem;
}
</style>