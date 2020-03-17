<template>
  <Layout>
    <div class="navBar">
      <span class="leftspan" @click="goBack">返回</span>
      <span class="title">编辑标签</span>
      <span class="rightspan"></span>
    </div>
    <div class="from-wrapper">
      <Notes :value="tag.name" @update:value="updateTag" fieldName="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Buttons @click="remove">删除标签</Buttons>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagLIstModel from "@/models/tagLIstModel";
import Notes from "@/components/Money/Notes.vue";
import Buttons from "@/components/Buttons.vue";
import tagListModel from "@/models/tagLIstModel";

@Component({ components: { Notes, Buttons } })
export default class EditLabel extends Vue {
  tag?: { id: string; name: string } = undefined;
  created() {
    const id = this.$route.params.id;
    tagLIstModel.fetch();
    const tags = tagLIstModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace("/404");
    }
  }
  updateTag(name: string) {
    if (this.tag) {
      tagLIstModel.update(this.tag.id, name);
    }
  }
  remove() {
    if (this.tag) {
      if (tagListModel.remove(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert("删除失败");
      }
    }
  }
  goBack() {
    this.$router.back();
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