<template>
    <div class="login-box">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
    >
    <h2>Management System</h2>
        <el-form-item label="username" prop="username">
        <el-input v-model="ruleForm.username"  autocomplete="off" />
        </el-form-item>
        <el-form-item label="password" prop="password">
        <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
        />
        </el-form-item>
        <el-form-item>
        <el-button class = "loginBtn" 
        type="primary" 
        @click="submitForm(ruleFormRef)"
            >Submit</el-button
        >
        <el-button class = "loginBtn" 
        @click="resetForm(ruleFormRef)"
        >Reset</el-button>
        </el-form-item>
    </el-form>

    </div>
    {{}}
        
</template>
    
<script lang='ts'>
import { defineComponent, DefineComponent, reactive, toRefs,ref } from 'vue';
import { LoginData } from '../type/login';
import type { FormInstance } from 'element-plus';
import { login } from '../request/api';
import { useRouter } from 'vue-router';//redirect 
export default defineComponent({ 
    setup() {      
        const data = reactive(new LoginData())
        const rules = {
                username: [
                    {
                        required: true,
                        message: 'Please input username',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10, message: 'Length should be 3 to 10',
                        trigger: 'blur'
                    },
                ],

                password:[
                    {
                        required: true,
                        message: 'Please input password',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10, message: 'Length should be 3 to 10',
                        trigger: 'blur'
                    },
                ],
                     
        }
        //login 
        const ruleFormRef = ref<FormInstance>()    
        const router = useRouter() //VUE2 $router
        const submitForm = (formEl: FormInstance | undefined) => {
            
            if (!formEl) return
            // verficate with from
            formEl.validate((valid) => {
                if (valid) {
                    //console.log('submit!')
                    login(data.ruleForm).then((res) => {
                        console.log(res)
                        //save token
                        localStorage.setItem('token', res.data.token)
                        //redirect 
                        router.push('/')

                    })
                } else {
                console.log('error submit!')
                return false
                }
            })
           
        }
        //reset login form 
        const resetForm = () => {
            data.ruleForm.username = ""
            data.ruleForm.password = ""
        }
        return {
            ...toRefs(data),rules,ruleFormRef,submitForm,resetForm,
        }
    }
})
    
</script>
    
<style lang="scss" scoped>
    .login-box{
        widows: 100%;
        height: 100%;
        background: url("../assets/bg.jpg");
        background-size: cover;
        padding: 1px;
        text-align: center;
        .demo-ruleForm{
        width: 500px;
        margin: 200px auto;
        background-color: white;
        padding: 30px;
        border-radius: 15px;
    }
    .loginBtn{
        width: 48%;
    }
    h2{
        margin-bottom: 10px;
    }
                                                                                                
    }
    
</style>