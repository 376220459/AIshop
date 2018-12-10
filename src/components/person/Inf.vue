<template>
    <div class="inf-whole" :style="{right:wholeRight+'%'}">
        <mt-actionsheet :actions="sex" v-model="sheetVisible" cancelText=""></mt-actionsheet>
        <header>
            <i @click="goBack" class="iconfont icon-fanhui"></i>
            <span>个人资料</span>
        </header>
        <div class="inf-content">
            <form>
                <div class="input" @click="changeImg">
                    <span>头像</span>
                    <div class="headImg">
                        <div class="img"><img :src="person.img" alt="head" width="100%"></div>
                        <strong>＞</strong>
                    </div>
                    <input id="upload" type="file" accept="image/*" style="display:none" @change="showHeadImg">
                </div>
                <div class="input" @click="changeID">
                    <span>会员ID</span>
                    <span>{{ person.id }}</span>
                </div>
                <div class="input" @click="changeName">
                    <span>昵称</span>
                    <span>{{ person.name }} <strong>＞</strong></span>
                </div>
                <div class="input" @click="changeSex">
                    <span>性别</span>
                    <span>{{ person.sex }} <strong>＞</strong></span>
                </div>
                <div class="input" style="border:none" @click="changePhone">
                    <span>手机号</span>
                    <span>{{ person.phone }} <strong>＞</strong></span>
                </div>
            </form>
        </div>
        <footer>
            <button @click="goLogin">退出登录</button>
        </footer>
    </div>    
</template>

<script>
export default {
    name: 'Inf',
    data(){
        return{
            wholeRight: 0,
            img: '',
            sheetVisible: false,
            sex: [
                {
                    name: '男',
                    method: ()=>{
                        this.person.sex = '男';
                        this.$toast({
                            message: '修改成功',
                            duration: 1000
                        });
                    }
                },
                {
                    name: '女',
                    method: ()=>{
                        this.person.sex = '女';
                        this.$toast({
                            message: '修改成功',
                            duration: 1000
                        });
                    }
                },
            ],
            person: {
                img: 'static/person/inf/head.jpg',
                name: '下雨天的纸飞机',
                sex: '男',
                phone: '18392303394',
                id: 'AI001'
            }
        }
    },
    methods: {
        goBack(){
            this.wholeRight = -100;
            setTimeout(() => {
                history.back();  
            }, 200);
        },
        changeImg(){
            let upload = document.getElementById('upload');
            upload.click();
        },
        showHeadImg(){
            this.person.img = window.URL.createObjectURL(upload.files[0]);
            this.$toast({
                message: '修改成功',
                duration: 1000
            })
        },
        changeID(){
            this.$toast({
                message: 'ID不可修改',
                duration: 1000
            });
        },
        changeSex(){
            this.sheetVisible = true;
        },
        changeName(){
            this.$message.prompt('请输入昵称','更改昵称').then(action=>{
                if(action.value == null || (action.value && action.value.trim() == '')){
                    this.$toast({
                        message: '输入为空，修改失败',
                        duration: 1000
                    });
                }else{
                    this.person.name = action.value.trim();
                    this.$toast({
                        message: '修改成功',
                        duration: 1000
                    });
                }
            },reject=>{
                console.log('取消修改');
            });
        },
        changePhone(){
            this.$message.prompt('请输入手机号','更改手机号').then(action=>{
                if(!(/^1[34578]\d{9}$/.test(action.value))){
                    this.$toast({
                        message: '手机号格式错误，修改失败',
                        duration: 1000
                    });
                }else{
                    this.person.phone = action.value.trim();
                    this.$toast({
                        message: '修改成功',
                        duration: 1000
                    });
                }
            },reject=>{
                console.log('取消修改');
            });
        },
        goLogin(){
            if(window.localStorage){
                var storage = window.localStorage;
            }
            storage.removeItem('id');
            this.$toast({
                message: '账号已登出',
                duration: 1000
            })
            this.$router.push({path: '/login'});
        }
    }
}
</script>

<style lang="scss" scoped>
    .inf-whole{
        height: 100%;
        background: #F0F0F0;
        position: relative;
        transition: right 150ms linear;
        header{
            height: 10%;
            display: flex;
            align-items: center;
            i{
                font-size: 25px;
                font-weight: bold;
                margin: 0 15px;
                color: #999;
            }
            span{
                font-size: 20px;
                font-weight: bold;
            }
        }
        .inf-content{
            height: 80%;
            form{
                height: 100%;
                background: white;
                padding: 0 10px;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                .input{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0;
                    border-bottom: 1px solid #E0E0E0;
                    .headImg{
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        .img{
                            width: 60px;
                            height: 60px;
                            border-radius:50%;
                            overflow: hidden;
                            margin-right: 10px;
                        }
                        strong{
                            color: #999;
                            font-size: 15px;
                        }
                    }
                    span:nth-child(1){
                        color: #606060;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    span:nth-child(2){
                        color: #999;
                        font-size: 15px;
                    }
                }
            }
        }
        footer{
            height: 10%;
            button{
                height: 100%;
                width: 100%;
                background: #FF6600;
                color: white;
                font-size: 20px;
                font-weight: bold;
                // border-radius: 25px;
            }
        }
    }
</style>

