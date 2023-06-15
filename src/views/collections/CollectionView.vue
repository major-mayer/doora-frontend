<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>View Collection {{ localCollection.name }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
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
                        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                    </ion-thumbnail>
                    <ion-checkbox @ionChange="setItem($event, item.id)"
                        :checked="localCollection.itemIds?.includes(item.id)">{{
                            item.name
                        }}</ion-checkbox>
                </ion-item>
            </ion-list>


            <ion-button @click="saveChanges()">
                Save Changes
            </ion-button>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { useDooraStore } from '@/stores/dooraStore';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem,
    IonList, IonCheckbox, IonThumbnail, CheckboxCustomEvent, useIonRouter, IonButton
} from '@ionic/vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const router = useIonRouter();
const store = useDooraStore();
const route = useRoute();
const { id } = route.params;

const storeCollection = store.getCollectionById(Number.parseInt(id[0]));
const localCollection = reactive({ ...storeCollection })
// const itemsForCollection = store.getItemsForCollectionId(Number.parseInt(id[0]));

const setItem = (value: CheckboxCustomEvent, id: number) => {
    if (value.detail.checked) {
        localCollection.itemIds?.push(id);
    } else {
        const index = localCollection.itemIds?.indexOf(id);
        if (index > -1) { // only splice array when item is found
            localCollection.itemIds?.splice(index, 1); // 2nd parameter means remove one item only
        } else {
            throw Error("Item ID does not exist in array!")
        }
    }
}

function saveChanges() {
    if (localCollection !== undefined) {
        store.updateCollection(localCollection)
    }
    router.back();
}
</script>
