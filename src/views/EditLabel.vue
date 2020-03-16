<template>
  <Layout>
    <div class="navBar">
      <span class="leftspan">返回</span>
      <span class="title">编辑标签</span>
      <span class="rightspan"></span>
    </div>
    <div class="from-wrapper">
      <Notes fieldName="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Buttons>删除标签</Buttons>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagLIstModel from "@/models/tagLIstModel";
import Notes from "@/components/Money/Notes.vue";
import Buttons from "@/components/Buttons.vue";

@Component({ components: { Notes, Buttons } })
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    tagLIstModel.fetch();
    const tags = tagLIstModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-content: center;
  justify-content: space-between;
  > .title {
    text-align: center;
  }
  > .leftspan {
    text-align: left;
    font-size: 16px;
  }
  > .rightspan {
    width: 24px;
    height: 24px;
  }
}
.from-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>