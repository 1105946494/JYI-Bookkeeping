<template>
  <Layout contentclass="layout">
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
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里输入备注~" />
      </label>
    </div>
    <div class="tags">
      <div class="naw">
        <button>新增标签</button>
      </div>
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
    </div>
  </Layout>
</template>

<script lang="ts">
export default {
  name: "Money"
};
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column-reverse;
}
</style>

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
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
.notes {
  padding-left: 16px;
  background: #f5f5f5;
  display: block;
  font-size: 14px;
  display: flex;
  align-items: center;
  > .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
.tags {
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      $h: 24px;
      background: #d9d9d9;
      height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 6px;
      margin-left: 6px;
      margin-top: 4px;
    }
  }
  > .naw {
    padding-top: 16px;
    > button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>