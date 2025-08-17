<script lang="ts" setup>
import type { InsertLocationLog } from "~~/lib/db/schema";
const route = useRoute();
const locationStore = useLocationStore();
const { $csrfFetch } = useNuxtApp();

const {
  currentLocationLog: locationLog,
  currentLocationLogError: error,
  currentLocationLogStatus: pending,
} = storeToRefs(locationStore);

async function onSubmit(values: InsertLocationLog) {
  await $csrfFetch(`/api/locations/${route.params.slug}/${route.params.id}`, {
    method: "put",
    body: values,
  });
}

function onSubmitComplete() {
  navigateTo({
    name: "dashboard-location-slug-id",
    params: {
      slug: route.params.slug,
      id: route.params.id,
    },
  });
}
</script>
<template>
  <LocationLogForm
    v-if="locationLog"
    submit-label="Update Location Log"
    submit-icon="tabler:map-pin-up"
    :on-submit="onSubmit"
    :on-submit-complete="onSubmitComplete"
    :initial-values="locationLog"
  />
</template>
