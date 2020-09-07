<template>
  <router-link :to="{name: 'artwork-detail', params: {site: artwork.site, author_id: artwork.author_id, artwork_id: artwork.artwork_id}}">
    <img class="ui-li-thumb img-rounded" :src="artwork.thumb" :alt="artwork.title" :title="artwork.title" />
  </router-link>
</template>

<script>
export default {
  name: "ArtworkThumnail",
  props: {
    artwork: {
      require: true,
      type: Object,
    }
  }
}
</script>

<style>

</style>