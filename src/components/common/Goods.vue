<template>
    <div class="goods-whole">
        <div class="header">
            <div class="headerNav1">
                <span style="margin-left:10px;"><i class="iconfont icon-fanhui1"></i></span>
                <div>
                    <span><i class="iconfont icon-cart"></i></span>
                    <span><i class="iconfont icon-home"></i></span>
                </div>
            </div>

            <div class="headerNav2" style="display:none">
                <i style="margin:0 70px 0 10px;" class="iconfont icon-fanhui1"></i>
                <ul>
                    <li v-for="(item, index) in ['宝贝','评价','详细']" :key="index" :class="navClass[index]" @click="changeNav(index)">{{ item }}</li>
                </ul>
                <div>
                    <i class="iconfont icon-cart"></i>
                    <i class="iconfont icon-home"></i>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="goods-wipe">
                <mt-swipe :auto="0" :show-indicators="false" @change="changeWipe">
                    <mt-swipe-item v-for="(item, index) in goods.goodsImgs" :key="index" @click.native="click">
                        <img :src="item" alt="goods" width="100%" height="100%">
                    </mt-swipe-item>
                </mt-swipe>
                <span class="img-index" style="">{{nowCount}}/{{ allCount }}</span>
            </div>

            <div class="goods-base-inf">
                <div class="price">
                    <span>￥<span>{{ goods.price }}</span></span>
                    <ul>
                        <li v-for="(item, index) in goods.goodsLabels" :key="index">{{ item }}</li>
                    </ul>
                </div>

                <div class="introduce">
                    <p><span>{{ goods.shop.brand }}</span>{{ goods.introduce }}</p>
                    <span class="share"><i class="iconfont icon-share"></i>分享</span>
                </div>

                <div class="sale">
                    <span>快递：{{ goods.sendFee }}</span>
                    <span>月销{{ goods.payCount }}</span>
                    <span>{{goods.address}}</span>
                </div>
            </div>

            <div class="goods-discount">
                <div class="discount">
                    <div>
                        <span style="color:#999;margin-right:20px">优惠</span>
                        <span>积分</span>
                        <span>购买可得{{ goods.discount.integral }}积分</span>
                    </div>
                    <span style="color:#999">查看 ＞</span>
                </div>
                <div class="server">
                    <span style="color:#999;margin-right:20px">服务</span>
                    <span>极速退货·正品保证·急速退款</span>
                </div>
            </div>

            <div class="goods-parameter">
                <div class="spec">
                    <div>
                        <span style="color:#999;margin-right:20px">规格</span>
                        <span>选择 <strong>{{ goods.spec }}</strong></span>
                    </div>
                    <span style="color:#999;">＞</span>
                </div>

                <div class="parameter">
                    <div>
                        <span style="color:#999;margin-right:20px">参数</span>
                        <span>品牌 <strong>{{ goods.parameter }}</strong></span>
                    </div>
                    <span style="color:#999;">＞</span>
                </div>
            </div>

            <div class="goods-evaluate">
                <div class="title">
                    <span>宝贝评价({{ goods.evaluate.allCount }})</span>
                    <span>查看全部＞</span>
                </div>
                <div class="label">
                    <p v-for="(item, index) in goods.evaluate.label" :key="index">{{ item.name }}<span>({{ item.count }})</span></p>
                </div>
                <div class="evaluate">
                    <span><i class="iconfont icon-unie64d"></i><span>{{ goods.evaluate.evaluate.name }}</span></span>
                    <p>{{ goods.evaluate.evaluate.content }}</p>
                </div>
            </div>

            <div class="goods-shop">
                <div class="inf">
                    <img height="70rem" :src="goods.shop.img" alt="shop">
                    <div>
                        <p>{{ goods.shop.name }}</p>
                        <p>
                            <span>{{ goods.shop.brand }}</span>
                            <span>综合体验</span>
                            <span v-for="(item, index) in goods.shop.startCount" :key="index"><i style="color:red" class="iconfont icon-xingxing"></i></span>
                        </p>
                    </div>
                    <button class="bt1">全部宝贝</button>
                    <button class="bt2">进店逛逛</button>
                </div>
                <div class="score">
                    <span>宝贝描述 {{ goods.shop.goodsScore }}</span>
                    <span>卖家服务 {{ goods.shop.serverScore }}</span>
                    <span>宝贝描述 {{ goods.shop.logisticsScore }}</span>
                </div>
            </div>

            <div class="goods-recommend">
                <div>
                    <span>店铺推荐</span>
                    <span style="color:#FF6600">查看全部＞</span>
                </div>
                <ul>
                    <li v-for="(item, index) in goods.shop.recommend" :key="index">
                        <img width="100%" :src="item.img" alt="goods">
                        <p class="p1">{{ item.introduce }}</p>
                        <p class="p2">￥{{ item.price }}</p>
                    </li>
                </ul>
            </div>

            <div class="goods-detailed-inf">
                <span>------------------------宝贝详情------------------------</span>
                <img v-for="(item, index) in goods.detailed" v-lazy="item" width="100%" :key="index" alt="detailed">
            </div>
        </div>

        <div class="footer">
            <span>
                <i class="iconfont icon-dianpu" style="color:#FF6347"></i>    
                <p>店铺</p>
            </span>    
            <span>
                <i class="iconfont icon-service"></i>    
                <p>客服</p>
            </span>    
            <span>
                <i class="iconfont icon-shoucang"></i>    
                <p>收藏</p>
            </span>
            <div>
                <button class="bt1">加入购物车</button>
                <button class="bt2">立即购买</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Goods',
    data(){
        return{
            navClass: [],
            nowCount: '1',
            goods: {
                goodsImgs: ['static/goods/goods/goods1.jpg','static/goods/goods/goods2.jpg','static/goods/goods/goods3.jpg','static/goods/goods/goods4.jpg','static/goods/goods/goods5.jpg',],
                price: '888',
                goodsLabels: ['新品促销','限时打折'],
                introduce: 'AJ 鞋子男潮鞋高帮鞋男韩版潮流百搭板鞋高邦运动加绒男鞋冬季棉鞋',
                sendFee: '0.00',
                payCount: '4.5万+',
                address: '福建 厦门',
                discount: {
                    coupons: [],
                    integral: '234'
                },
                spec: '尺码，颜色',
                parameter: '材质...',
                evaluate: {
                    allCount: '3.5w',
                    label: [
                        {
                            name: '质量很好',
                            count: '756'
                        },
                        {
                            name: '没有色差',
                            count: '1240'
                        },
                        {
                            name: '穿着很舒服',
                            count: '888'
                        },
                        {
                            name: '潮牌',
                            count: '6261'
                        },
                    ],
                    evaluate: {
                        name: '下雨**飞机',
                        content: '质量很好，没的说，高端大气上档次。这是第二次购买这双鞋了，穿着很舒服，很时尚，下次还会再来的。'
                    }
                },
                shop: {
                    name: '帕马森旗舰店',
                    img: 'static/goods/goods/shop.png',
                    brand: '天猫',
                    startCount: 5,
                    goodsScore: '4.8',
                    serverScore: '4.8',
                    logisticsScore: '4.8',
                    recommend: [
                        {
                            img: 'static/goods/goods/goodsRecommend1.jpg',
                            introduce: '男鞋冬季休闲鞋加绒棉鞋小白鞋aj运动鞋跑步ins超火的鞋子男潮鞋',
                            price: '139.00'
                        },
                        {
                            img: 'static/goods/goods/goodsRecommend2.jpg',
                            introduce: 'aj鞋子男潮鞋高帮鞋男韩版潮流百搭板鞋高邦运动加绒男鞋冬季棉鞋',
                            price: '158.00'
                        },
                        {
                            img: 'static/goods/goods/goodsRecommend3.jpg',
                            introduce: '冬季男鞋秋季潮鞋2018新款休闲鞋子男运动鞋韩版潮流英伦百搭板鞋',
                            price: '299.00'
                        },
                        {
                            img: 'static/goods/goods/goodsRecommend4.jpg',
                            introduce: 'ins超火的男鞋秋季男港风老爹鞋冬季鞋子男潮鞋aj1网红跑步运动鞋',
                            price: '120.00'
                        },
                        {
                            img: 'static/goods/goods/goodsRecommend5.jpg',
                            introduce: 'ins超火的鞋子男潮鞋冬季棉鞋运动鞋男鞋ulzzang原宿内增高老爹鞋',
                            price: '366.00'
                        },
                        {
                            img: 'static/goods/goods/goodsRecommend6.jpg',
                            introduce: '网红AJ1男鞋高帮鞋韩版潮流运动嘻哈ins超火的鞋子男潮鞋高邦板鞋',
                            price: '168.00'
                        },
                    ]
                },
                detailed: [
                    'static/goods/goods/detailed1.jpg',
                    'static/goods/goods/detailed2.jpg',
                    'static/goods/goods/detailed3.jpg',
                    'static/goods/goods/detailed4.jpg',
                    'static/goods/goods/detailed5.jpg',
                    'static/goods/goods/detailed6.jpg',
                    'static/goods/goods/detailed7.jpg',
                    'static/goods/goods/detailed8.jpg',
                    'static/goods/goods/detailed9.jpg',
                    'static/goods/goods/detailed10.jpg',
                    'static/goods/goods/detailed11.jpg',
                    'static/goods/goods/detailed12.jpg',
                    'static/goods/goods/detailed14.jpg',
                    'static/goods/goods/detailed15.jpg',
                    'static/goods/goods/detailed16.jpg',
                    'static/goods/goods/detailed17.jpg',
                    'static/goods/goods/detailed18.jpg',
                    'static/goods/goods/detailed19.png',
                ]
            }
        }
    },
    computed:{
        allCount(){
            return this.goods.goodsImgs.length;
        }
    },
    methods: {
        changeNav(index){
            this.navClass = [];
            this.navClass[index] = 'nav-focus';
        },
        changeWipe(index){
            // console.log(index);
            this.nowCount = index+1;
        }
    }
}
</script>

