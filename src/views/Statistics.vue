<template>
  <div class="x">
    <Layout>
      <Tabs classPrefix="type" :data-source="typeList" :value.sync="type" />
      <Tabs classPrefix="interval" :data-source="intervalList" :value.sync="interval" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import typeList from "@/constants/typeList";

@Component({ components: { Tabs } })
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;
  typeList = typeList;
}
</script>

<style lang="scss" scoped>
.x ::v-deep .interval-tabs-item {
  width: 33.3333%;
  margin: 0 6px;
}
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