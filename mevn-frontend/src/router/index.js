import { createRouter, createWebHistory } from 'vue-router';
import StudentRegistration from '../views/Students/Create.vue';
import AboutView from '../views/AboutView.vue';
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import DashboardHome from '../views/DashboardHome.vue'
import Posts from '../views/Posts/Index.vue'
import Users from '../views/Users/Index.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: DashboardHome
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router;
