<template functional>
  <div class="button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ButtonGroup"
};
</script>

<style lang="scss">
.button-group {
  display: flex;

  & > *:not(:last-child) {
    margin-right: 5px;
  }
}
</style>