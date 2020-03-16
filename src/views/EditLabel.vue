<template>
  <Layout>编辑标签</Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagLIstModel from "@/models/tagLIstModel";

@Component
export default class EditLable extends Vue {
  created() {
    const id = this.$route.params.id;
    tagLIstModel.fetch();
    const tags = tagLIstModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      console.log("tag");
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang="scss" scoped>
</style>