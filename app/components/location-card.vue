<script lang="ts" setup>
import type { MapPoint } from "~~/lib/types";

const props = defineProps<{
  mapPoint: MapPoint;
}>();

const mapStore = useMapStore();
</script>

<template>
  <NuxtLink
    class="card card-compact bg-base-300 border-2 h-40 w-72 mb-3 shrink-0 hover:cursor-pointer"
    :key="props.mapPoint.id"
    :to="props.mapPoint.to"
    :class="{
      'border-accent': isPointSelected(props.mapPoint, mapStore.selectedPoint),
      'border-transparent': !isPointSelected(
        props.mapPoint,
        mapStore.selectedPoint
      ),
    }"
    @mouseenter="mapStore.selectedPoint = props.mapPoint"
    @mouseleave="mapStore.selectedPoint = null"
  >
    <div class="card-body">
      <slot name="top" />
      <h3 class="text-xl">
        {{ props.mapPoint.name }}
      </h3>
      <p>{{ props.mapPoint.description }}</p>
    </div>
  </NuxtLink>
</template>
