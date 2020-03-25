<template>
  <div class="x">
    <Layout>
      <Tabs classPrefix="type" :data-source="typeList" :value.sync="type" />
      <Tabs classPrefix="interval" :data-source="intervalList" :value.sync="interval" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Types from "@/components/Money/Types.vue";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";

@Component({ components: { Types, Tabs } })
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = [
    { text: "按天", value: "day" },
    { text: "按周", value: "week" },
    { text: "按月", value: "month" }
  ];
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" }
  ];
}
</script>

<style lang="scss" scoped>
.x ::v-deep .type-tabs-item {
  margin: 0;
  width: 50%;
  background: white;
  &.selected {
    background: #e8e8e8;
    &::after {
      display: none;
    }
  }
}
</style>