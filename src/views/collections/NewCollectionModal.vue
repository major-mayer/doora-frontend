<template>
    <ion-modal ref="modal" trigger="open-collection-modal" @willDismiss="onWillDismiss">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="cancel()">Cancel</ion-button>
                </ion-buttons>
                <ion-title slot="">Add Collection</ion-title>
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
            <ion-item>
                <ion-checkbox v-model="alwaysRequired">Always required</ion-checkbox>
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
    useIonRouter,
    IonCheckbox
} from '@ionic/vue';
import { ref } from 'vue';

const store = useDooraStore();
const ionRouter = useIonRouter();

const name = ref("");
const description = ref("");
const alwaysRequired = ref(false);

// This is a reference directly to the modal DOM element
const modal = ref<HTMLIonModalElement | null>(null);

const cancel = () => {
    modal.value?.$el.dismiss(null, 'cancel');
};
const confirm = () => {
    modal.value?.$el.dismiss({
        name: name.value,
        description: description.value,
        alwaysRequired: alwaysRequired.value
    }, 'confirm');

    name.value = "";
    description.value = "";
    alwaysRequired.value = false;
};
const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
        const { name, description, alwaysRequired } = ev.detail.data;
        const id = store.addCollection(name, description, [], alwaysRequired)
        ionRouter.push(`/tabs/collections/${id}`);
    }
}
</script>