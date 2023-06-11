<template>
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
</template>

<script setup lang="ts">
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
import { useDooraStore } from '@/stores/dooraStore'

const store = useDooraStore();
const ionRouter = useIonRouter();

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