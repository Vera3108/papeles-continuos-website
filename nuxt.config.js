export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'papeles-continuos',
    htmlAttrs: {
      lang: 'es',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
      { src: 'lib/netlify.js' },
    ],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: [],
  modules: ['@nuxtjs/axios'],
  build: {},
  env: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:3000'
        : // ? 'https://papelescontinuos.info'
          'http://localhost:3000',
  },
}
