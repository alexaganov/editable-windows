<template>
  <div class="radio-button-group">
    <div class="span radio-button-group__inner">
      <span class="radio-button-group__glider"></span>
      <ul class="radio-button-group__radio-button-list">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioButtonGroup",
  props: {
    name: String
  },
  mounted() {
    if (this.name) {
      this.$children.forEach(child => {
        if (child.$options.name === "RadioButton" && !child.initialName) {
          child.name = this.name;

          /*  child.$on("change", v => {
            // child.isChecked = false;
            child.selected = this.checked === v;

            this.$emit("change", v);
          }); */
        }
      });
    }
  },
  updated() {
    console.log("updated");
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.radio-button-group {
  border: 1px solid $color-primary-dark;
  box-shadow: $small-shadow, inset $small-shadow;
  position: relative;
  padding: 2px;
  border-radius: 2px;

  /*  &__glider {
    position: absolute;
    transform: translate(0, 0);
    width: 10px;
    height: 10px;
    background-color: $color-primary;
    border-radius: 2px;
  } */

  &__radio-button-list {
    list-style: none;
    display: flex;

    & > *:not(:last-child) {
      margin-right: 1px;
    }
  }
}
</style>