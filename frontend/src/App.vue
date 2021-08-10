<template>
  <div id="app" :class="{ 'hide-menu': !isMenuVisible || !user }">
    <Header
      title="Cod3r - Base de Conhecimento"
      :hideToggle="!user"
      :hideUserDropdown="!user"
    />
    <Menu v-if="user" />
    <Loading v-if="validatingToken" />
    <Content v-else />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl, userkey } from "@/global";
import { mapState } from "vuex";

import Header from "@/components/template/Header.vue";
import Menu from "@/components/template/Menu.vue";
import Content from "@/components/template/Content.vue";
import Footer from "@/components/template/Footer.vue";
import Loading from "@/components/template/Loading.vue";

export default {
  name: "App",
  components: { Header, Menu, Content, Footer, Loading },
  computed: mapState(["isMenuVisible", "user"]),
  data: function () {
    return {
      validatingToken: true,
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userkey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" });
        return;
      }

      const response = await axios(`${baseUrl}/validateToken`, userData);

      if (response.data) {
        this.$store.commit("setUser", userData);
        this.$router.push({ name: "/" });
      } else {
        localStorage.removeItem(userkey);
        this.$router.push({ name: "auth" });
      }

      this.validateToken = false;
    },
  },
  created() {
    this.validateToken();
  },
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -webkit-osx-font-smoothing: grayscale;

  height: 100vh;

  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>
