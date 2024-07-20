<template>
  <div style="height: 100%">
    <h1 class="header">My Conferences
      <div class="create-btn" @click="showOverlay()">Create</div>
    </h1>
    <template v-if="overlay === Visibility.Visible">
      <div class="overlay-cont">
        <div class="cont">
          <img class="cross" @click="hideOverlay()" :src="closeUrl" />
          <h1 style="margin-top: 0">Create Conference</h1>
          <div class="call-form">
            <form>
              <div class="input">
                <div class="header">Name</div>
                <input class="txt" v-model="name" type="text" placeholder="Name" />
              </div>
              <div class="input">
                <div class="header">Description</div>
                <textarea placeholder="Description" v-model="description" style="font-size: 16px;
                font-family: 'Proxima-Nova', 'sans-serif';
                height: 100px; resize: vertical; max-height: 200px" class="txt"></textarea>
              </div>
              <div class="input">
                <div class="header">Type</div>
              </div>
              <div class="select">
                <div class="option" :class="{ 'option-selected': confType === ConferenceType.Public }"
                     @click="setOption(ConferenceType.Public)">
                  <div class="round">
                    <div class="round-active"></div>
                  </div>
                  <div class="text">Public</div>
                </div>
                <div class="option" :class="{ 'option-selected': confType === ConferenceType.Private }"
                     @click="setOption(ConferenceType.Private)">
                  <div class="round">
                    <div class="round-active"></div>
                  </div>
                  <div class="text">Private</div>
                </div>
              </div>
              <input class="submit" type="submit" value="Create"/>
            </form>
          </div>
        </div>
      </div>
    </template>
    <div class="conferences">
      <template v-if="conferencesList.length === 0">
        <div class="label">You don't have any conference</div>
      </template>
      <template v-if="conferencesList.length > 0">
        <div class="">conferences</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {ConferenceType, Visibility} from "../types/enum";

  const closeUrl = new URL("../img/main/close.svg", import.meta.url).href;
  import {ref} from "vue";
  import {CallRaw} from "../../server/module/types";

  const name = ref<string>();
  const description = ref<string>();

  const overlay = ref<Visibility>(Visibility.Hidden);

  function showOverlay() {
    overlay.value = Visibility.Visible;
  }
  function hideOverlay() {
    overlay.value = Visibility.Hidden;
  }

  const confType = ref<ConferenceType>();

  function setOption(option: ConferenceType) {
    confType.value = option;
  }

  const conferencesList = ref<CallRaw[]>([]);
</script>

<style scoped lang="scss">
@import '../styles.scss';

$select-back: #EEEDFB;

.header {
  margin-top: 0;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}



.create-btn {
  $height: 18px;
  $pad-top: 12px;
  $radius: calc((2 * $pad-top + $height) / 2);

  display: flex;
  align-items: center;
  justify-content: center;
  height: $height;
  position: absolute;
  right: 20px;
  font-size: 18px;
  font-weight: normal;
  cursor: pointer;
  background-color: $main-blue;
  color: #fff;
  padding: $pad-top 30px $pad-top 30px;
  border-radius: $radius;
  &:hover {
    background-color: $main-blue-hover;
  }
}

.cont {
  padding: 40px 35px 20px 35px;
  border-radius: 15px;
  position: relative;
  background-color: #fff;
}

.call-form {
  .header {
    margin-bottom: 0;
  }
  .txt {
    width: 400px;
  }
}

.select {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .option {
    width: 180px;
    height: 30px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    align-items: center;
    font-size: 16px;
    border: 2px solid $grey;
    color: $main-text;
    background-color: #fff;
    cursor: pointer;
    .round {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid $grey;
      display: flex;
      justify-content: center;
      align-items: center;
      .round-active {
        width: 10px;
        height: 10px;
        background-color: #fff;
        border-radius: 50%;
      }
    }
  }
}

.option-selected {
  border-color: $main-blue !important;
  background-color: $hover-blue !important;
  color: $main-blue !important;
  .round {
    border-color: $main-blue !important;
    .round-active {
      background-color: $main-blue !important;
    }
  }
}

.submit {
  margin-top: 30px;
  color: #fff;
  background-color: $main-blue;
  padding: 10px 20px 10px 20px;
  outline: none;
  border: none;
  font-size: 16px;
  width: 160px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: $main-blue-hover;
  }
}

.label {
  font-size: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.conferences {
  height: calc(100% - 55px);
}
</style>