export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  ssr: false,

  router: {
    base: '/feedstock/'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'questionnaire',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    base: {
      href: 'router.base'
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vuesax/dist/vuesax.css',
    '~/assets/css/global.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vuesax',
    { src: '~/plugins/routerOptions.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  vuetify: {
    // Set Original font Size
    customVariables: ['~/assets/global.scss'],
    treeShake: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  generate: {
    dir: 'public'
  }
}
