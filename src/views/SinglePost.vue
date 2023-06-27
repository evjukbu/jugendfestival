<template>
    <v-card v-if="post != null" variant="flat">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-subtitle>{{ getRelativeTime(new Date(post.created)) }}</v-card-subtitle>
        <v-card-item>
            <v-card variant="flat">
                <v-img :src="pb.files.getUrl(post, post.image)"></v-img>
            </v-card>
            <br />
            <p v-html="post.text"></p>

        </v-card-item>
    </v-card>
    <v-skeleton-loader v-else type="heading, subtitle, image, paragraph"/>
    
</template>

<script setup>
import { useRoute } from 'vue-router'
import { usepb } from "@/plugins/pocketbase";
import { onMounted } from 'vue';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import { ref } from 'vue';

const route = useRoute()
const pb = usepb()
let post = ref(null)

onMounted(async () => {
    post.value = await pb.collection('posts').getOne(route.params.postID)
})

const units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: 24 * 60 * 60 * 1000 * 365 / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
}


const rtf = new Intl.RelativeTimeFormat('de', { numeric: 'auto' })

var getRelativeTime = (d2) => {
    var elapsed = d2 - new Date()

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (var u in units)
        if (Math.abs(elapsed) > units[u] || u == 'second')
            return rtf.format(Math.round(elapsed / units[u]), u)
}

</script>