<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Collections</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card v-for="collection of store.collections" :key="collection.id">
        <ion-card-header>
          <ion-card-title>{{ collection.name }}</ion-card-title>
          <ion-card-subtitle v-if="collection.description">{{ collection.description }}</ion-card-subtitle>
          <ion-card-subtitle v-else>No collection description</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item v-for="item of store.getItemsForCollectionId(collection.id)" :key="item.id">
              <ion-thumbnail slot="start">
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
              </ion-thumbnail>
              <ion-label>{{ item.name }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>


      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button id="open-collection-modal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>

        <NewCollectionModal />
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

  
<script setup lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonThumbnail,
  IonLabel,
  IonItem,
  IonList,
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import { useDooraStore } from '@/stores/dooraStore'
import NewCollectionModal from "./NewCollectionModal.vue"

const store = useDooraStore();
</script>

<style scoped>
ion-item {
  --padding-start: 0;
}
</style>