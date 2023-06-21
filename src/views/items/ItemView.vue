<template>
    <ion-page>
        <ion-header v-if="localItem?.name">
            <ion-toolbar>
                <ion-title>View Item {{ localItem.name }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content v-if="localItem?.name" class="ion-padding">
            <ion-item>
                <ion-input label="Name" labelPlacement="stacked" v-model="localItem.name" type="text"
                    placeholder="The name of your new item"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input label="Description" labelPlacement="stacked" v-model="localItem.description" type="text"
                    placeholder="A description for your new item"></ion-input>
            </ion-item>

            <ion-item>
                <ion-label>Created: {{ localItem.created }}</ion-label>
            </ion-item>
            <ion-item>
                <ion-label>Last Accessed: {{ localItem.lastAccessed }}</ion-label>
            </ion-item>

            <ion-button @click="saveChanges()">
                Save Changes
            </ion-button>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonButton, IonLabel, useIonRouter } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { LocalItem, useDooraStore } from '@/stores/dooraStore';
import { ref, toRef, watch } from 'vue';

const router = useIonRouter();
const store = useDooraStore();
const route = useRoute();

const { id } = route.params;
const localItem = ref<LocalItem>()
let initFinished = toRef(store, "initFinished");


// We need an eager watcher, because otherwise the localCollection won't be created if the data was already initialized!
// Reference: https://vuejs.org/guide/essentials/watchers.html#eager-watchers
watch(initFinished, async (value) => {
    console.log("Initialization has completed ?", value)

    if (value) {
        if (typeof id == "object") {
            throw Error("Invalid path parameters!")
        }
        const storeItem = store.getItemById(id);
        if (storeItem === undefined) {
            throw Error("Item ID cannot be found in the local store.")
        }
        localItem.value = { ...storeItem }
    }
}, { immediate: true })


function saveChanges() {
    if (localItem.value?.id) {
        store.updateItem(localItem.value?.id, localItem.value?.name, localItem.value?.description)   // We always update everything for now
    }
    router.back();
}
</script>
  

<style scoped>
.spinner-container {
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;
    height: 100%;
}

ion-spinner {
    width: 100px;
    height: 100px;
}

h3 {
    text-align: center;
}
</style>