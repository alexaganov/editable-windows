<template>
  <main class="content">
    <EditableWindows />
  </main>
</template>

<script>
import EditableWindows from "./EditableWindows";

export default {
  name: "Content",
  components: {
    EditableWindows
  }
};
</script>

<style lang="scss">
.content {
  flex: 1 1 100%;
  position: relative;
  z-index: 10;
}
</style>
