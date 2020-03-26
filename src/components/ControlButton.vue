<template>
  <button @click="onClick" type="button" class="control-btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ControlButton",
  props: {
    handleClick: Function,
    outline: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: true
    },
    solid: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick(e) {
      if (this.handleClick !== undefined) {
        this.handleClick(e);
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.control-btn {
  padding: 0.2em;
  background-color: transparent;
  border: none;
  color: $color-primary;
  transition: 0.2s all ease;
  transform-origin: center;

  & svg {
    transition: all 0.2s;
    filter: drop-shadow(0px 0px 10px $color-primary);
    transform-origin: center;
  }

  &:not(:disabled):active {
    svg {
      filter: drop-shadow(0px 0px 5px $color-primary);
    }
  }

  &:active svg {
    transform: scale(0.9);
  }

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: default;
    transform: scale(0.9);
    color: $color-primary-dark;

    svg {
      filter: none;
    }
  }
}
</style>