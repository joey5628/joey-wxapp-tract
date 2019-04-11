# 小程序配置化埋点
## 背景
埋点的开发比较耗时，H5页面自动化埋点的方式可以考虑在根节点监听冒泡上来的时间，判断特定的属性来做埋点。但是微信小程序的生态也比较封闭，组件事件无法冒泡到父组件，或者上级有使用catchtap截断了事件冒泡，这些都导致自动化埋点难以实施。    
基于以上原因，配置化埋点考虑的是在需要埋点的地方调用埋点，然后通过配置表取到对应的事件配置，在转化为真实的埋点数据进行上报。

## 使用方法
### 1、引入文件创建页面
```javascript
// 埋点SDK
import Tracker from '../../track/index'
// 创建页面的方法
import { createPage } from '../../track/page'
// 创建页面
createPage({
//...
})
```
### 2、添加配置文件
需要在页面同级目录下创建trackConfig.js配置文件  
需要给有埋点的页面添加配置文件，配置文件包含页面名（pageName）和事件对象，
事件对象包含埋点事件名和参数配置  
事件对象的key对于Tracker.track方法中的action参数
#### 配置参数：  
pageName: 埋点中的页面名  
埋点事件配置    
name: 上报的埋点事件名  
params: 埋点事件的参数配置

```javascript
export default {
    pageName: '首页',
    addToCarts: {
        name: 'yh_elementClick',
        params: {
            yh_elementName: '加入购物车',
            yh_moduleName: '{args.moduleName}',
            yh_elementIndexNum: '{args.index}',
            yh_productId: '{page.data.floors[$floorIndex].goods[$index].id}',
            yh_productName: '{page.data.floors[$floorIndex].goods[$index].name}',
            abVersion: '{page.abVersion}',
            storeId: '{page.data.storeId}',
            uId: '{APP.globalData.userInfo.uId}',
        }
    }
}

```
#### params参数配置包含的数据源：  
##### 1、写死的配置
```javascript
yh_elementName: '加入购物车'
```
##### 2、从Tracker.track方法中的args参数中读取
```javascript
// 代表从track方法中的args参数中读取的moduleName属性
yh_moduleName: '{args.moduleName}',
```
##### 3、从page对象中读取的数据
```javascript
// [$index] 代表数组的索引，对应的值会用track方法的args中读取同名属性值
yh_productId: '{page.data.floors[$floorIndex].goods[$index].id}',
```
##### 4、从APP对象中读取数据
```javascript
uId: '{APP.globalData.userInfo.uId}',
```
#### 触发埋点事件
```javascript
const { data, index, floorIndex } = this.data
Tracker.track({
    action: 'addToCarts',
    args: {
        ...data,
        moduleName: 'Goods',
        index,
        floorIndex
    }
})
```


