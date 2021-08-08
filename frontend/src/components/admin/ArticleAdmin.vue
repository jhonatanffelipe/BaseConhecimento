<template>
  <div class="article-admin">
    <b-form>
      <input id="article-id" type="hidden" v-model="article.id" />

      <b-form-group label="Nome:" lobel-for="article-name">
        <b-form-input
          id="article-name"
          type="text"
          v-model="article.name"
          required
          placeholder="Informe o Nome do Artigo"
          :readonly="mode === 'remove'"
        />
      </b-form-group>

      <b-form-group label="Descrição:" lobel-for="article-description">
        <b-form-input
          id="article-description"
          type="text"
          v-model="article.description"
          required
          placeholder="Informe o Descrição do Artigo"
          :readonly="mode === 'remove'"
        />
      </b-form-group>

      <b-form-group
        v-if="mode === 'save'"
        label="Imagem(URL):"
        lobel-for="article-imageUrl"
      >
        <b-form-input
          id="article-imageUrl"
          type="text"
          v-model="article.imageUrl"
          required
          placeholder="Informe a Url da Imagem"
          :readonly="mode === 'remove'"
        />
      </b-form-group>

      <b-form-group
        v-if="mode === 'save'"
        label="Categoria:"
        lobel-for="article-categoryId"
      >
        <b-form-select
          id="article-categoryId"
          :options="categories"
          v-model="article.categoryId"
        />
      </b-form-group>

      <b-form-group
        v-if="mode === 'save'"
        label="Autor:"
        lobel-for="article-userId"
      >
        <b-form-select
          id="article-userId"
          :options="users"
          v-model="article.userId"
        />
      </b-form-group>

      <b-form-group
        v-if="mode === 'save'"
        label="Conteúdo:"
        lobel-for="article-content"
      >
        <VueEditor
          v-model="article.content"
          placeholder="Informe o conteúdo..."
        />
      </b-form-group>

      <b-row class="mb-5">
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">
            Salvar
          </b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">
            Excluir
          </b-button>
          <b-button class="ml-2" @click="reset"> Cancelar </b-button>
        </b-col>
      </b-row>
    </b-form>

    <b-table hover stiped :items="articles" :fields="fields">
      <template v-slot:cell(actions)="data">
        <b-button
          variant="warning"
          @click="loadArticle(data.item)"
          class="mr-2"
        >
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
import { baseUrl, showError } from "@/global";
export default {
  name: "ArticleAdmin",
  components: { VueEditor },
  data: function () {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Artigo", sortable: true },
        { key: "despription", label: "Descrição", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadArticles() {
      const url = `${baseUrl}/articles`;
      axios.get(url).then((response) => {
        //this.articles = response.data;
        this.articles = response.data.data;
        this.count = response.data.count;
        this.limit = response.data.limit;
      });
    },
    reset() {
      this.mode = "save";
      this.article = {};
      this.loadArticles();
    },
    save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `${this.article.id}` : "";
      axios[method](`${baseUrl}/articles/${id}`, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.article.id;
      axios
        .delete(`${baseUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadArticle(article, mode = "save") {
      this.mode = mode;

      axios
        .get(`${baseUrl}/articles/${article.id}`)
        .then((response) => (this.article = response.data));
    },
    loadCategories() {
      const url = `${baseUrl}/categories`;
      axios.get(url).then((response) => {
        this.categories = response.data.map((category) => {
          return {
            value: category.id,
            text: category.path,
          };
        });
      });
    },
    loadUsers() {
      const url = `${baseUrl}/users`;
      axios.get(url).then((response) => {
        this.users = response.data.map((user) => {
          return {
            value: user.id,
            text: `${user.name} - ${user.email}`,
          };
        });
      });
    },
  },
  mounted() {
    this.loadArticles();
    this.loadCategories();
    this.loadUsers();
  },
};
</script>

<style>
</style>