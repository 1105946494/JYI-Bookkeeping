<template>
  <Layout contentclass="layout">
    <Numberpad />
    <Types />
    <Notes />
    <Tags />
  </Layout>
</template>

<script lang="ts">
import Numberpad from "@/components/Money/Numberpad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
export default {
  name: "Money",
  components: { Numberpad, Types, Notes, Tags }
};
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column-reverse;
}
</style>