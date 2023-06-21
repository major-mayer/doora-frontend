<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Items</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item button v-for="item of store.items" :key="item.id" :router-link="`/tabs/items/${item.id}`">
          <ion-thumbnail slot="start">
            <ItemIcon :icon-id="item.iconId"></ItemIcon>
          </ion-thumbnail>
          <ion-label>
            <h3>{{ item.name }}</h3>
            <p v-if="item.description">{{ item.description }}</p>
            <p v-else>No description!</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button id="open-item-modal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>

        <NewItemModal />
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { add } from 'ionicons/icons';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonFabButton,
  IonIcon,
  IonFab,
  IonThumbnail
} from '@ionic/vue';
import { useDooraStore } from '@/stores/dooraStore'
import NewItemModal from './NewItemModal.vue';
import ItemIcon from '@/components/ItemIcon.vue';


const store = useDooraStore();


</script>