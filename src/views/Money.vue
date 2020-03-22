<template>
  <Layout contentclass="layout">
    <Numberpad :value.sync="record.amount" @submit="saveRecord" />
    <Notes fieldName="备注" placeholder="在这里写备注吧~" @update:value="onUpdataNotes" />
    <Tags />
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

@Component({
  components: { Numberpad, Types, Notes, Tags }
})
export default class Money extends Vue {
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };
  get recordList() {
    return this.$store.state.recordList;
  }
  created() {
    this.$store.commit("fetchRecords");
  }

  onUpdataNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column-reverse;
}
</style>