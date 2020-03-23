<template>
  <div class="editable-window-list">
    <div class="editable-window-list__scroll" ref="scroll">
      <transition-group tag="ul" name="fade" class="editable-window-list__list">
        <li
          class="editable-window-list__list-item"
          v-for="(listItem, index) in listOfWindows"
          v-show="!listItem.isRemoved"
          :key="listItem.id"
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
import { mapGetters } from "vuex";
import { scrollToBottom } from "../halpers";
import { SET_ACTIVE_WINDOW } from "../store/actions-types";

export default {
  name: "EditableWindowList",
  computed: {
    ...mapGetters(["listOfWindows"])
  },
  watch: {
    listOfWindows(newListOfWindows, oldListOfWindows) {
      this.shouldScrollToBottom =
        newListOfWindows.length > oldListOfWindows.length;
    }
  },
  updated() {
    if (this.shouldScrollToBottom) {
      scrollToBottom(this.$refs.scroll);
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
  border-radius: 5px;
  // box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;

  &:after {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 10px 0 rgba(0, 0, 0, 0.4);
    // background: linear-gradient(180deg, rgba(0, 0, 0, 0.4), transparent 30px),
    // linear-gradient(0deg, rgba(0, 0, 0, 0.4), transparent 30px);
    pointer-events: none;
  }

  &__scroll {
    overflow-y: auto;
    height: 100%;
    margin: 10px 5px;
  }
  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 15px;
  }

  &__list-item:not(:last-child) {
    margin-bottom: 8px;
  }

  &__list-item-btn {
    cursor: pointer;
    width: 100%;
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
      box-shadow: 0 0 20px -5px $color-primary;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
.fade-enter,
.fade-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
