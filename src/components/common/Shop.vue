<template>
    <div class="shop-whole" :style="{right:wholeRight+'%'}">
        <header>
            <div class="header-box">
                <i class="iconfont icon-fanhui1" @click="goBack"></i>
                <div>
                    <img :src="shop.img" alt="shopHead" width="15%">
                    <p class="name">{{ shop.name }}</p>
                    <p class="slogan">{{ shop.slogan }}</p>
                </div>
                <i class="iconfont icon-home" @click="goHome"></i>
            </div>
        </header>
        <div class="shop-content">
            <mt-swipe :auto="3000">
                <mt-swipe-item v-for="(item, index) in shop.swip" :key="index">
                    <img :src="item" alt="goods" width="100%" height="100%"  @click="goGoods">
                </mt-swipe-item>
            </mt-swipe>
            <p class="dynamic-header">店铺动态</p>
            <div class="dynamic" v-for="(item, index) in shop.dynamic" :key="index" @click="goGoods">
                <p class="dynamic-time">{{ item.time }}</p>
                <div class="dynamic-content">
                    <img :src="item.img" alt="dynamic" width="100%">
                    <p class="title">{{ item.title }}</p>
                    <p class="content">{{ item.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Shop',
    data(){
        return{
            wholeRight: 0,
            shop: {
                name: '小米品牌',
                img: 'static/shop/shop1.jpg',
                slogan: '让每个人都能享受科技的乐趣',
                swip: ['static/shop/swip1.jpg','static/shop/swip2.jpg','static/shop/swip3.jpg','static/shop/swip4.jpg'],
                header: 'static/shop/header1.png',
                dynamic: [
                    {
                        time: '2018年12月03日 21:33',
                        img: 'static/shop/dynamic1.png',
                        title: '[ 双12狂欢购 ]新品低价即将开抢！抢！抢！',
                        content: '错过双12，你会错过整个世界的'
                    },
                    {
                        time: '2018年12月03日 21:33',
                        img: 'static/shop/dynamic1.png',
                        title: '[ 双12狂欢购 ]新品低价即将开抢！抢！抢！',
                        content: '错过双12，你会错过整个世界的'
                    },
                    {
                        time: '2018年12月03日 21:33',
                        img: 'static/shop/dynamic1.png',
                        title: '[ 双12狂欢购 ]新品低价即将开抢！抢！抢！',
                        content: '错过双12，你会错过整个世界的'
                    },
                    {
                        time: '2018年12月03日 21:33',
                        img: 'static/shop/dynamic1.png',
                        title: '[ 双12狂欢购 ]新品低价即将开抢！抢！抢！',
                        content: '错过双12，你会错过整个世界的'
                    },
                    {
                        time: '2018年12月03日 21:33',
                        img: 'static/shop/dynamic1.png',
                        title: '[ 双12狂欢购 ]新品低价即将开抢！抢！抢！',
                        content: '错过双12，你会错过整个世界的'
                    },
                    {
                        time: '2018年12月03日 21:33',
                        img: 'static/shop/dynamic1.png',
                        title: '[ 双12狂欢购 ]新品低价即将开抢！抢！抢！',
                        content: '错过双12，你会错过整个世界的'
                    }
                ]
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
        goHome(){
            this.$router.push({path: '/home'});
        },
        goGoods(){
            this.wholeRight = 100;
            setTimeout(() => {
                this.$router.push({path: '/goods'});
            }, 200);
        }
    }
}
</script>

<style lang="scss" scoped>
    .shop-whole{
        height: 100%;
        background: #F0F0F0;
        position: relative;
        transition: right 150ms linear;
        header{
            height: 25%;
            background: url(../../../static/shop/header.jpg);
            .header-box{
                height: 100%;
                background: rgba(192,192,192,0.2);
                display: flex;
                justify-content: space-between;
                padding: 10px;
                color: white;
                img{
                    border-radius: 10px;
                }
                i{
                    font-size: 25px; 
                }
                .name{
                    margin: 5px 0 8px 0;
                    font-size: 20px;
                }
                .slogan{
                    opacity: 0.8;
                }
            } 
        }
        .shop-content{
            height: 75%;
            overflow: auto;
            .mint-swipe{
                height: 400px;
            }
            .dynamic-header{
                margin-top: 20px;
            }
            .dynamic{
                display: flex;
                flex-direction: column;
                align-items: center;
                .dynamic-time{
                    background: rgba(192,192,192,0.5);
                    padding: 5px 10px;
                    border-radius: 10px;
                    margin: 20px 0;
                    color: white;
                }
                .dynamic-content{
                    width: 95%;
                    background: white;
                    padding-bottom: 10px;
                    margin-bottom: 5px;
                    border-radius: 15px;
                    text-align: left;
                    img{
                        border-radius: 15px;
                    }
                    p{
                        width: 80%;
                        padding: 5px;
                    }
                    .title{
                        font-size: 20px;
                    }
                    .content{
                        color: #999;
                    }
                }
            }
        }
    }
</style>

