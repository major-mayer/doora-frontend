import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.doora.app',
  appName: 'Doora',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
