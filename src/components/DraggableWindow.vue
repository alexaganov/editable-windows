<template>
  <div
    class="draggable-window"
    @mousedown="startDrag"
    @mouseup="stopDrag"
    @mousemove="drag"
    :style="styleTransform"
  >
    <div class="draggable-window-content"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DraggbleWindow",
  computed: {
    styleTransform() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        transform: `translate(${this.x}px, ${this.y}px)`
      };
    }
  },
  methods: {
    ...mapGetters({
      getMousePos: "getMousePos"
    }),
    startDrag(e) {
      const rect = this.$el.getBoundingClientRect();

      this.initialX = e.clientX - rect.left;
      this.initialY = e.clientY - rect.top;
      this.active = true;
    },
    drag() {
      if (this.active) {
        const { x, y } = this.getMousePos();

        this.x = x - this.initialX;
        this.y = y - this.initialY;
      }
    },
    stopDrag() {
      this.active = false;
    }
  },
  data: function() {
    return {
      width: 200,
      height: 200,
      x: 0,
      y: 0,
      initialX: 0,
      initialY: 0,
      active: false
    };
  }
};
</script>

<style>
.draggable-window {
  position: absolute;
  border-radius: 5px;
  border: 1px solid #444;
  cursor: move;
}
</style>
