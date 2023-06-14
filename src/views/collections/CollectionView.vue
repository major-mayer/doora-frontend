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
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { useDooraStore } from '@/stores/dooraStore';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonButton } from '@ionic/vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const store = useDooraStore();
const route = useRoute();
const { id } = route.params;

const storeCollection = store.getCollectionById(Number.parseInt(id[0]));
const localCollection = reactive({ ...storeCollection })


</script>
  

<style scoped></style>