<style lang="scss" scoped>
    .goods-whole{
        height: 100%;
        .header{
            height: 8%;
            width: 100%;
            position: absolute;
            background: transparent;
            z-index: 10;
            .headerNav1{
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span{
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    i{
                        font-size: 25px;
                        color: white;
                    }
                }
                div{
                    display: flex;
                    span{
                        margin-right: 10px;
                    }
                }
            }
            .headerNav2{
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #F0F0F0;
                font-size: 15px;
                i{
                    font-size: 25px;
                }
                ul{
                    display: flex;
                    li{
                        margin: 0 10px;
                    }
                    .nav-focus{
                        color: #FF6600;
                        border-bottom: 2px solid #FF6600
                    }
                }
                div{
                    i{
                        margin-right: 10px;
                    }
                }
            }
        }
        .content{
            height: 92%;
            overflow: auto;
            .goods-wipe{
                height: 65%;
                position: relative;
                .img-index{
                    position:absolute;
                    bottom: 5%;
                    right: 5%;
                    background: rgba(0,0,0,0.5);
                    font-size: 15px;
                    color: white;
                    border-radius: 15px;
                    padding: 0 10px;
                }
            }
            .goods-base-inf{
                display: flex;
                flex-direction: column;
                padding: 5px;
                font-size: 15px;
                border-bottom: 10px solid #E8E8E8;
                .price{
                    display: flex;
                    align-items: center;
                    margin-bottom: 5px;
                    span{
                        font-size: 15px;
                        color: #FF6600;
                        margin: 0 5px 0 10px;
                        span{
                            font-size: 25px;
                            margin: 0;
                        }
                    }
                    ul{
                        display: flex;
                        flex-wrap: wrap;
                        li{
                            background: #FFCC99;
                            color: 	#E80000;
                            border-radius: 10px;
                            padding: 0 5px;
                            margin-right: 5px;
                            font-size: 10px;
                        }
                    }
                }
                .introduce{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p{
                        height: 2.7em;
                        width: 80%;
                        overflow: auto;
                        text-align: left;
                        padding-top: 3px;
                        font-weight: bold;
                        span{
                            background: #FF0000;
                            color: white;
                            border-radius: 8px;
                            padding: 2px 5px;
                            margin-right: 5px;
                        }
                    }
                    .share{
                        background: #E8E8E8;
                        border-radius: 15px;
                        padding: 5px;
                        i{
                            font-size: 15px;
                        }
                    }
                }
                .sale{
                    display: flex;
                    justify-content: space-between;
                    font-size: 10px;
                    color: #999;
                    margin: 10px 0;
                }
            }
            .goods-discount{
                display: flex;
                flex-direction: column;
                padding: 10px 5px;
                border-bottom: 10px solid #E8E8E8;
                .discount{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    div{
                        display: flex;
                        align-items: center;
                        span:nth-child(2){
                            background: #FFCC99;
                            color: 	#E80000;
                            border-radius: 10px;
                            padding: 0 5px;
                            font-size: 10px;
                            margin-right: 5px;
                        }
                    }
                }
                .server{
                    display: flex;
                    align-items: center;
                    font-weight: 700;
                }
            }
            .goods-parameter{
                display: flex;
                flex-direction: column;
                padding: 10px 5px;
                border-bottom: 10px solid #E8E8E8;
                .spec{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                }
                .parameter{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
            .goods-evaluate{
                display: flex;
                flex-direction: column;
                padding: 10px 5px;
                border-bottom: 10px solid #E8E8E8;
                .title{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    span:nth-child(1){
                        font-weight: 700;
                    }
                    span:nth-child(2){
                        color: #FF6600
                    }
                }
                .label{
                    display: flex;
                    flex-wrap: wrap;
                    p{
                        background: MistyRose;
                        border-radius: 15px;
                        padding: 8px;
                        margin: 0 10px 10px 0;
                    }
                }
                .evaluate{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    span{
                        margin-bottom: 5px;
                        i{
                            font-size: 30px;
                            color: #FF6600;
                            margin-right: 5px;
                        }
                        span{
                            font-size: 15px;
                            color: #999;
                        }
                    }
                    p{
                        text-align: left;
                        height: 2.7em;
                        font-weight: 700;
                        overflow: auto;
                    }
                }
            }
            .goods-shop{
                display: flex;
                flex-direction: column;
                padding: 10px 5px 20px 5px;
                border-bottom: 1px solid #E8E8E8;
                .inf{
                    display: flex;
                    align-items: center;
                    img{
                        margin-right: 5px;
                    }
                    div{
                        width: 45%;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        p:nth-child(1){
                            font-weight: bold;
                        }
                        p:nth-child(2){
                            font-size: 10px;
                            margin-top: 2px;
                            i{
                                font-size: 10px;
                            }
                            span:nth-child(1){
                                background: #E80000;
                                color: white;
                                border-radius: 10px;
                                padding: 0 5px;
                            }
                        }
                    }
                    .bt1{
                        border: 1px solid #FF6600;
                        color: #FF6600;
                        border-radius: 15px;
                        font-size: 10px;
                        padding: 3px;
                        margin-right: 10px;
                    }
                    .bt2{
                        border: 1px solid #FF6600;
                        background: #FF6600;
                        color: white;
                        border-radius: 15px;
                        font-size: 10px;
                        padding: 3px;
                    }
                }
                .score{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 20px;
                    color: #999;
                }
            }
            .goods-recommend{
                display: flex;
                flex-direction: column;
                padding: 10px 5px;
                border-bottom: 10px solid #E8E8E8;
                div{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                }
                ul{
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    li{
                        width: 32%;
                        text-align: left;
                        margin-bottom: 15px;
                        img{
                            border-radius: 5px;
                        }
                        .p1{
                            font-size: 10px;
                            height: 2.7em;
                            overflow: auto;
                            text-align: left;
                        }
                        .p2{
                            color: #FF6600;
                            font-size: 15px;
                        }
                    }
                }
            }
            .goods-detailed-inf{
                display: flex;
                flex-direction: column;
                padding: 10px 0;
                border-bottom: 1px solid #E8E8E8;
                background: #E8E8E8;
                span{
                    margin-bottom: 10px;
                    padding-bottom: 5px;
                    border-bottom: 1px solid #F8F8F8;
                    color: #999;
                }
            }
        }
        .footer{
            height: 8%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            box-sizing: border-box;
            border-top: 1px solid #F0F0F0;
            span{
                font-size: 10px;
                i{
                    font-size: 25px;
                }
            }
            span:active{
                color: #999;
            }
            div{
                height: 100%;
                display: flex;
                align-items: center;
                button{
                    height: 80%;
                    padding: 0 20px;
                    color: white;
                    font-weight: bold;
                    font-size: 12px;
                }
                .bt1{
                    background: #FFA500;
                    border-top-left-radius: 20px;
                    border-bottom-left-radius: 20px;
                }
                .bt2{
                    background: #FF6600;
                    border-top-right-radius: 20px;
                    border-bottom-right-radius: 20px;
                }
            }
        }
    }
</style>

