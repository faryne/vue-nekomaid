<template>
  <div>
    <div id="searchResult" @scroll="loadMore">
      <BreadCrumb v-if="artworks.length > 0"
                  :site="site"
                  :author_id="typeof author.author_id != 'undefined' ? author.author_id : ''"
                  :author_name="typeof author.nickname != 'undefined' ? author.nickname : ''"
                  :title="''"
                  :artwork_id="''"
      ></BreadCrumb>

      <div class="panel panel-default" v-if="tags.length > 0">
        <div class="panel-body">
          <span
              v-for="tag in tags"
              :key="tag"
          >
            <router-link :to="{name: 'search', query: {tag: tag}}"
                         class="tag">
              <i class="glyphicon glyphicon-search"></i>  {{tag}}
            </router-link>
          </span>
        </div>
      </div>

      <ul id="thumb_list">
        <li v-for="item in artworks" :key="item.id" class="obj_wrapper">
          <ArtworkThumnail :artwork="item"></ArtworkThumnail>
        </li>
      </ul>

      <PageBar :currentPage="currentPage" :TotalRows="totalRows" :perPage="perPage" :callback="defaultSearch"></PageBar>
    </div>
  </div>

</template>

<script>
import ArtworkThumnail from "@/components/elements/ArtworkThumnail";
import BreadCrumb from "@/components/elements/BreadCrumb";
import PageBar from "@/components/elements/PageBar";

import axios from "axios";
export default {
  name: "Search",
  components: { ArtworkThumnail , BreadCrumb, PageBar },
  data(){
    return {
      artworks: [],
      aggregations: {},
      author: {},
      site: '',
      nextPageToken: '',
      totalRows: 0,
      currentPage: 1,
      perPage: 50,
      tags: [],
    };
  },
  created() {
    // this.defaultSearch()
  },
  mounted() {
    this.defaultSearch();
    window.addEventListener('scroll', this.loadMore, true);
  },
  watch: {
    "$route": 'defaultSearch',
  },
  methods: {
    loadMore(){
      let scrollParent = window;
      let lastScrollY = 0,
          scrollParentHeight = scrollParent.innerHeight || scrollParent.clientHeight,
          scrollY = scrollParent == window ? document.documentElement.scrollTop || document.body.scrollTop : scrollParent.scrollTop,
          scrollContentHeight = scrollParent == window ? document.documentElement.scrollHeight || document.body.scrollHeight : scrollParent.scrollHeight;
      if (scrollY + scrollParentHeight + 1 >= scrollContentHeight && lastScrollY <= scrollY) {
        this.defaultSearch(true);
        lastScrollY = scrollY;
      }
    },
    async defaultSearch(p){
      let params = {};
      let loader = this.$loading.show();
      let url = "https://faryne.dev/api/opendata/nekomaid";

      if (p != "undefined" && p === true) {
        if (this.nextPageToken == "") {
          loader.hide();
          return;
        }
        params["next_token"] = this.nextPageToken;
      } else {
        if (this.$route.params.site !== undefined) {
          url += "/" + this.$route.params.site;
        }
        if (this.$route.params.author_id !== undefined) {
          url += "/" + this.$route.params.author_id;
        }
        if (this.$route.query.tag !== undefined) {
          params["tag"] = this.$route.query.tag;
        }
        if (this.$route.query.site !== undefined) {
          params["sites"] = this.$route.query.site;
        }
        if (this.$route.query.rating !== "undefined") {
          switch (this.$route.query.rating) {
            case "1":
              params["rating"] = false;
              break;
            case "2":
              params["rating"] = true;
              break;
            default:
              break;
          }
        }
      }

      let req = axios.get(url, {
        params: params
      });

      let resp = await req.then(function(obj){
        if (obj.data.error) {
          throw obj.data.error;
        }
        loader.hide();
        return obj.data
      }).catch((e) => {
        alert("搜尋發生錯誤！\n 錯誤原因：" + e);
        loader.hide();
        return;
      });

      this.site = this.$route.params['site'];

      if (p === true) {
        this.artworks = this.artworks.concat(resp.artworks);
      } else {
        this.artworks = resp.artworks;
        this.tags = [];
      }
      if (resp.artworks.length <= 0) {
        window.removeEventListener("scroll", this.loadMore);
        this.nextPageToken = "";
      } else {
        let alltags = [];

        for (let i in resp.artworks) {
          alltags = alltags.concat(resp.artworks[i].tags);
        }

        this.tags = this.tags.concat(alltags).filter( (value, index, self) => {
          return self.indexOf(value) === index;
        });
        this.nextPageToken = resp.next_token;
      }

      this.author = typeof resp.author !== 'undefined' ? resp.author : {};

      this.totalRows = resp.total;
    }
  }
}
</script>

<style>
html, body, #searchResult {
  height: 100%
}
</style>