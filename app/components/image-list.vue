<script lang="ts" setup>
import type { SelectLocationLogImage } from "~~/lib/db/schema";
const visibleRef = ref(false);
const indexRef = ref(0);
const showImg = (index: number) => {
  indexRef.value = index;
  visibleRef.value = true;
};
const onHide = () => (visibleRef.value = false);

defineProps<{
  images: SelectLocationLogImage[];
}>();

const config = useRuntimeConfig();
</script>

<template>
  <div class="flex mt-2 gap-2 overflow-auto">
    <div
      v-for="(image, index) in images"
      :key="image.id"
      class="card card-compact h-40 w-64 shrink-0 flex items-center justify-center bg-base-300"
    >
      <div class="card-body size-full">
        <img
          class="size-full object-cover hover:cursor-pointer"
          :src="`${config.public.s3BucketUrl}/${image.key}`"
          @click="showImg(index)"
        />
        <slot :image />
      </div>
    </div>
    <VueEasyLightbox
      v-if="images"
      :visible="visibleRef"
      :imgs="images.map((image) => `${config.public.s3BucketUrl}/${image.key}`)"
      :index="indexRef"
      @hide="onHide"
    />
  </div>
</template>
