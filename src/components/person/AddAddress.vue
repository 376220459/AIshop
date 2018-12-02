<template>
    <div class="add-address-whole">
        <mt-actionsheet :actions="labels" v-model="sheetVisible" cancelText=""></mt-actionsheet>

        <mt-popup v-model="popupVisible" position="bottom" style="width:100%">
            <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
        </mt-popup>

        <header>
            <i class="iconfont icon-fanhui1" @click="goBack"></i>
            <p>添加新地址</p>
            <span @click="keep">保存</span>
        </header>
        <div class="add-address-content">
            <form>
                <div class="input">
                    <span>收货人</span>
                    <input type="text" placeholder="请输入收货人姓名" v-model="name">
                </div>
                <div class="input" style="border:none;">
                    <span>手机号</span>
                    <input type="tel" placeholder="请输入收货人手机号" v-model="phone">
                </div>
            </form>

            <form>
                <div class="detailed-address" @click="popupVisible=true">
                    <span>所在地区</span>
                    <p>{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</p>
                    <span class="right">选择 ＞</span>
                </div>
                <textarea placeholder="请填写详细地址，街道门牌号信息">
                    
                </textarea>
            </form>

            <form>
                <div class="input label" @click="sheetVisible=true">
                    <span>地址标签</span>
                    <span>{{ label }} ＞</span>
                </div>
                <div class="input" style="justify-content: space-between;border:none;">
                    <span>设为默认地址</span>
                    <mt-switch v-model="isDefault" @change="changeDefault"></mt-switch>
                </div>
            </form>
        </div>
    </div>    
</template>

<script>
import myaddress from './myaddress.json'
export default {
    name: 'AddAddress',
    data(){
        return{
            name: '',
            phone: '',
　　　　　　 myAddressProvince:'',
　　　　　　 myAddressCity:'',
　　　　　　 myAddresscounty:'',
            isDefault: false,
            popupVisible: false,
            sheetVisible: false,
            label: '请选择',
            labels: [
                {
                    name: '家',
                    method: ()=>{
                        this.label = '家';
                    }
                },
                {
                    name: '公司',
                    method: ()=>{
                        this.label = '公司';
                    }
                },
                {
                    name: '学校',
                    method: ()=>{
                        this.label = '学校';
                    }
                },
            ],
            myAddressSlots: [
　　　　　　    {
　　　　　　　　　　flex: 1,
　　　　　　　　　　defaultIndex: 1,
　　　　　　　　　　values: Object.keys(myaddress), //省份数组
　　　　　　　　　　className: 'slot1',
　　　　　　　　}, {
　　　　　　　　　　divider: true,
　　　　　　　　　　content: '-',
　　　　　　　　　　className: 'slot2'
　　　　　　　　}, {
　　　　　　　　　　flex: 1,
　　　　　　　　　　values: [],
　　　　　　　　　　className: 'slot3',
　　　　　　　　}, {
　　　　　　　　　　divider: true,
　　　　　　　　　　content: '-',
　　　　　　　　　　className: 'slot4'
　　　　　　　　}, {
　　　　　　　　　　flex: 1,
　　　　　　　　　　values: [],
　　　　　　　　　　className: 'slot5',
　　　　　　　　}
　　　　　　 ],
        }
    },
    methods: {
        goBack(){
            history.back();
        },
        changeDefault(){
            this.$toast({
                message: '设置成功',
                duration: 1000
            })
        },
        keep(){
            if(this.name.length < 1 || this.name.length >10 || this.name.trim(' ') == ''){
                this.$toast({
                    message: '请输入正确的收件人姓名',
                    duration: 1000
                });
            }else if(!(/^1[34578]\d{9}$/.test(this.phone))){
                this.$toast({
                    message: '请输入正确的手机号',
                    duration: 1000
                });
            }else if(this.label == '请选择'){
                this.$toast({
                    message: '请选择地址标签',
                    duration: 1000
                });
            }else{
                this.$toast({
                    message: '保存成功',
                    duration: 500
                });
                setTimeout(() => {
                    this.goBack();
                },500);
            }
        },
　　　　 onMyAddressChange(picker, values) {
　　　　　　if(myaddress[values[0]]){ //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
　　　　　　　　picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
　　　　　　　　picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
　　　　　　　　this.myAddressProvince = values[0];
　　　　　　　　this.myAddressCity = values[1];
　　　　　　　　this.myAddresscounty = values[2];
　　　　　　}
　　　　 }
    },
    mounted(){
        this.$nextTick(() => {
　　　　　　this.myAddressSlots[0].defaultIndex = 0
　　　　});
    },
}
</script>

<style lang="scss" scoped>
    .add-address-whole{
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
                position: absolute;
                left: 15px;
                font-size: 30px;
                color: gray;
            }
            span{
                position: absolute;
                right: 15px;
                font-size: 15px;
                font-weight: bold;
                color: #FF6600;
            }
        }
        .add-address-content{
            display: flex;
            flex-direction: column;
            align-items: center;
            .input{
                display: flex;
                align-items: center;
                padding: 10px 0;
                border-bottom: 1px solid #E0E0E0;
                span{
                    color: #606060;
                    font-size: 18px;
                    font-weight: bold;
                    margin-right: 15px;
                }
                input{
                    border: none;
                    height: 25px;
                    width: 70%;
                    font-size: 15px;
                }
            }
            form{
                width: 95%;
                background: #F8F8F8;
                border-radius: 10px;
                padding: 0 5px;
                margin: 10px 0;
                textarea{
                    width: 100%;
                    height: 100px;
                    background: transparent;
                    resize:none;
                    border: none;
                    outline: none;
                    font-size: 15px;
                    padding: 5px 0;
                }
                .label{
                    justify-content: space-between;
                    span:nth-child(2){
                        font-size: 15px;
                        font-weight: normal;
                    }
                }
                .detailed-address{
                    display: flex;
                    align-items: center;
                    padding: 10px 0;
                    border-bottom: 1px solid #E0E0E0;
                    span{
                        color: #606060;
                        font-size: 18px;
                        font-weight: bold;
                        margin-right: 15px;
                    }
                    p{
                        font-size: 15px;
                        width: 60%;
                        text-align: left;
                    }
                    .right{
                        font-size: 15px;
                        font-weight: normal;
                        position: absolute;
                        right: 5px;
                    }
                }
            }
        }
    }
</style>

