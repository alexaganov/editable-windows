<template>
  <ul @resize="onResize" class="editable-windows">
    <EditableWindow
      v-for="window in windows"
      :key="window.id"
      :id="window.id"
      :x="window.x"
      :y="window.y"
      :w="window.w"
      :h="window.h"
      :xMin="xMin"
      :yMin="yMin"
      :xMax="xMax - window.w"
      :yMax="yMax - window.h"
      :title="window.name"
      :isActive="window.isActive"
      :content="window.content"
      :resizingHandler="resizingHandler"
      :draggingHandler="draggingHandler"
      :activatorHanlder="activatorHanlder"
    />
  </ul>
</template>

<script>
import EditableWindow from "./EditableWindow";
import { SET_SIZE, SET_POSITION, SET_ACTIVE } from "../store/mutations-type";

export default {
  name: "EditableWindows",
  components: {
    EditableWindow
  },
  mounted: function() {
    this.windows = this.$store.getters.getWindows;
    this.yMax = window.innerHeight;
    this.xMax = window.innerWidth;

    window.addEventListener("resize", this.onResize);
  },
  methods: {
    onResize(e) {
      this.yMax = e.target.innerHeight;
      this.xMax = e.target.innerWidth;
    },
    activatorHanlder({ id }) {
      this.$store.commit({
        type: SET_ACTIVE,
        id
      });
    },
    resizingHandler({ w, h, id }) {
      this.$store.commit({
        type: SET_SIZE,
        w,
        h,
        id
      });
    },
    draggingHandler({ x, y, id }) {
      this.$store.commit({
        type: SET_POSITION,
        x,
        y,
        id
      });
    }
  },
  data: function() {
    return {
      windows: [],
      xMin: 0,
      yMin: 0,
      xMax: 0,
      yMax: 0
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
  overflow: hidden;
}
</style>
