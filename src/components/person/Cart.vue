<template>
    <div class="cart-whole">
        <div class="cart-content">
            <div class="content">
                <!-- <div class="title">
                    <span>
                        <strong>购物车</strong>
                        <button @click="changeButton">{{ btnName }}</button>
                    </span>
                    <p>共 <strong>{{ allgoodsCount() }}</strong> 件宝贝</p>
                </div> -->
                <div class="title">
                    <div>
                        <h1>购物车</h1>
                        <p>(共 <strong>{{ allgoodsCount() }}</strong> 件宝贝)</p>
                    </div>
                    <button @click="changeButton">{{ btnName }}</button>
                </div>
                <div class="list">
                    <div class="list-content" v-for="(item, index) in list" :key="index">
                        <div class="shop">
                            <input @click="shopCheck(index,$event)" type="checkbox" name="shop" :value="index" v-model="wholeList">
                            <i class="iconfont icon-dianpu"></i>
                            <strong>{{ item.name }}</strong>
                        </div>
                        <div class="goods" v-for="(item2, index2) in item.goods" :key="index2">
                            <input type="checkbox" :name="item.id" :value="index2" v-model="shopList[index]">
                            <div class="goods-content">
                                <img :src="item2.img" alt="goods" width="30%;">
                                <div>
                                    <p class="introduce">{{ item2.introduce }}</p>
                                    <p class="spec">{{ item2.spec }}</p>
                                    <p class="buy">
                                        <span class="price">￥{{ computePrice(item2.price,item2.count) }}</span>
                                        <span class="weight">{{ computeWeight(item2.weight,item2.count) }}</span>
                                        <span class="count">
                                            <span @click="changeCount(index,index2,'-')">－</span>
                                            <span>{{ item2.count }}</span>
                                            <span @click="changeCount(index,index2,'+')">＋</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div class="select">
                    <label><input @click="allCheck" type="checkbox" name="whole"><span>全选</span></label>
                </div>
                <div class="compute" v-if="operationIf[0]">
                    <span>不含运费</span>
                    <span>合计:</span>
                    <span>￥{{ allPrice() }}</span>
                    <button @click="buyGoods">结算({{ allCount() }})</button>
                </div>
                <div class="operation" v-if="operationIf[1]">
                    <button @click="collectGoods">移入收藏夹</button>
                    <button @click="deleteGoods">删除</button>
                </div>
            </footer>
        </div>
        <div class="footer"><Footer></Footer></div>
    </div>

</template>

