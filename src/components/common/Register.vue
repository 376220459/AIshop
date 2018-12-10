<template>
    <div class="register-whole" :style="{height: appHeight+'px'}">
        <form action="">
            <h2 style="text-align:left;margin: 5px 0 10px 5px">请填写注册信息（*必填）:</h2>
            <mt-field disableClear @blur.native.capture="nameTest" :state="nameState" label="*昵称：" placeholder="请输入昵称" v-model="username"></mt-field>
            <mt-field disableClear @blur.native.capture="emailTest" :state="emailState" label="*邮箱：" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
            <mt-field disableClear @blur.native.capture="pswTest" :state="pswState" label="*密码：" placeholder="请输入密码" type="password" v-model="password"></mt-field>
            <mt-field disableClear @blur.native.capture="repswTest" :state="repswState" label="*确认密码：" placeholder="请再次输入密码" type="password" v-model="repassword"></mt-field>
            <mt-field disableClear @blur.native.capture="phoneTest" :state="phoneState" label="*手机号：" placeholder="11 位手机号" type="tel" v-model="phone"></mt-field>
            <mt-field disableClear @blur.native.capture="sexTest" label="性别：" placeholder="男 / 女" v-model="sex"></mt-field>
            <mt-field disableClear @blur.native.capture="ageTest" label="年龄：" placeholder="请输入年龄" type="text" v-model="age"></mt-field>
            <mt-field disableClear @blur.native.capture="wordsTest" label="签名：" placeholder="想一个个性的签名吧" type="textarea" rows="4" v-model="words"></mt-field>
        </form>
        <div class="btns">
            <div class="btn" @click="exit" style="border-color:gray;background:gray;"><span>返回</span></div>
            <div class="btn" @click="register" style="border-color:#00FA9A;background:#00FA9A;"><span>注册</span></div>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'Register',
    data(){
        return{
            appHeight: document.body.clientHeight,
            username: '',
            email: '',
            password: '',
            repassword: '',
            phone: '',
            sex: '',
            age: '',
            words: '',
            nameState: '',
            emailState: '',
            pswState: '',
            repswState: '',
            phoneState: ''
        }
    },
    methods: {
        register(){
            if(window.localStorage){
                var storage = window.localStorage;
            }
            if(this.nameState == 'success' && this.emailState == 'success' && this.pswState == 'success' &&this.repswState == 'success' && this.phoneState == 'success'){
                storage.setItem('id','AI001');
                this.$loading.open({
                    text: '注册成功，正在登陆...',
                    spinnerType: 'fading-circle'
                })
                setTimeout(() => {
                    this.$loading.close();
                    this.$router.push({path:'/'})
                }, 1000);
            }else{
                this.$toast({
                    message: '请正确填写注册信息',
                    duration: 500
                });
            }
            
        },
        exit(){
            this.$loading.open({
                text: '正在跳转至登陆页面...',
                spinnerType: 'fading-circle'
            })
            setTimeout(() => {
                this.$loading.close();
                this.$router.push({path:'/login'});
            }, 500);
        },
        nameTest(){
            if(this.username == ''){
                this.nameState = 'error';
                this.$toast({
                    message: '请输入昵称',
                    duration: 1000
                })
            }else if(this.username == 'victor'){
                this.nameState = 'warning';
                this.$toast({
                    message: '昵称已经被抢先注册啦~',
                    duration: 1000
                })
            }else{
                this.nameState = 'success';
            }
        },
        emailTest(){
            let reg = /^[A-Za-z0-9_]+@[a-z0-9]+.com$/;
            if(this.email == ''){
                this.emailState = 'error';
                this.$toast({
                    message: '请输入邮箱',
                    duration: 1000
                })
            }else if(!reg.test(this.email)){
                this.emailState = 'warning';
                this.$toast({
                    message: '邮箱格式错误',
                    duration: 1000
                })
            }else{
                this.emailState = 'success';
            }
        },
        pswTest(){
            let reg = /^[A-Za-z0-9.\@+-]+$/;
            if(this.password == ''){
                this.pswState = 'error';
                this.$toast({
                    message: '请输入密码',
                    duration: 1000
                })
            }else if(!reg.test(this.password) || this.password.length<8 || this.password.length>16){
                this.pswState = 'warning';
                this.$toast({
                    message: '密码由8到16位字母、数字和符号组成',
                    duration: 2000
                })
            }else{
                this.pswState = 'success';
            }
        },
        repswTest(){
            if(this.repassword == ''){
                this.repswState = 'error';
                this.$toast({
                    message: '请再次输入密码',
                    duration: 1000
                })
            }else if(this.repassword != this.password){
                this.repswState = 'warning';
                this.$toast({
                    message: '两次密码输入不一致',
                    duration: 1000
                })
            }else{
                this.repswState = 'success';
            }
        },
        phoneTest(){
            let reg = /^1(3|4|5|7|8)\d{9}$/;
            if(this.phone == ''){
                this.phoneState = 'error';
                this.$toast({
                    message: '请输入手机号',
                    duration: 1000
                })
            }else if(!reg.test(this.phone)){
                this.phoneState = 'warning';
                this.$toast({
                    message: '手机号格式有误',
                    duration: 2000
                })
            }else{
                this.phoneState = 'success';
            }
        },
        sexTest(){
            if(this.sex != '男' && this.sex != '女' && this.sex.trim() != ''){
                this.sex = '男';
            }
        },
        ageTest(){
            if(this.age && (!Number.isFinite(parseInt(this.age)) || this.age <= 0 || this.age >=120)){
                this.$toast({
                    message: '我可不相信你这么大岁数',
                    duration: 1000
                });
                this.age = '';
            }
        },
        wordsTest(){
            if(this.words.length >= 50){
                this.words = '';
                this.$toast({
                    message: '不可以超过50字哦~',
                    duration: 1000
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .register-whole{
        // height: 100%;
        background: #F0F0F0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        overflow: auto;
        form{
            width: 95%;
            text-align: left;
            margin: 0 auto;
            padding: 10px 0;
            background: white;
            border-radius: 15px;
        }
        .btns{
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .btn{
                width: 60px;
                height: 60px;
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

