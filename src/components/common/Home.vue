<template>
    <div class="home-whole">
        <div class="home-content">
            <div class="search">
                <div class="search-content">
                    <input type="text" placeholder="淘一淘想要的东西吧">
                    <i class="iconfont icon-search"></i>
                </div>
            </div>

            <div class="others">
                <div class="hot">
                    <i class="iconfont icon-huoyan"></i>
                    <ul>
                        <li v-for="(item, index) in hotGoods" :key="index">{{ item }}</li>
                    </ul>
                </div>

                <div class="hot-wipe">
                    <mt-swipe :auto="3000">
                        <mt-swipe-item v-for="(item, index) in hotImgs" :key="index" @click.native="click">
                            <img :src="item" alt="hot" width="90%" height="100%" style="border-radius: 15px">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>

                <div class="recommend">
                    <span>每日推荐</span>
                    <ul>
                        <li v-for="(item, index) in recommendImgs" :key="index" @click="click">
                            <img :src="item" alt="recommend" width="100%">
                        </li>
                    </ul>
                </div>

                <div class="favourite">
                    <span>猜你喜欢</span>
                    <ul>
                        <li v-for="(item, index) in favouriteGoods" :key="index" @click="click">
                            <div class="details">
                                <p><strong>{{ item.name }}</strong></p>
                                <img :src="item.sImg" alt="小图" width="100%">
                            </div>
                            <div class="big-img"><img :src="item.bImg" alt="大图" width="100%"></div>
                        </li>
                    </ul>
                </div>

                <div class="goods" id="goods">
                    <!-- <span>随便看看</span> -->
                    <div class="goods-nav" style="position:sticky;top:0">
                        <ul>
                            <li>全部</li>
                            <li>热销</li>
                            <li>衣服</li>
                            <li>电子</li>
                            <li>其他</li>
                        </ul>
                    </div>
                    <ul class="goods-whole" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="3">
                        <li v-for="(item, index) in storage" :key="index">
                            <div><img :src="item.img" alt="goods" width="100%"></div>
                            <div style="width:90%;"><p>{{ item.introduce }}</p></div>
                            <div><strong>￥{{ item.price }}</strong><span>{{ item.payCount }}人付款</span></div>
                        </li>
                    </ul>
                </div>
                
                <div class="bottomLine" id="bottomLine" style="display:none;">
                    做人，就要有底线嘛~
                </div>
            </div>
        </div>
        <div class="footer"><Footer></Footer></div>
    </div>

</template>

<script>
import Footer from '@/components/common/Footer'
export default {
    name: 'Home',
    components: {
        Footer: Footer
    },
    data(){
        return{
            loading: '',
            storage: [],
            hotGoods: ['长靴','打底裤','牛仔裤','电饭锅','折扣','苹果'],
            hotImgs: ['static/swipe/home/hot1.jpg','static/swipe/home/hot2.jpg','static/swipe/home/hot3.jpg'],
            recommendImgs: ['static/recommend/home/recommend1.jpg','static/recommend/home/recommend2.jpg','static/recommend/home/recommend3.jpg','static/recommend/home/recommend4.jpg','static/recommend/home/recommend3.jpg','static/recommend/home/recommend4.jpg'],
            favouriteGoods: [
                {
                    name: '外星人笔记本',
                    sImg: 'static/person/favourite/sImg1.jpg',
                    bImg: 'static/person/favourite/bImg1.jpg'
                },
                {
                    name: '耐克新款球鞋',
                    sImg: 'static/person/favourite/sImg2.jpg',
                    bImg: 'static/person/favourite/bImg2.jpg'
                },
                {
                    name: '新百伦潮鞋',
                    sImg: 'static/person/favourite/sImg3.jpg',
                    bImg: 'static/person/favourite/bImg3.jpg'
                },
                {
                    name: 'IphoneX',
                    sImg: 'static/person/favourite/sImg4.jpg',
                    bImg: 'static/person/favourite/bImg4.jpg'
                },
            ],
            goods: [
                {
                    introduce: '黑爵AK328电竞机械键盘,一体成型键帽，拒绝掉色脱色风险。',
                    img: 'static/goods/home/goods1.jpg',
                    price: '188',
                    payCount: '1206'
                },
                {
                    introduce: '珍珍家 大毛领中长款面包服,大毛领贵气十足，提升档次显的灵气少女。',
                    img: 'static/goods/home/goods2.jpg',
                    price: '89',
                    payCount: '1.6w'
                },
                {
                    introduce: 'coco清新持久淡香女士香水 斩男小样,甄选法国进口香料，可长时间持续留香。',
                    img: 'static/goods/home/goods3.jpg',
                    price: '499',
                    payCount: '5010'
                },
                {
                    introduce: 'KS骑行套袖冰凉袖套运动套袖男士防晒袖套护臂套袖自行车袖套。',
                    img: 'static/goods/home/goods4.jpg',
                    price: '38',
                    payCount: '9.9w'
                },
                {
                    introduce: '7M大毛领羽绒服,大毛领的设计，质感满满。',
                    img: 'static/goods/home/goods5.jpg',
                    price: '298',
                    payCount: '36'
                },
                {
                    introduce: '法布朗100%纯可可脂无糖黑巧克力,百分之八十八黑巧克力，苦甜适中。',
                    img: 'static/goods/home/goods6.jpg',
                    price: '99',
                    payCount: '3.6w'
                },
                {
                    introduce: '360 p2双频5G千兆家用无线路由器,1200M高速上网，比普通路由器快3倍。',
                    img: 'static/goods/home/goods7.jpg',
                    price: '136',
                    payCount: '6000'
                },
                {
                    introduce: '芭蕾皇后 狐狸毛领派克大衣，拼接设计，紧跟时尚与众不同。',
                    img: 'static/goods/home/goods8.jpg',
                    price: '3122',
                    payCount: '58'
                },
                {
                    introduce: 'LiLiA 美白补水祛斑面膜，面膜精华液丰富，给皮肤充足的营养。',
                    img: 'static/goods/home/goods9.jpg',
                    price: '121',
                    payCount: '2.1w'
                },
                {
                    introduce: 'ABS爱彼此 剃毛机去除毛球修剪器衣服吸毛刮毛器毛衣去毛机打毛机。',
                    img: 'static/goods/home/goods10.jpg',
                    price: '36',
                    payCount: '9.1w'
                },
            ]
        }
    },
    methods: {
        click(){
            this.$toast({
                message: '该商品已下架',
                iconClass: 'iconfont icon-jinggao1',
                duration: 500
            })
        },
        loadMore(){
            this.loading = true;
            this.$loading.open({
                text: '正在加载',
                spinnerType: 'fading-circle'
            })
            setTimeout(() => {
                if(this.storage.length == this.goods.length){
                    this.$loading.close();
                    this.$toast({
                        message: '到底了，别刷新啦...',
                        duration: 1000
                    })
                    let bottomLine = document.getElementById('bottomLine');
                    bottomLine.style.display = 'flex';
                }else{
                    let last = this.storage.length-1;
                    if(this.goods.length-this.storage.length>=6){
                        for (let i = 1; i <= 6; i++) {
                            this.storage.push(this.goods[i+last]);
                        }
                    }else{
                        for (let i = this.storage.length; i <= this.goods.length-1; i++) {
                            this.storage.push(this.goods[i]);
                        }
                    }
                    this.loading = false;
                    this.$loading.close();
                }
            }, 1500);
        }
    }
}
</script>

