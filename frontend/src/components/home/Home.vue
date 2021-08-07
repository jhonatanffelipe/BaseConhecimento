<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de conhecimento" />
    <div class="stats">
      <Stat
        title="Categorias"
        :value="stat.categories"
        icon="fa fa-folder"
        color="#d54d58"
      />
      <Stat
        title="Artigos"
        :value="stat.articles"
        icon="fa fa-file"
        color="#3bc480"
      />
      <Stat
        title="Usuário"
        :value="stat.users"
        icon="fa fa-user"
        color="#3282cd"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "@/components/template/PageTitle";
import Stat from "./Stat.vue";
import { baseUrl } from "@/global";

export default {
  name: "Home",
  components: { PageTitle, Stat },
  data: function () {
    return {
      stat: {},
    };
  },
  methods: {
    getStats() {
      axios
        .get(`${baseUrl}/stat`)
        .then((response) => (this.stat = response.data));
    },
  },
  mounted() {
    this.getStats();
  },
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>