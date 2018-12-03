<template>
    <div class="home-whole" id="homeWhole" :style="{right:wholeRight+'%'}">
        <div class="home-content">
            <div class="search">
                <div class="search-content">
                    <input type="text" placeholder="淘一淘想要的东西吧" @focus="toSearch">
                    <i class="iconfont icon-search"></i>
                </div>
            </div>

            <div class="others">
                <div class="hot">
                    <i class="iconfont icon-huoyan"></i>
                    <ul>
                        <li v-for="(item, index) in hotGoods" :key="index" @click="hotClick(item)">{{ item }}</li>
                    </ul>
                </div>

                <div class="hot-wipe">
                    <mt-swipe :auto="3000">
                        <mt-swipe-item v-for="(item, index) in hotImgs" :key="index" @click.native="goGoods">
                            <img :src="item" alt="hot" width="100%" height="100%">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>

                <div class="recommend">
                    <span>每日推荐</span>
                    <ul>
                        <li v-for="(item, index) in recommendImgs" :key="index" @click="goGoods">
                            <img :src="item" alt="recommend" width="100%" style="border-radius:10px">
                        </li>
                    </ul>
                </div>

                <div class="favourite">
                    <span>猜你喜欢</span>
                    <ul>
                        <li v-for="(item, index) in favouriteGoods" :key="index" @click="goGoods">
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
                    <div class="goods-nav">
                        <ul>
                            <li @click="goodsNavIfChange(0)" :style="goodsNavStyles[0]">|全部|</li>
                            <li @click="goodsNavIfChange(1)" :style="goodsNavStyles[1]">|热销|</li>
                            <li @click="goodsNavIfChange(2)" :style="goodsNavStyles[2]">|衣服|</li>
                            <li @click="goodsNavIfChange(3)" :style="goodsNavStyles[3]">|电子|</li>
                            <li @click="goodsNavIfChange(4)" :style="goodsNavStyles[4]">|其他|</li>
                        </ul>
                    </div>

                    <ul v-if="goodsNavIf[0]" class="goods-whole">
                        <li v-for="(item, index) in storageWhole" :key="index" @click="goGoods">
                            <div><img :src="item.img" alt="goods" width="100%"></div>
                            <div style="width:90%;"><p>{{ item.introduce }}</p></div>
                            <div><strong>￥{{ item.price }}</strong><span>{{ item.payCount }}人付款</span></div>
                        </li>
                        <div @click="loadMore(storageWhole,goods)" class="goods-loading">点击加载更多...</div>
                    </ul>

                    <ul v-if="goodsNavIf[1]" class="goods-whole">
                        <li v-for="(item, index) in storageHot" :key="index" @click="goGoods">
                            <div><img :src="item.img" alt="goods" width="100%"></div>
                            <div style="width:90%;"><p>{{ item.introduce }}</p></div>
                            <div><strong>￥{{ item.price }}</strong><span>{{ item.payCount }}人付款</span></div>
                        </li>
                        <div @click="loadMore(storageHot,goodsHot)" class="goods-loading">点击加载更多...</div>
                    </ul>
                    
                    <ul v-if="goodsNavIf[2]" class="goods-whole">
                        <li v-for="(item, index) in storageClothes" :key="index" @click="goGoods">
                            <div><img :src="item.img" alt="goods" width="100%"></div>
                            <div style="width:90%;"><p>{{ item.introduce }}</p></div>
                            <div><strong>￥{{ item.price }}</strong><span>{{ item.payCount }}人付款</span></div>
                        </li>
                        <div @click="loadMore(storageClothes,goodsClothes)" class="goods-loading">点击加载更多...</div>
                    </ul>
                    <ul v-if="goodsNavIf[3]" class="goods-whole">
                        <li v-for="(item, index) in storageElectrical" :key="index" @click="goGoods">
                            <div><img :src="item.img" alt="goods" width="100%"></div>
                            <div style="width:90%;"><p>{{ item.introduce }}</p></div>
                            <div><strong>￥{{ item.price }}</strong><span>{{ item.payCount }}人付款</span></div>
                        </li>
                        <div @click="loadMore(storageElectrical,goodsElectrical)" class="goods-loading">点击加载更多...</div>
                    </ul>
                    <ul v-if="goodsNavIf[4]" class="goods-whole">
                        <li v-for="(item, index) in storageOthers" :key="index" @click="goGoods">
                            <div><img :src="item.img" alt="goods" width="100%"></div>
                            <div style="width:90%;"><p>{{ item.introduce }}</p></div>
                            <div><strong>￥{{ item.price }}</strong><span>{{ item.payCount }}人付款</span></div>
                        </li>
                        <div @click="loadMore(storageOthers,goodsOthers)" class="goods-loading">点击加载更多...</div>
                    </ul>

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
            wholeRight: 0,
            goodsNavIf: [true],
            storageWhole: [],
            storageHot: [],
            storageClothes: [],
            storageElectrical: [],
            storageOthers: [],
            hotGoods: ['长靴','打底裤','牛仔裤','电饭锅','折扣','苹果'],
            hotImgs: ['static/swipe/home/hot1.jpg','static/swipe/home/hot2.jpg','static/swipe/home/hot3.jpg'],
            recommendImgs: ['static/recommend/home/recommend1.jpg','static/recommend/home/recommend2.jpg','static/recommend/home/recommend3.jpg','static/recommend/home/recommend4.jpg','static/recommend/home/recommend5.jpg','static/recommend/home/recommend6.jpg'],
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
                {
                    introduce: '英国进口Douxbebe电动吸奶器正品静音吸乳无痛全自动拔奶挤奶器。',
                    img: 'static/goods/home/goods11.jpg',
                    price: '55',
                    payCount: '32'
                },
                {
                    introduce: '狗狗衣服冬装冬天拉布拉多金毛萨摩耶边牧中型大型犬宠物狗四脚衣。',
                    img: 'static/goods/home/goods12.jpg',
                    price: '65',
                    payCount: '324'
                },
                {
                    introduce: 'HEENOOR 个性简约情侣杯，打造磨砂质感杯身，手感丝滑常握不累。',
                    img: 'static/goods/home/goods13.jpg',
                    price: '88',
                    payCount: '1534'
                },
                {
                    introduce: '谷梵妮束脚休闲裤，裤身两侧饰条纹拼接料,潮流瞩目。',
                    img: 'static/goods/home/goods14.jpg',
                    price: '124',
                    payCount: '2231'
                },
            ],
            goodsHot: [
                {
                    introduce: 'type-c数据线适用华为p9p10p20pro荣耀v8v9v10手机三星s8充电器4c原装6mix2s小米5x5s乐视1s2正品快充tpc加长',
                    img: 'static/goods/home/goodsHot1.jpg',
                    price: '8.9',
                    payCount: '12.3w'
                },
                {
                    introduce: '南极人男士内裤男平角裤纯棉质莫代尔全棉性感潮青年四角裤头裤衩',
                    img: 'static/goods/home/goodsHot2.jpg',
                    price: '58',
                    payCount: '9.5w'
                },
                {
                    introduce: '冬季韩版可爱家用棉拖鞋女厚底包跟居家室内情侣毛托鞋男保暖家居',
                    img: 'static/goods/home/goodsHot3.jpg',
                    price: '21.2',
                    payCount: '10.8w'
                },
                {
                    introduce: '【官方正版】夏科u盘32g高速金属刻字定制logo优盘创意移动迷你汽车车载电脑两用usb可爱学生男女正品大容量',
                    img: 'static/goods/home/goodsHot4.jpg',
                    price: '28',
                    payCount: '50.9w'
                },
                {
                    introduce: '橙子新鲜水果包邮当季脐橙甜橙手剥橙果冻橙10斤装批发麻阳冰糖橙',
                    img: 'static/goods/home/goodsHot5.jpg',
                    price: '26.8',
                    payCount: '7.1w'
                },
                {
                    introduce: '秋冬打底裤女外穿2018新款加绒保暖厚款内穿灰色螺纹棉裤紧身薄款',
                    img: 'static/goods/home/goodsHot6.jpg',
                    price: '48',
                    payCount: '9.9w'
                },
            ],
            goodsClothes: [
                {
                    introduce: '男士长袖T恤冬季新款加绒卫衣潮流打底衫加厚秋衣保暖上衣',
                    img: 'static/goods/home/goodsClothes1.jpg',
                    price: '88',
                    payCount: '3331'
                },
                {
                    introduce: '2018新款秋装秋冬季秋衣潮流加绒衣服打底衫卫衣男士长袖t恤',
                    img: 'static/goods/home/goodsClothes2.jpg',
                    price: '69',
                    payCount: '2.5w'
                },
                {
                    introduce: '卫衣男士长袖t恤秋装上衣韩版潮流加绒加厚打底衫男冬季衣服',
                    img: 'static/goods/home/goodsClothes3.jpg',
                    price: '81',
                    payCount: '1.5w'
                },
                {
                    introduce: '花花公子秋冬装棉衣男士外套男装 棉袄男韩版连帽冬季棉服男衣服',
                    img: 'static/goods/home/goodsClothes4.jpg',
                    price: '284',
                    payCount: '846'
                },
                {
                    introduce: '高腰加绒牛仔裤女2018冬季新款韩版显瘦chic复古学生紧身小脚长裤',
                    img: 'static/goods/home/goodsClothes5.jpg',
                    price: '75',
                    payCount: '8.6w'
                },
                {
                    introduce: '加绒加厚打底裤女外穿2018秋冬新款保暖黑色高腰显瘦小脚铅笔裤子',
                    img: 'static/goods/home/goodsClothes6.jpg',
                    price: '56',
                    payCount: '942'
                },
            ],
            goodsElectrical: [
                {
                    introduce: '华为 P20徕卡双镜头,AI智慧全面屏 ,杜比全景声',
                    img: 'static/goods/home/goodsElectrical1.jpg',
                    price: '3088',
                    payCount: '1.5w'
                },
                {
                    introduce: '小米 Max 3巨无霸级全面屏,AI双摄,双功放立体声',
                    img: 'static/goods/home/goodsElectrical2.jpg',
                    price: '1499',
                    payCount: '4.8w'
                },
                {
                    introduce: '松下 AG-UX90MC专业摄像机,远程控制,自动聚焦',
                    img: 'static/goods/home/goodsElectrical3.jpg',
                    price: '7821',
                    payCount: '513'
                },
                {
                    introduce: 'Xiaomi/小米 小米笔记本电脑Air 12.5吋256G轻薄便携学生游戏电脑笔记本官方正品超薄',
                    img: 'static/goods/home/goodsElectrical4.jpg',
                    price: '3999',
                    payCount: '2.8w'
                },
                {
                    introduce: '炫龙 毁灭者DD 2 dd2 GTX1050TI 4G独显 笔记本电脑超薄便捷学生 八代 酷睿i5-8400吃鸡游戏本商务本超级本',
                    img: 'static/goods/home/goodsElectrical5.jpg',
                    price: '5888',
                    payCount: '1.3w'
                },
                {
                    introduce: '电脑音响台式机笔记本家用迷你长条低音炮小音箱usb供电有源影响喇叭Golden Field/金河田 M16',
                    img: 'static/goods/home/goodsElectrical6.jpg',
                    price: '99',
                    payCount: '1324'
                },
            ],
            goodsOthers: [
                {
                    introduce: 'Easy北欧简约现代布艺床1.8米双人实木婚床可拆洗小户型布床主卧',
                    img: 'static/goods/home/goodsOthers1.jpg',
                    price: '2186',
                    payCount: '18'
                },
                {
                    introduce: '绿净全自动鞋套机家用客厅一次性脚套智能鞋膜机套鞋器鞋套盒新款',
                    img: 'static/goods/home/goodsOthers2.jpg',
                    price: '168',
                    payCount: '125'
                },
                {
                    introduce: 'weimeishi欧式艺术钟表 时尚创意静音时钟 美式现代简约客厅挂钟',
                    img: 'static/goods/home/goodsOthers3.jpg',
                    price: '325',
                    payCount: '628'
                },
                {
                    introduce: '黑天鹅蛋糕挚爱玫瑰牛奶巧克力',
                    img: 'static/goods/home/goodsOthers4.jpg',
                    price: '999',
                    payCount: '521'
                },
                {
                    introduce: '1919酒类直供 53度贵州茅台生肖酒（狗年）500ml',
                    img: 'static/goods/home/goodsOthers5.jpg',
                    price: '3450',
                    payCount: '1.3w'
                },
                {
                    introduce: '楚门吉他初学者女D50单板民谣吉他男旅行41寸电箱学生入门吉它D25',
                    img: 'static/goods/home/goodsOthers6.jpg',
                    price: '2135',
                    payCount: '1324'
                },
            ]
        }
    },
    computed: {
        goodsNavStyles(){
            let styleWhole = this.goodsNavIf[0]==true?'color:#FF6600;font-weight:bold':'';
            let styleHot = this.goodsNavIf[1]==true?'color:#FF6600;font-weight:bold':'';
            let styleClothes = this.goodsNavIf[2]==true?'color:#FF6600;font-weight:bold':'';
            let styleElectrical = this.goodsNavIf[3]==true?'color:#FF6600;font-weight:bold':'';
            let styleOthers = this.goodsNavIf[4]==true?'color:#FF6600;font-weight:bold':'';
            return [styleWhole,styleHot,styleClothes,styleElectrical,styleOthers];
        }
    },
    methods: {
        leftMove(){
            this.wholeRight += 10;
            setTimeout(() => {
                this.leftMove();
            },10);
        },
        goGoods(){
            this.leftMove();
            setTimeout(() => {
                this.$router.push({path:'/goods'}); 
            }, 200);
        },
        hotClick(item){
            this.$router.push({path:'/searchresult', query: {type: 'whole',goods: item}});
        },
        toSearch(){
            let homeWhole = document.getElementById('homeWhole');
            homeWhole.style.display = 'none';
            this.$router.push({path: '/search'});
        },
        goodsNavIfChange(index){
            this.goodsNavIf = [];
            this.goodsNavIf[index] = true;
        },
        loadMore(storage,goods){
            this.$loading.open({
                text: '正在加载',
                spinnerType: 'fading-circle'
            });
            setTimeout(() => {
                let last = storage.length-1;
                this.$loading.close();
                if(storage.length == goods.length){
                    this.$toast({
                        message: '到底啦，看看别的宝贝吧~',
                        duration: 1000
                    })
                }else if(goods.length-storage.length>=4){
                    for (let i = 1; i <= 4; i++) {
                        storage.push(goods[i+last]);
                    }
                }else{
                    for (let i = storage.length; i <= goods.length-1; i++) {
                        storage.push(goods[i]);
                    }
                }
            }, 500);
        }
    },
    mounted() {
        for(let i = 0;i<=3;i++){
            this.storageWhole.push(this.goods[i]);
            this.storageHot.push(this.goodsHot[i]);
            this.storageClothes.push(this.goodsClothes[i]);
            this.storageElectrical.push(this.goodsElectrical[i]);
            this.storageOthers.push(this.goodsOthers[i]);
        }
    },
}
</script>

