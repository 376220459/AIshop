<template>
    <div class="login-whole">
        <div class="top">
            <div class="line" style="border-color:#00FA9A;"></div>
            <div class="btn" @click="login" style="border-color:#00FA9A;"><span>登陆</span></div>
        </div>
        <div class="loginForm">
            <form action="">
                <div><span>账号：</span><input type="text" placeholder="手机号 / 邮箱 / 昵称"></div>
                <div><span>密码：</span><input type="password"></div>
            </form>
        </div>
        <div class="bottom">
            <div class="btn" @click="register" style="border-color:gray;"><span>注册</span></div>
            <div class="line" style="border-color:gray;"></div>
        </div>
    </div>    
</template>

<script>
import store from '@/vuex/store'
export default {
    store,
    name: 'Login',
    data(){
        return{
            
        }
    },
    methods: {
        login(){
            this.$store.state.id = 1;
            this.$toast({
                message: '注册个账号再登陆吧',
                duration: 1000
            });
            // this.$router.push({path:'/'})
        },
        register(){
            this.$router.push({path:'/register'})
            // this.$toast({
            //     message: '当前服务器忙...',
            //     duration: 1000
            // });
        }
    }
}
</script>

<style lang="scss" scoped>
    .login-whole{
        height: 100%;
        display: grid;
        grid-template: 1fr 1fr 1fr / 1fr;
        background: url(/static/back/login-back.jpeg);
        background-size: cover;
        .line{
            height: 50%;
            width: 1px;
            border-left: 1px solid black;
        }
        .btn{
            user-select: none;
            width: 80px;
            height: 80px;
            border: 1px solid black;
            border-radius: 50%;
            font-size: 2em;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .btn:active{
            span{
                transform: scale(0.9)
            }
        }
        .top{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
        }
        .bottom{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }
        .loginForm{
            display: flex;
            justify-content: center;
            align-items: center;
            div{
                margin: 20px 0;
                font-size: 2em;
                input{
                    height: 1.5em;
                    outline: none;
                    font-size: 0.8em;
                    background: transparent;
                    border: 1px solid black;
                    border-radius: 8px;
                    width: 10em;
                }
            }
        }
    }
</style>


