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

            <ion-item v-for="item of store.items" :key="item.id">
                <ion-thumbnail slot="start">
                    <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                </ion-thumbnail>
                <ion-checkbox @ion-change="modifyItemIds($event, item.id)">{{ item.name }}</ion-checkbox>
            </ion-item>
            {{ itemIds }}
        </ion-content>
    </ion-modal>
</template>

<script setup lang="ts">
import { useDooraStore } from '@/stores/dooraStore';
import { CheckboxCustomEvent, OverlayEventDetail } from '@ionic/core';
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
    IonCheckbox,
    IonThumbnail
} from '@ionic/vue';
import { ref } from 'vue';

const store = useDooraStore();
const ionRouter = useIonRouter();

const name = ref("");
const description = ref("");
const alwaysRequired = ref(false);
const itemIds = ref<string[]>([]);

// This is a reference directly to the modal DOM element
const modal = ref<HTMLIonModalElement | null>(null);

const modifyItemIds = (value: CheckboxCustomEvent, id: string) => {
    if (value.detail.checked) {
        itemIds.value.push(id);
    } else {
        const index = itemIds.value.indexOf(id);
        if (index > -1) { // only splice array when item is found
            itemIds.value.splice(index, 1); // 2nd parameter means remove one item only
        } else {
            throw Error("Item ID does not exist in array!")
        }
    }
}

const cancel = () => {
    modal.value?.$el.dismiss(null, 'cancel');
};
const confirm = () => {
    modal.value?.$el.dismiss({
        name: name.value,
        description: description.value,
        itemIds: itemIds.value,
        alwaysRequired: alwaysRequired.value
    }, 'confirm');

    name.value = "";
    description.value = "";
    alwaysRequired.value = false;
};
const onWillDismiss = async (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
        const { name, description, itemIds, alwaysRequired } = ev.detail.data;
        await store.addCollection(name, description, itemIds, alwaysRequired)
        ionRouter.back();
    }
}
</script>