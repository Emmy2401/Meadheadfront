import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import HospitalListView from '../views/HospitalListView.vue';
import AddHospitalView from '../views/AddHospitalView.vue';
import UpdateHospitalView from '../views/UpdateHospitalView.vue';
import ProfileView from '../views/ProfileView.vue'; 
import SearchHospitalsView from '../views/SearchHospitalsView.vue';



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  }, 
  { 
    path: '/hospitals', 
    name: 'hospitals', 
    component: HospitalListView 
  }, 
  { path: '/add-hospital', 
    name: 'addHospital', 
    component: AddHospitalView 

  }, 
  { path: '/update-hospital/:id', 
    name: 'updateHospital', 
    component: UpdateHospitalView, 
    props: true 

  }, 
  { 
    path: '/me', 
    name: 'profile', 
    component: ProfileView 

  }, 
  { 
    path: '/search-hospitals', 
    name: 'searchHospitals', 
    component: SearchHospitalsView 
  }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;