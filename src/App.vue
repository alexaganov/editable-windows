<template>
  <div id="app">
    <!-- <Sidebar /> -->
    <Content />
  </div>
</template>

<script>
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";

export default {
  name: "App",
  components: {
    Sidebar,
    Content
  },
  mounted: function() {}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  min-height: 100vh;
  display: flex;
}
</style>
