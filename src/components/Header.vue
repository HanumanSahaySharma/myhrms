<template>
  <header class="header" v-if="authUser">
    <div class="row">
      <div class="col ml-auto">
        <p class="title">HRMS</p>
      </div>
      <div class="col">
        <!-- <div class="d-flex justify-content-center align-items-center mr-auto">
          <div class="header-search-bar ml-auto">
            <input type="text" class="form-control" placeholder="Search">
            <i class="fa fa-search search-icon"></i>
          </div>
          <div class="header-notifications">
            <ul class="list-unstyled">
              <li class="d-flex justify-content-center align-items-center">
                <i class="fa fa-envelope"></i>
              </li>
              <li class="d-flex justify-content-center align-items-center">
                <i class="fa fa-bell"></i>
              </li>
            </ul>
          </div>
        </div> -->
        <div class="user-profile">
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown>
              <template slot="button-content">
                <img src="https://www.digitaliser.dk/static/img/placeholder/placeholder_profile_photo.png" />
                <div class="user-info">
                  <p>{{this.$store.state.authUser}}<span>Admin</span></p>
                </div>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#" @click="logoutUser">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  computed: {
    authUser() {
      return this.$store.state.authUser
    }
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('USER_LOGOUT')
    }
  }
}
</script>
