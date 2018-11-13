<template>
    <div class="register-whole">
        <form action="">
            <h2 style="text-align:left;margin: 5px 0 10px 5px">请完整填写注册信息:</h2>
            <mt-field label="*昵称：" placeholder="请输入昵称" v-model="username"></mt-field>
            <mt-field label="*邮箱：" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
            <mt-field label="*密码：" placeholder="请输入密码" type="password" v-model="password"></mt-field>
            <mt-field label="*确认密码：" placeholder="请再次输入密码" type="password" v-model="repassword"></mt-field>
            <mt-field label="*手机号：" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
            <mt-field label="性别：" placeholder="请输入性别" v-model="sex"></mt-field>
            <mt-field label="年龄：" placeholder="请输入年龄" type="number" v-model="age"></mt-field>
            <mt-field label="签名：" placeholder="想一个个性的签名吧" type="textarea" rows="4" v-model="words"></mt-field>
        </form>
        <div class="btns">
            <div class="btn" @click="register"><span>注册</span></div>
            <div class="btn" @click="exit"><span>返回</span></div>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'Register',
    data(){
        return{
            username: '',
            email: '',
            password: '',
            repassword: '',
            phone: '',
            sex: '',
            age: '',
            words: ''
        }
    },
    methods: {
        register(){
            this.$loading.open({
                text: '注册成功，正在登陆...',
                spinnerType: 'fading-circle'
            })
            
            // this.$toast({
            //     message: '注册成功，正在跳转...'
            // })
        },
        exit(){
            this.$router.push({path:'/login'})
        }
    }
}
</script>

<style lang="scss" scoped>
    .register-whole{
        height: 100%;
        display: grid;
        grid-template: 5fr 1fr / 1fr;
        user-select: none;
        form{
            // border-bottom: 1px solid gray;
            text-align: left;
        }
        .btns{
            display: flex;
            justify-content: space-around;
            align-items: center;
            .btn{
                width: 80px;
                height: 80px;
                border: 1px solid black;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 2em;
            }
            .btn:active{
                background: gray;
                span{
                    transform: scale(0.9);
                }
            }
        }
    }
</style>

