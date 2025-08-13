<script setup lang="ts">
import { point } from "drizzle-orm/pg-core";
import { CENTER_TULUNAN } from "~~/lib/constants";

const colorMode = useColorMode();
const mapStore = useMapStore();

const style = computed(() =>
  colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty"
);

onMounted(() => {
  mapStore.init();
});
const zoom = 8;
</script>

<template>
  <MglMap :map-style="style" :center="CENTER_TULUNAN" :zoom="zoom">
    <MglNavigationControl />
    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template v-slot:marker>
        <div
          class="tooltip tooltip-top hover:cursor-pointer"
          :data-tip="point.name"
          :class="{
            'tooltip-open': mapStore.selectedPoint === point,
          }"
          @mouseenter="mapStore.selectedPointWithoutFlyTo(point)"
          @mouseleave="mapStore.selectedPointWithoutFlyTo(null)"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="30"
            :class="
              mapStore.selectedPoint === point
                ? 'text-accent'
                : 'text-secondary'
            "
          />
        </div>
      </template>
      <MglPopup>
        <h3 class="text-xl">
          {{ point.name }}
        </h3>
        <p v-if="point.description">
          {{ point.description }}
        </p>
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>
