<template>
  <Layout contentclass="layout">
    <Numberpad :value.sync="record.amount" @submit="saveRecord" />
    <Notes fieldName="备注" placeholder="在这里写备注吧~" :value.sync="record.notes" />
    <Tags :value.sync="record.tags" />
    <Tabs :data-source="typeList" :value.sync="record.type" />
  </Layout>
</template> 

<script lang="ts">
import Vue from "vue";
import Numberpad from "@/components/Money/Numberpad.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import typeList from "@/constants/typeList";
import Tabs from "@/components/Tabs.vue";

@Component({
  components: { Numberpad, Notes, Tags, Tabs }
})
export default class Money extends Vue {
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };
  get recordList() {
    return this.$store.state.recordList;
  }

  typeList = typeList;

  created() {
    this.$store.commit("fetchRecords");
  }
  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      window.alert("请至少选择一个标签");
      return;
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("成功记录");
      this.record.notes = "";
    }
  }
}
</script>

<style lang="scss"  >
.layout {
  display: flex;
  flex-direction: column-reverse;
}
</style>