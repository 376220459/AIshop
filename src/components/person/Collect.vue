<template>
    <div class="collect-whole">
        <header>
            <i class="iconfont icon-fanhui1" @click="goBack"></i>
            <p>我的收藏({{ allCollectCount }})</p>
        </header>
        <div class="collect-content">
            <ul>
                <li @click="goGoods" v-for="(item, index) in collect" :key="index">
                    <img :src="item.img" alt="goods" width="45%" height="100%">
                    <div class="goods-inf">
                        <p class="introduce">{{ item.introduce }}</p>
                        <p class="collect"># {{ item.collectCount }}人收藏 #</p>
                        <p class="price">￥{{ item.price }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'Collect',
    data(){
        return{
            collect: [
                {
                    introduce: '华为 P20徕卡双镜头,AI智慧全面屏 ,杜比全景声',
                    img: 'static/goods/home/goodsElectrical1.jpg',
                    price: '3088',
                    collectCount: '15105'
                },
                {
                    introduce: '小米 Max 3巨无霸级全面屏,AI双摄,双功放立体声',
                    img: 'static/goods/home/goodsElectrical2.jpg',
                    price: '1499',
                    collectCount: '6458'
                },
                {
                    introduce: '松下 AG-UX90MC专业摄像机,远程控制,自动聚焦',
                    img: 'static/goods/home/goodsElectrical3.jpg',
                    price: '7821',
                    collectCount: '999'
                },
                {
                    introduce: 'Xiaomi/小米 小米笔记本电脑Air 12.5吋256G轻薄便携学生游戏电脑笔记本官方正品超薄',
                    img: 'static/goods/home/goodsElectrical4.jpg',
                    price: '3999',
                    collectCount: '58'
                },
                {
                    introduce: '炫龙 毁灭者DD 2 dd2 GTX1050TI 4G独显 笔记本电脑超薄便捷学生 八代 酷睿i5-8400吃鸡游戏本商务本超级本',
                    img: 'static/goods/home/goodsElectrical5.jpg',
                    price: '5888',
                    collectCount: '130014'
                },
                {
                    introduce: '电脑音响台式机笔记本家用迷你长条低音炮小音箱usb供电有源影响喇叭Golden Field/金河田 M16',
                    img: 'static/goods/home/goodsElectrical6.jpg',
                    price: '99',
                    collectCount: '1324'
                },
            ]
        }
    },
    computed: {
        allCollectCount(){
            return this.collect.length;
        }
    },
    methods: {
        goBack(){
            history.back();
        },
        goGoods(){
            this.$router.push({path: '/goods'})
        }
    }
}
</script>

<style lang="scss" scoped>
    .collect-whole{
        height: 100%;
        background: #F0F0F0;
        header{
            height: 10%;
            background: #FF9966;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
            i{
                font-size: 30px;
                position: absolute;
                left: 15px;
                color: gray;
            }
        }
        .collect-content{
            height: 90%;
            overflow: auto;
            padding: 5px;
            ul{
                li{
                    display: flex;
                    margin-bottom: 15px;
                    img{
                        border-radius: 10px;
                        margin-right: 10px;
                    }
                    .goods-inf{
                        width: 50%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding: 10px 0;
                        p{
                            text-align: left;
                        }
                        .introduce{
                            height: 6em;
                            overflow: auto;
                            font-size: 15px;
                        }
                        .collect{
                            color: #999;
                        }
                        .price{
                            font-size: 20px;
                            color: #FF6600;
                        }
                    }
                }
            }
        }
    }
</style>

