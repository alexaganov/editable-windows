<template>
  <ul class="editable-windows">
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
      :walls="true"
      :name="window.name"
      :isActive="window.isActive"
      :content="window.content"
      :handleResizing="setSize"
      :handleDragging="setPosition"
      :handleActivation="setActive"
    />
  </ul>
</template>

<script>
import EditableWindow from "./EditableWindow";
import { SET_SIZE, SET_POSITION, SET_ACTIVE } from "../store/mutations-type";
import { mapMutations } from "vuex";

export default {
  name: "EditableWindows",
  components: {
    EditableWindow
  },
  mounted: function() {
    this.windows = this.$store.getters.getWindows;
    this.yMax = this.$el.offsetHeight;
    this.xMax = this.$el.offsetWidth;

    window.addEventListener("resize", this.onResize);
  },
  methods: {
    ...mapMutations({
      setSize: SET_SIZE,
      setPosition: SET_POSITION,
      setActive: SET_ACTIVE
    }),
    onResize() {
      this.yMax = this.$el.offsetHeight;
      this.xMax = this.$el.offsetWidth;
    }
  },
  destroyed: function() {
    window.removeEventListener("resize", this.onResize);
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
