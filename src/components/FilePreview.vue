<template>
  <div v-if="src" class="file-preview">
    <component
      class="file-preview__file"
      v-if="fileTag"
      :class="type && `file-preview__file_${type}`"
      :is="fileTag"
      :src="src"
      :controls="type === 'video'"
      :alt="type === 'image' && name"
    />
    <div class="file-preview__error-container">
      <span class="file-preview__error-msg">The type "{{type}}"" is unsupported</span>
    </div>
  </div>
</template>

<script>
import { IMAGE, VIDEO } from "../store/content-types";

export default {
  name: "FilePreview",
  props: {
    type: String,
    name: String,
    src: String
  },
  computed: {
    fileTag() {
      switch (this.type) {
        case this.types.IMAGE:
          return "img";
        case this.types.VIDEO:
          return "video";
      }

      return null;
    }
  },
  data() {
    return {
      types: {
        IMAGE,
        VIDEO
      }
    };
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.file-preview {
  height: inherit;
  overflow: hidden;
  border-radius: 5px;
  background-color: $color-secondary;
  box-shadow: $small-shadow;

  &__file {
    height: 100%;
  }

  &__file_image,
  &__file_video {
    object-fit: cover;
  }
}
</style>