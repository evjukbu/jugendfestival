<template>
    <v-dialog v-model="dialog" width="1024">
        <v-card>
            <v-card-title>Schlüssel einlösen</v-card-title>
            <v-card-text>
                <v-container>

                    <v-row>
                        <v-text-field :disabled="validationInProgress" v-model="key" label="Berechtigungsschlüssel" required></v-text-field>
                    </v-row>

                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="dialog = false">Abbrechen</v-btn>
                <v-btn @click="add" :disabled="key == ''">Weiter</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="removeDialog" width="1024">
        <v-card>
            <v-card-title>Wirklich löschen?</v-card-title>
            <v-card-text>Der Berechtigungsschlüssel muss erneut eingelöst werden, um nutzbar zu werden.</v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="removeDialog = false">Abbrechen</v-btn>
                <v-btn @click="remove">Weiter</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-container>
        <v-layout-item model-value position="bottom" class="text-end" size="88">
            <div class="ma-4">
                <v-btn @click="addButtonPress" icon="mdi-plus" size="large" color="primary" elevation="8" />
            </div>
        </v-layout-item>

        <v-alert
            text="Berechtigungsschlüssel erlauben es, zusätzliche Features in der App freizuschalten. Wende dich an den Veranstalter, um Berechtigungsschlüssel zu erhalten."
            type="info" variant="tonal"></v-alert>
        <v-list v-if="showList">
            <v-list-item v-for="cookie in cookies.get('keys')" :title="cookie.name" :subtitle="cookie.description">
                <template v-slot:append>
                    <v-btn color="error" icon="mdi-delete" variant="text" @click="removeButton(cookie.id)"></v-btn>
                </template>
            </v-list-item>
        </v-list>
    </v-container>
    <v-snackbar v-model="showError" timeout="2000">
        Der Berechtigungsschlüssel konnte nicht eingelöst werden.
    </v-snackbar>
</template>

<script setup>
import { inject, ref } from 'vue';
import { usepb } from '@/plugins/pocketbase'

const cookies = inject('$cookies');
const dialog = ref(false);
const key = ref("")
const validationInProgress = ref(false)
const showError = ref(false)
const pb = usepb();
const showList = ref(true)
const removeDialog = ref(false)
const selectedCode = ref("")

function addButtonPress() {
    dialog.value = true
}

async function add() {
    validationInProgress.value = true
    dialog.value = false
    try {
        const record = await pb.collection('keys').getOne(key.value)
        let keys = {}
        if(cookies.isKey("keys")) {
            keys = cookies.get("keys")
        }
        keys[key.value] = record
        cookies.set("keys", keys, Infinity)
    } catch (error) {
        console.log(error)
        showError.value = true
    }
    key.value = ""
    validationInProgress.value = false
    dialog.value = false
    showList.value = false
    showList.value = true
}

async function remove() {
    removeDialog.value = false
    let keys = cookies.get("keys")
    delete keys[selectedCode.value]
    cookies.set("keys", keys, Infinity)
    showList.value = false
    showList.value = true
}


async function removeButton(code) {
    removeDialog.value = true
    selectedCode.value = code
}
</script>