<script>
import Footer from '@/components/common/Footer'
export default {
    name: 'Cart',
    components: {
        Footer: Footer
    },
    data(){
        return{
            btnName: '管理',
            shop: [],
            shopList: [],
            wholeList: [],
            operationIf: [true,false],
            list: [
                {
                    name: '天猫超市',
                    id: 'shop1',
                    goods: [
                        {
                            id: 'goods1',
                            img: 'static/cart/goods1.jpg',
                            introduce: '亲亲桔子菠萝果肉果冻520g布丁休闲零食水果糖果礼物小袋散装',
                            spec: '天猫无忧购',
                            price: 16.80,
                            weight: 0.596,
                            count: 1
                        },
                        {
                            id: 'goods2',
                            img: 'static/cart/goods2.jpg',
                            introduce: '多悦老灶手工大米锅巴410g爆辣味香脆美味特产膨化休闲零食',
                            spec: '天猫无忧购',
                            price: 19.90,
                            weight: 0.439,
                            count: 2
                        },
                        {
                            id: 'goods3',
                            img: 'static/cart/goods3.jpg',
                            introduce: '飘零大叔精制猪肉脯100g肉干小食靖江特产零食独立小包装',
                            spec: '天猫无忧购',
                            price: 19.88,
                            weight: 0.25,
                            count: 3
                        },
                        {
                            id: 'goods4',
                            img: 'static/cart/goods4.jpg',
                            introduce: '【2件9折】百草味无核白葡萄干200g新疆吐鲁番果干休闲零食',
                            spec: '天猫无忧购',
                            price: 9.90,
                            weight: 0.216,
                            count: 1
                        },
                        {
                            id: 'goods5',
                            img: 'static/cart/goods5.jpg',
                            introduce: '三只松鼠 拉面丸子85g零食膨化食品干脆面网红串烧',
                            spec: '天猫无忧购',
                            price: 12.90,
                            weight: 0.091,
                            count: 2
                        },
                    ]
                },
                {
                    name: 'Su家订制',
                    id: 'shop2',
                    goods: [
                        {
                            id: 'goods6',
                            img: 'static/cart/goods6.jpg',
                            introduce: '2018新款学生可爱休闲原宿连衣裙小清新POLO衫中长款短袖T恤女',
                            spec: '粉红色；均码',
                            price: 68.00,
                            count: 1
                        }
                    ]
                },
                {
                    name: 'emoi基本生活蝌蚪',
                    id: 'shop3',
                    goods: [
                        {
                            id: 'goods7',
                            img: 'static/cart/goods7.jpg',
                            introduce: 'emoi基本生活水杯塑料清新简约随行个性便携男女学生韩版耐摔杯子',
                            spec: 'H1032-无茶隔-透明白480ml',
                            price: 49.00,
                            count: 1
                        }
                    ]
                }
            ]
        }
    },
    computed: {
        
    },
    methods: {
        allgoodsCount(){
            let count = 0;
            this.list.forEach(e=>{
                e.goods.forEach(e2=>{
                    count++;
                })
            });
            return count;
        },
        allCount(){
            let count = 0;
            this.shopList.forEach(e=>{
                count+=e.length
            });
            return count;
        },
        allPrice(){
            let price = 0;
            this.shopList.forEach((item,index)=>{
                item.forEach(e=>{
                    price += (this.list[index].goods[e].price)*(this.list[index].goods[e].count);
                })
            });
            return price.toFixed(2);
        },
        shopCheck(index,e){
            this.shopList[index] = [];
            if(e.target.checked){
                this.list[index].goods.forEach((item2,index2)=>{
                    this.shopList[index].push(index2)
                })
            }
        },
        allCheck(e){
            this.wholeList = [];
            this.list.forEach((item,index)=>{
                this.shopList[index] = [];
            })
            if(e.target.checked){
                this.list.forEach((item,index)=>{
                    this.wholeList.push(index);
                });
                this.list.forEach((item,index)=>{
                    item.goods.forEach((item2,index2)=>{
                        this.shopList[index].push(index2);
                    })
                })
            }
        },
        changeButton(){
            if(this.btnName == '管理'){
                this.btnName = '完成';
                this.operationIf = [false,true];
            }else{
                this.btnName = '管理';
                this.operationIf = [true,false];
            }
        },
        changeCount(index,index2,symbol){
            let count = this.list[index].goods[index2].count;
            if(symbol == '-' && count > 1){
                count--;
            }else if(symbol == '+' && count < 999){
                count++;
            }
            this.list[index].goods[index2].count = count;
        },
        computePrice(price,count){
            return ( price*count).toFixed(2); 
        },
        computeWeight(weight,count){
            if(weight){
                return (weight*count).toFixed(2) + 'kg'; 
            }
        },
        buyGoods(){
            let flag = 0;
            this.shopList.forEach(e=>{
                if(e.length != 0){
                    flag = 1;
                    return;
                }
            })
            if(flag == 1){
                this.shopList.forEach((item,index)=>{
                    let arr = item.concat();
                    arr.sort((a,b)=>{
                        return b-a;
                    });
                    arr.forEach(e=>{
                        this.list[index].goods.splice(e,1);
                    });
                });

                let arr2 = [];
                this.list.forEach((item2,index2)=>{
                    if(item2.goods.length == 0){
                        arr2.push(index2);
                    }
                });
                arr2.sort((a,b)=>{
                    return b-a;
                });
                arr2.forEach(e2=>{
                    this.list.splice(e2,1)
                });
                
                this.wholeList = [];
                this.shopList = [];
                this.list.forEach(e3=> {
                    this.shopList.push([]);
                });

                this.$toast({
                    message: '购买成功',
                    duration: 1000
                });
            }else{
                this.$toast({
                    message: '请先选择商品',
                    duration: 1000
                });
            }
        },
        collectGoods(){
            let flag = 0;
            this.shopList.forEach(e=>{
                if(e.length != 0){
                    flag = 1;
                    return;
                }
            })
            if(flag == 1){
                this.$toast({
                    message: '收藏成功',
                    duration: 1000
                });
            }else{
                this.$toast({
                    message: '请先选择商品',
                    duration: 1000
                });
            }
        },
        deleteGoods(){
            let flag = 0;
            this.shopList.forEach(e=>{
                if(e.length != 0){
                    flag = 1;
                    return;
                }
            })
            if(flag == 1){
                this.shopList.forEach((item,index)=>{
                    let arr = item.concat();
                    arr.sort((a,b)=>{
                        return b-a;
                    });
                    arr.forEach(e=>{
                        this.list[index].goods.splice(e,1);
                    });
                });

                let arr2 = [];
                this.list.forEach((item2,index2)=>{
                    if(item2.goods.length == 0){
                        arr2.push(index2);
                    }
                });
                arr2.sort((a,b)=>{
                    return b-a;
                });
                arr2.forEach(e2=>{
                    this.list.splice(e2,1)
                });
                
                this.wholeList = [];
                this.shopList = [];
                this.list.forEach(e3=> {
                    this.shopList.push([]);
                });

                this.$toast({
                    message: '删除成功',
                    duration: 1000
                });
            }else{
                this.$toast({
                    message: '请先选择商品',
                    duration: 1000
                }); 
            }
            
        }
    },
    created(){
        this.list.forEach(element => {
            this.shopList.push([]);
        });
    },
}
</script>

