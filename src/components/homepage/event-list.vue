<template>
    <v-card-subtitle>Die nächsten Veranstaltungen</v-card-subtitle>
    <div>
        <v-list v-if="records != null" lines="two">
            <!--<v-list-item v-for="item in records.items" :key="item.id" :title="item.name">
                <template v-slot:prepend>
                    <datecontainer :record="item" />
                </template>
                <v-list-item-subtitle v-if="locations[item.location] != null && categories[item.category] != null">
                    <v-chip variant="outlined" class="event-chip" color="blue" size="x-small" prepend-icon="mdi-map-marker">
                        {{ locations[item.location].name }}
                    </v-chip>
                    <v-chip variant="outlined" class="event-chip" color="amber-darken-4" size="x-small"
                        prepend-icon="mdi-tag">
                        {{ categories[item.category].name }}
                    </v-chip>
                    <v-chip v-if="item.overload" variant="outlined" color="error" class="event-chip" size="x-small"
                        prepend-icon="mdi-alert">
                        Überfüllt
                    </v-chip>
                </v-list-item-subtitle>
            </v-list-item>-->
            <event v-for="item in records.items" :key="item.id" :item="item" :locations="locations"
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
    let r = await pb.collection('events').getList(1, 3);
    for (const record of r.items) {
        const l = await pb.collection('locations').getOne(record.location)
        locations[l.id] = l
        const c = await pb.collection('categories').getOne(record.category)
        categories[c.id] = c
    }
    records.value = r
})



</script>