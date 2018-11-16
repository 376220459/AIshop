<template>
    <div class="login-whole" id="whole">
        <div class="top">
            <div class="line" style="border-color:#00FA9A;"></div>
            <div class="btn" @click="login" style="border-color:#00FA9A;"><span>登陆</span></div>
        </div>
        <div class="loginForm">
            <form action="" style="text-align:left">
                <div><span>账号：</span><input autofocus="autofocus" v-model="username" type="text" placeholder="手机号 / 邮箱 / 昵称"></div>
                <div><span>密码：</span><input v-model="password" type="password"></div>
                <!-- <div style="display:flex;align-items:center;"><span>验证码：</span><input type="password" style="width:5em"><div style="width:1.5em;height:0.4em;border:1px solid black;display:flex">xyzj</div></div> -->
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
            username: '',
            password: ''
        }
    },
    methods: {
        login(){
            let whole = document.getElementById('whole');
            if(this.username == 'admin' && this.password == 'admin'){
                this.$store.state.id = 1;
                whole.style.animationPlayState = 'running';
                this.$loading.open({
                    text: '登陆成功，正在跳转...',
                    spinnerType: 'fading-circle'
                });
                setTimeout(() => {
                    this.$loading.close();
                    this.$router.push({path:'/'})
                }, 3000);
            }else if(this.username == '' && this.password == ''){
                this.$toast({
                    message: '请输入账号或密码',
                    duration: 1000
                });
            }else{
                this.$toast({
                    message: '注册个账号再登陆吧',
                    duration: 1000
                });
            }
            // this.$router.push({path:'/'})
        },
        register(){
            this.$router.push({path:'/register'})
            // this.$toast({
            //     message: '当前服务器忙...',
            //     duration: 1000
            // });
        },
        running(){
            
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
        animation: login 0.8s;
        animation-iteration-count:infinite;
        animation-play-state: paused;
        // animation-fill-mode: forwards;
        @keyframes login
        {
            0% {transform: rotateY()}
            100% {transform: scale(1.1)}
            // 50% {transform: rotateZ(90*5deg)}
            // 100% {transform: rotateZ(360*3deg) scale(0.1); opacity: 0}
        }
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
                    border-radius: 16px;
                    width: 10em;
                    padding-left: 10px;
                }
            }
        }
    }
</style>


