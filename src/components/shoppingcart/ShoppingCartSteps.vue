<template>
  <div class="main-container">
    <div class="steps-container">
      <div class="steps">
        <div class="step" v-for="(step, index) in steps" :key="index" :class="{ active: current === index }">
          {{ index + 1 }}
          <div class="step-description">{{ step.title }}</div>
        </div>
      </div>
    </div>

    <div class="button-container">
      <button @click="prev" :disabled="current === 0">
        上一步
      </button>
      <button @click="next" :disabled="current === steps.length - 1">
        下一步
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const currentRef = ref(0);
    const steps = [
      { title: "購物車", description: "購物車內容" },
      { title: "選擇時間與付款資訊", description: "選擇時間和付款資訊" },
      { title: "完成訂單", description: "完成訂單流程" }
    ];

    const next = () => {
      if (currentRef.value < steps.length - 1) {
        currentRef.value++;
      }
    };

    const prev = () => {
      if (currentRef.value > 0) {
        currentRef.value--;
      }
    };

    return {
      current: currentRef,
      steps,
      next,
      prev
    };
  }
});
</script>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.steps-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.steps {
  display: flex;
  gap: 40px; /* 調整步驟之間的間距 */
}

.step {
  position: relative;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center; /* 居中文字 */
  width: 60px; /* 固定寬度以確保框框不會過寬 */
}

.step.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

.step.active + .step {
  border-color: black;
}

.step:not(:first-child)::before {
  content: "";
  width: 20px;
  border-top: 1px solid #ccc;
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
}

.step.active + .step::before {
  border-color: black;
}

.step-description {
  margin-top: 5px;
  color: #666;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
