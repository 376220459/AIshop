<template>
    <div class="finish-order-whole" :style="{right:wholeRight+'%'}">
        <header>
            <i class="iconfont icon-fanhui1" @click="goBack"></i>
            <p>我的订单</p>
        </header>

        <div class="finish-order-nav">
            <span @click="goOrder('whole-order')">全部</span>
            <span @click="goOrder('pay-order')">待付款</span>
            <span @click="goOrder('receive-order')">待收货</span>
            <span>已完成</span>
        </div>

        <div class="finish-order-content">
            <ul>
                <li v-for="(item, index) in whole" :key="index">
                    <div class="order-title">
                        <i class="iconfont icon-dianpu"></i>
                        <span class="shop">{{ item.shop }}</span>
                        <span class="right">＞</span>
                        <span class="state">{{ item.state }}</span>
                    </div>
                    <div class="order-content" @click="goGoods">
                        <img :src="item.img" alt="goods" width="30%" height="100%">
                        <div class="content-inf">
                            <p class="introduce">{{ item.introduce }}</p>
                            <p class="spec">{{ item.spec }}</p>
                            <span class="label" v-for="(item2, index2) in item.label" :key="index2">{{ item2 }}</span>
                        </div>
                        <div class="price-count">
                            <p class="price">￥{{ item.price }}</p>
                            <p class="count">×{{ item.count }}</p>
                        </div>
                    </div>
                    <div class="order-compute">
                        <span>共{{ item.count }}件商品</span>
                        <span>合计:￥{{ allPrice(index) }}</span>
                    </div>
                    <div class="order-button">
                        <button @click="deleteOrder(index)" class="delete">删除订单</button>
                        <div class="other-button">
                            <button @click="clickButton(item3)" v-for="(item3, index3) in item.button" :key="index3">{{ item3 }}</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'WholeOrder',
    data(){
        return{
            wholeRight: 0,
            whole: [
                {
                    shop: '唐狮官方旗舰店',
                    state: '交易成功',
                    img: 'static/order/goods1.jpg',
                    introduce: '唐狮秋冬新款加绒牛仔裤男小脚裤修身弹力男士牛仔长裤子韩版潮',
                    spec: '无绒款/浅牛仔蓝;30',
                    label: ['天猫无忧购','七天退换'],
                    price: 139.00,
                    count: 1,
                    button: ['查看物流','卖了换钱','评价']
                }
            ]
        }
    },
    methods: {
        goBack(){
            this.wholeRight = -100;
            setTimeout(() => {
                this.$router.push({path: '/person'});
            }, 200);
        },
        goOrder(pathName){
            this.$router.push({path: '/' + pathName});
        },
        goGoods(){
            this.wholeRight = 100;
            setTimeout(() => {
                this.$router.push({path: '/goods'});
            }, 200);
        },
        allPrice(index){
            return this.whole[index].price*this.whole[index].count;
        },
        deleteOrder(index){
            this.$message.confirm('确认删除此订单？').then(action=>{
                this.whole.splice(index,1);
                this.$toast({
                    message: '删除成功',
                    duration: 1000
                });
            },reject=>{
                console.log('取消删除操作');
            });
        },
        clickButton(name){
            if(name == '查看商品'){
                this.goGoods();
            }else{
                this.$toast({
                    message: '对不起，未开放此功能',
                    duration: 1000
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .finish-order-whole{
        height: 100%;
        background: #F0F0F0;
        position: relative;
        transition: right 150ms linear;
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
        }
        .finish-order-nav{
            height: 8%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 15px;
            span:nth-child(4){
                font-weight: bold;
                color: #FF6600;
                border-bottom: 2px solid #FF6600;
                padding: 5px 0;
            }
        }
        .finish-order-content{
            height: 82%;
            overflow: auto;
            padding: 5px;
            ul{
                li{
                    position: relative;
                    background: white;
                    padding: 10px;
                    margin-top: 15px;
                    border-radius: 10px;
                    .order-title{
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                        i{
                            font-size: 15px;
                            color: red;
                        }
                        .shop{
                            font-size: 12px;
                            margin: 0 3px;
                        }
                        .right{
                            font-size: 15px;
                            font-weight: bold;
                            color: #999;
                        }
                        .state{
                            position: absolute;
                            right: 10px;
                            color: red;
                        }
                    }
                    .order-content{
                        display: flex;
                        justify-content: center;
                        img{
                            border-radius: 10px;
                            margin-right: 10px
                        }
                        .content-inf{
                            text-align: left;
                            p{
                                font-size: 12px;
                            }
                            .spec{
                                color: #999;
                                margin: 5px 0;
                            }
                            .label{
                                color: #FF6600;
                                background: #FFCCCC;
                                padding: 2px 3px;
                                margin-right: 5px;
                                border-radius: 5px;
                            }
                        }
                        .price-count{
                            text-align: right;
                            .price{
                                color: #FF6600;
                                font-size: 15px;
                            }
                            .count{
                                color: #999;
                            }
                        }
                    }
                    .order-compute{
                        margin-top: 20px;
                        text-align: right;
                        font-size: 15px;
                        span:nth-child(1){
                            font-size: 12px;
                        }
                        span:nth-child(2){
                            color: #FF6600;
                        }
                    }
                    .order-button{
                        position: relative;
                        margin-top: 15px;
                        button{
                            border: 1px solid gray;
                            border-radius: 15px;
                            padding: 5px 8px;
                            font-size: 15px;
                        }
                        .delete{
                            position: absolute;
                            left: 10px;
                            border: 1px solid red;
                            color: red;
                        }
                        .other-button{
                            text-align: right;
                            button{
                                margin-left: 5px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

