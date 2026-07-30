import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import loginView from '@/views/loginView.vue'
import LoginRedirect from '@/views/loginRedirectView.vue'
import RegisterView from '@/views/registerView.vue'
import HomeView from '@/views/homeView.vue'
import LivrosView from '@/views/livrosView.vue'
import AutoresView from '@/views/autoresView.vue'
import FormLivro from '@/views/formLivro.vue'
import FormAutor from '@/views/formAutor.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: loginView,
  },
  {
    path: '/authorized',
    name: 'redirecionamento',
    component: LoginRedirect,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/livros',
    name: 'livros',
    component: LivrosView,
  },
  {
    path: '/cadastro-livro',
    name: 'cadastro-livro',
    component: FormLivro,
  },
  {
    path: '/editar-livro/:id',
    name: 'editar-livro',
    component: FormLivro,
    props: true,
  },
  {
    path: '/cadastro-autor',
    name: 'cadastro-autor',
    component: FormAutor,
  },
  {
    path: '/editar-autor/:id',
    name: 'editar-autor',
    component: FormAutor,
    props: true,
  },
  {
    path: '/autores',
    name: 'autores',
    component: AutoresView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
