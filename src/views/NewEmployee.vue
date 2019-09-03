<template>
<div>
  <div class="title-bar mb-2">
    <b-row>
      <b-col md="6">
        <h2>New Employee</h2>
      </b-col>
      <b-col md="6">
        <b-button variant="primary" class="ml-auto" @click="goToEmployees">
          <i class="fa fa-angle-left"></i> Back
        </b-button>
      </b-col>
    </b-row>
  </div>
  <b-card>
    <b-row>
      <b-col md="6" offset-md="3">
        <form @submit.prevent="newEmployee">
          <b-form-group label="Profile Image" label-for="profile image">
            <input type="file" name="profile image" class="d-none" @change="uploadImage" ref="fileInput" v-validate="'required|image'" accept="image/.png,.jpg" />
            <div class="image-preview overflow-hidden mb-3 d-flex" v-if="this.$store.state.newEmployee.image">
              <img :src="this.$store.state.newEmployee.image" class="img-fluid" />
            </div>
            <vm-progress
              type="circle"
              strokeColor="#007bff"
              :width="100"
              stroke-width="6"
              class="d-table mb-3"
              v-if="this.$store.state.uploadingStart && !this.$store.state.uploadEnd"
              :percentage="this.$store.state.progressValue">
            </vm-progress>
            <b-button variant="outline-primary mb-1" @click="$refs.fileInput.click()">Upload Here</b-button>
            <div v-if="vError.has('profile image')" class="text-danger">
              {{ vError.first('profile image') }}
            </div>
          </b-form-group>
          <b-form-group label="Name" label-for="name">
            <b-form-input name="name" type="text" v-model="name" v-validate="'required'" :class="{'border-danger': vError.has('name')}">
            </b-form-input>
            <div v-if="vError.has('name')" class="text-danger">
              {{ vError.first('name') }}
            </div>
          </b-form-group>
          <b-form-group label="Email" label-for="email">
            <b-form-input name="email" type="text" v-model="email" v-validate="'required|email'" :class="{'border-danger': vError.has('email')}">
            </b-form-input>
            <div v-if="vError.has('email')" class="text-danger">
              {{ vError.first('email') }}
            </div>
          </b-form-group>
          <b-form-group label="Phone" label-for="phone">
            <b-form-input name="phone" type="number" v-model="phone" v-validate="'required|min:10|max:10'" :class="{'border-danger' : vError.has('phone')}">
            </b-form-input>
            <div v-if="vError.has('phone')" class="text-danger">
              {{ vError.first('phone') }}
            </div>
          </b-form-group>
          <b-form-group label="Date of Birth" label-for="dateOfBirth">
            <b-form-input name="date of birth" type="date" v-model="dateOfBirth" v-validate="'required'" placeholder="DD/MM/YYYY" :class="{'border-danger': vError.has('date of birth')}">
            </b-form-input>
            <div v-if="vError.has('date of birth')" class="text-danger">
              {{ vError.first('date of birth') }}
            </div>
          </b-form-group>
          <b-form-group label="Profile" label-for="profile">
            <b-form-select name="profile" v-model="profile" :options="this.$store.state.newEmployee.optionProfile" v-validate="'required'" :class="{'border-danger' : vError.has('profile')}">
              <template slot="first">
                <option :value="null">Choose Your Profile</option>
              </template>
            </b-form-select>
            <div v-if="vError.has('profile')" class="text-danger">
              {{ vError.first('profile') }}
            </div>
          </b-form-group>
          <b-form-group label="Gender" label-for="gender">
            <b-form-radio-group name="gender" :value="gender" v-model="gender" :options="this.$store.state.newEmployee.optionGender" v-validate="'required'">
            </b-form-radio-group>
            <div v-if="vError.has('gender')" class="text-danger">
              {{ vError.first('gender') }}
            </div>
          </b-form-group>
          <b-form-group label="Address" label-for="address">
            <b-form-textarea name="address" type="text" v-model="address" v-validate="'required'" :class="{'border-danger': vError.has('address')}">
            </b-form-textarea>
            <div v-if="vError.has('address')" class="text-danger">
              {{ vError.first('address') }}
            </div>
          </b-form-group>
          <b-button type="submit" variant="primary" :disabled="this.$store.state.isLoading">
            <i class="fa fa-spin fa-spinner" v-if="this.$store.state.isLoading"></i>
            {{ this.$store.state.isLoading ? '' : 'Submit' }}
          </b-button>
        </form>
      </b-col>
    </b-row>
  </b-card>
</div>
</template>

<script>
import Firebase from 'firebase';
import { db } from './../firebase/config';
export default {
  computed: {
    name:  {
      get() {
        return this.$store.state.newEmployee.name
      },
      set(newValue) {
        this.$store.commit('setNewEmployeeName', newValue)
      }
    },
    email:  {
      get() {
        return this.$store.state.newEmployee.email
      },
      set(newValue) {
        this.$store.commit('setNewEmployeeEmail', newValue)
      }
    },
    phone:  {
      get() {
        return this.$store.state.newEmployee.phone
      },
      set(newValue) {
        this.$store.commit('setNewEmployeePhone', newValue)
      }
    },
    dateOfBirth:  {
      get() {
        return this.$store.state.newEmployee.dateOfBirth
      },
      set(newValue) {
        this.$store.commit('setNewEmployeeDOB', newValue)
      }
    },
    profile:  {
      get() {
        return this.$store.state.newEmployee.profile
      },
      set(newValue) {
        this.$store.commit('setNewEmployeeProfile', newValue)
      }
    },
    gender:  {
      get() {
        return this.$store.state.newEmployee.gender
      },
      set(newValue) {
        this.$store.commit('setNewEmployeeGender', newValue)
      }
    },
    address:  {
      get() {
        return this.$store.state.newEmployee.address
      },
      set(newValue) {
        this.$store.commit('setNewEmployeeAddress', newValue)
      }
    }
  },
  methods: {
    // Method: Go to Employees Page
    goToEmployees() {
      this.$router.push('/employees');
    },
    // Method: Upload Profile Image
    uploadImage(e) {
      let fileImage = e.target.files[0];
      var storageRef = Firebase.storage().ref('employees/' + fileImage.name);
      let uploadTask = storageRef.put(fileImage);
      uploadTask.on('state_changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.$store.commit('setUploadingStart', true);
        this.$store.commit('setProgressValue', progress);
      }, (error) => {
        this.$noty.error(error.message);
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.$store.commit('setNewEmployeeImage', downloadURL);
          this.$store.commit('setUploadingStart', false);
          this.$store.commit('setUploadEnd', true);
        }, (error) => {
          this.$noty.error(error.message);
        });
      });
    },

    // Method: Add New Employee
    newEmployee() {
      this.$store.commit('setLoading', true);
      this.$validator.validateAll().then((response) => {
        this.$store.commit('setLoading', false);
        if(response) {
          this.$store.commit('setLoading', true);
          db.ref('employees').push({
            image: this.$store.state.newEmployee.image,
            name: this.name,
            email: this.email,
            phone: this.phone,
            dob: this.dateOfBirth,
            profile: this.profile,
            gender: this.gender,
            address: this.address
          });
          this.$store.commit('setLoading', false);
          this.$store.commit('resetStates');
          this.$noty.success("New employee successfully added!");
          this.$router.push('/employees');
        }
      });
    }
  }
}
</script>
<style scope lang="scss">
  .image-preview { border-radius: 100%; max-width: 100px; height: 100px; min-height: 100px; border: 1px solid #ddd; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
</style>
