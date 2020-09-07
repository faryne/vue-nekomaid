<template>
  <div>
    <div id="main_search_form_wrapper" class="search_form">
      <h4>主站搜尋</h4>
      <form method="get" class="form-horizontal" action="/" id="main_search_form">
        <div class="form-group">
          <input type="text" class="form-control search_params" name="tag" placeholder="輸入關鍵字" data-provide="typeahead" id="search_tag_main" value="">
        </div>
        <div class="form-group">
          <label for="post_site">作品刊登網站</label>
          <select id="post_site" class="form-control search_params" name="site">
            <option value="pixiv">Pixiv</option>
            <option value="nico">NICO靜畫</option>
            <option value="tinami">Tinami</option>
          </select>
        </div>
        <div class="form-group">
          <label for="post_rating">作品分級</label>
          <select id="post_rating" class="form-control search_params" name="is_r18">
            <option value="0">所有作品</option>
            <option value="1">僅一般向作品</option>
            <option value="2">僅紳士向作品</option>
          </select>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary" @click.prevent="doSearch">搜尋</button>
        </div>
      </form>
    </div>

    <!-- donate box -->
    <h4>神秘的捐款箱</h4>
    <form class="form-horizontal" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" id="donate">
      <input type="hidden" name="cmd" value="_s-xclick">
      <input type="hidden" name="hosted_button_id" value="PQH4RC8VG585W">
      <input type="hidden" name="currency_code" value="TWD">
      <input type="hidden" name="charset" value="utf-8" />
      <input type="hidden" name="on0" value="捐款數目">
      <div class="form-group">
        <label for="paypal_donate">捐款數目</label>
        <select id="paypal_donate" name="os0" class="form-control">
          <option value="60">60 NT$60 TWD</option>
          <option value="100">100 NT$100 TWD</option>
          <option value="150">150 NT$150 TWD</option>
          <option value="300">300 NT$300 TWD</option>
        </select>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">使用 Paypal 捐贈</button>
      </div>
      <img alt="" border="0" src="https://www.paypalobjects.com/zh_TW/i/scr/pixel.gif" width="1" height="1">
    </form>
  </div>

</template>

<script>
export default {
  name: "Sidebar",
  methods: {
    doSearch(){
      let tag = document.getElementById('search_tag_main').value,
          site = document.getElementById('post_site').value,
          rating = document.getElementById('post_rating').value;

      let routeName = "search";
      let query = {}
      if (tag != "") {
        query["tag"] = tag;
      }
      if (rating != "") {
        query["rating"] = rating;
      }

      let params = {};
      if (site != "") {
        routeName = "bysite";
        params["site"] = site;
      }

      this.$router.replace({
        name: routeName,
        query: query,
        params: params
      }).catch( () => {})
    }
  }
}
</script>

<style>

</style>