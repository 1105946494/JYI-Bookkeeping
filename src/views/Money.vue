<template>
  <Layout contentclass="layout">
    {{record}}
    <Numberpad :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <Notes @updata:value="onUpdataNotes" />
    <Tags :dataSource.sync="tags" />
  </Layout>
</template> 

<script lang="ts">
import Vue from "vue";
import Numberpad from "@/components/Money/Numberpad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";

window.localStorage.setItem("version", "1.0.0");

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};
@Component({ components: { Numberpad, Types, Notes, Tags } })
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  recordlist: Record[] = JSON.parse(
    window.localStorage.getItem("recordlist") || "[]"
  );
  record: Record = { tags: [], notes: "", type: "-", amount: 0 };
  onUpdataTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdataNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    const record2: Record = JSON.parse(JSON.stringify(this.record));
    record2.createdAt = new Date();
    this.recordlist.push(record2);
  }
  @Watch("recordlist")
  onRecordlistChange() {
    window.localStorage.setItem("recordlist", JSON.stringify(this.recordlist));
  }
}
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column-reverse;
}
</style>