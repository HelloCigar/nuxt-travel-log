<script lang="ts" setup>
import { searchSchema } from "~~/lib/zod-schemas";
import type { NominatimResult } from "~~/lib/types";
import type { FetchError } from "ofetch";

const emit = defineEmits<{
  resultSelected: [result: NominatimResult];
}>();

const searchResults = ref<NominatimResult[]>([]);
const form = useTemplateRef("form");
const loading = ref(false);
const hasSearched = ref(false);
const errorMessage = ref("");

async function onSubmit(query: Record<string, string>) {
  loading.value = true;
  hasSearched.value = true;
  searchResults.value = [];
  errorMessage.value = "";
  const results = await $fetch("/api/search", {
    query,
  }).catch((e) => {
    const error = e as FetchError;
    errorMessage.value = getFetchErrorMessage(error);
    return [];
  });

  searchResults.value = results;
  loading.value = false;
}

function setLocation(result: NominatimResult) {
  emit("resultSelected", result);
  searchResults.value = [];
  hasSearched.value = false;
  errorMessage.value = "";
  if (form) {
    form.value?.resetForm;
  }
}
</script>
<template>
  <div class="flex flex-col gap-2">
    <div class="text-xs italic flex justify-end gap-1">
      <span>
        Search result provided by:
        <a
          target="_blank"
          rel="noopener nofollow"
          class="link"
          href="https://nominatim.openstreetmap.org/ui/search.html"
        >
          nominatim
        </a>
      </span>
    </div>
    <Form
      ref="form"
      class="flex flex-col gap-2 items-center"
      :validation-schema="toTypedSchema(searchSchema)"
      :initial-values="{ q: '' }"
      @submit="onSubmit"
      v-slot="{ errors }"
    >
      <div class="join mt-2">
        <div>
          <label class="input join-item">
            <Icon name="tabler:search" />
            <Field
              class="w-full"
              name="q"
              type="text"
              placeholder="Search for a location..."
              :disabled="loading"
              :class="{
                'input-error': errors.q,
              }"
            />
          </label>
          <div v-if="errors.q" class="text-error text-xs mt-1">
            {{ errors.q }}
          </div>
        </div>
        <button :disabled="loading" class="btn btn-neutral join-item">
          Search
        </button>
      </div>
    </Form>
    <div v-if="!loading && errorMessage" role="alert" class="alert alert-error">
      <span>{{ errorMessage }}</span>
    </div>
    <div
      v-if="!loading && hasSearched && !searchResults.length"
      role="alert"
      class="alert alert-warning"
    >
      <span>No results found</span>
    </div>
    <div v-if="loading" class="flex justify-center">
      <div class="loading loading-lg"></div>
    </div>
    <div class="flex flex-col overflow-auto gap-2 max-h-52 mt-3">
      <div
        v-for="result in searchResults"
        class="card card-sm bg-base-100"
        :key="result.place_id"
      >
        <div class="card-body">
          <h4 class="card-title">
            {{ result.display_name }}
          </h4>
          <div class="justify-end card-actions">
            <button class="btn btn-warning btn-sm" @click="setLocation(result)">
              Set Location
              <Icon name="tabler:map-pin-share" size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
