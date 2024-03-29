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
        <ion-content class="ion-padding">
            <ion-item>
                <ion-input label="Name" labelPlacement="stacked" v-model="name" type="text"
                    placeholder="The name of your new item"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input label="Description" labelPlacement="stacked" v-model="description" type="text"
                    placeholder="A description for your new item"></ion-input>
            </ion-item>

            <ion-item button :detail="true">
                <ion-label id="open-picker">Pick Icon</ion-label>
            </ion-item>
            <ion-picker trigger="open-picker" :columns="pickerColumns" :buttons="pickerButtons"></ion-picker>
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
    loadingController,
    IonPicker,
    IonLabel
} from '@ionic/vue';
import { ref } from 'vue';
import { useDooraStore } from '@/stores/dooraStore'
import { OverlayEventDetail } from '@ionic/core';
import { OpenAPI } from '@/doora-api-client';

const store = useDooraStore();

const name = ref("");
const description = ref("");
const iconId = ref(0);


const pickerColumns = [
    {
        name: 'icons',
        options: [
            {
                text: 'General',
                value: '0',
            },
            {
                text: 'Study',
                value: '1',
            },
            {
                text: 'Sports',
                value: '2',
            },
            {
                text: 'Work',
                value: '3',
            },
        ],
    },
];

const pickerButtons = [
    {
        text: 'Cancel',
        role: 'cancel',
    },
    {
        text: 'Confirm',
        handler: (value) => {
            iconId.value = value.icons.value;
        },
    },
];

// This is a reference directly to the modal DOM element
const modal = ref<HTMLIonModalElement | null>(null);

const cancel = () => {
    modal.value?.$el.dismiss(null, 'cancel');
};

let timer: number | undefined;

const getNewTagId = async () => {
    const tryGetItem = async () => {
        // We need to wrap this in another promise, otherwise a bad response (like 404) would always immediately cancel the Promise.all()
        // This does not works, as it will always try to convert the text response to a json
        // const response = await UnknownTagControllerService.getNewTagId();

        // Instead we fetch manually
        // TODO include credentials if needed
        const response = await fetch(`${OpenAPI.BASE}/api/getNewTagID`, {
            "method": "GET",
            "mode": "cors"
        });
        if (response.status == 404) {
            console.log("Item not found, trying again in 1 sec.")
            // Return null when no new item is found
            return null;
        }
        else if (response.status == 200) {
            const tagId = await response.text();
            return tagId;
        } else {
            // Other error happend, re-throwing
            throw new Error("Unknown error while fetching for new Tag Ids");
        }
        return response;
    }

    const fetchEvery2Seconds = async () => {
        const requestPromise = tryGetItem();

        //This promise will resolve when 2 seconds have passed
        const timeOutPromise = new Promise(function (resolve, reject) {
            // 2 Second delay
            timer = setTimeout(resolve, 2000, 'Timeout Done');
            return
        });

        const result = await Promise.all([requestPromise, timeOutPromise]);
        if (result[0] == null) {
            return await fetchEvery2Seconds();
        }
        return result[0];    // This should be a string which contains the new TagId
    }
    return await fetchEvery2Seconds();
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
        loading.dismiss();
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
        tagId: result,
        iconId: iconId.value
    }, 'confirm');


};
const onWillDismiss = async (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
        const { name, description, tagId, iconId } = ev.detail.data;
        await store.addItem(name, description, tagId, iconId)
    }

    name.value = "";
    description.value = "";
    iconId.value = 0;
}
</script>