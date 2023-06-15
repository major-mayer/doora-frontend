<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>View Item {{ localItem.name }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content v-if="localItem?.rfidCode == null">
            <h3>Please hold your items next to the RFID scanner!</h3>
            <div class="spinner-container">
                <ion-spinner name="lines" color="secondary"></ion-spinner>
            </div>
        </ion-content>

        <ion-content v-else class="ion-padding">
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
import { onMounted, reactive } from 'vue';

const router = useIonRouter();

const store = useDooraStore();
const route = useRoute();
const { id } = route.params;

const storeItem = store.getItemById(Number.parseInt(id[0]));
const localItem = reactive({ ...storeItem })


function saveChanges() {
    if (localItem !== undefined) {
        console.log(localItem)
        store.updateItem(localItem)
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