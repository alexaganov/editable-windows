<template>
  <button type="button" class="button" :class="`button_${variant}`" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    variant: {
      type: String,
      default: "text",
      validator(type) {
        return ["text", "solid", "outline", "icon"].indexOf(type) !== -1;
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.button {
  cursor: pointer;
  border: none;
  padding: 0.8em 1.2em;
  text-decoration: none;
  font: inherit;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  transition: 0.2s all;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.875em;
  display: inline-block;
  line-height: 1.15;
  user-select: none;

  & * {
    pointer-events: none;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: default;
  }

  &_solid {
    background-color: $color-primary-dark;
    color: $color-secondary-dark;

    &:hover {
      box-shadow: 0 0 20px -5px $color-primary;
      background-color: $color-primary;
    }

    &:active,
    &:disabled {
      background-color: $color-primary-dark;
      box-shadow: none;
    }
  }

  &_text {
    color: $color-primary-dark;
    background-color: transparent;
    // font-weight: bold;

    &:hover {
      color: $color-primary;
      text-shadow: 0 0 5px transparentize($color-primary, 0.5);
    }

    &:active,
    &:disabled {
      color: $color-primary-dark;
      text-shadow: none;
    }
  }

  &_outline {
    box-shadow: 0 0 20px -5px $color-primary;
    background-color: $color-secondary-dark;
    color: $color-primary;
    border: 1px solid $color-primary;

    &:active,
    &:disabled {
      color: $color-primary-dark;
      border-color: $color-primary-dark;
      box-shadow: none;
    }
  }

  &_icon {
    background-color: transparent;
    color: $color-primary-dark;
    padding: 0.5em;
    line-height: 0;

    &:hover {
      color: $color-primary;
      filter: drop-shadow(0px 0px 10px $color-primary);
    }

    &:active,
    &:disabled {
      color: $color-primary-dark;
      filter: none;
    }
  }
}
</style>
