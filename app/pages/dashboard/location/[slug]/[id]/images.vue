<script lang="ts" setup>
const image = ref<File | null>(null)
const previewUrl = ref<string | null>()
const locationsStore = useLocationStore();

const { currentLocationLog: locationLog } = storeToRefs(locationsStore)

function selectImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
        image.value = file;
        previewUrl.value = URL.createObjectURL(file);
    }
}
</script>
<template>
  <div>
    <h2 class="mb-2">Manage "{{ locationLog?.name || "Loading"}}" Images</h2>
    <div class="flex flex-col gap-2 w-72">
      <div class="bg-gray-500 h-30 w-full flex justify-center items-center p-0.5">
        <p v-if="!previewUrl" class="text-center text-white">Click below to select an image
        </p>
        <img v-else 
            class="h-full object-cover"
            :src="previewUrl" 
            alt="upload preview"
        />
      </div>
      <input type="file" class="file-input" @change="selectImage">
      <button class="btn btn-accent" :disabled="!image">
        Upload
      </button>
    </input>
    </div>
  </div>
</template>