<style lang="scss">
    .home-whole{
        height: 100%;
        background: #F0F0F0;
        display: grid;
        grid-template: 9fr 1fr / 1fr;
        position: relative;
        .footer{
            ul{
                li:nth-child(1){
                    color: #FF6600;
                    transform: scale(0.9)
                }
            }
        }
        .home-content{
            width: 100%;
            overflow: auto;
            // list-style: none;
            .search{
                height: 10%;
                display: flex;
                justify-content: center;
                background: #FF9966;
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
                        color: 	#FFB6C1;
                    }
                    input{
                        height: 2em;
                        width: 80%;
                        // outline: none;
                        // background: transparent;
                        border: 1px solid #C0C0C0;
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
                    padding-bottom: 5px;
                    background: #FF9966;
                    i{
                        color: rgba(255,0,0,0.3);
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
                            color:white;
                            border-radius: 10px;
                            margin: 3px 5px;
                            padding: 2px;
                            background: rgba(255,0,0,0.2);
                        }
                    }
                }
                .hot-wipe{
                    height: 200px;
                    width: 100%;
                    margin-bottom: 5px;
                    display: flex;
                    align-items: center;
                    background: #FF9966;
                    .mint-swipe{
                        // height: 95%;
                        width: 100%;
                    }
                }
                .recommend{
                    ul{
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
                            border-radius: 10px;
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
                        position:sticky;
                        top: -1px;
                        ul{
                            display: flex;
                            justify-content: space-around;
                            background: #FFFFFF;
                            border-radius: 5px;
                            margin-top: 10px;
                            li{
                                display: flex;
                                align-items: center;
                                // border-right: 1px solid rgba(255,0,0,0.2);
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
                            width: 48%;
                            border: 1px solid #F0F0F0;
                            border-radius: 5px;
                            border-top: 0;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: space-between;
                            margin-top: 10px;
                            img{
                                border-radius: 5px;
                            }
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
                                height: 2.4em;
                            }
                        }
                        .goods-loading{
                            background:#E0E0E0;
                            width:100%;
                            height:50px;
                            display:flex;
                            justify-content:center;
                            align-items:center;
                        }
                    }
                }
            }
            
        }
    }
</style>