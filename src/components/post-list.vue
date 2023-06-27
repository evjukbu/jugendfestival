<template>
    <div v-if="posts != null">
        <v-container>
            <v-card v-if="posts.length != 0" class="post-card" v-for="post in posts" @click="$router.push('/posts/' + post.id)" :key="post">
                <v-img class="align-end text-white" aspect-ratio="16/9" :src="pb.files.getUrl(post, post.image)">
                    <v-card-title>{{ post.title }}</v-card-title>
                </v-img>
                <v-card-subtitle class="pt-4">
                    {{ getRelativeTime(new Date(post.created)) }}
                </v-card-subtitle>
                <v-card-text>{{ post.description }}</v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn :to="'/posts/' + post.id" color="primary" text>Weiterlesen</v-btn>
                </v-card-actions>
            </v-card>
            <v-card variant="flat" v-else>
                <div class="text-overline" style="text-align: center">Keine Beiträge verfügbar.</div>
            </v-card>
        </v-container>


    </div>
    <v-container v-else>
        <v-card class="post-card" v-if="props.maxPosts != undefined" v-for="n in props.maxPosts">
            <v-skeleton-loader class="mx-auto" type="image, article" />
        </v-card>
        <v-card class="post-card" v-else v-for="n in 3">
            <v-skeleton-loader class="mx-auto" type="image, article" />
        </v-card>
    </v-container>
</template>

<script setup>
import { usepb } from "@/plugins/pocketbase";
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import { onMounted } from 'vue';
import { ref } from 'vue';


const pb = usepb()
const props = defineProps(["maxPosts"])
let posts = ref(null)

onMounted(async () => {
    if (props.maxPosts == undefined) {
        posts.value = await pb.collection('posts').getFullList({
            sort: '-created',
        })
    } else {
        const resultList = await pb.collection('posts').getList(0, props.maxPosts, {
            sort: '-created',
        })
        posts.value = resultList.items
    }

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

<style scoped>
.post-card {
    margin-bottom: 1rem;
}
</style>