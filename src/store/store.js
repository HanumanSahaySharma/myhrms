import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase';
import router from './../router';

// Regiser Plugins
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    authUser: null,
    isLoading: false,
    progressValue: 0,
    uploadingStart: false,
    uploadEnd: false,
    loginUser: {
      email: '',
      password: '',
    },
    registerUser: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
    newEmployee: {
      image: null,
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      profile: null,
      gender: null,
      address: '',
      optionProfile: ['Frontend Developer', 'ROR Developer', 'DevOps Engineer', 'Product Manager', 'Data Scientist'],
      optionGender: ['Male', 'Female']
    }
  },
  getters: {
    
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setAuthUser(state, payload) {
      state.authUser = payload;
    },
    setLoginEmail(state, payload) {
      state.loginUser.email = payload;
    },
    setLoginPassword(state, payload) {
      state.loginUser.password = payload;
    },
    setRegisterName(state, payload) {
      state.registerUser.name = payload;
    },
    setRegisterEmail(state, payload) {
      state.registerUser.email = payload;
    },
    setRegisterPhone(state, payload) {
      state.registerUser.phone = payload;
    },
    setRegisterPassword(state, payload) {
      state.registerUser.password = payload;
    },
    resetStates(state) {
      state.loginUser.email = '';
      state.loginUser.password = '';
      state.registerUser.name = '';
      state.registerUser.email = '';
      state.registerUser.phone = '';
      state.registerUser.password = '';
      state.newEmployee.name = '';
      state.newEmployee.email = '';
      state.newEmployee.phone = '';
      state.newEmployee.dateOfBirth = '';
      state.newEmployee.profile = null;
      state.newEmployee.gender = null;
      state.newEmployee.address = '';
    },
    // New Employee
    setUploadingStart(state, payload) {
      state.uploadingStart = payload;
    },
    setProgressValue(state, payload) {
      state.progressValue = payload;
    },
    setUploadEnd(state, payload) {
      state.uploadEnd = payload;
    },
    setNewEmployeeImage(state, payload) {
      state.newEmployee.image = payload;
    },
    setNewEmployeeName(state, payload) {
      state.newEmployee.name = payload;
    },
    setNewEmployeeEmail(state, payload) {
      state.newEmployee.email = payload;
    },
    setNewEmployeePhone(state, payload) {
      state.newEmployee.phone = payload;
    },
    setNewEmployeeDOB(state, payload) {
      state.newEmployee.dateOfBirth = payload;
    },
    setNewEmployeeProfile(state, payload) {
      state.newEmployee.profile = payload;
    },
    setNewEmployeeGender(state, payload) {
      state.newEmployee.gender = payload;
    },
    setNewEmployeeAddress(state, payload) {
      state.newEmployee.address = payload;
    }
  },
  actions: {
    //User Logout
    USER_LOGOUT({commit}) {
      Firebase.auth().signOut()
      .then(() => {
        commit('setAuthUser', null);
        router.push({path: '/login'});
      });
    }
  }
});
