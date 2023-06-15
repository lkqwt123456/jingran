# 这是一个设置密码的插件 

### 使用自定义键盘输入密码仅支持数字

## 使用方法

```javascript
	// 注 ： 如果是 uni_modules 无需引入 可以直接使用set-passkey标签
    import set-passkey from '@/components/set-passkey/index.vue'
    export default {
        components: {set-passkey}
    }    
```

```javascript
    <set-passkey  :show="show" :isYan='isYan' placeholder="请输入新密码"  @finish="finish" v-model="keys" />
```

 ## 属性说明

|属性名称|类型|默认值|说明|
|--|--|--|--|
|show|Boolean|false|是否显示自定义键盘|
|isYan|Boolean|false|是否显示密码明文|
|IsUpset|Boolean|true|是否打乱输入键盘的数字|
|placeholder|String|空|提示文字|
|styles|String|空|提示文字的样式|
|maxLen|Number|6|输入的长度|

 ## 事件说明

|事件名称|说明|返回值|
|--|--|--|
|@change|输入事件|返回输入的值|
|@finish|输入完成事件|输入完成后或点击完成执行|
