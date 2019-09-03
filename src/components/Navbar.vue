<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li>
        <router-link :to="{ name: 'Employees' }" exact>
          <span class="icon-holder"><i class="fa fa-users"></i></span>
          <span class="nav-text">Employees</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Teachers' }">
          <span class="icon-holder"><i class="fa fa-users"></i></span>
          <span class="nav-text">Teachers</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Leaves' }">
          <span class="icon-holder"><i class="fa fa-bullhorn"></i></span>
          <span class="nav-text">Leaves</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Attendance' }">
          <span class="icon-holder"><i class="fa fa-check-square"></i></span>
          <span class="nav-text">Attendance</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Reports' }">
          <span class="icon-holder"><i class="fa fa-file"></i></span>
          <span class="nav-text">Reports</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
