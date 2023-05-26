// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-icon"],
  css: ["assets/main.css"],
  app: {
    head: {
      title: "Qhawekazi African Pots",
      meta: [{ name: "Qhawekzai African Pots menu", content: "All the food" }],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        },
      ],
    },
  },
  buildModules: ["@nuxtjs/google-fonts"],
} as any);
