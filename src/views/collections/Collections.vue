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
          <ion-card-subtitle>Collection description</ion-card-subtitle>
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
    </ion-content>
  </ion-page>
</template>

  
<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { useDooraStore } from '@/stores/dooraStore'

const store = useDooraStore();
</script>

<style scoped>
ion-item {
  --padding-start: 0;
}
</style>