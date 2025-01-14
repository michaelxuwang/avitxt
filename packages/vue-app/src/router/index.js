import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/list',
    name: 'ListCompetitions',
    component: () => import('../views/ListCompetitions.vue')
  },
  {
    path: '/create',
    name: 'CreateCompetition',
    component: () => import('../views/CreateCompetition.vue')
  },
  {
    path: '/edit/:address',
    name: 'EditCompetition',
    component: () => import('../views/EditCompetition.vue')
  },
  {
    path: '/view/:address',
    name: 'ViewCompetition',
    component: () => import('../views/ViewCompetition.vue')
  },
  {
    path: '/list-submissions/:address',
    name: 'ListSubmissions',
    component: () => import('../views/ListSubmissions.vue')
  },
  {
    path: '/submit/:address',
    name: 'CreateSubmission',
    component: () => import('../views/CreateSubmission.vue')
  },
  {
    path: '/view/:address/:submissionId',
    name: 'ViewSubmission',
    component: () => import('../views/ViewSubmission.vue')
  },
  {
    path: '/view-judge/:address',
    name: 'ViewJudge',
    component: () => import('../views/ViewJudge.vue')
  },
  {
    path: '/view-applicant/:address',
    name: 'ViewApplicant',
    component: () => import('../views/ViewApplicant.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
