<template>
    <ion-page>
        <!-- <div v-if="localCollection"> -->
        <ion-header v-if="localCollection?.name">
            <ion-toolbar>
                <ion-title>View Collection {{ localCollection.name }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content v-if="localCollection?.name" class="ion-padding">
            <ion-item>
                <ion-input label="Name" labelPlacement="stacked" v-model="localCollection.name" type="text"
                    placeholder="The name of your new item"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input label="Description" labelPlacement="stacked" v-model="localCollection.description" type="text"
                    placeholder="A description for your new item"></ion-input>
            </ion-item>
            <ion-item>
                <ion-checkbox v-model="localCollection.alwaysRequired">Always required</ion-checkbox>
            </ion-item>

            <ion-list>
                <ion-item v-for="item of store.items" :key="item.id">
                    <ion-thumbnail slot="start">
                        <item-icon :icon-id="item.iconId"></item-icon>
                    </ion-thumbnail>
                    <ion-checkbox @ionChange="setItem($event, item.id)"
                        :checked="localCollection.itemIds?.includes(item.id)">{{
                            item.name
                        }}</ion-checkbox>
                </ion-item>
            </ion-list>


            <ion-button @click="saveChanges()" expand="block">
                Save Changes
            </ion-button>
            <ion-button @click="deleteCollection()" expand="block" color="danger">
                Delete Collection
            </ion-button>
        </ion-content>
        <!-- </div> -->
    </ion-page>
</template>
  
<script setup lang="ts">
import ItemIcon from '@/components/ItemIcon.vue';
import { useDooraStore, LocalCollection } from '@/stores/dooraStore';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem,
    IonList, IonCheckbox, IonThumbnail, CheckboxCustomEvent, useIonRouter, IonButton
} from '@ionic/vue';
import { ref, toRef, watch } from 'vue';
import { useRoute } from 'vue-router';

const router = useIonRouter();
const store = useDooraStore();
const route = useRoute();

const { id } = route.params;
let initFinished = toRef(store, "initFinished");
let localCollection = ref<LocalCollection>();

// We need an eager watcher, because otherwise the localCollection won't be created if the data was already initialized!
// Reference: https://vuejs.org/guide/essentials/watchers.html#eager-watchers
watch(initFinished, async (value) => {
    console.log("Initialization has completed ?", value)
    if (value) {
        let storeCollection = store.getCollectionById(Number.parseInt(id[0]));
        if (storeCollection === undefined) {
            throw Error("CollectionID cannot be found in the local store.")
        }
        localCollection.value = { ...storeCollection }
    }
}, { immediate: true })

const setItem = (value: CheckboxCustomEvent, id: string) => {
    if (value.detail.checked) {
        localCollection.value?.itemIds.push(id);
    } else {
        const index = localCollection.value?.itemIds.indexOf(id);
        if (index !== undefined && index > -1) { // only splice array when item is found
            localCollection.value?.itemIds.splice(index, 1); // 2nd parameter means remove one item only
        } else {
            throw Error("Item ID does not exist in array!")
        }
    }
}

function saveChanges() {
    if (localCollection.value?.id) {
        store.updateCollection(localCollection.value.id,
            localCollection.value.name,
            localCollection.value.description,
            localCollection.value.alwaysRequired,
            localCollection.value.itemIds)
    }
    router.back();
}

function deleteCollection() {
    store.deleteCollection(localCollection.value?.id)
    router.back();
}
</script>
