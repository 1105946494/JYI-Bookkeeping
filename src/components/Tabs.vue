<template>
  <ul class="tabs">
    <li
      v-for="item in dataSource"
      :key="item.value"
      :class="liClass(item)"
      @click="select(item)"
    >{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

type DataSourceItem = { text: string; value: string };

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array })
  dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;

  liClass(item: DataSourceItem) {
    return {
      selected: item.value === this.value,
      [this.classPrefix + "-tabs-item"]: this.classPrefix
    };
  }

  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #e8e8e8;
  display: flex;
  text-align: center;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  > li {
    // width: 33.333%;
    // height: 48px;
    // display: flex;
    // margin: 0 6px;
    // justify-content: center;
    // align-items: center;
    // position: relative;
    width: 15%;
    height: 48px;
    display: flex;
    margin: 0 6px;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #333;
    }
  }
}
</style>