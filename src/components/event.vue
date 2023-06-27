<template>
    <v-list-item :title="props.item.name" :to="'/events/' + props.item.id">
        <template v-slot:prepend>
            <datecontainer :record="props.item" />
        </template>
        <v-list-item-subtitle v-if="props.locations[props.item.location] != null && categories[props.item.category] != null">
            <v-chip variant="outlined" class="event-chip" color="blue" size="x-small" prepend-icon="mdi-map-marker">
                {{ props.locations[props.item.location].name }}
            </v-chip>
            <v-chip variant="outlined" class="event-chip" color="amber-darken-4" size="x-small" prepend-icon="mdi-tag">
                {{ props.categories[props.item.category].name }}
            </v-chip>
            <v-chip v-if="props.item.overload" variant="outlined" color="error" class="event-chip" size="x-small"
                prepend-icon="mdi-alert">
                Überfüllt
            </v-chip>
        </v-list-item-subtitle>
    </v-list-item>
</template>

<script setup>
import Datecontainer from "@/components/homepage/datecontainer.vue";
const props = defineProps(["item", "locations", "categories"])
</script>

<style scoped>
.event-chip {
    margin: 0.1rem;
}
</style>