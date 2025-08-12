<script setup lang="ts">
const props = defineProps<{
  error?: string;
  label: string;
  name: string;
  type?: "text" | "textarea" | "number";
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">{{ props.label }}</legend>
    <Field
      class="w-full input"
      :class="{
        'input-error': props.error,
        input: !props.type || props.type === 'text',
        textarea: props.type === 'textarea',
      }"
      :name="props.name"
      :type="props.type || 'text'"
      placeholder="Type here"
      :disabled="disabled"
    />
    <p v-if="error" class="fieldset-label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
