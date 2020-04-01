<template>
  <Moveable
    class="editable-window"
    :tag="tag"
    :class="{
      'editable-window_is-dragging': isDragging,
      'editable-window_is-resizing': isResizing,
      'editable-window_is-active': isActive
    }"
    :initial-x="initialX"
    :initial-y="initialY"
    :initial-width="initialWidth"
    :initial-height="initialHeight"
    :min-x="minX"
    :min-y="minY"
    :min-width="minWidth"
    :min-height="minHeight"
    :resizers="resizers"
    @start-resizing="onStartResizing"
    @resizing="onResizing"
    @end-resizing="onEndResizing"
    @start-dragging="onStartDragging"
    @dragging="onDragging"
    @end-dragging="onEndDragging"
    :title="name"
  >
    <div class="editable-window__main">
      <div class="editable-window__controls">
        <Button variant="icon" title="Edit" @click="onEdit">
          <EditIcon size="2x" stroke-width="1" />
        </Button>
      </div>
      <div class="editable-window__content">
        <p
          class="editable-window__content-text"
          v-if="content.type === contentTypes.TEXT"
        >{{ content.data }}</p>
        <img
          class="editable-window__content-image"
          v-else-if="content.type === contentTypes.IMAGE"
          :src="content.data.src"
          :alt="content.data.name"
        />
        <video
          class="editable-window__content-video"
          v-else-if="content.type === contentTypes.VIDEO"
          :src="content.data.src"
          ref="video"
          muted
          loop
        ></video>
      </div>
    </div>
  </Moveable>
</template>

<script>
import Moveable from "./Moveable";
import Button from "./Button";
import { EditIcon } from "vue-feather-icons";
import { TEXT, IMAGE, VIDEO } from "../store/content-types";

export default {
  name: "EditableWindow",
  components: {
    Moveable,
    Button,
    EditIcon
  },
  props: {
    tag: String,
    initialX: Number,
    initialY: Number,
    initialWidth: Number,
    initialHeight: Number,
    name: String,
    id: Number,
    resizers: [Array, String],
    content: Object,
    walls: Boolean,
    minX: Number,
    maxX: Number,
    minY: Number,
    maxY: Number,
    minWidth: Number,
    maxWidth: Number,
    minHeight: Number,
    maxHeight: Number,
    isActive: Boolean
  },
  computed: {
    hanldedContent() {
      const { type, content } = this.content;

      switch (type) {
        case this.contentTypes.TEXT:
          return content;

        case this.contentTypes.IMAGE:
          return <EditIcon />;

        default:
          return null;
      }
    }
  },
  updated() {
    const { video } = this.$refs;

    if (video) {
      if (this.isActive) {
        video.play();
      } else {
        video.pause();
      }
    }
  },
  mounted() {},
  methods: {
    onStartDragging(data) {
      this.isDragging = true;
      this.$emit("start-dragging", this.id, data);
    },
    onDragging(data) {
      this.$emit("dragging", this.id, data);
    },
    onEndDragging(data) {
      this.isDragging = false;
      this.$emit("end-dragging", this.id, data);
    },
    onStartResizing(data) {
      this.isResizing = true;
      this.$emit("start-resizing", this.id, data);
    },
    onResizing(data) {
      this.$emit("resizing", this.id, data);
    },
    onEndResizing(data) {
      this.isResizing = false;
      this.$emit("end-resizing", this.id, data);
    },
    onEdit() {
      this.$emit("edit", this.id);
    }
  },
  data() {
    return {
      contentTypes: {
        TEXT,
        IMAGE,
        VIDEO
      },
      isDragging: false,
      isResizing: false
    };
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.editable-window {
  position: absolute;
  display: inline-block;
  border: 1px solid $color-primary-dark;
  border-radius: 2px;
  background-color: $color-secondary;
  color: $text-color-primary-dark;
  transition: box-shadow 0.5s, border 0.5s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

  &_is-active {
    z-index: 100;
    border: 1px solid $text-color-primary;
    color: $text-color-primary;
    box-shadow: 0 0 20px -5px $color-primary;
  }

  &_is-resizing,
  &_is-dragging {
    // transition: none;
  }

  &_is-resizing {
    // transition: width 0s, height 0s;
  }

  &__controls {
    z-index: 20;
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    pointer-events: all;
    opacity: 0;
    transition: all 0.2s;
  }

  &_is-active:hover &__controls {
    opacity: 1;
  }

  &__main {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  &__content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__content-text {
    padding: 15px;
  }

  &__content-image,
  &__content-video {
    height: 100%;
    object-fit: cover;
    user-select: none;
  }
}
</style>
