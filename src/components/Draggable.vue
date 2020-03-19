<template>
  <ul class="draggable-area">
    <DraggableItem
      v-for="({width, height, x, y, isActive, id}) in elements"
      :key="id"
      :id="id"
      :width="width"
      :height="height"
      :x="x"
      :y="y"
      :isActive="isActive"
      @onActive="onActive"
      @onResize="onResize"
      @onDrag="onDrag"
    >text</DraggableItem>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_SIZE, SET_POSITION, SET_ACTIVE } from "../store/mutations-type";
import DraggableItem from "./DraggableItem";

export default {
  name: "Draggable",
  components: {
    DraggableItem
  },
  props: {
    data: Array,
    default: []
  },
  computed: {},
  mounted: function() {
    this.elements = this.getElements();
  },
  methods: {
    ...mapGetters(["getElements"]),
    onActive(id, isActive) {
      this.$store.commit({
        type: SET_ACTIVE,
        id,
        isActive
      });
    },
    onResize(id, width, height) {
      this.$store.commit({
        type: SET_SIZE,
        id,
        width,
        height
      });
    },
    onDrag(id, x, y) {
      this.$store.commit({
        type: SET_POSITION,
        id,
        x,
        y
      });
    }
  },
  data: function() {
    return {
      elements: []
    };
  }
};
</script>

<style>
.draggable-area {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  list-style: none;
}
</style>
