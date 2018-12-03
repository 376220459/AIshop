<template>
    <div class="person-whole">
        <div class="person-content">
            <div class="base-inf">
                <div class="img"><img @click="goInf" :src="person.img" alt="person" width="120px"></div>
                <p @click="goInf" class="name"><i :class="sexClass"></i> {{ person.name }}</p>
                <div class="count">
                    <p @click="goCollect">
                        <span>{{ person.collectCount }}</span>
                        <strong>收藏夹</strong>
                    </p>
                    <p @click="goShopFollow">
                        <span>{{ person.shopCount }}</span>
                        <strong>关注店铺</strong>
                    </p>
                    <p @click="goAddress">
                        <span>{{ person.addressCount }}</span>
                        <strong>地址</strong>
                    </p>
                </div>
            </div>

            <div class="order-inf">
                <p class="order-title">我的订单</p>
                <div class="order">
                    <p @click="goOrder('whole-order')">
                        <i class="iconfont icon-dingdan"></i>
                        <strong>全部</strong>
                    </p>
                    <p @click="goOrder('pay-order')">
                        <i class="iconfont icon-daifukuan"></i>
                        <strong>待付款</strong>
                    </p>
                    <p @click="goOrder('receive-order')">
                        <i class="iconfont icon-daishouhuo"></i>
                        <strong>待收货</strong>
                    </p>
                    <p @click="goOrder('finish-order')">
                        <i class="iconfont icon-yiwancheng"></i>
                        <strong>已完成</strong>
                    </p>
                </div>
            </div>

            <div class="history">
                <p class="history-title">我的足迹</p>
                <ul>
                    <li @click="goGoods" v-for="(item, index) in storage" :key="index">
                        <img :src="item.img" alt="goods" width="100%">
                        <p class="introduce">{{ item.introduce }}</p>
                        <p class="price">￥{{ item.price }}</p>
                    </li>
                </ul>
                <div @click="loadMore" class="loading">点击加载更多...</div>
            </div>
        </div>
        <Footer class="footer"></Footer>
    </div>

</template>

<script>
import Footer from '@/components/common/Footer'
export default {
    name: 'Person',
    components: {
        Footer: Footer
    },
    data(){
        return{
            storage: [],
            person: {
                img: 'static/person/inf/head.jpg',
                name: '下雨天的纸飞机',
                sex: '女',
                collectCount: 6,
                shopCount: 3,
                addressCount: 3,
                history: [
                    {
                        introduce: 'Easy北欧简约现代布艺床1.8米双人实木婚床可拆洗小户型布床主卧',
                        img: 'static/goods/home/goodsOthers1.jpg',
                        price: '2186'
                    },
                    {
                        introduce: '绿净全自动鞋套机家用客厅一次性脚套智能鞋膜机套鞋器鞋套盒新款',
                        img: 'static/goods/home/goodsOthers2.jpg',
                        price: '168'
                    },
                    {
                        introduce: 'weimeishi欧式艺术钟表 时尚创意静音时钟 美式现代简约客厅挂钟',
                        img: 'static/goods/home/goodsOthers3.jpg',
                        price: '325'
                    },
                    {
                        introduce: '黑天鹅蛋糕挚爱玫瑰牛奶巧克力',
                        img: 'static/goods/home/goodsOthers4.jpg',
                        price: '999'
                    },
                    {
                        introduce: '1919酒类直供 53度贵州茅台生肖酒（狗年）500ml',
                        img: 'static/goods/home/goodsOthers5.jpg',
                        price: '3450'
                    },
                    {
                        introduce: '楚门吉他初学者女D50单板民谣吉他男旅行41寸电箱学生入门吉它D25',
                        img: 'static/goods/home/goodsOthers6.jpg',
                        price: '2135'
                    }
                ]
            }
        }
    },
    computed: {
        sexClass(){
            return this.person.sex == '男' ? 'iconfont icon-nan' : 'iconfont icon-nv';
        }
    }, 
    methods:{
        goInf(){
            this.$router.push({path:'/inf'});
        },
        goCollect(){
            this.$router.push({path:'/collect'});
        },
        goShopFollow(){
            this.$router.push({path:'/shop-follow'});
        },
        goAddress(){
            this.$router.push({path:'/address'});
        },
        goGoods(){
            this.$router.push({path:'/goods'});
        },
        goOrder(pathName){
            this.$router.push({path: '/' + pathName});
        },
        loadMore(){
            this.$loading.open({
                text: '正在加载',
                spinnerType: 'fading-circle'
            });
            setTimeout(() => {
                let last = this.storage.length-1;
                this.$loading.close();
                if(this.storage.length == this.person.history.length){
                    this.$toast({
                        message: '到底啦~',
                        duration: 1000
                    })
                }else if(this.person.history.length-this.storage.length>=3){
                    for (let i = 1; i <= 2; i++) {
                        this.storage.push(this.person.history[i+last]);
                    }
                }else{
                    for (let i = this.storage.length; i <= this.person.history.length-1; i++) {
                        this.storage.push(this.person.history[i]);
                    }
                }
            }, 500);
        },
    },
    created(){
        for (let i = 0;i < 4;i++){
            this.storage.push(this.person.history[i]);
        }
    }
}
</script>

<style lang="scss">
    .person-whole{
        height: 100%;
        display: grid;
        grid-template: 9fr 1fr / 1fr;
        background: #F0F0F0;
        .footer{
            ul{
                li:nth-child(4){
                    color: #FF6600;
                    transform: scale(0.9)
                }
            }
        }
        .person-content{
            overflow: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            .base-inf{
                width: 100%;
                background: #FF9966;
                padding-bottom: 5px;
                .img{
                    width: 120px;
                    height: 120px;
                    overflow: hidden;
                    border-radius: 50%;
                    margin: 10px auto 5px auto;
                }
                .name{
                    font-size: 25px;
                    font-weight: bold;
                    color: #FF6600;
                    i{
                        font-size: 20px;
                    }
                }
                .count{
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-around;
                    p{
                        display: flex;
                        flex-direction: column;
                        color: #FFF8DC;
                        font-size: 15px;
                    }
                }
            }
            .order-inf{
                width: 95%;
                background: white;
                margin: 10px 0;
                border-radius: 10px;
                padding: 5px 0 10px 0;
                .order-title{
                    color: #999;
                    font-size: 15px;
                }
                .order{
                    display: flex;
                    justify-content: space-around;
                    margin-top: 10px;
                    p{
                        display: flex;
                        flex-direction: column;
                        font-size: 15px;
                        color: #FF9966;
                        i{
                            font-size: 15px;
                        }
                    }
                }
            }
            .history{
                width: 95%;
                overflow: auto;
                background: white;
                border-radius: 10px;
                .history-title{
                    color: #999;
                    font-size: 15px;
                    margin: 5px 0;
                }
                ul{
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    li{
                        width: 48%;
                        margin-bottom: 5px;
                        img{
                            border-radius: 5px;
                        }
                        .introduce{
                            font-size: 13px;
                            height: 2.7em;
                            overflow: auto;
                            text-align: left;
                        }
                        .price{
                            color: #FF6600;
                            text-align: left;
                        }
                    }
                }
                .loading{
                    width:100%;
                    height:50px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                }
            }
        }
    }
</style>