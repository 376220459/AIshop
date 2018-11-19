<template>
    <div class="searchresult-whole" id="resultWhole">
        <div class="search">
            <i class="iconfont icon-fanhui" @click="goBack"></i>
            <input type="text" v-model="searchContent" @focus="goBack">
            <button>搜索</button>
        </div>

        <div class="nav">
            <ul>
                <li :style="navStyle[0]" @click="changeNav('whole',0)">全部</li>
                <li :style="navStyle[1]" @click="changeNav('shop',1)">店铺</li>
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
                <span>筛选<i class="iconfont icon-shaixuan"></i></span>
            </div>
            <div class="list">
                <ul>
                    <li v-for="(item, index) in goodslist" :key="index">
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
                        <button>进店</button>
                    </div>
                    <div>
                        <img height="75%" :src="item.goods1" alt="goods1">
                        <img height="75%" :src="item.goods2" alt="goods2">
                        <img height="75%" :src="item.goods3" alt="goods3">
                    </div>
                    <div>
                        <span>{{ item.year }}年店铺</span>
                        <span>收藏人数{{ item.collectCount }}</span>
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
            nav: 'whole',
            shopNav: 'comprehensive',
            searchContent: '',
            listIf: [true],
            goodslist: [
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮',''],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                },
                {
                    introduce: '花花公子男士羽绒服2018年新款冬季青年中长款连帽大毛领休闲外套',
                    label: ['包邮','公益宝贝'],
                    price: '558.00',
                    payCount: '967',
                    address: '浙江 杭州',
                    img: 'static/search/goods1.jpg'
                }
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
        }
    },
    methods: {
        changeNav(nav,index){
            this.listIf = [];
            this.listIf[index] = true;
            this.nav = nav;
        },
        changeShopNav(shopNav){
            this.shopNav = shopNav;
        },
        goBack(){
            let resultWhole = document.getElementById('resultWhole');
            resultWhole.style.display = 'none';
            this.$router.push({path:'/search',query:{goods: this.searchContent}})
        },
        deleteAll(){
            this.$message.confirm('删除全部历史记录？').then(action=>{
                this.history = [];
            },reject=>{
                console.log('取消删除操作');
            })
        },
        historyClick(item){
            this.searchContent = item;
        }
    },
    mounted() {
        this.searchContent = this.$route.query.goods;
    },
}
</script>

<style lang="scss" scoped>
    .searchresult-whole{
        height: 100%;
        background: #DCDCDC;
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
                padding-left: 10px;
                margin: 0 10px 0 30px;
                font-size: 15px;
                background: white;
            }
            button{
                height: 30px;
                padding: 5px 10px;
                border-radius: 15px;
                background: #FF6600;
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


