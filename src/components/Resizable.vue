<template>
  <div class="resizable">
    <div class="resizable__resizers" :style="resizersStyle">
      <Resizer
        v-for="resizer in activeResizers"
        :key="resizer"
        :debug="debug"
        :type="resizer"
        :size="resizerSize"
        :outer="resizerOuter"
        @start-resizing="onStartResizing"
        @resizing="onResizing"
        @end-resizing="onEndResizing"
      />
    </div>
  </div>
</template>

<script>
import { getArrayWithoutDuplicates } from "../helpers";
import Resizer from "./Resizer";

import {
  RESIZER_ALL_TYPES,
  RESIZER_BORDER_TYPES,
  RESIZER_CORNER_TYPES
} from "./Resizer";

export const ALL = "all";
export const BORDERS = "borders";
export const CORNERS = "corners";

export const RESIZER_TYPES = {
  [ALL]: RESIZER_ALL_TYPES,
  [BORDERS]: RESIZER_BORDER_TYPES,
  [CORNERS]: RESIZER_CORNER_TYPES
};

const isResizerExist = resizer => {
  return resizer in RESIZER_TYPES || RESIZER_TYPES[ALL].indexOf(resizer) !== -1;
};

export default {
  name: "Resizable",
  components: {
    Resizer
  },
  props: {
    resizers: {
      type: [Array, String],
      default() {
        return RESIZER_TYPES[ALL];
      },
      validator(resizers) {
        resizers = typeof resizers === "string" ? [resizers] : resizers;

        return resizers.every(isResizerExist);
      },
      required: false
    },
    resizerSize: { type: Number, default: 10 },
    resizerOuter: Number,
    debug: Boolean
  },
  computed: {
    activeResizers() {
      const result = [];
      const resizers =
        typeof this.resizers === "string"
          ? [this.resizers]
          : getArrayWithoutDuplicates(this.resizers);

      resizers.forEach(resizer => {
        if (resizer in RESIZER_TYPES && result.indexOf(resizer) === -1) {
          result.push(...RESIZER_TYPES[resizer]);
        } else {
          result.push(resizer);
        }
      });

      return result;
    },
    resizersStyle() {
      return {
        top: `${-this.resizerSize / 2}px`,
        right: `${-this.resizerSize / 2}px`,
        bottom: `${-this.resizerSize / 2}px`,
        left: `${-this.resizerSize / 2}px`
      };
    }
  },
  methods: {
    onStartResizing() {
      this.$emit("start-resizing");
    },
    onEndResizing() {
      this.$emit("end-resizing");
    },
    onResizing(data) {
      this.$emit("resizing", data);
    }
  }
};
</script>

<style lang="scss">
.resizable {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: all;

  &__resizers {
    position: absolute;
  }
}
</style>
