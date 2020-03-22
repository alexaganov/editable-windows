<template>
  <ul class="editable-windows">
    <EditableWindow
      tag="li"
      v-for="(window, index) in windows"
      v-show="!window.isRemoved"
      :key="window.id"
      :id="window.id"
      :initial-x="window.x"
      :initial-y="window.y"
      :initial-width="window.width"
      :initial-height="window.height"
      :name="window.name ? window.name : `Window ${index}`"
      :is-active="window.isActive"
      :content="window.content"
      :min-x="minX"
      :max-x="maxX"
      :min-y="minY"
      :max-y="maxY"
      @start-dragging="onStartDragging(window.id)"
      @end-dragging="onEndDragging"
      @start-resizing="onStartResizing(window.id)"
      @end-resizing="onEndResizing"
    />
  </ul>
</template>

<script>
import EditableWindow from "./EditableWindow";
import { mapGetters } from "vuex";
import { SET_ACTIVE_WINDOW } from "../store/actions-types";

export default {
  name: "EditableWindows",
  components: {
    EditableWindow
  },
  computed: {
    ...mapGetters(["windows"])
  },
  mounted: function() {
    this.maxX = this.$el.offsetWidth;
    this.maxY = this.$el.offsetHeight;

    window.addEventListener("resize", this.onResize);
  },
  methods: {
    onStartDragging(id) {
      this.$store.dispatch(SET_ACTIVE_WINDOW, { id });
    },
    onStartResizing(id) {
      this.$store.dispatch(SET_ACTIVE_WINDOW, { id });
    },
    onEndDragging(draggerInfo) {},
    onEndResizing(resizerInfo) {},
    onResize() {
      this.maxX = this.$el.offsetWidth;
      this.maxY = this.$el.offsetHeight;
    }
  },
  destroyed: function() {
    window.removeEventListener("resize", this.onResize);
  },
  data: function() {
    return {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0
    };
  }
};
</script>

<style>
.editable-windows {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: auto;
}
</style>
