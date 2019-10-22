<template>
  <div id="app">
    <div id="pesquisa">
      <form v-on:submit.prevent="submitRepositorio">
        <input
          type="text"
          v-bind:class="{'error-input':repositorioNaoEncontrado}"
          v-model="nomeRepositorio"
          placeholder="usuário/repositório"
          name="repository"
        />
        <button>
          <span v-bind:class="{'fa fa-spinner fa-pulse':carregando}"></span>OK
        </button>
      </form>
    </div>
    <div class="container">
      <card v-for="repositorio in repositorios" :key="repositorio.id">
        <template slot="header">
          <img :src="repositorio.owner.avatar_url" alt="logo" />
          <strong>{{repositorio.name}}</strong>
        </template>
        <template slot="body">
          <p>{{repositorio.description}}</p>
          <ul>
            <li>
              {{repositorio.stargazers_count}}
              <small>stars</small>
            </li>
            <li>
              {{repositorio.forks_count}}
              <small>forks</small>
            </li>
            <li>
              {{repositorio.open_issues_count}}
              <small>issues</small>
            </li>
          </ul>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
import Card from "./components/Card";
import { buscarRepositorio } from "./services/github-service";

export default {
  name: "app",
  components: {
    Card
  },
  data: () => ({
    nomeRepositorio: "",
    repositorioNaoEncontrado: false,
    carregando: false,
    repositorios: []
  }),
  methods: {
    async submitRepositorio() {
      this.carregando = true;
      const repositorio = await buscarRepositorio(this.nomeRepositorio);
      if (repositorio) {
        this.repositorios = [...this.repositorios, repositorio];
        this.repositorioNaoEncontrado = false;
        this.nomeRepositorio = "";
      } else {
        this.repositorioNaoEncontrado = true;
      }
      this.carregando = false;
    }
  }
};
</script>

<style>
#app {
}

#pesquisa {
  display: flex;
  justify-content: center;
}

#pesquisa form {
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;
}

#pesquisa input {
  flex: 1;
  border: none;
  border-radius: 3px;
  padding: 0 20px;
  height: 55px;
  color: #444;
}

.error-input {
  border: 2px solid red !important;
  outline: none;
}

#pesquisa button {
  background-color: #27ae60;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 55px;
  font-weight: bold;
  margin-left: 5px;
}

.container {
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  height: auto;
}

img {
  width: 64px !important;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-weight: bold;
}

li:nth-of-type(odd) {
  background-color: #f5f5f5;
}
</style>
