<template>
    <v-card variant="flat">
        <v-card-item>
            <div v-if="page != null" v-html="page.content"></div>
            <v-skeleton-loader v-else type="heading, subtitle, image, paragraph"/>
        </v-card-item>
    </v-card>

    
</template>

<script setup>
import { usepb } from "@/plugins/pocketbase";
import { onMounted } from 'vue';
import { ref, reactive } from 'vue';
import { useRoute } from "vue-router";
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

const route = useRoute()
const pb = usepb()
const page = ref(null)

onMounted(async () => {
    const r = await pb.collection('pages').getOne(route.params.id)
    page.value = r
})
</script>