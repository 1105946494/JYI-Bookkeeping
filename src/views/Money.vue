<template>
  <Layout contentclass="layout">
    <Numberpad :value.sync="record.amount" @submit="saveRecord" />
    <Notes fieldName="备注" placeholder="在这里写备注吧~" @update:value="onUpdataNotes" />
    <Tags :dataSource.sync="tags" @update:value="onUpdataTags" />
    <Types :value.sync="record.type" />
  </Layout>
</template> 

<script lang="ts">
import Vue from "vue";
import Numberpad from "@/components/Money/Numberpad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import store from "@/store/index2";

@Component({ components: { Numberpad, Types, Notes, Tags } })
export default class Money extends Vue {
  tags = store.tagList;
  recordlist = store.recordList;
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };
  onUpdataTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdataNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    store.createRecord(this.record);
  }
}
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column-reverse;
}
</style>