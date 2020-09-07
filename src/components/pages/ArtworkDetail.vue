<template>
<div>
  <BreadCrumb v-if="artwork.hasOwnProperty('site')"
      :site="artwork.site" :author_id="artwork.author_id.toString()" :title="artwork.title" :artwork_id="artwork.artwork_id"
      :author_name="author.nickname"></BreadCrumb>

  <div class="clearfix"></div>

  <div class="panel panel-default">
    <div class="panel-heading" id="title">
      <h3 style="margin-top:0;margin-bottom:0;">
        {{ artwork.title }}
        <a title="圖片原始頁" :href="artwork.artwork_page" target="_blank"><i class="glyphicon glyphicon-picture"></i></a>
        <a title="畫師頁面" target="_blank" :href="artwork.author_page"><i class="glyphicon glyphicon-home"></i></a>
        <router-link v-if="artwork.hasOwnProperty('site')" :to="{name: 'author-list', params: {site: artwork.site, author_id: artwork.author_id}}"><i class="glyphicon glyphicon-option-horizontal"></i></router-link>
      </h3>
    </div>
    <div class="panel-body" id="tags-list">
      <router-link :to="{name: 'search', query: {tag: tag}}" class="tag" v-for="tag in artwork.tags" :key="tag"><i class="glyphicon glyphicon-search"></i>  {{tag}}</router-link>
    </div>
  </div>

  <div class="clearfix"></div>

  <div id="carousel">
    <h4>其他相關作品</h4>
    <carousel
        :perPage="8"
        :scrollPerPage="true"
        :perPageCustom="[[768, 4], [1024, 6]]"
    >
      <slide
          v-for="item in recommendations" :key="item.artwork_id + '_' + item.site"
      >
        <ArtworkThumnail :artwork="item"></ArtworkThumnail>
      </slide>
    </carousel>
  </div>

  <div id="artwork-content">
    <div class="artwork_block" v-for="photo in artwork.photos" :key="photo.url">
      <a class="artwork_mainblock" :href="photo.url" target="_blank">
        <img class="you_can_read img-responsive" :src="photo.url" style="display:inline;"/>
      </a>
      <div class="clearfix"></div>
    </div>
  </div>


</div>
</template>

<script>
import axios from "axios";
import BreadCrumb from "@/components/elements/BreadCrumb";
import ArtworkThumnail from "@/components/elements/ArtworkThumnail";
export default {
  name: "Artwork",
  components: {ArtworkThumnail, BreadCrumb },
  data(){
    return {
      artwork: {},
      author: {},
      recommendations: [],
    }
  },
  created() {
    this.getArtwork()
  },
  watch: {
    "$route": 'getArtwork',
  },
  methods: {
    async getArtwork(){
      let sites = this.$route.params.site,
          author_id = this.$route.params.author_id,
          artwork_id = this.$route.params.artwork_id;
      let loader = this.$loading.show();

      let url = "https://faryne.dev/api/opendata/nekomaid/" + sites + "/" + author_id + "/" + artwork_id;

      let req = axios.get(url);

      let resp = await req.then(function(obj){
        loader.hide()
        return obj;
      });

      this.artwork = resp.data.artwork;
      this.author = resp.data.author;

      this.recommendations = resp.data.recommendations.slice(0, 24);
    }
  }
}
</script>

<style>
#right_func_box
{
  font: 11px Helvetica,Tahoma,Arial;
  z-index: 980000!important;
  cursor: pointer;
  margin-left: -7px;
  position: fixed;
  top: 25%;
  width: 50px;
  right: 0;
}
#imgs_list
{
  text-align: center;
}
.artwork_block{text-align:center;}
.artwork_sharing_block{border:1px solid cyan;margin:0 20px 10px;padding:5px 0;}
.you_can_read{display:inline;}
</style>