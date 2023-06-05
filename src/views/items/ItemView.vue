<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>View Item {{ id }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">View Item</ion-title>
                </ion-toolbar>
            </ion-header>


            <!-- TODO:  -->
            <!-- When item has no RFID ID, we need to show some spinner and tell the user to put the item to the scanner -->
            <!-- When the item has an RFID ID, we show the details and make it editable -->
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { id } = route.params;
</script>
  