<template>
  <Layout contentclass="layout">
    <Numberpad :value.sync="record.amount" @submit="saveRecord" />
    <Notes fieldName="备注" placeholder="在这里写备注吧~" @update:value="onUpdataNotes" />
    <Tags :dataSource.sync="tags" />
    <Types :value.sync="record.type" />
  </Layout>
</template> 

<script lang="ts">
import Vue from "vue";
import Numberpad from "@/components/Money/Numberpad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
import model from "@/models/recordlist";
import tagLIstModel from "@/models/tagLIstModel";

const recordlist = model.fetch();
const tagList = tagLIstModel.fetch();

type Recorditem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};
@Component({ components: { Numberpad, Types, Notes, Tags } })
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  recordlist: Recorditem[] = recordlist;
  record: Recorditem = { tags: [], notes: "", type: "-", amount: 0 };
  onUpdataTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdataNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    const record2: Recorditem = model.clone(this.record);
    record2.createdAt = new Date();
    this.recordlist.push(record2);
  }
  @Watch("recordlist")
  onRecordlistChange() {
    model.save(this.recordlist);
  }
}
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column-reverse;
}
</style>