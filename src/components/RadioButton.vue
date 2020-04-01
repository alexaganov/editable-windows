<template>
  <li class="radio-button" :class="checkedClass">
    <label class="radio-button__container">
      <input
        type="radio"
        :name="name"
        :value="value"
        @change="onChange"
        class="radio-button__input"
      />
      <span class="radio-button__label">{{ label }}</span>
    </label>
  </li>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    selected: [String, Number],
    value: [String, Number],
    checked: Boolean,
    label: String,
    name: String
  },
  model: {
    prop: "selected",
    event: "change"
  },
  mounted() {
    if (this.checked) {
      this.onChange();
    }
  },
  computed: {
    isChecked() {
      return this.value === this.selected;
    },
    checkedClass() {
      return {
        "radio-button_checked": this.isChecked
      };
    }
  },
  methods: {
    onChange() {
      this.$emit("change", this.value);
    }
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.radio-button {
  background-color: transparent;
  border-radius: 2px;
  overflow: hidden;
  color: $color-primary-dark;
  transition: all 0.2s;
  font-size: 0.875em;
  letter-spacing: 1px;
  text-align: center;
  flex: 1 1 auto;
  text-transform: uppercase;

  &_checked {
    box-shadow: 0 0 20px -5px $color-primary;
    background-color: $color-primary;
    color: $color-secondary-dark;
  }

  &__container {
    display: block;
    padding: 0.6em 1.2em;
    cursor: pointer;
    position: relative;
    user-select: none;
  }

  &__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>
