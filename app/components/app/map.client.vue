<script setup lang="ts">
import { CENTER_MANILA } from "~~/lib/constants";
import type { LngLat, MapMouseEvent } from "maplibre-gl";
import type { MglEvent } from "@indoorequal/vue-maplibre-gl";
const zoom = 8;

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

function updateAddedPoint(location: LngLat) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lat = location.lat;
    mapStore.addedPoint.long = location.lng;
  }
}

function onDoubleClick(mglEvent: MglEvent<"dblclick">) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lat = mglEvent.event.lngLat.lat;
    mapStore.addedPoint.long = mglEvent.event.lngLat.lng;
  }
}
</script>

<template>
  <MglMap
    :map-style="style"
    :center="CENTER_MANILA"
    :zoom="zoom"
    @map:dblclick="onDoubleClick"
  >
    <MglNavigationControl />
    <MglMarker
      v-if="mapStore.addedPoint"
      class-name="z-50"
      :coordinates="[mapStore.addedPoint.long, mapStore.addedPoint.lat]"
      @update:coordinates="updateAddedPoint"
      draggable
    >
      <template v-slot:marker>
        <div
          class="tooltip tooltip-top tooltip-open hover:cursor-pointer"
          data-tip="Drag/double-click to your desired location"
        >
          <Icon name="tabler:map-pin-filled" size="30" class="text-warning" />
        </div>
      </template>
    </MglMarker>
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
          @mouseenter="mapStore.selectedPoint = point"
          @mouseleave="mapStore.selectedPoint = null"
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
