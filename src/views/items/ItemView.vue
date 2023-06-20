<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>View Item {{ localItem.name }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonInput, IonItem, IonButton, IonLabel, useIonRouter } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { useDooraStore } from '@/stores/dooraStore';
import { reactive } from 'vue';

const router = useIonRouter();

const store = useDooraStore();
const route = useRoute();
const { id } = route.params;

const storeItem = store.getItemById(id);
console.log(storeItem);
const localItem = reactive({ ...storeItem })
console.log(localItem)


function saveChanges() {
    if (localItem !== undefined) {
        console.log(localItem)
        store.updateItem(localItem.id, localItem.name, localItem.description)   // We always update everything for now
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