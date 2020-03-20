<template>
  <aside class="sidebar">
    <MainControls
      @save="onSave"
      @delete="onDelete"
      @redo="onRedo"
      @undo="onUndo"
      class="sidebar__main-controls"
    />
    <EditableWindowList class="sidebar__editable-window-list" />
    <AddEditableWindow class="sidebar__add-editable-window" />
    <!-- <Resizable @resizing="onResizing" :resizers="['right']" /> -->
  </aside>
</template>

<script>
import EditableWindowList from "./EditableWindowList";
import AddEditableWindow from "./AddEditableWindow";
import MainControls from "./MainControls";
import Resizable from "./Resizable";
import { DELETE } from "../store/actions-types";

export default {
  name: "Sidebar",
  components: {
    MainControls,
    EditableWindowList,
    AddEditableWindow,
    Resizable
  },
  computed: {
    sidebarStyle() {
      return {
        width: `${this.w}px`
      };
    }
  },
  methods: {
    /* onResizing({ xDir }) {
      const w = this.w + xDir;
      if (w >= this.wMin && w <= this.wMax) {
        this.w = w;
      }
    }, */
    onDelete() {
      this.$store.dispatch(DELETE);
    },
    onSave() {
      console.log("save");
    },
    onUndo() {
      console.log("undo");
    },
    onRedo() {
      console.log("redo");
    }
  },
  data: function() {
    return {
      w: 350,
      wMax: 500,
      wMin: 300
    };
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.sidebar {
  flex: 0 0 350px;
  max-width: 100%;
  width: 350px;
  padding: 15px 30px;
  background-color: $color-secondary-dark;
  box-shadow: 0px 0 10px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
  position: relative;

  &__main-controls {
    flex: 0 0 auto;
    margin-bottom: 5px;
  }

  &__editable-window-list {
    flex: 1 1 auto;
    height: 100%;
    max-height: 100%;
    margin-bottom: 15px;
  }

  &__add-editable-window {
  }
}
</style>
