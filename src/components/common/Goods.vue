<template>
    <div class="goods-whole" :style="{right:wholeRight+'%'}">

        <div class="cover" :style="{display:coverDisplay}" @click="hidden"></div>

        <div class="discount-eject eject" :style="{display:discountDisplay,bottom:discountBottom+'rem'}">
            <span class="eject-header">优惠</span>
            <div class="eject-content">
                <div class="eject-integral">
                    <span style="color:#999;">促销</span>
                    <p>
                        <span>积分</span>
                        <span>购买可得{{ goods.discount.integral }}积分</span>
                    </p>
                </div>

                <div class="eject-coupon">
                    <p>
                        <span>领券</span>
                        <span>已有积分:{{person.integral}}</span>
                    </p>
                    <div class="coupon" v-for="(item, index) in goods.discount.coupons" :key="index">
                        <div>
                            <span>￥<strong>{{ item.price }}</strong> 店铺优惠券</span>
                            <span>满{{ item.condition }}使用</span>
                            <span>有效期{{ item.term }}</span>
                        </div>
                        <div @click="getted(index)">{{ get[index] }}</div>
                    </div>
                </div>
            </div>
            <div class="eject-footer"><button @click="hidden">完成</button></div>
        </div>

        <div class="spec-eject eject" :style="{display:specDisplay,bottom:specBottom+'rem'}">
            <div class="eject-inf">
                <img height="95%" :src="goods.goodsImgs[0]" alt="goods">
                <div>
                    <span class="price">￥{{ goods.price }}</span>
                    <span style="color:#999;margin:20px 0;">库存9999件</span>
                    <span><span style="color:#999">您的选择：</span><span v-for="(item, index) in optionSelect" :key="index">"{{item}}" </span></span>
                </div>
            </div>
            <div class="eject-option">
                <div class="option" v-for="(item, index) in goods.specInf" :key="index">
                    <span class="name">{{ item.name }}</span>
                    <div>
                        <span :style="optionStyle[index][index2]" @click="changeOption(index,index2,item2)" v-for="(item2, index2) in item.class" :key="index2">{{ item2 }}</span>
                    </div>
                </div>
                <div class="buy">
                    <span class="count">购买数量</span>
                    <div>
                        <span @click="changeBuyCount('-')">－</span>
                        <span>{{ buyCount }}</span>
                        <span @click="changeBuyCount('+')">＋</span>
                    </div>
                </div>
            </div>
            <div class="eject-btn">
                <button class="bt1" @click="pushCart">加入购物车</button>
                <button class="bt2" @click="buyGoods">立即购买</button>
            </div>
        </div>

        <div class="parameter-eject eject" :style="{display:parameterDisplay,bottom:parameterBottom+'rem'}">
            <span class="eject-header">产品参数</span>
            <div class="eject-content">
                <ul>
                    <li v-for="(item, index) in goods.parameterInf" :key="index">
                        <span style="wdith:50%">{{ item.name }}</span>
                        <span>{{ item.inf }}</span>
                    </li>
                </ul>
            </div>
            <div class="eject-footer"><button @click="hidden">完成</button></div>
        </div>

        <div class="header" id="header">
            <div class="headerNav1" :style="{display:headerNavDisplay[0],opacity:headerNavOpacity[0]}">
                <span style="margin-left:10px;"><i class="iconfont icon-fanhui1" @click="goBack"></i></span>
                <div>
                    <span><i class="iconfont icon-cart" @click="goCart"></i></span>
                    <span><i class="iconfont icon-home" @click="goHome"></i></span>
                </div>
            </div>

            <div class="headerNav2" :style="{display:headerNavDisplay[1],opacity:headerNavOpacity[1]}">
                <i style="margin:0 70px 0 10px;" class="iconfont icon-fanhui1" @click="goBack"></i>
                <ul>
                    <li v-for="(item, index) in ['宝贝','评价','详细']" :key="index" :class="navClass[index]" @click="changeNav(index)">{{ item }}</li>
                </ul>
                <div>
                    <i class="iconfont icon-cart" @click="goCart"></i>
                    <i class="iconfont icon-home" @click="goHome"></i>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="goods-wipe" id="wipe">
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
                    <span class="share" @click="tip"><i class="iconfont icon-share"></i>分享</span>
                </div>

                <div class="sale">
                    <span>快递：{{ goods.sendFee }}</span>
                    <span>月销{{ goods.payCount }}</span>
                    <span>{{goods.address}}</span>
                </div>
            </div>

            <div class="goods-discount">
                <div class="discount" @click="discountOut()">
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
                <div class="spec" @click="specOut">
                    <div>
                        <span style="color:#999;margin-right:20px">规格</span>
                        <!-- <span>选择 <strong>{{ goods.spec }}</strong></span> -->
                        <span>选择 <strong v-for="(item, index) in optionSelect" :key="index">"{{item}}" </strong></span>
                    </div>
                    <span style="color:#999;">＞</span>
                </div>

                <div class="parameter"  @click="parameterOut()">
                    <div>
                        <span style="color:#999;margin-right:20px">参数</span>
                        <span>品牌 <strong>{{ goods.parameter }}</strong></span>
                    </div>
                    <span style="color:#999;">＞</span>
                </div>
            </div>

            <div class="goods-evaluate" id="evaluate">
                <span class="font">------------------------宝贝评价------------------------</span>
                <div class="title">
                    <span>宝贝评价({{ goods.evaluate.allCount }})</span>
                    <span @click="tip">查看全部＞</span>
                </div>
                <div class="label">
                    <p v-for="(item, index) in goods.evaluate.label" :key="index">{{ item.name }}<span>({{ item.count }})</span></p>
                </div>
                <div class="evaluate">
                    <span><i class="iconfont icon-unie64d"></i><span>{{ goods.evaluate.evaluate.name }}</span></span>
                    <p>{{ goods.evaluate.evaluate.content }}</p>
                </div>
            </div>

            <div class="goods-shop" @click="goShop">
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
                    <span style="color:#FF6600" @click="goShop">查看全部＞</span>
                </div>
                <ul>
                    <li v-for="(item, index) in goods.shop.recommend" :key="index" @click="goGoods">
                        <img width="100%" :src="item.img" alt="goods">
                        <p class="p1">{{ item.introduce }}</p>
                        <p class="p2">￥{{ item.price }}</p>
                    </li>
                </ul>
            </div>

            <div class="goods-detailed-inf" id="detailed">
                <span>------------------------宝贝详情------------------------</span>
                <img v-for="(item, index) in goods.detailed" v-lazy="item" width="100%" :key="index" alt="detailed">
                <div class="top-tip" @click="toTop" :style="{display:topDisplay}">
                    <i class="iconfont icon-dingbu"></i>
                    <p>顶部</p>
                </div>
            </div>
        </div>

        <div class="footer">
            <span @click="goShop">
                <i class="iconfont icon-dianpu" style="color:#FF6347"></i>    
                <p>店铺</p>
            </span>    
            <span>
                <i class="iconfont icon-service"></i>    
                <p>客服</p>
            </span>    
            <span @click="changeCollect">
                <i class="iconfont icon-xingxing" :style="{color:collectionColor}"></i>    
                <p>收藏</p>
            </span>
            <div>
                <button class="bt1" @click="pushCart">加入购物车</button>
                <button class="bt2" @click="buyGoods">立即购买</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Goods',
    data(){
        return{
            wholeRight: 0,
            optionStyle: [],
            optionSelect: [],
            optionFlag: [],
            buyCount: 1,
            discountBottom: -15,
            parameterBottom: -15,
            specBottom: -15,
            coverDisplay: '',
            discountDisplay: 'none',
            parameterDisplay: 'none',
            specDisplay: 'none',
            topDisplay: 'none',
            headerNavDisplay: ['flex','none'],
            headerNavOpacity: [1,1],
            navClass: [],
            nowCount: '1',
            get: [],
            person: {
                integral: '666'
            },
            goods: {
                goodsImgs: ['static/goods/goods/goods1.jpg','static/goods/goods/goods2.jpg','static/goods/goods/goods3.jpg','static/goods/goods/goods4.jpg','static/goods/goods/goods5.jpg',],
                price: '888',
                goodsLabels: ['新品促销','限时打折'],
                introduce: 'AJ 鞋子男潮鞋高帮鞋男韩版潮流百搭板鞋高邦运动加绒男鞋冬季棉鞋',
                sendFee: '0.00',
                payCount: '4.5万+',
                address: '福建 厦门',
                isCollect: true,
                discount: {
                    coupons: [
                        {
                            price: '5',
                            condition: '99',
                            term: '2018.11.13-2018.12.11'
                        },
                        {
                            price: '10',
                            condition: '158',
                            term: '2018.11.13-2018.12.11'
                        },
                        {
                            price: '20',
                            condition: '366',
                            term: '2018.11.13-2018.12.11'
                        },
                    ],
                    integral: '234'
                },
                spec: '尺码，颜色',
                specInf: [
                    {
                        name: '尺寸',
                        class: ['38','39','40','41','42','43','44','45']
                    },
                    {
                        name: '颜色',
                        class: ['黑色','灰色','杏色','黑色【加绒版】','灰色【加绒版】','杏色【加绒版】']
                    }
                ],
                parameter: '材质...',
                parameterInf: [
                    {
                        name: '品牌',
                        inf: '帕马森'
                    },
                    {
                        name: '功能',
                        inf: '保暖'
                    },
                    {
                        name: '闭合方式',
                        inf: '系带'
                    },
                    {
                        name: '尺码',
                        inf: '39 40 41 42 43 44'
                    },
                    {
                        name: '图案',
                        inf: '纯色'
                    },
                    {
                        name: '风格',
                        inf: '休闲'
                    },
                    {
                        name: '细分风格',
                        inf: '运动休闲'
                    },
                    {
                        name: '流行元素',
                        inf: '车缝线'
                    },
                    {
                        name: '鞋跟高',
                        inf: '低跟(1-3cm)'
                    },
                    {
                        name: '颜色分类',
                        inf: '黑色 灰色 杏色 黑色【加绒版】 灰色【加绒版】 杏色【加绒版】'
                    },
                    {
                        name: '货号',
                        inf: 'LQ027'
                    },
                    {
                        name: '季节',
                        inf: '冬季'
                    },
                    {
                        name: '场合',
                        inf: '运动休闲'
                    },
                    {
                        name: '销售渠道类型',
                        inf: '天猫独家(只在天猫销售)'
                    }
                ],
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
        },
        collectionColor(){
            return this.goods.isCollect == true ? '#FF6600' : '';
        }
    },
    methods: {
        leftMove(){
            this.wholeRight += 10;
            setTimeout(() => {
                this.leftMove();
            },10);
        },
        rightMove(){
            this.wholeRight -= 10;
            setTimeout(() => {
                this.rightMove();
            },10);
        },
        tip(){
            this.$toast({
                message: '此功能未开放',
                duration: 1000
            });
        },
        goBack(){
            this.rightMove();
            setTimeout(() => {
                history.back();
            }, 200);
        },
        goCart(){
            this.$router.push({path:'/cart'});
        },
        goHome(){
            this.$router.push({path:'/'});
        },
        goGoods(){
            this.$router.push({path:'/goods'});
        },
        goShop(){
            this.leftMove();
            setTimeout(() => {
                this.$router.push({path:'/shop'});
            }, 200);
        },
        changeCollect(){
            if(this.goods.isCollect == true){
                this.goods.isCollect = false;
                this.$toast({
                    message: '已取消收藏',
                    duration: 1000
                })
            }else{
                this.goods.isCollect = true;
                this.$toast({
                    message: '已收藏',
                    duration: 1000
                })
            }
        },
        pushCart(){
            if(this.optionFlag.indexOf(0) != -1){
                this.$toast({
                    message: '请选择完整规格',
                    duration: 1000
                });
            }else{
                this.$toast({
                    message: '加入购物车成功',
                    duration: 1000
                });
                this.hidden();
            } 
        },
        buyGoods(){
            if(this.optionFlag.indexOf(0) != -1){
                this.$toast({
                    message: '请选择完整规格',
                    duration: 1000
                });
            }else{
                this.$toast({
                    message: '购买成功',
                    duration: 1000
                });
                this.hidden();
            } 
        },
        changeOption(index,index2,item2){
            this.optionFlag.splice(index,1,1);
            this.optionSelect.splice(index,1,item2);
            this.goods.specInf[index].class.forEach((item,index3)=>{
                this.optionStyle[index].splice(index3,1,'')
            })
            this.optionStyle[index].splice(index2,1,"color:#FF6600;background:#FFE4E1;border:1px solid #FF6600");
        },
        changeBuyCount(symbol){
            if(symbol == '+' && this.buyCount < 9999){
                this.buyCount++;
            }else if(symbol == '-' && this.buyCount > 1){
                this.buyCount--;
            }
        },
        getted(index){
            if(this.get[index] == '立即领取'){
                this.$toast({
                    message: '恭喜您成功抢到优惠券',
                    duration: 1000
                });
                this.get.splice(index,1,'已领取');
            }else{
                this.$toast({
                    message: '只能领取一次哦',
                    duration: 1000
                });
            }
        },
        discountOut(){
            this.coverDisplay = this.discountDisplay = 'block';
            let that = this;
            (function loop(){
                if(that.discountBottom < 0){
                    that.discountBottom += 1;
                    setTimeout(() => {
                        loop();
                    },10);
                }
            })();
        },
        specOut(){
            this.coverDisplay = this.parameterDisplay = this.specDisplay = 'block';
            let that = this;
            (function loop(){
                if(that.specBottom < 0){
                    that.specBottom += 1;
                    setTimeout(() => {
                        loop();
                    },10);
                }
            })();
        },
        parameterOut(){
            this.coverDisplay = this.parameterDisplay = 'block';
            let that = this;
            (function loop(){
                if(that.parameterBottom < 0){
                    that.parameterBottom += 1;
                    setTimeout(() => {
                        loop();
                    },10);
                }
            })();
        },
        hidden(){
            this.coverDisplay = 'none';
            this.discountDisplay = this.parameterDisplay = this.specDisplay = 'none';
            this.discountBottom = this.parameterBottom = this.specBottom = -15;
        },
        toTop(){
            document.getElementById("wipe").scrollIntoView();
        },
        changeNav(index){
            if(index == 0){
                document.getElementById("wipe").scrollIntoView();
                // window.scrollTo(0,0);
            }else if(index == 1){
                document.getElementById("evaluate").scrollIntoView();
            }else{ 
                document.getElementById("detailed").scrollIntoView();
            }
        },
        changeWipe(index){
            // console.log(index);
            this.nowCount = index+1;
        },
        onScroll(){
            // console.log(Math.abs(wipe.getBoundingClientRect().top))
            
            let header = document.getElementById('header');
            let detailed = document.getElementById('detailed');
            // console.log(Math.abs(detailed.getBoundingClientRect().top)-header.offsetHeight)
            let wipe = document.getElementById('wipe');
            let headerHeight = header.offsetHeight;
            let swipTop = Math.abs(wipe.getBoundingClientRect().top);
            let swipHeight = wipe.offsetHeight;
            let evaluateTop = evaluate.getBoundingClientRect().top - headerHeight;
            let detailedTop = detailed.getBoundingClientRect().top - headerHeight;

            if(wipe.getBoundingClientRect().top <= 0 && evaluateTop > 0){
                this.navClass = [];
                this.navClass[0] = 'nav-focus';
            }else if(evaluateTop <= 0 && detailedTop > 0){
                this.navClass = [];
                this.navClass[1] = 'nav-focus';
            }else if(detailedTop <= 0){
                this.navClass = [];
                this.navClass[2] = 'nav-focus';
            }

            if(detailedTop <= 0){
                this.topDisplay = 'flex';
            }else{
                this.topDisplay = 'none';
            }

            if(swipTop <= swipHeight*0.3){
                this.headerNavDisplay = ['flex','none'];
                this.headerNavOpacity.splice(0,1,1-swipTop/swipHeight*3)
            }else if(swipTop <= swipHeight){
                this.headerNavDisplay = ['none','flex'];
                this.headerNavOpacity.splice(1,1,swipTop/swipHeight)
            }else{
                this.headerNavDisplay = ['none','flex'];
                this.headerNavOpacity.splice(1,1,1)
            }
        }
    },
    created() {
        this.goods.specInf.forEach(item=>{
            this.optionSelect.push(item.name);
            this.optionFlag.push(0);
        })
        this.goods.specInf.forEach((item,index)=>{
            // this.optionStyle.push([]);
            let arr = [];
            item.class.forEach(item2=>{
                // this.optionStyle[index].push('');
                arr.push('');
            })
            this.optionStyle.push(arr);
        })
        // console.log(this.optionStyle);
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll, true);
        this.goods.discount.coupons.forEach(element => {
            this.get.push('立即领取');
        });
    },
    destroyed(){
        window.removeEventListener('scroll', this.onScroll,true);//卸载页面滚动事件
    },
}
</script>

