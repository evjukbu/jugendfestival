<template>
    <v-list>
        <v-list-item v-if="categories != null" v-for="category in categories" :key="category.id" :to="`/categories/${category.id}`">
            <template v-slot:prepend>
                <v-avatar :color="category.color">
                    <v-icon :icon="category.icon" />
                </v-avatar>
            </template>
            <v-list-item-title>{{ category.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ category.description }}</v-list-item-subtitle>
        </v-list-item>
        <v-skeleton-loader v-else v-for="n in 3" type="avatar, text"/>
    </v-list>
</template>

<script setup>
import { usepb } from '@/plugins/pocketbase';
import { ref, onMounted } from 'vue';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'



const pb = usepb();

const categories = ref(null);

onMounted(async () => {
  categories.value = await pb.collection('categories').getFullList();
});
</script>