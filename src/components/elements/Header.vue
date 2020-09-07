<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" :href="RootUrl">難以名狀的抓圖器</a>
      </div>

      <p class="navbar-text">
        目前熱門作品標籤：
        <router-link v-for="tag in tags.slice(0, 3)" :key="tag.tag" :to="{name: 'search', query: {tag: tag.tag}}">
          <i class="glyphicon glyphicon-search"></i> {{ tag.tag }}({{ tag.cnt }})
        </router-link>
      </p>
<!--      <ul class="nav navbar-nav navbar-right">-->
<!--        <li class="dropdown">-->
<!--          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src="//www.gravatar.com/avatar/00000000?s=20"> 訪客<span class="caret"></span></a>-->
<!--          <ul id="user_func" class="dropdown-menu">-->
<!--            <li><a href="/user_login">登入</a></li>-->
<!--            <li><a href="/user_register">註冊</a></li>-->
<!--          </ul>-->
<!--        </li>-->
<!--      </ul>-->
<!--      <ul class="nav navbar-nav navbar-right">-->
<!--        <li class="dropdown">-->
<!--          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">瀏覽作品 <span class="caret"></span></a>-->
<!--          <ul id="artwork_types" class="dropdown-menu">-->
<!--            <li>-->
<!--              <router-link :to="{name: 'search'}">全部作品</router-link>-->
<!--            </li>-->
<!--            <li>-->
<!--              <router-link :to="{name: 'search'}">一般向作品</router-link>-->
<!--            </li>-->
<!--            <li>-->
<!--              <router-link :to="{name: 'search'}">紳士向作品</router-link>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </li>-->
<!--      </ul>-->
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
export default {
  name: "Header",
  computed: {
    RootUrl: function(){
      return 'https://' + document.location.host;
    }
  },
  data() {
    return {
      tags: [],
    }
  },
  created() {
    this.getTags();
  },
  methods: {
    async getTags() {
      let url = "https://faryne.dev/api/opendata/nekomaid/suggest";

      let req = axios.get(url);
      let resp = await req.then( (obj) => {
        return obj.data;
      })

      this.tags = resp.sort(() => Math.random() - 0.5);
    }
  }
}
</script>

<style scoped>

</style>