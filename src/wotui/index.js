import { Icon, Rate } from 'wot-design'

const UIComponents = [Icon, Rate]

const WotUIPlugin = {}

WotUIPlugin.install = function (Vue) {

    UIComponents.forEach(component => {

        Vue.use(component)
    })
}

export default WotUIPlugin