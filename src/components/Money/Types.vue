<template>
  <div>
    <ul class="types">
      <li :class="value==='-'&&'selected'" @click="selctType('-')">支出</li>
      <li :class="value==='+'&&'selected'" @click="selctType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Types extends Vue {
  @Prop() readonly value!: string;
  selctType(type: string) {
    if (type !== "-" && type !== "+") {
      throw new Error("type is unknown");
    }
    this.$emit("update:value", type);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.types {
  background: #e8e8e8;
  display: flex;
  text-align: center;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  > li {
    width: 15%;
    height: 48px;
    display: flex;
    margin: 0 6px;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #333;
    }
  }
}
</style>