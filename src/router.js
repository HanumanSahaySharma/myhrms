import Vue from 'vue';
import Firebase from 'firebase';
import VueRouter from 'vue-router';
import Login from './views/Login';
import Register from './views/Register';
import Employees from './views/Employees.vue';
import NewEmployee from './views/NewEmployee.vue';
import Teachers from './views/Teachers.vue';
import Leaves from './views/Leaves.vue';
import Attendance from './views/Attendance.vue';
import Reports from './views/Reports.vue';

Vue.use(VueRouter);

const router =  new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  linkActiveClass: 'active',
  routes: [
    { path: '/', redirect: '/employees', meta: { requiresAuth: true } },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/employees', name: 'Employees', component: Employees, meta: { requiresAuth: true } },
    { path: '/new-employee', name: 'NewEmployee', component: NewEmployee, meta: { requiresAuth: true } },
    { path: '/teachers', name: 'Teachers', component: Teachers, meta: { requiresAuth: true } },
    { path: '/leaves', name: 'Leaves', component: Leaves, meta: { requiresAuth: true } },
    { path: '/attendance', name: 'Attendance', component: Attendance, meta: { requiresAuth: true } },
    { path: '/reports', name: 'Reports', component: Reports, meta: { requiresAuth: true } }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = Firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('/login');
  else if (!requiresAuth && currentUser) next('/employees');
  else next();
});

export default router;
