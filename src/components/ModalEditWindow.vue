<template>
  <Modal class="edit-window-modal" v-model="show">
    <div class="edit-window-modal__content">
      <div class="edit-window-modal__header">
        <h2 class="edit-window-modal__title">Edit window form</h2>
        <Button class="edit-window-modal__close-button" variant="icon">
          <XIcon />
        </Button>
      </div>
      <div class="edit-window-modal__body">
        <RadioButtonGroup name="content-type" class="edit-window-modal__radio-button-group">
          <RadioButton
            v-for="(contentType, label, index) in contentTypes"
            :key="contentType"
            :value="index"
            :label="label"
            v-model="currentContentType"
          />
        </RadioButtonGroup>
        <div class="edit-window-modal__edit-area">
          <TextArea
            class="edit-window-modal__text-area"
            v-if="currentContentType === contentTypes['Text']"
          />
          <FileUploader
            @drop="onUploadFile"
            class="edit-window-modal__file-uploader"
            v-if="currentContentType === contentTypes['Image'] || currentContentType === contentTypes['Video']"
          >
            <div class="edit-window-modal__file-uploader-inner">
              <span class="edit-window-modal__file-uploader-icon">
                <ImageIcon
                  v-if="currentContentType === contentTypes['Image']"
                  size="2x"
                  stroke-width="1"
                />
                <FilmIcon v-else size="2x" stroke-width="1" />
              </span>
              <p class="edit-window-modal__description">Choose or Drop file here</p>
            </div>
          </FileUploader>
        </div>
      </div>
      <div class="edit-window-modal__footer">
        <ButtonGroup>
          <Button>Close</Button>
          <Button variant="solid">Accept</Button>
        </ButtonGroup>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "./Modal";
import Button from "./Button";
import RadioButton from "./RadioButton";
import RadioButtonGroup from "./RadioButtonGroup";
import TextArea from "./TextArea";
import FileUploader from "./FileUploader";
import ButtonGroup from "./ButtonGroup";
import { TEXT, IMAGE, VIDEO } from "../store/content-types";
import { ImageIcon, XIcon, FilmIcon } from "vue-feather-icons";

export default {
  name: "ModalEditWindow",
  props: {
    windowName: String
  },
  components: {
    Modal,
    Button,
    RadioButton,
    RadioButtonGroup,
    TextArea,
    FileUploader,
    ButtonGroup,
    XIcon,
    ImageIcon,
    FilmIcon
  },
  methods: {
    onUploadFile(e) {
      console.log(e);
    }
  },
  data() {
    return {
      contentTypes: {
        Text: TEXT,
        Image: IMAGE,
        Video: VIDEO
      },
      currentContentType: TEXT,
      show: true
    };
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.edit-window-modal {
  color: $color-primary;

  &__content {
    background-color: $color-secondary-dark;
    border-radius: 2px;
  }

  &__header {
    border-bottom: 1px solid $color-secondary;
    padding: 30px 30px 15px 30px;
    position: relative;
  }

  &__close-button {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  &__title {
    color: $color-primary;
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: 300;
    text-shadow: 0 0 10px $color-primary;
    letter-spacing: 2px;
    position: relative;
    /* 
    &:after {
      content: "";
      width: 2.5em;
      height: 3px;
      left: 0;
      bottom: -1em;
      display: block;
      margin-top: 8px;
      background-color: $color-primary;
      box-shadow: 0 0 10px $color-primary;
    } */
  }

  &__body {
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
  }

  &__edit-area {
    height: 10em;
  }

  &__file-uploader {
    height: 100%;
  }

  &__file-uploader-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: $color-primary-dark;
    user-select: none;
    padding: 15px;
    height: inherit;
    transition: all 0.2s;
    cursor: pointer;
    font-weight: 300;

    &:hover {
      color: $color-primary;
      text-shadow: 0 0 10px $color-primary;
    }
  }

  &__radio-button-group {
    align-self: center;
    width: 100%;
    margin-bottom: 20px;
  }

  &__file-uploader-icon {
    display: inline-block;
    margin-bottom: 0.3em;
  }

  &__file-uploader-inner:hover &__file-uploader-icon {
    filter: drop-shadow(0px 0px 10px $color-primary);
  }

  &__text-area {
    height: 100%;
  }

  &__footer {
    border-top: 1px solid $color-secondary;
    display: flex;
    justify-content: flex-end;
    padding: 15px 30px 20px 30px;
  }

  &__subtitle {
    color: $color-primary-dark;
    font-size: 1.5em;
  }
}
</style>