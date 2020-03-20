<template>
  <ul class="editable-window-list">
    <li
      class="editable-window-list__item"
      v-for="listItem in listOfWindows"
      :key="listItem.id"
      :title="listItem.name"
    >
      <button
        class="editable-window-list__item-btn"
        :class="{
          'editable-window-list__item-btn_is-active': listItem.isActive
        }"
        @click="setActive(listItem.id)"
      >
        {{ listItem.name }}
      </button>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_ACTIVE } from "../store/mutations-type";
// import { scrollToBottom } from "../halpers";

export default {
  name: "EditableWindowList",
  computed: {
    ...mapGetters({
      listOfWindows: "getListOfWindows"
    })
  },
  watch: {},
  methods: {
    setActive(id) {
      this.$store.commit({
        type: SET_ACTIVE,
        id
      });
    }
  },
  updated: function() {}
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.editable-window-list {
  list-style: none;
  background: $color-secondary;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: content-box;
  padding: 15px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

  /* width */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: $color-primary;
    border-radius: 2px;
  }

  &__item:not(:last-child) {
    margin-bottom: 8px;
  }

  &__item-btn {
    cursor: pointer;
    width: 100%;
    border: 0;
    background-color: $color-primary-dark;
    color: $text-color-secondary;
    border-radius: 2px;
    padding: 0.6em 1.2em;
    font-size: 0.875em;
    // transition: 0.2s all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
    position: relative;
    // box-shadow: inset -1px 0 1.2em $color-primary;
    // text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

    &:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50px;
      right: 0;
      background: linear-gradient(
        90deg,
        transparent,
        $color-primary-dark 80%,
        $color-primary-dark
      );
    }

    &:focus {
      outline: 0;
    }

    &_is-active {
      background-color: $color-primary;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

      &:after {
        background: linear-gradient(
          90deg,
          transparent,
          $color-primary 80%,
          $color-primary
        );
      }
    }
  }
}
</style>
