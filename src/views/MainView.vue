<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/items">
          <ion-icon aria-hidden="true" :icon="pricetag" />
          <ion-label>Items</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/collections">
          <ion-icon aria-hidden="true" :icon="fileTrayStacked" />
          <ion-label>Collections</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { pricetag, fileTrayStacked } from 'ionicons/icons';
</script>
