<script lang="ts" setup>
import { FetchError } from "ofetch";

const route = useRoute();
const locationsStore = useLocationStore();
const { currentLocationLog: locationLog } = storeToRefs(locationsStore);

const image = ref<File | null>(null);
const previewUrl = ref<string | null>();
const loading = ref(false);
const errorMessage = ref("");
const imageInput = useTemplateRef("imageInput");

const { $csrfFetch } = useNuxtApp();

function selectImage(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file) {
    image.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

async function getCheckSum(blob: Blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
}

async function uploadImage() {
  if (!image.value || !previewUrl.value) return;

  loading.value = true;
  const previewImage = new Image();
  previewImage.addEventListener("load", async () => {
    console.log(previewImage.width, previewImage.height);
    const width = Math.min(1000, previewImage.width);
    const resized = await createImageBitmap(previewImage, {
      resizeWidth: width,
    });

    const canvas = new OffscreenCanvas(width, resized.height);
    canvas.getContext("bitmaprenderer")?.transferFromImageBitmap(resized);
    const blob = await canvas.convertToBlob({
      type: "image/jpeg",
      quality: 0.9,
    });

    const checksum = await getCheckSum(blob);

    try {
      const { fields, key, url } = await $csrfFetch(
        `/api/locations/${route.params.slug}/${route.params.id}/sign-image`,
        {
          method: "POST",
          body: {
            contentLength: blob.size,
            checksum,
          },
        }
      );

      const formData = new FormData();

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      formData.append("file", blob);

      await $fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          "x-amz-checksum-algorithm": "SHA256",
        },
      });

      await $csrfFetch(
        `/api/locations/${route.params.slug}/${route.params.id}/image`,
        {
          method: "POST",
          body: {
            key,
          },
        }
      );

      await locationsStore.refreshCurrentLocationLog();

      image.value = null;
      previewUrl.value = null;
      errorMessage.value = "";

      if (imageInput.value) {
        imageInput.value.value = "";
      }
    } catch (e) {
      if (e instanceof FetchError) {
        errorMessage.value =
          (e as FetchError).statusMessage || "Unknown error occured.";
      } else if (e instanceof Error) {
        errorMessage.value = (e as FetchError).message;
      } else {
        errorMessage.value = "Unknown Error.";
      }
    }
    loading.value = false;
  });
  previewImage.src = previewUrl.value;
}
</script>
<template>
  <div>
    <h2 class="mb-2">Manage "{{ locationLog?.name || "Loading" }}" Images</h2>
    <div class="flex">
      <div class="flex flex-col gap-2 w-72">
        <div
          class="bg-gray-500 h-30 w-full flex justify-center items-center p-0.5 relative"
        >
          <p v-if="!previewUrl" class="text-center text-white">
            Click below to select an image
          </p>
          <img
            v-else
            class="h-full object-cover"
            :src="previewUrl"
            alt="upload preview"
          />
          <div
            v-if="loading || errorMessage"
            class="size-full absolute flex justify-center items-center bg-black opacity-50"
          >
            <div v-if="loading" class="loading loading-lg"></div>
            <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
          </div>
        </div>
        <input
          type="file"
          ref="imageInput"
          class="file-input"
          @change="selectImage"
          :disabled="loading"
        />
        <button
          @click="uploadImage"
          class="btn btn-accent"
          :disabled="!image || loading"
        >
          Upload
          <Icon name="tabler:photo-up" size="24" />
        </button>
      </div>
      <ImageList class="ml-2" :images="locationLog?.images || []" />
    </div>
  </div>
</template>
