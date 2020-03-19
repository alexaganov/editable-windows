<template>
  <div
    class="draggable"
    :class="{ 'draggable_is-dragging': isDragging, draggable_debug: debug }"
    :style="isDragging && draggingStyle"
    @mousemove.prevent="drag"
    @mouseup="endDrag"
    @mouseleave="endDrag"
  >
    <div class="draggable__dragger" @mousedown.prevent="startDrag">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Draggable",
  props: {
    outer: {
      type: Number,
      default: 200
    },
    debug: Boolean
  },
  computed: {
    draggingStyle() {
      return {
        padding: `${this.outer}px`,
        left: `${-this.outer}px`,
        top: `${-this.outer}px`
      };
    }
  },
  methods: {
    startDrag(e) {
      if (
        e.target.classList.contains("draggable__dragger") ||
        e.target.closest(".draggable__dragger")
      ) {
        this.isDragging = true;
        this.initialX = e.clientX;
        this.initialY = e.clientY;

        this.$emit("dragging", { stage: "start" });
      }
    },
    drag(e) {
      if (this.isDragging) {
        const xDir = e.clientX - this.initialX;
        const yDir = e.clientY - this.initialY;

        this.$emit("dragging", {
          xDir,
          yDir,
          stage: "dragging"
        });

        this.initialX = e.clientX;
        this.initialY = e.clientY;
      }
    },
    endDrag() {
      this.isDragging = false;

      this.$emit("dragging", { stage: "end" });
    }
  },
  data: function() {
    return {
      initialX: 0,
      initialY: 0,
      isDragging: false
    };
  }
};
</script>

<style>
.draggable {
  position: absolute;
  box-sizing: content-box;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.draggable_is-dragging {
  z-index: 30;
}

.draggable_debug {
  background-color: rgba(0, 255, 26, 0.4);
}

.draggable_debug .draggable__dragger {
  border: 1px solid #000;
  background-color: rgba(255, 0, 0, 1);
}

.draggable_is-dragging .draggable__dragger {
  cursor: move;
}

.draggable__dragger {
  width: 100%;
  height: 100%;
  z-index: 10;
  position: relative;
}
</style>
