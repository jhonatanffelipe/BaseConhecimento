<template>
  <div class="articles-by-category">
    <PageTitle icon="fa fa-folder" :main="category.name" sub="Categoria" />
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "@/global";
import PageTitle from "@/components/template/PageTitle";

export default {
  name: "ArticlesByCategory",
  components: { PageTitle },
  data: function () {
    return {
      category: {},
      articles: [],
      page: 1,
      loadMore: true,
    };
  },
  methods: {
    getCategory() {
      const url = `${baseUrl}/categories/${this.category.id}`;
      axios(url).then((response) => {
        this.category = response.data;
      });
    },
  },
  mounted() {
    this.category.id = this.$route.params.id;
    this.getCategory();
    console.log();
  },
};
</script>

<style>
</style>