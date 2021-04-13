const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { 
        path: "/home", 
        icon: 'home', 
        name: "Home", 
        component: () => import("pages/service/Main.vue"), 
        meta: { requiresAuth: true }
      },
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard',
        component: () => import('pages/service/Dashboard.vue')
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("pages/signUp/Register.vue")
      },
      {
        path: "/consent",
        name: "Consent",
        component: () => import("pages/signUp/Consent.vue")
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("pages/login/Login.vue")
      },
      {
        path: "/verify",
        name: "Verify",
        component: () => import("pages/Verify.vue")
      },
      {
        path: "/account",
        name: "Account",
        icon: "account_box",
        component: () => import("pages/Account.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () => import("pages/ForgotPassword.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/reset-password",
        name: "ResetPassword",
        component: () => import("pages/ResetPassword.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/setting",
        name: "Setting",
        icon: "more_horiz",
        component: () => import("pages/setting/Setting.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/devicesetting",
        name: "DeviceSetting",
        icon: "more_horiz",
        component: () => import("pages/setting/DeviceSetting.vue"),
        meta: { requiresAuth: true }
      },
      {
        name: 'About',
        path: '/about',
        icon: 'help',
        component: () => import('pages/About.vue')
      },
    ]
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "AdminHome",
        icon: 'manage_accounts',
        component: () => import("pages/admin/Index.vue"),
        meta: { requiresAuth: true, requiresAdmin: true }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
