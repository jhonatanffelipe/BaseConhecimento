<template>
  <div class="articles-by-category">
    <PageTitle icon="fa fa-folder" :main="category.name" sub="Categoria" />

    <ul>
      <li v-for="article in articles" :key="article.id">
        <ArticleItem :article="article" />
      </li>
    </ul>
    <div class="load-more">
      <button
        v-if="loadMore === true"
        class="btn btn-lg btn-primary"
        @click="getArticles"
      >
        Carregar Mais Artigos
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "@/global";
import PageTitle from "@/components/template/PageTitle";
import ArticleItem from "./ArticleItem";

export default {
  name: "ArticlesByCategory",
  components: { PageTitle, ArticleItem },
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
    getArticles() {
      const url = `${baseUrl}/categories/${this.category.id}/articles?page=${this.page}`;
      axios(url).then((response) => {
        this.articles = this.articles.concat(response.data);
        this.page++;

        if (response.data.length === 0) {
          this.loadMore = false;
        }
      });
    },
  },
  watch: {
    $route(to) {
      this.category.id = to.params.id;
      this.articles = [];
      this.page = 1;
      this.loadMore = true;
      this.getCategory();
      this.getArticles();
    },
  },
  mounted() {
    this.category.id = this.$route.params.id;
    this.getCategory();
    this.getArticles();
  },
};
</script>

<style>
.articles-by-category ul {
  list-style-type: none;
  padding: 0;
}

.articles-by-category .load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}
</style>