<template>
    <div class="person-whole">
        <div>
            我的
        </div>
        <Footer class="footer"></Footer>
    </div>

</template>

<script>
import Footer from '@/components/common/Footer'
export default {
    name: 'Person',
    components: {
        Footer: Footer
    }
}
</script>

<style lang="scss">
    .person-whole{
        height: 100%;
        display: grid;
        grid-template: 9fr 1fr / 1fr;
        .footer{
            ul{
                li:nth-child(4){
                    color: #FF6600;
                    transform: scale(0.9)
                }
            }
        }
    }
</style>