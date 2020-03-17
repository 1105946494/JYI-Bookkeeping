<template>
  <Layout contentclass="layout">
    {{record}}
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
import { Component, Watch } from "vue-property-decorator";
import model from "@/models/recordlist";
import tagLIstModel from "@/models/tagLIstModel";

const recordlist = model.fetch();
const tagList = tagLIstModel.fetch();

@Component({ components: { Numberpad, Types, Notes, Tags } })
export default class Money extends Vue {
  tags = tagList;
  recordlist: RecordItem[] = recordlist;
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };
  onUpdataTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdataNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    model.create(this.record);
  }
  @Watch("recordlist")
  onRecordlistChange() {
    model.save();
  }
}
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column-reverse;
}
</style>