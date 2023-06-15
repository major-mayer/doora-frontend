<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>View Collection {{ id }}</ion-title>
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
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { useDooraStore } from '@/stores/dooraStore';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem,
    IonList, IonCheckbox, IonThumbnail, CheckboxCustomEvent
} from '@ionic/vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

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


</script>
  

<style scoped></style>