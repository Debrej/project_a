import Vue from 'vue';
import VueRouter from 'vue-router';

//region IMPORTING COMPONENTS

import Home from '../components/Home';

import Event_Create from '../components/create/Event';
import Equipment_Create from '../components/create/Equipment';
import Activity_Create from '../components/create/Activity';
import Task_Create from '../components/create/Task';
import Location_Create from '../components/create/Location';

import Event_Show from '../components/show/Event';
import Location_Show from '../components/show/Location';
import Equipment_Show from '../components/show/Equipment';
import Activity_Show from '../components/show/Activity';
import Task_Show from '../components/show/Task';
import User_Show from '../components/show/User';
import Admin_Show from '../components/show/Admin';

import Event_Detail from '../components/detail/Event';
import Location_Detail from '../components/detail/Location';
import Equipment_Detail from '../components/detail/Equipment';
import Event_Edit from '../components/edit/Event';
import Location_Edit from '../components/edit/Location';
import Equipment_Edit from '../components/edit/Equipment';

import NotFound from '@/components/404';

//endregion

Vue.use(VueRouter);

const routes = [
  {path: '/', component: Home},
  {path: '/create/event', component: Event_Create},
  {path: '/create/equipment', component: Equipment_Create},
  {path: '/create/activity', component: Activity_Create},
  {path: '/create/task', component: Task_Create},
  {path: '/create/location', component: Location_Create},

  {path: '/show/events', component: Event_Show},
  {path: '/show/locations', component: Location_Show},
  {path: '/show/equipments', component: Equipment_Show},
  {path: '/show/activities', component: Activity_Show},
  {path: '/show/tasks', component: Task_Show},
  {path: '/show/users', component: User_Show},
  {path: '/show/admin', component: Admin_Show},

  {path: '/show/event/:id', component: Event_Detail},
  {path: '/show/location/:id', component: Location_Detail},
  {path: '/show/equipment/:id', component: Equipment_Detail},

  {path: '/edit/event/:id', component: Event_Edit},
  {path: '/edit/location/:id', component: Location_Edit},
  {path: '/edit/equipment/:id', component: Equipment_Edit},

  {path: '/404', component: NotFound},
  {path: '*', redirect: '/404'}
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
});

export default router;