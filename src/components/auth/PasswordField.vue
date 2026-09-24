<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    id: string
    label: string
    autocomplete?: string
    error?: string
    hint?: string
    showStrength?: boolean
    disabled?: boolean
  }>(),
  { autocomplete: 'current-password', error: '', hint: '', showStrength: false, disabled: false }
)
defineEmits<{ (e: 'update:modelValue', v: string): void; (e: 'blur'): void }>()

const visible = ref(false)

const strength = computed(() => {
  const v = props.modelValue
  if (!v) return { score: 0, label: '' }
  let score = 0
  if (v.length >= 6) score++
  if (v.length >= 10) score++
  if (/[a-z]/.test(v) && /[A-Z]/.test(v)) score++
  if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) score++
  return { score, label: ['Too short', 'Weak', 'Okay', 'Good', 'Strong'][score] }
})
</script>

<template>
  <div class="auth-field">
    <div class="auth-field__row">
      <label class="label" :for="id">{{ label }}</label>
      <slot name="aside" />
    </div>
    <div class="auth-input">
      <input
        :id="id"
        class="input"
        :type="visible ? 'text' : 'password'"
        :value="modelValue"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
        autocapitalize="none"
        spellcheck="false"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
      />
      <button
        type="button"
        class="auth-input__toggle"
        :aria-label="visible ? 'Hide password' : 'Show password'"
        :aria-pressed="visible"
        tabindex="0"
        @click="visible = !visible"
      >
        <Icon :name="visible ? 'eye-off' : 'eye'" :size="18" />
      </button>
    </div>
    <div v-if="showStrength && modelValue" class="auth-strength" :data-score="strength.score" aria-live="polite">
      <span class="auth-strength__bars"><i></i><i></i><i></i><i></i></span>
      <span class="auth-strength__label">{{ strength.label }}</span>
    </div>
    <p v-if="error" :id="`${id}-error`" class="field-error" role="alert">{{ error }}</p>
    <p v-else-if="hint" :id="`${id}-hint`" class="hint">{{ hint }}</p>
  </div>
</template>
