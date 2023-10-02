<template>
    <div class="login-page">
        <NCard class="container" sh>
            <NForm ref="formRef" :model="formData" :rules="formRules">
                <NFormItem>
                    <h2 class="text-center w-full">
                        登录
                    </h2>
                </NFormItem>
                <NFormItem label="账号" path="account">
                    <NInput v-model:value="formData.account" />
                </NFormItem>
                <NFormItem label="密码" path="password">
                    <NInput v-model:value="formData.password" />
                </NFormItem>
                <NFormItem>
                    <NButton
                        type="primary"
                        block
                        :loading="loading"
                        @click="onLogin()"
                    >
                        登录
                    </NButton>
                </NFormItem>
            </NForm>
        </NCard>
    </div>
</template>
<script setup lang="ts">
import { authService } from '@/services/auth';
import type { ILoginRequest } from '@/types/apis/request/auth/login';
import type { FormRules, FormInst } from 'naive-ui';
import { NCard, NForm, NFormItem, NInput, NButton } from 'naive-ui';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const formRules = ref<FormRules>({
    account: {
        required: true,
        trigger: 'blur',
        message: '未填写账号'
    },
    password: {
        required: true,
        trigger: 'blur',
        message: '未填写密码'
    }
}
);
const formRef = ref<nullable<FormInst>>(null);

const formData = reactive<ILoginRequest>({
    account: '',
    password: '',
    capture: ''
});
const loading = ref(false);

/**
 * 登录
 */
async function onLogin() {
    await formRef.value!.validate();
    if (loading.value) return;
    loading.value = true;
    try {
        const res = await authService.login(formData);
        localStorage.setItem('token', res.token);
        const { prePage } = route.query;
        if (prePage && typeof prePage === 'string') {
            router.replace({
                path: decodeURIComponent(prePage)
            });
        } else {
            router.replace({
                path: '/'
            });
        }

    } finally {
        loading.value = false;
    }

}
</script>

<style lang="scss" scoped>
.login-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('@/assets/images/login-bg.webp');
    background-size: cover;

    .container {
        max-width: 500px;
    }
}
</style>