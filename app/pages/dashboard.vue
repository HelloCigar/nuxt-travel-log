<script lang="ts" setup>
const isSideBarOpen = ref(true);

onMounted(() => {
  isSideBarOpen.value = localStorage.getItem("isSideBarOpen") == "true";
});

function toggleSidebar() {
  isSideBarOpen.value = !isSideBarOpen.value;
  localStorage.setItem("isSideBarOpen", isSideBarOpen.value.toString());
}
</script>

<template>
  <div class="flex-1 flex">
    <div
      class="bg-base-100 transition-all duration-300"
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
        <div class="divider"></div>
        <SidebarButton
          :showLabel="isSideBarOpen"
          icon="tabler:logout-2"
          href="/sign-out"
          label="Sign Out"
        />
      </div>
    </div>
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>
