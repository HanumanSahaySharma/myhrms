import Vue from 'vue';
import Firebase from 'firebase';
import { firestorePlugin } from 'vuefire';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import VueNoty from 'vuejs-noty';
import App from './App.vue';
import router from './router';
import { store } from './store/store';

// ProgressBar
import Progress from 'vue-multiple-progress';
Vue.component('VmProgress', Progress);

//Import Firebase Configuration
Vue.use(firestorePlugin);
import './firebase/config';

//Import BootstrapVue
Vue.use(BootstrapVue);

//Import VueNotify
Vue.use(VueNoty, {
  timeout: 1000,
  progressBar: true,
});
import 'vuejs-noty/dist/vuejs-noty.css';

//Import VeeValidate
Vue.use(VeeValidate, {
  errorBagName: 'vError'
});

Vue.config.productionTip = false;

//Initliaze Vue App Instance
// let app;
// Firebase.auth().onAuthStateChanged(() => {
//   if(!app) {
//     app = new Vue({
//       router,
//       store,
//       render: h => h(App),
//     }).$mount('#app');
//   }
// });

let app;
Firebase.auth().onAuthStateChanged(async user => {
  if(!app) {
    if(user) {
      await store.commit('setAuthUser', user.email);
    } else {
      await store.commit('setAuthUser', null);
    }
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