<style lang="scss">
    .home-whole{
        height: 100%;
        // background: url(/static/back/home.png);
        // background-size: cover;
        background: #f1a775;
        .footer{
            height: 10%;
            ul{
                li:nth-child(1){
                    color: #26a2ff;transform: scale(0.9)
                }
            }
        }
        .home-content{
            user-select: none;
            height: 90%;
            width: 100%;
            overflow: auto;
            // list-style: none;
            .search{
                height: 10%;
                display: flex;
                justify-content: center;
                .search-content{
                    // height: 100%;
                    width: 70%;
                    display: flex;
                    align-items: center;
                    i{
                        font-size: 2em;
                        margin-left: 5px;
                    }
                    i:active{
                        color: #26a2ff;
                    }
                    input{
                        height: 2em;
                        width: 80%;
                        outline: none;
                        background: transparent;
                        border: 1px solid #FF6600;
                        border-radius: 18px;
                        padding: 2px 0 2px 10px;
                        font-size: 1em;
                    }
                }
            }
            .others{
                height: 90%;
                width: 100%;
                overflow: auto;
                .hot{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 5px;
                    i{
                        color: #FF6600;
                        font-size: 2em;
                        margin-right: 5px;
                    }
                    ul{
                        width: 80%;
                        height: 95%;
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        li{
                            height: 1.5em;
                            // list-style: none;
                            border: 1px solid #FF6600;
                            border-radius: 10px;
                            margin: 3px 5px;
                            padding: 2px;
                            background: #FF6600;
                        }
                    }
                }
                .hot-wipe{
                    height: 35%;
                    margin: 5px 0;
                    display: flex;
                    align-items: center;
                    .mint-swipe{
                        height: 95%;
                        width: 100%;
                    }
                }
                .recommend{
                    ul{
                        // height: 95%;
                        // width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        align-items: center;
                        li{
                            // list-style: none;
                            width: 32%;
                            margin: 0;
                        }
                    }
                }
                .favourite{
                    ul{
                        
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        li{
                            background: white;
                            box-sizing: border-box;
                            // list-style: none;
                            width: 50%;
                            border: 1px solid rgb(202, 194, 194);
                            border-top: 0;
                            display: grid;
                            grid-template: 1fr / 1fr 1fr;
                            .details{
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                p{
                                    width: 7em;
                                    word-wrap: break-word;
                                }
                            }
                            .big-img{
                                display: flex;
                                align-items: center;
                            }
                        }
                    }
                }
                .goods{
                    .goods-nav{
                        ul{
                            display: flex;
                            justify-content: space-around;
                            background: #f1a775;
                            border-top: 1px solid white;
                            li{
                                display: flex;
                                align-items: center;
                                border-right: 1px solid #999;
                                padding: 2px 23px;
                                height: 3em;
                            }
                            li:nth-child(5){
                                border-right: 0;
                            }
                        }
                    }
                    .goods-whole{
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        li{
                            background: white;
                            box-sizing: border-box;
                            // list-style: none;
                            width: 50%;
                            border: 1px solid rgb(202, 194, 194);
                            border-top: 0;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            div{
                                margin-bottom: 5px;
                            }
                            div:nth-child(3){
                                margin: 0;
                                align-self: flex-start;
                                strong{
                                    color:#FF6600;
                                    margin-right: 5px;
                                    font-size: 1.5em
                                }
                                span{
                                    color: #999;
                                }
                            }
                            p{
                                text-align: left;
                                word-wrap: break-word;
                                overflow: auto;
                                height: 2.5em;
                            }
                        }
                    }
                }
                .bottomLine{
                    display: flex;
                    justify-content: center;
                    border-top:1px dashed rgb(202, 194, 194);
                    padding-top: 5px;
                    margin-top: 5px;
                }
            }
            
        }
    }
</style>