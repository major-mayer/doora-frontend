<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>View Collection {{ id }}</ion-title>
            </ion-toolbar>
        </ion-header>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { id } = route.params;


</script>
  

<style scoped></style>