<template>
  <div class="x">
    <Layout>
      <Tabs classPrefix="type" :data-source="typeList" :value.sync="type" />
      <Tabs classPrefix="interval" :data-source="intervalList" :value.sync="interval" />
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{group.title}}</h3>
          <ol>
            <li class="record" v-for="item in group.items" :key="item.id">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{+item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
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
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.join(",");
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get result() {
    const { recordList } = this;
    type HashTableValue = { title: string; items: RecordItem[] };

    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split("T");
      hashTable[date] = hashTable[date] || { title: date, items: [] };
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  type = "-";
  interval = "day";
  intervalList = intervalList;
  typeList = typeList;
}
</script>

<style lang="scss" scoped>
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  @extend %item;
  background: white;
}
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