<style lang="scss" scoped>
    .goods-whole{
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
        .select{
            color: #FF6600;
        }
        .eject{
            height: 80%;
            width: 100%;
            position: absolute;
            bottom: 0;
            z-index: 100;
            background: white;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
        }
        .cover{
            width:100%;
            height: 100%;
            display: none;
            z-index: 99;
            position: absolute;
            background: #778899;
            opacity: 0.6;
        }
        .discount-eject{
            .eject-header{
                height: 10%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                font-size: 15px;
            }
            .eject-content{
                height: 77%;
                overflow: auto;
                padding: 5px;
                .eject-integral{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    p{
                        margin-top: 10px;
                        display: flex;
                        align-items: center;
                        span:nth-child(1){
                            background: #FFCC99;
                            color: 	#E80000;
                            border-radius: 10px;
                            padding: 0 5px;
                            margin-right: 10px;
                        }
                        span:nth-child(2){
                            font-weight: bold;
                        }
                    }
                }
                .eject-coupon{
                    margin-top: 20px;
                    p{
                        color: #999;
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;
                    }
                    .coupon{
                        margin-bottom: 10px;
                        display: flex;
                        color: #E80000;
                        div{
                            background: #FFE4E1;
                            border-radius: 15px;
                            span{
                                font-size: 9px;
                                margin-bottom: 3px;
                            }
                            span:nth-child(1){
                                font-size: 13px;
                                strong{
                                    font-size: 18px;
                                }
                            }
                        }
                        div:nth-child(1){
                            width: 80%;
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            padding: 10px 5px 5px 5px;
                            // border-right: 1px dotted #E80000;
                        }
                        div:nth-child(2){
                            width: 20%;
                            box-sizing: border-box;
                            border: 1px dotted #E80000;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }
            }
            .eject-footer{
                height: 9%;
                display: flex;
                justify-content: center;
                align-items: center;
                button{
                    background: #FFA500;
                    width: 90%;
                    height: 100%;
                    border-radius: 20px;
                    font-size: 15px;
                    color: white;
                }
            }
        }
        .spec-eject{
            .eject-inf{
                height: 30%;
                display: flex;
                align-items: center;
                padding: 10px;
                img{
                    border-radius: 5px;
                }
                div{
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                    margin-left: 20px;
                    .price{
                        color: #FF6600;
                        font-size: 20px;
                    }
                }
            }
            .eject-option{
                height: 58%;
                overflow: auto;
                .option{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    border-bottom: 1px solid #E8E8E8;
                    padding: 10px 10px;
                    .name{
                        font-size: 15px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    div{
                        display: flex;
                        flex-wrap: wrap;
                        span{
                            background: #E8E8E8;
                            padding: 5px 20px;
                            border: 1px solid #E8E8E8;
                            border-radius: 5px;
                            margin-right: 10px;
                            margin-bottom: 10px;
                        }
                    }
                }
                .buy{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 10px;
                    .count{
                        font-size:15px;
                        font-weight:bold;
                    }
                    div{
                        display: flex;
                        
                        span{
                            background: #E8E8E8;
                            padding: 5px 20px;
                            margin: 0 1px;
                            border-radius: 5px;
                        }
                    }
                }
            }
            .eject-btn{
                height: 12%;
                display: flex;
                justify-content: center;
                border-top: 1px solid #E8E8E8;
                padding: 5px 0;
                button{
                    width: 48%;
                    color: white;
                    font-size: 15px;
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
        .parameter-eject{
            .eject-header{
                height: 10%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                font-size: 18px;
            }
            .eject-content{
                height: 77%;
                overflow: auto;
                padding: 5px;
                ul{
                    display: flex;
                    flex-direction: column;
                    li{
                        width: 100%;
                        border-bottom: 1px solid #E8E8E8;
                        padding: 10px 0;
                        display: flex;
                        font-size: 15px;
                        text-align: left;
                        span:nth-child(1){
                            width: 30%;
                            font-weight: bold;
                        }
                        span:nth-child(2){
                            width: 70%;
                            color: #585858
                        }
                    }
                }
            }
            .eject-footer{
                height: 9%;
                display: flex;
                justify-content: center;
                align-items: center;
                button{
                    background: #FFA500;
                    width: 90%;
                    height: 100%;
                    border-radius: 20px;
                    font-size: 15px;
                    color: white;
                }
            }
        }
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
                    // margin-left: 40px;
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
                padding: 15px 5px 10px 5px;
                border-bottom: 10px solid #E8E8E8;
                // background: #E8E8E8;
                .font{
                    margin-bottom: 10px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #F8F8F8;
                    color: #999;
                }
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
                    padding-bottom: 10px;
                    border-bottom: 1px solid #F8F8F8;
                    color: #999;
                }
                .top-tip{
                    position: fixed;
                    z-index: 100;
                    bottom: 10%;
                    right: 5%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    opacity: 0.8;
                    width: 50px;
                    height: 50px;
                    background: #F0F0F0;
                    border-radius: 50%;
                    i{
                        font-size: 20px;
                    }
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