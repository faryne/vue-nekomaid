<template>
  <div id="wrapper" class="container-fluid">
    <vue-loading :is-full-page="true"></vue-loading>

    <Header></Header>

    <div id="content" class="row-fluid">
      <div class="col-lg-10 col-lg-push-2 col-xs-9 col-xs-push-3" style="padding-right:0;">
        <router-view></router-view>
      </div>

      <div class="col-lg-2 col-lg-pull-10 col-xs-3 col-xs-pull-9">
        <Sidebar></Sidebar>
      </div>
    </div>

    <div class="clearfix"></div>

    <Footer></Footer>
  </div>
</template>

<script>
import Vue from "vue";
import Sidebar from "@/components/elements/Sidebar";
import Footer from "@/components/elements/Footer";
import Header from "@/components/elements/Header";
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueLoading);

export default {
  name: "App",
  components: {Header, Sidebar, Footer, VueLoading }
}
</script>

<style>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
@media (max-width: @screen-xs-max) {
  .col-lg-10, .col-lg-2 {padding-left: 0;padding-right:0;clear:both;}
}
/*keyword suggest*/
.twitter-typeahead{width:100%;}
.tt-menu{background-color:#FFF;width:100%;}
.tt-suggestion:hover{background-color:#337ab7;color:#FFF;}
.tt-dataset{border:1px solid #CCC;border-radius:0 0 4px 4px;border-top:0;}
.tt-suggestion{padding:5px;}
/*sidebar*/
.col-lg-2 h4{margin-left: -13px;}
/*search_list*/
#thumb_list{list-style: none;padding:0;}
#thumb_list li{float:left;}
#thumb_list li, #thumb_list li a {display:block;text-align: center;margin:5px 2px;}
#thumb_list li a{width:120px;height:120px;}
/*footer*/
footer {clear:both;padding-top: 5px; border-top: 1px solid #CCC; font-size: 12px;}
footer div:first-child{padding:0;}
#footer_navbar{list-style:none;}
#footer_navbar li{float:right;margin-right:15px;}
#footer_navbar li:first-child{margin:0;}
#footer_navbar li a{display:block;}
/**heart*/
.heart{color:red;}
/*tag-block*/
.tag-block{padding:5px;text-align:center;margin-top:5px;}
/*.tag-block:hover{border:1px solid #CCC;}*/
.tag-block a{display: block;}
/*sns*/
.sns {
  background-image: url(/images/sns.png);
  background-repeat: no-repeat;
  display: inline-block;
  width:16px;
  height:16px;
  margin-right:3px;
}

.sns-social-pinterest {
  background-position: -5px -5px;
}

.sns-social-facebook {
  background-position: -5px -31px;
}

.sns-social-twitter {
  background-position: -5px -57px;
}
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
