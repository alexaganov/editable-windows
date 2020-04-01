<template>
  <div class="editable-window-list">
    <div class="editable-window-list__scroll" ref="scroll">
      <transition-group tag="ul" name="show" class="editable-window-list__list">
        <li
          class="editable-window-list__list-item"
          v-for="(listItem, index) in listOfWindows"
          v-show="!listItem.isRemoved"
          :key="listItem.id"
          :ref="listItem.isActive ? 'active' : null"
        >
          <button
            class="editable-window-list__list-item-btn"
            :class="{
              'editable-window-list__list-item-btn_is-active': listItem.isActive
            }"
            @click="setActive(listItem.id)"
          >{{ listItem.name ? listItem.name : `Window ${index}` }}</button>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { scrollToBottom, scrollToElem } from "../helpers";
import { SET_ACTIVE_WINDOW } from "../store/actions-types";

export default {
  name: "EditableWindowList",
  computed: {
    listOfWindows() {
      return this.$store.getters.listOfUnremovedWindows;
    }
  },
  updated() {
    const active = this.$refs.active[0] ? this.$refs.active[0] : null;

    if (active) {
      scrollToElem(this.$refs.scroll, active);
    }
  },
  methods: {
    setActive(id) {
      this.$store.dispatch(SET_ACTIVE_WINDOW, { id });
    }
  },
  data() {
    return {
      shouldScrollToBottom: false
    };
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.editable-window-list {
  background: $color-secondary;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: $small-shadow;
  border-radius: 2px;
  &__scroll {
    overflow-y: auto;
    height: 100%;
    margin: 5px;
  }
  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 15px;
  }

  &__list-item {
    // max-height: 100px;

    &.show-enter-active,
    &.show-leave-active {
      transition: all 0.2s;
    }

    &.show-enter-active &-btn,
    &.show-leave-active &-btn {
      transition: all 0.2s;
    }

    &.show-enter &-btn,
    &.show-leave-to &-btn {
      transition: all 0.2s;
      opacity: 0;
      transform: scale(0.95);
    }
  }

  &__list-item-btn {
    cursor: pointer;
    width: 100%;
    margin: 5px 0;
    border: 0;
    background-color: $color-primary-dark;
    color: $text-color-secondary;
    border-radius: 2px;
    padding: 0.8em 1.2em;
    font-size: 0.875em;
    transition: 0.2s all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    user-select: none;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50px;
      right: 0;
    }

    &:focus {
      outline: 0;
    }

    &_is-active {
      background-color: $color-primary;
      box-shadow: 0 0 15px -5px $color-primary;
    }
  }
}
</style>
