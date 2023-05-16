<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Collections</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <img :src="imageSrc" />
      <ion-button @click="takePhoto()">Take Photo</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonButton, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import { ref } from 'vue';
  import { Camera, CameraResultType } from '@capacitor/camera';

  const imageSrc = ref('');
  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    if (image.webPath === undefined) {
      console.error("No photo has been taken!")
      return;
    }
    imageSrc.value = image.webPath;
  };
  </script>
