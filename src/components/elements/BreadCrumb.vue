<template>
  <ul class="breadcrumb" v-if="site != '' || author_id != '' || artwork_id != ''">
    <li :class="{active: (site != '')}" v-if="site != ''">
      <router-link :to="{name: 'bysite', params: {site: site}}">{{ site | siteConverted }}</router-link>
    </li>
    <li :class="{active: (author_id != '')}" v-if="author_id != ''">
      <router-link :to="{name: 'author-list', params: {site: site, author_id: author_id }}">
        {{ author_name }}
      </router-link>
    </li>
    <li :class="{active: (artwork_id != '')}" v-if="artwork_id != ''">
      <router-link :to="{name: 'artwork-detail', params: {site: site, author_id: author_id, artwork_id: artwork_id }}">
        {{ title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "BreadCrumb",
  props: {
    site: {
      type: String
    },
    author_id: {
      type: String
    },
    author_name: {
      type: String
    },
    title: {
      type: String
    },
    artwork_id: {
      type: String
    }
  }
}
</script>

<style>

</style>