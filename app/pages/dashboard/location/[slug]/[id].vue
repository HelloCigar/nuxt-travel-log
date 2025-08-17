<script lang="ts" setup>
const route = useRoute();
const locationStore = useLocationStore();
const {
  currentLocationLog: locationLog,
  currentLocationLogStatus: pending,
  currentLocationLogError: error,
} = storeToRefs(locationStore);

const loading = computed(() => pending.value);
const errorMessage = computed(() => error.value?.statusMessage);

onMounted(() => {
  locationStore.refreshCurrentLogLocation();
});
</script>

<template>
  <div class="page-content-top">
    <div v-if="loading">
      <div class="loading" />
    </div>
    <div v-if="errorMessage && !loading" class="alert alert-error">
      <h2 class="text-lg">
        {{ errorMessage }}
      </h2>
    </div>
    <div
      v-if="
        route.name === 'dashboard-location-slug-id' && locationLog && !loading
      "
    >
      <p class="text-sm italic text-grey-500">
        <span
          v-if="
            formatDate(locationLog.startedAt) !==
            formatDate(locationLog.endedAt)
          "
        >
          {{ formatDate(locationLog.startedAt) }} /
          {{ formatDate(locationLog.endedAt) }}
        </span>
        <span v-else>
          {{ formatDate(locationLog.startedAt) }}
        </span>
      </p>
      <h2 class="text-xl">
        {{ locationLog.name }}
        <!-- <div class="dropdown dropdown-bottom">
          <div tabindex="0" role="button" class="btn btn-sm m-1 p-0">
            <Icon name="tabler:dots-vertical" size="20" />
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <NuxtLink
                :to="{
                  name: 'dashboard-location-slug-edit',
                  params: { slug: route.params.slug },
                }"
              >
                <Icon name="tabler:map-pin-cog" size="20" />
                Edit
              </NuxtLink>
            </li>
            <li>
              <NuxtLink @click="openDialog">
                <Icon
                  name="tabler:trash-x-filled"
                  size="20"
                  class="text-error"
                />
                Delete
              </NuxtLink>
            </li>
          </ul>
        </div> -->
      </h2>
      <p class="text-sm">
        {{ locationLog.description }}
      </p>
    </div>
  </div>
</template>
