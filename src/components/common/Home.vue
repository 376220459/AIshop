<template>
    <div class="home-whole">
        <div>
            首页
        </div>
        <Footer class="footer"></Footer>
    </div>

</template>

<script>
import Footer from '@/components/common/Footer'
export default {
    name: 'Home',
    components: {
        Footer: Footer
    }
}
</script>

<style lang="scss">
    .home-whole{
        height: 100%;
        display: grid;
        grid-template: 9fr 1fr / 1fr;
        .footer{
            ul{
                li:nth-child(1){
                    color: #26a2ff;transform: scale(0.9)
                }
            }
        }
    }
</style>