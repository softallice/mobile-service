import Vue from "vue";
import Vuex from "vuex";
import { FeathersVuex } from "../boot/feathersClient";
import authvuex from "./store.auth";

import account from "./account";
import admin from "./admin";
import theme from './store-theme'
import messages from '../services/messages/messages'

const requireModule = require.context(
  // The path where the service modules live
  "../services/feathers-client",
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports`)
  /.js$/
);

const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default);

Vue.use(Vuex);
Vue.use(FeathersVuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    plugins: [...servicePlugins, authvuex, messages],
    modules: {
      account,
      admin,
      theme
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
