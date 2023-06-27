<template>
    <v-card class="mx-auto">
        <v-img aspect-ratio="16/9" :src="pb.files.getUrl(record, record.image)"></v-img>
        <v-card-title>{{ props.record.name }}</v-card-title>
        <v-btn @click="test()" text="Test"></v-btn>
    </v-card>
</template>

<script setup>
import { usepb } from "@/plugins/pocketbase";
import { defineProps, ref } from "vue";

const props = defineProps(["record"])
const pb = usepb();
</script>