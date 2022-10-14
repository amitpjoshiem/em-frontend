import Login from '@/layouts/Login.vue'

export const loginRoute = {
  path: '/login',
  name: 'login',
  component: Login,
  meta: { publicRoute: true },
  children: [
    {
      path: '',
      name: 'loginform',
      component: () => import(/* webpackChunkName: "Login" */ '../../components/Login/LoginForm.vue'),
    },
    {
      path: 'forgot',
      name: 'forgotpassword',
      component: () => import(/* webpackChunkName: "Login" */ '../../components/Login/ForgotPassword.vue'),
    },
    {
      path: 'password-reset',
      name: 'passwordreset',
      component: () => import(/* webpackChunkName: "Login" */ '../../components/Login/ResetPassword.vue'),
      props: { context: 'reset' },
    },
    {
      path: 'password-create',
      name: 'passwordcreate',
      component: () => import(/* webpackChunkName: "Login" */ '../../components/Login/ResetPassword.vue'),
      props: { context: 'create' },
    },
    {
      path: 'otp',
      name: 'otp',
      component: () => import(/* webpackChunkName: "Login" */ '../../components/Login/OtpForm.vue'),
    },
  ],
}
