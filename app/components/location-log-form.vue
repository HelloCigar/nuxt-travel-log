<script lang="ts" setup>
import { CENTER_MANILA } from "~~/lib/constants";
import { InsertLocationLog } from "~~/lib/db/schema";

const props = defineProps<{
  initialValues?: InsertLocationLog;
  onSubmit: (location: InsertLocationLog) => Promise<any>;
  onSubmitComplete: () => void;
  submitLabel: string;
  submitIcon: string;
}>();

const initialValues = {
  name: "",
  description: "",
  startedAt: Date.now() - 24 * 60 * 60 * 1000,
  endedAt: Date.now(),
  long: (CENTER_MANILA as [number, number])[0],
  lat: (CENTER_MANILA as [number, number])[1],
};
</script>

<template>
  <LocationBaseForm
    :schema="InsertLocationLog"
    :zoom="11"
    :initial-values="props.initialValues || initialValues"
    :on-submit
    :on-submit-complete
    :submit-label
    :submit-icon
    v-slot="{ errors, loading }"
  >
    <AppFormField
      name="name"
      label="Name"
      :error="errors.name"
      :disabled="loading"
    />
    <AppFormField
      name="description"
      label="Description"
      type="textarea"
      :error="errors.description"
      :disabled="loading"
    />
    <AppDateFormField
      name="startedAt"
      label="Started At"
      :value="initialValues.startedAt"
      :error="errors.startedAt"
      :disabled="loading"
    />
    <AppDateFormField
      name="endedAt"
      label="Ended At"
      :value="initialValues.endedAt"
      type="textarea"
      :error="errors.endedAt"
      :disabled="loading"
    />
  </LocationBaseForm>
</template>
