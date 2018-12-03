<template>
    <div class="address-whole" :style="{right:wholeRight+'%'}">
        <header>
            <i class="iconfont icon-fanhui1" @click="goBack"></i>
            <p>我的地址({{ allAddressCount }})</p>
            <span @click="goAddAddress">添加新地址</span>
        </header>
        <div class="address-content">
            <ul>
                <li v-for="(item, index) in address" :key="index">
                    <div class="label">{{ item.label }}</div>
                    <div class="inf">
                        <p class="base-inf">
                            <span class="name">{{ item.name }}</span>
                            <span class="phone">{{ item.phone }}</span>
                        </p>
                        <p class="address"><span v-if="isShow(index)">默认</span>{{ item.address }}</p>
                    </div>
                    <button class="delete" @click="deleteAddress(index)">删除</button>
                </li>
            </ul>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'Address',
    data(){
        return{
            wholeRight: 0,
            address: [
                {
                    label: '学校',
                    name: '张三',
                    phone: '18392366542',
                    address: '陕西省 西安市 长安区 郭杜街道 西安邮电大学长安校区'
                },
                {
                    label: '家',
                    name: '李四',
                    phone: '18392366542',
                    address: '陕西省 西安市 长安区 郭杜街道 西安邮电大学长安校区'
                },
                {
                    label: '公司',
                    name: '王五',
                    phone: '18392366542',
                    address: '陕西省 西安市 长安区 郭杜街道 西安邮电大学长安校区'
                }
            ]
        }
    },
    computed: {
        allAddressCount(){
            return this.address.length;
        }
    },
    methods: {
        rightMove(){
            this.wholeRight -= 10;
            setTimeout(() => {
                this.rightMove();
            },10);
        },
        goBack(){
            this.rightMove();
            setTimeout(() => {
                history.back();
            }, 200);
        },
        goAddAddress(){
            this.$router.push({path: '/add-address'})
        },
        isShow(index){
            return index == 0 ? true : false;
        },
        deleteAddress(index){
            this.$message.confirm('确认删除此地址？').then(action=>{
                this.address.splice(index,1);
                this.$toast({
                    message: '删除成功',
                    duration: 1000
                });
            },reject=>{
                console.log('取消删除操作');
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .address-whole{
        height: 100%;
        background: #F0F0F0;
        position: relative;
        header{
            height: 10%;
            background: #FF9966;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
            i{ 
                position: absolute;
                left: 15px;
                font-size: 30px;
                color: gray;
            }
            span{
                position: absolute;
                right: 5px;
                font-size: 15px;
                font-weight: bold;
                color: #FF4500;
            }
        }
        .address-content{
            height: 90%;
            overflow: auto;
            padding: 5px;
            ul{
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 15px 0;
                    padding-bottom: 15px;
                    border-bottom: 1px dotted #999;
                    .label{
                        width: 40px;
                        height: 40px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50%;
                        background: #FF6600;
                        color: white;
                    }
                    .inf{
                        width: 75%;
                        p{
                            text-align: left;
                        }
                        .base-inf{
                            margin-bottom: 5px; 
                            .name{
                                font-size: 15px;
                                font-weight: bold;
                            }
                            .phone{
                                color: #999;
                            }
                        }
                        .address{
                            span{
                                background: #FFCCCC;
                                color: red;
                                padding: 2px 5px;
                                border-radius: 5px;
                                margin-right: 5px;
                            }
                        }
                    }
                    .delete{
                        font-size: 15px;
                        border-radius: 10px;
                        color: #FF6600;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
</style>

