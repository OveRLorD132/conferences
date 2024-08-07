<template>
  <div class="dialog">
    dialog
  </div>
</template>

<script setup lang="ts">
import {Dialog} from "../../../types/enum";

const props = defineProps<{
  type: Dialog
}>()
</script>

<style scoped lang="scss" src="./ConferenceDialog.scss">

</style>