import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '../views/AboutView.vue';
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import DashboardHome from '../views/DashboardHome.vue'
import Posts from '../views/Posts/Index.vue'
import Users from '../views/Users/Index.vue'
import StudentsCreate from '../views/Students/Create.vue'
import StudentsIndex from '../views/Students/Index.vue'

// Example: `icon` can be string key for lucide icon name
const routes = [
    {
        path: '/',
        name: 'Home',
        component: DashboardHome,
        meta: {
            showInSidebar: true,
            label: 'Home',
            icon: 'Home'
        }
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
        component: Posts,
        meta: {
            showInSidebar: true,
            label: 'Posts',
            icon: 'FileText'
        }
    },
    {
        path: '/users/create',
        name: 'CreateUser',
        component: Users,
        meta: {
            showInSidebar: true,
            label: 'Create Users',
            icon: 'UserPlus',
            parent: 'Users'
        }
    },
    {
        path: '/users/all',
        name: 'Users',
        component: Users,
        meta: {
            showInSidebar: true,
            label: 'Users Listing',
            icon: 'Users',
            parent: 'Users'
        }
    },
    {
        path: '/students/all',
        name: 'StudentsAll',
        component: StudentsIndex,
        meta: {
            showInSidebar: true,
            label: 'Students Listing',
            icon: 'GraduationCap',
            parent: 'Students'
        }
    },
    {
        path: '/students/add',
        name: 'Students',
        component: StudentsCreate,
        meta: {
            showInSidebar: true,
            label: 'Add Student',
            icon: 'UserPlus',
            parent: 'Students'
        }
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
