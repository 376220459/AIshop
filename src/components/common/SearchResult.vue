<template>
    <div class="searchresult-whole" id="resultWhole">
        <div class="select-list" :style="{right:selectRight+'rem',display:selectDisplay}">
            <span class="title">筛选</span>
            <div class="content">
                <div class="goods-type">
                    <span>商品类型</span>
                    <ul>
                        <li v-for="(item, index) in select.goodsType" :key="index" :style="goodsTypeStyle[index]" @click="changeGoodsType(item,index)">{{ item }}</li>
                    </ul>
                </div>

                <div class="goods-server">
                    <span>折扣和服务</span>
                    <ul>
                        <li v-for="(item2, index2) in select.goodsServer" :key="index2" :style="goodsServerStyle[index2]" @click="changeGoodsServer(item2,index2)">{{ item2 }}</li>
                    </ul>
                </div>

                <div class="goods-range">
                    <span>价格区间</span>
                    <div><input type="number" placeholder="最低价" v-model="lowprice"> —— <input type="number" placeholder="最高价" v-model="highprice"></div>
                    <ul>
                        <li v-for="(item3, index3) in select.priceRange" :key="index3" :style="goodsRangeStyle[index3]" @click="changeGoodsRange(index3,item3.price)">
                            <p style="margin-bottom:2px;"><strong>￥</strong>{{ item3.price }}</p>
                            <p>{{ item3.percentage }}%的选择</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="button">
                <button @click="clear">重置</button>
                <button @click="selectCommit">确定</button>
            </div>
        </div>

        <div class="cover" :style="{display:coverDisplay}" @click="hidden"></div>

        <div class="search">
            <i class="iconfont icon-fanhui" @click="goBack"></i>
            <input type="text" v-model="searchContent" @focus="goBack">
            <i class="iconfont icon-home" @click="goHome" style="color: #FFA500 "></i>
        </div>

        <div class="nav">
            <ul>
                <li :style="navStyle[0]" @click="changeNav('whole')">全部</li>
                <li :style="navStyle[1]" @click="changeNav('shop')">店铺</li>
            </ul>
        </div>

        <div class="goods-list" v-if="listIf[0]">
            <div class="list-nav">
                <select name="sort">
                    <option value="">综合</option>
                    <option value="">销量</option>
                    <option value="">评分</option>
                    <option value="">价格↓</option>
                    <option value="">价格↑</option>
                </select>
                <span @click="selectGoods">筛选<i class="iconfont icon-shaixuan"></i></span>
            </div>
            <div class="list">
                <ul>
                    <li v-for="(item, index) in goodslist" :key="index" @click="toGoods">
                        <img height="100%" :src="item.img" alt="goods">
                        <div class="goods-inf">
                            <p>{{ item.introduce }}</p>
                            <div class="goods-label"><span v-for="(itemLabel, indexLabel) in item.label" :key="indexLabel">{{ itemLabel }}</span></div>
                            <div class="pay-inf">
                                <span>￥{{ item.price }}</span>
                                <span>{{ item.payCount }}人付款</span>
                                <span>{{ item.address }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="shop-list" v-if="listIf[1]">
            <div class="shop-nav">
                <span :style="shopNavStyle[0]" @click="changeShopNav('comprehensive')">综合排序</span>
                <span :style="shopNavStyle[1]" @click="changeShopNav('sale')">销量优先</span>
                <span :style="shopNavStyle[2]" @click="changeShopNav('value')">好评优先</span>
            </div>
            <ul class="shop">
                <li v-for="(item, index) in shoplist" :key="index">
                    <div>
                        <div>
                            <img height="80%" :src="item.logo" alt="logo">
                            <span>{{ item.name }}</span>
                        </div>
                        <button @click="goShop">进店</button>
                    </div>
                    <div>
                        <img height="75%" :src="item.goods1" alt="goods1">
                        <img height="75%" :src="item.goods2" alt="goods2">
                        <img height="75%" :src="item.goods3" alt="goods3">
                    </div>
                    <div>
                        <span>#{{ item.year }}年店铺</span>
                        <span>#收藏人数{{ item.collectCount }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Search',
    data(){
        return{
            goodsTypeStyle: [],
            goodsServerStyle: [],
            goodsRangeStyle: [],
            lowprice: '',
            highprice: '',
            nav: '',
            shopNav: 'comprehensive',
            coverDisplay: '',
            searchContent: '',
            selectDisplay: '',
            selectRight: -8,
            goodsType: '',
            goodsServer: [],
            // goodsRange: '',
            select: {
                goodsType: ['USB','AV','HDMI','LAN端子','RF射频接口'],
                goodsServer: ['包邮','消费者保障','公益宝贝','7+天内退货','货到付款','花呗分期','快递到家'],
                priceRange: [
                    {
                        price: '1560-1980',
                        percentage: 11
                    },
                    {
                        price: '1980-2200',
                        percentage: 19
                    },
                    {
                        price: '2200-2580',
                        percentage: 25
                    },
                    {
                        price: '2580-3000',
                        percentage: 15
                    },
                    {
                        price: '3000-3500',
                        percentage: 30
                    },
                ]
            },
            goodslist: [
                {
                    introduce: 'aj鞋子男潮鞋高帮鞋男韩版潮流百搭板鞋高邦运动加绒男鞋冬季棉鞋',
                    label: ['','公益宝贝'],
                    price: '888.00',
                    payCount: '21.1w',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: 'aj鞋子男潮鞋高帮鞋男韩版潮流百搭板鞋高邦运动加绒男鞋冬季棉鞋',
                    label: ['','公益宝贝'],
                    price: '888.00',
                    payCount: '21.1w',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: 'aj鞋子男潮鞋高帮鞋男韩版潮流百搭板鞋高邦运动加绒男鞋冬季棉鞋',
                    label: ['','公益宝贝'],
                    price: '888.00',
                    payCount: '21.1w',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: 'aj鞋子男潮鞋高帮鞋男韩版潮流百搭板鞋高邦运动加绒男鞋冬季棉鞋',
                    label: ['','公益宝贝'],
                    price: '888.00',
                    payCount: '21.1w',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: 'aj鞋子男潮鞋高帮鞋男韩版潮流百搭板鞋高邦运动加绒男鞋冬季棉鞋',
                    label: ['','公益宝贝'],
                    price: '888.00',
                    payCount: '21.1w',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: 'aj鞋子男潮鞋高帮鞋男韩版潮流百搭板鞋高邦运动加绒男鞋冬季棉鞋',
                    label: ['','公益宝贝'],
                    price: '888.00',
                    payCount: '21.1w',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
            ],
            shoplist: [
                {
                    name: '小米官方旗舰店',
                    logo: 'static/search/shop1-logo.jpg',
                    goods1: 'static/search/shop1-goods1.jpg',
                    goods2: 'static/search/shop1-goods2.jpg',
                    goods3: 'static/search/shop1-goods3.jpg',
                    year: '5',
                    collectCount: '1910万'
                },
                {
                    name: '小米官方旗舰店',
                    logo: 'static/search/shop1-logo.jpg',
                    goods1: 'static/search/shop1-goods1.jpg',
                    goods2: 'static/search/shop1-goods2.jpg',
                    goods3: 'static/search/shop1-goods3.jpg',
                    year: '5',
                    collectCount: '1910万'
                },
                {
                    name: '小米官方旗舰店',
                    logo: 'static/search/shop1-logo.jpg',
                    goods1: 'static/search/shop1-goods1.jpg',
                    goods2: 'static/search/shop1-goods2.jpg',
                    goods3: 'static/search/shop1-goods3.jpg',
                    year: '5',
                    collectCount: '1910万'
                },
            ]
        }
    },
    computed: {
        navStyle(){
            let wholeStyle = this.nav == 'whole' ? 'color:#FF6600;border-bottom:2px solid #FF6600;':'';
            let shopStyle = this.nav == 'shop' ? 'color:#FF6600;border-bottom:2px solid #FF6600;':'';
            return [wholeStyle,shopStyle];
        },
        shopNavStyle(){
            let comprehensiveStyle = this.shopNav == 'comprehensive' ? 'color:#FF6600;':'';
            let saleStyle = this.shopNav == 'sale' ? 'color:#FF6600;':'';
            let valueStyle = this.shopNav == 'value' ? 'color:#FF6600;':'';
            return [comprehensiveStyle,saleStyle,valueStyle];
        },
        listIf(){
            let wholeIf = this.nav == 'whole'?true:false;
            let shopIf = this.nav == 'shop'?true:false;
            return [wholeIf,shopIf];
        }
    },
    methods: {
        goShop(){
            this.$router.push({path: '/shop'});
        },
        changeGoodsType(item,index){
            this.goodsTypeStyle = [];
            this.goodsTypeStyle[index] = 'color:#FF6600';
            this.goodsType = item;
        },
        changeGoodsServer(item,index){
            this.goodsServerStyle[index] = this.goodsServerStyle[index]=='color:#FF6600'?'':'color:#FF6600';
            let arrStorage = this.goodsServerStyle.concat();
            this.goodsServerStyle = arrStorage;
            this.goodsServer.push(item)
        },
        changeGoodsRange(index,price){
            this.goodsRangeStyle = [];
            this.goodsRangeStyle[index] = 'color:#FF6600';
            this.lowprice = price.split('-')[0];
            this.highprice = price.split('-')[1];
        },
        clear(){
            this.goodsType = this.lowprice = this.highprice = '';
            this.goodsServer = this.goodsTypeStyle = this.goodsServerStyle = this.goodsRangeStyle = [];
        },
        selectCommit(){
            // this.$toast({
            //     message: '商品类型：' + this.goodsType + '\n' + '折扣和服务：' + this.goodsServer.join('--')
            // })
            alert('商品类型： ' + this.goodsType + '\n' + '折扣和服务： ' + this.goodsServer.join('、') + '\n' + '价格区间： ' + this.lowprice + '-' + this.highprice);
            this.hidden();
        },
        changeNav(nav){
            this.nav = nav;
            this.$router.push({path:'/searchresult', query: {type: nav,goods: this.searchContent}});
        },
        changeShopNav(shopNav){
            this.shopNav = shopNav;
        },
        goBack(){
            let resultWhole = document.getElementById('resultWhole');
            resultWhole.style.display = 'none';
            this.$router.push({path:'/search',query:{goods: this.searchContent}});
        },
        goHome(){
            this.$router.push({path:'/home'});
        },
        selectGoods(){
            this.selectDisplay = 'flex';
            this.coverDisplay = 'block';
            if(this.selectRight < '0'){
                this.selectRight += 0.5;
                setTimeout(() => {
                    this.selectGoods();
                },10);
            }
        },
        hidden(){
            this.selectDisplay = 'none';
            this.coverDisplay = 'none';
            this.selectRight = -8;
        },
        toGoods(){
            this.$router.push({path:'/goods'});
        }
    },
    mounted() {
        this.searchContent = this.$route.query.goods;
        this.nav = this.$route.query.type;
    },
}
</script>

<style lang="scss" scoped>
    .searchresult-whole{
        height: 100%;
        width: 100%;
        background: #F0F0F0;
        overflow: hidden;
        position: relative;

        .select-list{
            height: 100%;
            width: 80%;
            display: none;
            // display: flex;
            flex-direction: column;
            background: white;
            z-index: 100;
            position: absolute;
            .title{
                background: #F8F8F8;
                height: 4%;
                display: flex;
                align-items: center;
                color: #999;
                padding-left: 10px;
            }
            .content{
                height: 86%;
                overflow: auto;
                
                .goods-type,.goods-server,.goods-range{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 10px 5px;
                    span{
                        margin-bottom: 10px;
                    }
                    ul{
                        display: flex;
                        flex-wrap: wrap;
                        // justify-content: space-around;
                        align-items: center;
                        padding-bottom: 10px;
                        border-bottom: 1px dotted #999;
                        li{
                            width: 31%;
                            background: #F8F8F8;
                            padding: 10px;
                            border-radius: 10px;
                            margin: 5px 2px;
                        }
                    }
                }
                .goods-range{
                    input{
                        width: 30%;
                        height: 30px;
                        font-size: 15px;
                        border: 1px solid #999;
                        border-radius: 10px;
                        padding: 0 5px;
                        text-align: center;
                    }
                }
            }
            .button{
                height: 10%;
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
                background: #F0F0F0;
                button{
                    z-index: 2;
                    background:#FF6600;
                    margin: 0 5px 10px 0;
                    font-size: 20px;
                    padding: 5px 10px;
                    border-radius: 15px;
                }
            }
        }

        .cover{
            width:100%;
            height: 100%;
            display: none;
            z-index: 99;
            position: absolute;
            background: #778899;
            opacity: 0.5;
        }
        
        .search{
            height: 8%;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
                font-size: 30px;
            }
            input{
                border: 1px solid gray;
                border-radius: 20px;
                height: 30px;
                width: 55%;
                padding: 0 10px;
                margin: 0 10px 0 30px;
                font-size: 15px;
                background: white;
            }
        }
        .nav{
            height: 8%;
            ul{
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 100%;
                li{
                    font-size: 20px;
                    padding-bottom: 5px;
                }
            }
        }
        .goods-list{
            height: 84%;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: white;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            .list-nav{
                height: 10%;
                width: 90%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                select{
                    border: 0;
                    background: transparent;
                    outline: 0;
                    color: #FF6600;
                    font-size: 15px;
                }
                span{
                    font-size: 20px;
                    i{
                        font-size: 20px;
                    }
                }
                span:active{
                    color: #FF6600;
                }
            }
            .list{
                height: 90%;
                width: 95%;
                overflow: auto;
                ul{
                    height: 100%;
                    li{
                        height: 33%;
                        width: 100%;
                        display: flex;
                        margin-bottom: 10px;
                        padding-bottom: 5px;
                        border-bottom: 1px dotted #E8E8E8;
                        img{
                            border-radius: 15px;
                            margin-right: 5px;
                        }
                        .goods-inf{
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            align-items: flex-start;
                            p{
                                height: 4em;
                                width: 12em;
                                font-size: 15px;
                                overflow: auto;
                                word-wrap: break-word;
                                text-align: left;
                                margin-top: 10px;
                            }
                            .goods-label{
                                margin-top: 30px;
                                display: flex;
                                span{
                                    font-size: 10px;
                                    // border: 1px solid #FFA500;
                                    background: #FFDAB9;
                                    color: #FFA500;
                                    border-radius: 8px;
                                    padding: 1px 0;
                                    margin-right: 5px;
                                }
                                span:nth-child(2){
                                    // border: 1px solid #DC143C;
                                    background: #FFE4E1;
                                    color: #DC143C;
                                }
                            }
                            .pay-inf{
                                span{
                                    color: #999;
                                    font-size: 10px;
                                    width: 30px;
                                    overflow: auto;
                                }
                                span:nth-child(1){
                                    color: #FF6600;
                                    font-size: 15px;
                                    margin-right: 10px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .shop-list{
            height: 84%;
            background: white;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .shop-nav{
                height: 10%;
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                font-size: 15px;
            }
            .shop{
                height: 90%;
                width: 95%;
                overflow: auto;
                li{
                    height: 50%;
                    border-bottom: 1px dotted #999;
                    // width: 100%;
                    div:nth-child(1){
                        height: 20%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        div{
                            height: 100%;
                            font-size: 15px;
                            img{
                                margin-right: 10px;
                                border-radius: 10px;
                            }
                        }
                        button{
                            border: 1px solid #FF6600;
                            border-radius: 15px;
                            padding: 3px 8px;;
                            color: #FF6600;
                        }
                    }
                    div:nth-child(2){
                        height: 60%;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        img{
                            border-radius: 10px;
                        }
                    }
                    div:nth-child(3){
                        height: 20%;
                        display: flex;
                        align-items: center;
                        span{
                            background: rgb(231, 231, 236);
                            border-radius: 10px;
                            color: #999;
                            font-size: 15px;
                            padding: 2px;
                            margin: 0 5px;
                        }
                    }
                }
            }
        }
    }
</style>


