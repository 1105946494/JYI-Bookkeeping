<template>
  <div class="numberpad">
    <div class="output">100</div>
    <div class="buttons clearfix">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>×</button>
      <button class="ok">OK</button>
      <button>0</button>
      <button>.</button>
      <button>%</button>
      <button>÷</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Numberpad"
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberpad {
  > .output {
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    @extend %innershadow;
  }
  > .buttons {
    @extend %clearfix;
    > button {
      background: transparent;
      border: none;
      float: left;
      width: 20%;
      height: 64px;
      &.ok {
        float: right;
        height: 64 * 2px;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(6) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(7),
      &:nth-child(11) {
        background: darken($bg, 2 * 4%);
      }
      &:nth-child(4),
      &:nth-child(8),
      &:nth-child(12),
      &:nth-child(16) {
        background: darken($bg, 3 * 4%);
      }
      &:nth-child(5),
      &:nth-child(9),
      &:nth-child(13),
      &:nth-child(17) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(10),
      &:nth-child(14),
      &:nth-child(18) {
        background: darken($bg, 5 * 4%);
      }
      &:nth-child(19) {
        background: darken($bg, 6 * 4%);
      }
      &:nth-child(15) {
        background: darken($bg, 7 * 4%);
      }
    }
  }
}
</style>