<template>
  <div class="my-5">
    <b-col md="6" offset-md="3">
      <b-card>
        <h2 class="mb-4">Register</h2>
        <form @submit.prevent="registerNewUser">
          <b-form-group label="Name" label-for="name">
            <b-form-input
              type="text"
              name="name"
              v-model="name"
              v-validate="'required'"
              :class="{'border-danger' : vError.has('name')}">
            </b-form-input>
            <span v-if="vError.has('name')" class="text-danger">
              {{vError.first('name')}}
            </span>
          </b-form-group>
          <b-form-group label="Email Address" label-for="email">
            <b-form-input
              type="email"
              name="email"
              v-model="email"
              v-validate="'required|email'"
              :class="{'border-danger' : vError.has('email')}">
            </b-form-input>
            <span v-if="vError.has('email')" class="text-danger">
              {{vError.first('email')}}
            </span>
          </b-form-group>
          <b-form-group label="Phone" label-for="phone">
            <b-form-input
              type="number"
              name="phone"
              v-model="phone"
              v-validate="'required|min:10|max:10'"
              :class="{'border-danger' : vError.has('phone')}">
            </b-form-input>
            <span v-if="vError.has('phone')" class="text-danger">
              {{vError.first('phone')}}
            </span>
          </b-form-group>
          <b-form-group label="Password" label-for="password">
            <b-form-input
              type="password"
              name="password"
              v-model="password"
              v-validate="'required|min:6|max:20'"
              :class="{'border-danger' : vError.has('password')}">
            </b-form-input>
            <span v-if="vError.has('password')" class="text-danger">
              {{vError.first('password')}}
            </span>
          </b-form-group>
          <b-button type="submit" variant="primary" class="mb-3" :disabled="this.$store.state.isLoading">
            <i class="fa fa-spin fa-spinner" v-if="this.$store.state.isLoading"></i>
            <span v-else>{{ this.$store.state.isLoading ? '' : 'Register'}}</span>
          </b-button>
        </form>
        <p class="mb-0">If you already registered? <router-link :to="{ name: 'Login'}">Login</router-link></p>
      </b-card>
    </b-col>
  </div>
</template>
<script>
import Firebase from 'firebase';
export default {
  computed: {
    name: {
      get() {
        return this.$store.state.registerUser.name
      },
      set(newValue) {
        this.$store.commit('setRegisterName', newValue);
      }
    },
    email: {
      get() {
        return this.$store.state.registerUser.email
      },
      set(newValue) {
        this.$store.commit('setRegisterEmail', newValue);
      }
    },
    phone: {
      get() {
        return this.$store.state.registerUser.phone
      },
      set(newValue) {
        this.$store.commit('setRegisterPhone', newValue)
      }
    },
    password: {
      get() {
        return this.$store.state.registerUser.password
      },
      set(newValue) {
        return this.$store.commit('setRegisterPassword', newValue)
      }
    }
  },
  methods: {
    registerNewUser() {
      this.$store.commit('setLoading', true);
      this.$validator.validateAll().then((response) => {
        this.$store.commit('setLoading', false);
        if(response) {
          this.$store.commit('setLoading', true);
          Firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$store.commit('setLoading', false);
            this.$store.commit('resetStates');
            this.$store.commit('setAuthUser', null);
            this.$noty.success("You have successfully registered!");
            this.$router.push('/login');
          }).catch(err => {
            this.$noty.error(err.message);
            this.$store.commit('setLoading', false);
          });
        }
      });
    }
  }
}
</script>
