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
            <ion-item>
              <ion-input label="Description" labelPlacement="stacked" v-model="description" type="text"
                placeholder="A description for your new item"></ion-input>
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
  IonModal,
  IonIcon,
  IonFab
} from '@ionic/vue';
import { ref } from 'vue';
import { OverlayEventDetail } from '@ionic/core';
import { reactive } from 'vue';
import { useDooraStore } from '@/stores/dooraStore'
import { useIonRouter } from '@ionic/vue';

const ionRouter = useIonRouter();
const store = useDooraStore();
const name = ref("");
const description = ref("");



// This is a reference directly to the modal DOM element
const modal = ref<HTMLIonModalElement | null>(null);

const cancel = () => {
  modal.value?.$el.dismiss(null, 'cancel');
};
const confirm = () => {
  modal.value?.$el.dismiss({
    name: name.value,
    description: description.value
  }, 'confirm');

  name.value = "";
  description.value = "";
};
const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === 'confirm') {
    const { name, description } = ev.detail.data;
    const id = store.items.length;
    store.addItem(id, name, description, null)
    ionRouter.push(`/tabs/items/${id}`);
  }
}

</script>
