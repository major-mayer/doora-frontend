<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Items</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item button v-for="item of items" :key="item.id" :router-link="`/tabs/items/${item.id}`">
          <ion-label>
            <h3>{{ item.name }}</h3>
            <p v-if="item.description">{{ item.description }}</p>
            <p v-else>No description!</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button id="open-modal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>

        <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-button @click="cancel()">Cancel</ion-button>
              </ion-buttons>
              <ion-title>Add Item</ion-title>
              <ion-buttons slot="end">
                <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <ion-item>
              <ion-input label="Name" labelPlacement="stacked" v-model="name" type="text"
                placeholder="The name of your new item"></ion-input>
            </ion-item>
          </ion-content>
        </ion-modal>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { add } from 'ionicons/icons';
import {
  IonPage,
  IonButtons,
  IonButton,
  IonInput,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonFabButton,
  IonModal
} from '@ionic/vue';
import { ref } from 'vue';
import { OverlayEventDetail } from '@ionic/core';
import { reactive } from 'vue';


const items = reactive([
  { id: 0, name: 'Portemonnaie', description: "Das mit den dicken Batzen", "rfidCode": "abc123" },
  { id: 1, name: 'Schlüssel', description: "Haustüre, Garage und Büro", "rfidCode": "abc123" },
  { id: 2, name: 'Wasserflasche', description: null, "rfidCode": "abc123" },
  { id: 3, name: 'Laptop', description: undefined, "rfidCode": "abc123" },
  { id: 4, name: 'Sportschuhe', description: "Weiße Nikes, Größe 44", "rfidCode": "abc123" },
]);

const name = ref("");

const addItem = () => {
  console.log("addItem");
}

// This is a reference directly to the modal DOM element
const modal = ref<HTMLIonModalElement | null>(null);

const cancel = () => {
  modal.value?.$el.dismiss(null, 'cancel');
};
const confirm = () => {
  modal.value?.$el.dismiss(name.value, 'confirm');
  name.value = "";
};
const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === 'confirm') {
    items.push({ id: items.length, name: ev.detail.data, rfidCode: null })
  }
}

</script>
