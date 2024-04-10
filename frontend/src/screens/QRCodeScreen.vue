<script setup lang="ts">
import { ref } from 'vue'
import { useQRCode } from '@vueuse/integrations/useQRCode'

const text = ref('text-to-encode')
const qrcode = useQRCode(text)
</script>

<template>
<h1>QR-Code</h1>
<input v-model="text" type="text" />
<img :src="qrcode" alt="QR Code" />
</template>