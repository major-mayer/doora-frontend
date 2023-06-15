<template>
    <ion-modal ref="modal" trigger="open-item-modal" @willDismiss="onWillDismiss">
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
        <ion-content v-if="waitingForTagId === false" class="ion-padding">
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
    useIonRouter,
    loadingController
} from '@ionic/vue';
import { ref } from 'vue';
import { useDooraStore } from '@/stores/dooraStore'
import { OverlayEventDetail } from '@ionic/core';
import { ApiError, DooraApiClient } from '@/doora-api-client';

const store = useDooraStore();
const ionRouter = useIonRouter();

const name = ref("");
const description = ref("");
const waitingForTagId = ref(false);


// This is a reference directly to the modal DOM element
const modal = ref<HTMLIonModalElement | null>(null);

const cancel = () => {
    modal.value?.$el.dismiss(null, 'cancel');
};

let timer: number | undefined;
let loading;
const apiClient = new DooraApiClient();

const getNewTagId = async () => {
    const callme = async () => {
        //This promise will resolve when the network call succeeds
        //Feel free to make a REST fetch using promises and assign it to networkPromise
        var networkPromise = apiClient.unknownTagController.getNewTagId();


        //This promise will resolve when 2 seconds have passed
        var timeOutPromise = new Promise(function (resolve, reject) {
            // 2 Second delay
            timer = setTimeout(resolve, 2000, 'Timeout Done');
            return
        });

        try {
            const result = await Promise.all([networkPromise, timeOutPromise]);
            return result[0];    // This should be a string which contains the new TagId
        }
        catch (error) {
            if (error instanceof ApiError && error.status == 404) {
                console.log("Item not found, trying again in 1 sec.")
                await callme();
            }
            else {
                // Other error happend, re-throwing
                throw error;
            }
        }
    }
    return await callme();
}

const showWaitingForTagId = async () => {
    // Create the loading controller
    const loading = await loadingController.create({
        message: 'Please hold your items next to the RFID scanner',
        duration: 0,
        backdropDismiss: true,
    });

    // Stop the requests, when the loading overlay was dismissed
    loading.onWillDismiss().then(() => {
        if (timer != undefined)
            clearInterval(timer);
    });

    // Show the loading controller
    loading.present();

    try {
        // Try to get a new tagId for as long as the user doesn't dismiss the loading screen, 
        // or we get another error during the network request
        const tagId = await getNewTagId();
        return tagId;
    }
    catch (error) {
        console.log("Unknown error when waiting for a new Tag!", error);
        loading.dismiss();
        return null;
    }
};


const confirm = async () => {
    const result = await showWaitingForTagId();
    if (result == null)
        return;

    modal.value?.$el.dismiss({
        name: name.value,
        description: description.value,
        tagId: result
    }, 'confirm');

    name.value = "";
    description.value = "";
};
const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
        const { name, description, tagId } = ev.detail.data;

        // Enter waiting mode, user needs to hold item in front of scanner
        waitingForTagId.value = true;


        // Item found, add it to store/ database
        waitingForTagId.value = false;
        const id = store.addItem(name, description, tagId)
        ionRouter.push(`/tabs/items/${id}`);
    }
}
</script>