<style lang="scss">
    .cart-whole{
        height: 100%;
        background: #F0F0F0;
        display: grid;
        grid-template: 9fr 1fr / 1fr;
        .footer{
            ul{
                li:nth-child(3){
                    color: #FF6600;
                    transform: scale(0.9)
                }
            }
        }
        .cart-content{
            overflow: auto;
            *{
                box-sizing: border-box;
            }
            .content{
                height: 88%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .title{
                    height: 30%;
                    width: 100%;
                    padding: 10px;
                    background: #FF6600;
                    font-size: 15px;
                    color: white;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    button{
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        font-size: 18px;
                        font-weight: bold;
                        color: white;
                    }
                }
                .list{
                    width: 95%;
                    overflow: auto;
                    .list-content{
                        background: #F8F8F8;
                        margin-top: 15px;
                        border-radius: 10px;
                        padding: 10px;
                        font-size: 12px;
                        .shop{
                            display: flex;
                            align-items: center;
                            i{
                                font-size: 15px;
                                margin: 0 5px;
                            }
                        }
                        .goods{
                            display: flex;
                            align-items: center;
                            margin-top: 10px;
                            .goods-content{
                                margin-left: 10px;
                                display: flex;
                                align-items: center;
                                img{
                                    border-radius: 5px;
                                    margin-right: 10px;
                                }
                                div{
                                    text-align: left;
                                    .introduce{
                                        height: 2.7em;
                                        overflow: auto;
                                    }
                                    .spec{
                                        width: 15em;
                                        white-space: nowrap;
                                        overflow: auto;
                                        color: #999;
                                        overflow: auto;
                                        margin: 5px 0;
                                    }
                                    .buy{
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: center;
                                        .price{
                                            color: #FF6600;
                                            font-weight: bold;
                                            font-size: 15px;
                                        }
                                        .weight{
                                            color: #808080;
                                            font-size: 10px;
                                        }
                                        .count{
                                            span{
                                                background: #F0F0F0;
                                                margin-left: 2px;
                                                padding: 2px 5px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            footer{
                height: 12%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                .select{
                    span{
                        margin-left: 5px;
                        font-size: 15px;
                        font-weight: bold;
                    }
                }
                .compute{
                    span:nth-child(1){
                        color: #999;
                        font-size: 10px;
                        margin-right: 5px;
                    }
                    span:nth-child(2){
                        font-size: 15px;
                    }
                    span:nth-child(3){
                        color: #FF6600;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    button{
                        background: #FF6600;
                        padding: 10px 20px;
                        margin-left: 10px;
                        border-radius: 25px;
                        font-size: 20px;
                        color: white;
                    }
                }
                .operation{
                    button:nth-child(1){
                        padding: 5px 10px;
                        border: 1px solid#FFA500;
                        border-radius: 15px;
                        color: #FFA500;
                        font-size: 15px;
                    }
                    button:nth-child(2){
                        padding: 5px 10px;
                        border: 1px solid red;
                        border-radius: 15px;
                        color: red;
                        font-size: 15px;
                        margin-left: 10px;
                    }
                }
            }
        }
    }
</style>