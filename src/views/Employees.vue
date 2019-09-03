<template>
  <div>
    <div class="title-bar mb-2">
      <div class="row">
        <div class="col-md-6">
          <h2>Employees</h2>
        </div>
        <div class="col-md-6">
          <b-button variant="primary" class="ml-auto" @click="NewEmployee">
            <i class="fa fa-plus"></i> New Employee
          </b-button>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <table class="table table-bordered mb-0" v-if="employees">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>Profile</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
          <tr v-for="(employee, index) in employees" :key="index">
            <td>
              <div class="d-flex align-items-center">
                <img :src="employee.image" width="35" height="35" class="img-circle rounded-circle mr-3"/>
                <span>{{employee.name}}</span>
              </div>
            </td>
            <td>{{employee.email}}</td>
            <td>{{employee.phone}}</td>
            <td>{{date_format(employee.dob)}}</td>
            <td>{{employee.profile}}</td>
            <td>{{employee.gender}}</td>
            <td>{{employee.address}}</td>
            <td>
              <div class="btns-group">
                <b-button variant="secondary" size="sm" class="btn-action" @click="handleEdit(index)">
                  <i class="fa fa-edit"></i>
                </b-button>
                <b-button variant="secondary" size="sm" class="btn-action" @click="deleteEmployee(index)">
                  <i class="fa fa-trash"></i>
                </b-button>
              </div>
            </td>
          </tr>
          <app-edit-employee
            v-if="showModal"
            :show.sync="showModal"
            :data="modalData">
          </app-edit-employee>
        </table>
        <b-alert show variant="primary" v-else class="mb-0">
          There are no employees available right now! please add here before.
          <router-link :to="{ name: 'NewEmployee'}" class="btn btn-primary">Add here</router-link>
        </b-alert>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment';
import Axios from 'axios';
import EditEmployee from '@/components/modals/EditEmployee';
import { db } from './../firebase/config';
export default {
  mounted() {
    return this.getAllEmployees();
  },
  components: {
    appEditEmployee: EditEmployee
  },
  data() {
    return {
      employees: [],
      modalData: {},
      showModal: false
    }
  },
  methods: {
    NewEmployee() {
      this.$router.push('/new-employee');
    },
    getAllEmployees() {
      Axios.get(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/employees.json`)
      .then(response => {
        this.employees = response.data;
      })
    },
    date_format(date) {
      return Moment(date).format('DD/MM/YYYY');
    },
    handleEdit(index) {
      let emData = this.employees[index];
      emData.id = index;
      this.modalData = emData;
      this.showModal = true;
    },
    deleteEmployee(index) {
      db.ref('employees').child(index).remove();
      setInterval(() => {
        this.getAllEmployees();
      }, 100)
    }
  }
}
</script>
