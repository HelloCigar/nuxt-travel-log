<script lang="ts" setup>
const isSideBarOpen = ref(true);
const sidebarStore = useSidebarStore();
const route = useRoute();
const locationStore = useLocationStore();
const mapStore = useMapStore();

onMounted(() => {
  isSideBarOpen.value = localStorage.getItem("isSideBarOpen") == "true";
  if (route.path !== "/dashboard") {
    locationStore.refresh;
  }
});

function toggleSidebar() {
  isSideBarOpen.value = !isSideBarOpen.value;
  localStorage.setItem("isSideBarOpen", isSideBarOpen.value.toString());
}
</script>

<template>
  <div class="flex-1 flex">
    <div
      class="bg-base-100 transition-all duration-300 shrink-0"
      :class="{ 'w-64': isSideBarOpen, 'w-16': !isSideBarOpen }"
    >
      <div
        class="flex hover:cursor-pointer hover:bg-base-200 p-2"
        :class="{
          'justify-center': !isSideBarOpen,
          'justify-end': isSideBarOpen,
        }"
        @click="toggleSidebar"
      >
        <Icon v-if="isSideBarOpen" name="tabler:chevron-left" size="32" />
        <Icon v-else name="tabler:chevron-right" size="32" />
      </div>
      <div class="flex flex-col">
        <SidebarButton
          :showLabel="isSideBarOpen"
          icon="tabler:map"
          label="Locations"
          href="/dashboard"
        />
        <SidebarButton
          :showLabel="isSideBarOpen"
          icon="tabler:circle-plus-filled"
          label="Add Location"
          href="/dashboard/add"
        />
        <div
          v-if="sidebarStore.loading || sidebarStore.sidebarItems.length"
          class="divider"
        ></div>
        <div v-if="sidebarStore.loading" class="px-4">
          <div class="skeleton h-4 w-full"></div>
        </div>
        <div
          v-if="!sidebarStore.loading && sidebarStore.sidebarItems.length"
          class="flex flex-col"
        >
          <SidebarButton
            v-for="item in sidebarStore.sidebarItems"
            :showLabel="isSideBarOpen"
            :key="item.id"
            :label="item.label"
            :icon="item.icon"
            :href="item.href"
            :icon-color="
              mapStore.selectedPoint === item.location
                ? 'text-accent'
                : undefined
            "
            @mouseenter="mapStore.selectedPoint = item.location ?? null"
            @mouseleave="mapStore.selectedPoint = null"
          />
        </div>

        <div class="divider"></div>
        <SidebarButton
          :showLabel="isSideBarOpen"
          icon="tabler:logout-2"
          href="/sign-out"
          label="Sign Out"
        />
      </div>
    </div>
    <div class="flex-1 overflow-auto bg-base-200">
      <div
        class="flex size-full"
        :class="{
          'flex-col': route.path !== '/dashboard/add',
        }"
      >
        <NuxtPage />
        <AppMap class="flex-1" />
      </div>
    </div>
  </div>
</template>
