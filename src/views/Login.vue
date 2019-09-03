<template>
  <div class="my-5">
    <b-col md="6" offset-md="3">
      <b-card>
        <h2 class="mb-4">Login</h2>
        <form @submit.prevent="userLogin">
          <b-form-group label="Email Address" label-for="email address">
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
            <span v-else>{{ this.$store.state.isLoading ? '' : 'Login'}}</span>
          </b-button>
          <p class="mb-0">If you don’t have account? <router-link :to="{ name: 'Register'}">Register</router-link></p>
        </form>
      </b-card>
    </b-col>
  </div>
</template>
<script>
import Firebase from 'firebase';
export default {
  computed: {
    email: {
      get() {
        return this.$store.state.loginUser.email
      },
      set(newValue) {
        this.$store.commit('setLoginEmail', newValue)
      }
    },
    password: {
      get() {
        return this.$store.state.loginUser.password
      },
      set(newValue) {
        this.$store.commit('setLoginPassword', newValue)
      }
    }
  },
  methods: {
    userLogin() {
      this.$store.commit('setLoading', true);
      this.$validator.validateAll().then((response) => {
        this.$store.commit('setLoading', false);
        if(response) {
          this.$store.commit('setLoading', true);
          Firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((response) => {
            this.$store.commit('setAuthUser', response.user.email);
            this.$store.commit('setLoading', false);
            this.$store.commit('resetStates');
            this.$noty.success('You have successfully login!');
            this.$router.replace('/employees');
          }).catch(error => {
            this.$noty.error(error.message);
            this.$store.commit('setLoading', false);
          });
        }
      });
    }
  }
}
</script>
