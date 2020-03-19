<template>
  <div
    class="draggable"
    :class="{'draggable_dragging': isDragging}"
    @mousedown.prevent="startDrag"
    @mouseup="endDrag"
    @mousemove="drag"
    @mouseleave="endDrag"
    :style="draggableStyle"
  >
    <div class="draggable__dragger" :style="draggerStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DraggableNew",
  props: {
    w: {
      type: Number,
      default: 200
    },
    h: {
      type: Number,
      default: 200
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    outer: {
      type: Number,
      default: 100
    },
    onDrag: {
      type: Function,
      required: true
    }
  },
  computed: {
    draggableStyle() {
      return {
        padding: `${this.outer}px`,
        transform: `translate(${this.x}px, ${this.y}px)`
      };
    },
    draggerStyle() {
      return {
        width: `${this.w}px`,
        height: `${this.h}px`
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
      }
    },
    drag(e) {
      if (this.isDragging) {
        const xDir = e.clientX - this.initialX;
        const yDir = e.clientY - this.initialY;

        this.onDrag({
          xDir,
          yDir,
          eventType: "drag"
        });

        this.initialX = e.clientX;
        this.initialY = e.clientY;
      }
    },
    endDrag() {
      this.isDragging = false;
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
}

.draggable_dragging {
  z-index: 10;
}

.draggable_dragging .draggable__dragger {
  cursor: move;
}

.draggable__dragger {
  border: 1px solid #000;
  z-index: 1;
  position: relative;
}
</style>