<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Buttons class="createTag" @click="createTag">新建标签</Buttons>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagLIstModel from "@/models/tagLIstModel";
import Buttons from "@/components/Buttons.vue";

tagLIstModel.fetch();
@Component({
  components: { Buttons }
})
export default class Lavels extends Vue {
  tags = tagLIstModel.data;
  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      const message = tagLIstModel.create(name);
      if (message === "duplicated") {
        window.alert("标签名重复");
      } else if (message === "success") {
        return;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
}
</style>