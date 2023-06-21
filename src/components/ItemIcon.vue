<template>
    <ion-icon v-if="iconId == 0" aria-hidden="true" size="large" :icon="pricetagOutline"></ion-icon>
    <ion-icon v-else-if="iconId == 1" aria-hidden="true" size="large" :icon="bookOutline"></ion-icon>
    <ion-icon v-else-if="iconId == 2" aria-hidden="true" size="large" :icon="baseballOutline"></ion-icon>
    <ion-icon v-else-if="iconId == 3" aria-hidden="true" size="large" :icon="businessOutline"></ion-icon>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { baseballOutline, bookOutline, businessOutline, pricetagOutline } from 'ionicons/icons';
import { toRef } from 'vue';


const props = defineProps(['iconId'])
const iconId = toRef(props, "iconId");
</script>


<style scoped>
ion-icon {
    width: 100%;
    height: 100%;
    background-color: lightgrey;
}
</style>
