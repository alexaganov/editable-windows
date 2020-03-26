<template>
  <div
    class="draggable"
    :class="{ 'draggable_is-dragging': isDragging, draggable_debug: debug }"
    :style="isDragging && draggingStyles"
    @mousemove="drag"
    @mouseup="endDrag"
    @mouseleave="endDrag"
  >
    <div class="draggable__dragger" @mousedown.prevent="startDragging">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Draggable",
  props: {
    outer: { type: Number, default: 200 },
    debug: Boolean
  },
  computed: {
    draggingStyles() {
      return {
        padding: `${this.outer}px`,
        left: `${-this.outer}px`,
        top: `${-this.outer}px`
      };
    }
  },
  methods: {
    startDragging(e) {
      if (
        !this.isDragging &&
        (e.target.classList.contains("draggable__dragger") ||
          e.target.closest(".draggable__dragger"))
      ) {
        this.isDragging = true;
        this.initialX = e.clientX;
        this.initialY = e.clientY;

        this.$emit("start-dragging");
      }
    },
    drag(e) {
      if (this.isDragging) {
        const xDir = e.clientX - this.initialX;
        const yDir = e.clientY - this.initialY;

        this.initialX = e.clientX;
        this.initialY = e.clientY;

        this.$emit("dragging", { xDir, yDir });
      }
    },
    endDrag() {
      if (this.isDragging) {
        this.isDragging = false;

        this.$emit("end-dragging");
      }
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

<style lang="scss">
.draggable {
  $draggable: &;
  position: absolute;
  box-sizing: content-box;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;

  &__dragger {
    width: 100%;
    height: 100%;
    position: relative;
  }

  &_is-dragging {
    z-index: 40;

    #{$draggable}__dragger {
      cursor: move;
    }
  }

  &_debug {
    background-color: rgba(82, 255, 180, 0.5);

    #{$draggable}__dragger {
      border: 1px solid #000;
      background-color: rgba(255, 82, 82, 0.5);
    }
  }
}
</style>
