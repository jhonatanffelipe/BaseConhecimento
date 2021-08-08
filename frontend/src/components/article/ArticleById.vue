<template>
  <div class="article-by-id">
    <PageTitle
      icon="fa fa-file"
      :main="article.name"
      :sub="article.description"
    />
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "@/global";
import PageTitle from "../template/PageTitle.vue";
export default {
  name: "ArticleById",
  components: { PageTitle },
  data: function () {
    return {
      article: {},
    };
  },
  mounted() {
    const url = `${baseUrl}/articles/${this.$route.params.id}`;
    axios.get(url).then((response) => (this.article = response.data));
  },
};
</script>

<style>
.article-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
}

.article-content pre {
  border-radius: 8px;
  padding: 20px;
  font-size: 1.2rem;
  background: linear-gradient(to right, #232526, #414345);
  color: #fff;
}

.article-content img {
  max-width: 100%;
}

.article-content :lest-child {
  margin-bottom: 0px;
}
</style>