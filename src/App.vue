<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useBackButton, useIonRouter } from '@ionic/vue';
import { App } from '@capacitor/app';

// Closes the app when the back button is pressed and no page remains in the stack
const ionRouter = useIonRouter();
useBackButton(-1, () => {
  if (!ionRouter.canGoBack()) {
    App.exitApp();
  }
});
</script>
