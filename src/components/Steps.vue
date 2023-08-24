<template>
    <n-space vertical>
      <n-steps :current="(current as number)" :status="currentStatus">
        <n-step
          title="購物車"
        />
        <n-step
          title="付款"
        />
        <n-step
          title="完成訂單"
        />
      </n-steps>
      <n-space>
        <n-button-group>
          <n-button @click="prev">
            <template #icon>
              <n-icon>
                <md-arrow-round-back />
              </n-icon>
            </template>
          </n-button>
          <n-button @click="next">
            <template #icon>
              <n-icon>
                <md-arrow-round-forward />
              </n-icon>
            </template>
          </n-button>
        </n-button-group>
      </n-space>
    </n-space>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { MdArrowRoundBack, MdArrowRoundForward } from '@vicons/ionicons4'
  
  export default defineComponent({
    components: {
      MdArrowRoundBack,
      MdArrowRoundForward
    },
    setup () {
      const currentRef = ref<number | null>(1)
      return {
        currentStatus: ref<StepsProps['status']>('process'),
        current: currentRef,
        next () {
          if (currentRef.value === null) currentRef.value = 1
          else if (currentRef.value >= 3) currentRef.value = null
          else currentRef.value++
        },
        prev () {
          if (currentRef.value === 0) currentRef.value = null
          else if (currentRef.value === null) currentRef.value = 3
          else currentRef.value--
        }
      }
    }
  })
  </script>

<style scoped>
.n-space {
    width: 70%;
  margin: 0 auto;
  margin-top: 100px;
}
</style>