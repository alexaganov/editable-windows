<template>
  <div class="video">
    <video class="video__video" ref="video" v-bind="{...$props, ...$attrs}"></video>
    <div class="video__controls">
      <div class="video__controls-top"></div>
      <div class="video__controls-middle"></div>
      <div class="video__controls-bottom">
        <div class="video__controls-pause">
          <Button class="video__controls-pause-btn" variant="icon">
            <PlayIcon size="1.5x" />
          </Button>
        </div>
        <div class="video__controls-progress">
          <div class="video__contorls-progress-bar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button";
import { PlayIcon } from "vue-feather-icons";

export default {
  name: "Video",
  components: {
    Button,
    PlayIcon
  },
  methods: {
    isVideoPlaying(video) {
      return (
        video.currentTime > 0 &&
        !video.paused &&
        !video.ended &&
        video.readyState > 2
      );
    }
  },
  mounted() {
    const { video } = this.$refs;

    this.isPlaying = !video.paused;
  },
  data() {
    return {
      isPlaying: false
    };
  }
};
</script>

<style lang="scss">
.video {
  position: relative;
  background-color: #000;

  &__video {
    // object-fit: cover;
    margin: auto;
  }

  &__video,
  &__controls {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  &__controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__controls-top,
  &__controls-middle,
  &__controls-bottom {
    padding: 5px;
  }

  &__controls-bottom {
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>