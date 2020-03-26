<template>
  <transition name="modal">
    <div v-show="show" @click.self="$emit('click', !show)" class="modal">
      <div class="modal__dialog">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: "show",
    event: "click"
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.modal {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);

  &-enter-active,
  &-leave-active {
    transition: all 0.4s ease;
  }

  &-enter,
  &-leave-to {
    background-color: rgba(0, 0, 0, 0);
  }

  &__dialog {
    min-width: 300px;
    min-height: 300px;
    width: 100%;
    max-width: 400px;
  }

  &-enter-active &__dialog,
  &-leave-active &__dialog {
    transition: all 0.2s ease;
  }

  &-enter &__dialog,
  &-leave-to &__dialog {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>