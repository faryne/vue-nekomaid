<template>
  <nav>
    <div style="text-align:center;clear:both">
      <p>共 {{TotalRows}} 筆</p>
    </div>
  </nav>
</template>

<script>
export default {
  name: "PageBar",
  data() {
    return {
      pages: Math.ceil(this.TotalRows / this.perPage),
      params: this.$route.query
    }
  },
  mounted() {
  },
  props: {
    TotalRows: {
      required: true
    },
    perPage: {
      required: true
    },
    currentPage: {
      required: true
    }
  }
}
</script>

<style>

</style>