<template>
    <ion-modal ref="modal" trigger="open-collection-modal" @willDismiss="onWillDismiss">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="cancel()">Cancel</ion-button>
                </ion-buttons>
                <ion-title>Add Collection</ion-title>
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
</template>

<script setup lang="ts">
import { useDooraStore } from '@/stores/dooraStore';
import { OverlayEventDetail } from '@ionic/core';
import {
    IonTitle,
    IonToolbar,
    IonHeader,
    IonItem,
    IonContent,
    IonModal,
    IonButtons,
    IonInput,
    IonButton,
    useIonRouter
} from '@ionic/vue';
import { ref } from 'vue';

const store = useDooraStore();
const ionRouter = useIonRouter();

const name = ref("");

// This is a reference directly to the modal DOM element
const modal = ref<HTMLIonModalElement | null>(null);

const cancel = () => {
    modal.value?.$el.dismiss(null, 'cancel');
};
const confirm = () => {
    modal.value?.$el.dismiss({
        name: name.value,
    }, 'confirm');

    name.value = "";
};
const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
        const { name } = ev.detail.data;
        const id = store.items.length;
        store.addCollection(id, name, [])
        ionRouter.push(`/tabs/collections/${id}`);
    }
}
</script>