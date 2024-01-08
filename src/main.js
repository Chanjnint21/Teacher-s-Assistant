/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

//components
import TextField from '@/components/TextField.vue';
import BtnComp from '@/components/BtnComp.vue';
import DiaComp from '@/components/DiaComp';

const app = createApp(App)
app.component('TextField', TextField)
app.component('BtnComp', BtnComp)
app.component('DiaComp', DiaComp)

registerPlugins(app)

app.mount('#app')
