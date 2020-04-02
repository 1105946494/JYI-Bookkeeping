<template>
  <div class="x">
    <Layout>
      <Tabs classPrefix="type" :data-source="typeList" :value.sync="type" />
      <!-- <Tabs
        classPrefix="interval"
        :data-source="intervalList"
        :value.sync="interval"
      />-->
      <ol v-if="groupedList.length>0">
        <li v-for="(group, index) in groupedList" :key="index">
          <h3 class="title">
            {{ beautify(group.title) }}
            <span>￥{{ group.total }}</span>
          </h3>
          <ol>
            <li class="record" v-for="item in group.items" :key="item.id">
              <span>{{ tagString(item.tags) }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span>￥{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">目前没有相关记录</div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import typeList from "@/constants/typeList";
import dayjs from "dayjs";
import clone from "@/lid/clone";

@Component({ components: { Tabs } })
export default class Statistics extends Vue {
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.join(",");
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }

    const newList = clone(recordList)
      .filter(r => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    type Result = { title?: string; total?: number; items: RecordItem[] }[];
    if (newList.length === 0) {
      return [] as Result;
    }
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-M-D"),
        items: [newList[0]]
      }
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-M-D"),
          items: [current]
        });
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });

    return result;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  type = "-";
  // interval = "day";
  // intervalList = intervalList;
  typeList = typeList;
}
</script>

<style lang="scss" scoped>
.noResult {
  padding: 16px;
  text-align: center;
}
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
  background: #e8e8e8;
  &.selected {
    background: white;
    &::after {
      display: none;
    }
  }
}
</style>
