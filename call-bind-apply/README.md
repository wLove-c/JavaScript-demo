
@[TOC](javascript中call、bind、apply你知多少？)

> 在我们日常开发过程中call、bind、apply无疑是我们用的比较多的语法,今天在开发中看到有同事傻傻分不清call和bind的区别,故在解释一通之后，写下此文；

### 首先查看文档理解含义
#### call()
从[MDN 文档 call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)我们可以了解到:
call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
* fun.call(thisArg, arg1, arg2, ...)
* thisArg 在 *`fun`* 函数运行时指定的 `this` 值*。*需要注意的是，指定的 `this` 值并不一定是该函数执行时真正的 `this` 值，如果这个函数在[`非严格模式`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode "如果你想改变你的代码，让其工作在具有限制性JavaScript环境中，请参阅转换成严格模式。")下运行，则指定为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null "值 null 特指对象的值未设置。它是 JavaScript 基本类型 之一。") 和 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined "undefined是全局对象的一个属性。也就是说，它是全局作用域的一个变量。undefined的最初值就是原始数据类型undefined。")的 `this` 值会自动指向全局对象（浏览器中就是 window 对象），同时值为原始值（数字，字符串，布尔值）的 `this` 会指向该原始值的自动包装对象。（ps:严格模式下 我们对函数的的调用必须严格的写出被调用的函数的对象）；
* arg1, arg2, ... 指定的参数列表

先举个例子:
```javascript
// main.js
  const foo={
      name:'foo',
      getFoo(...args){
        console.log('this===',this,'this.name==',this.name)
        console.log('-----------------------------------')
        console.log('...args=====',...args)
      }
    }
    const bar={
      name:'bar',
      getBar(...args){
        console.log('this===',this,'this.name==',this.name)
        console.log('-----------------------------------')
        console.log('...args=====',...args)
      }
    }
    foo.getFoo() //this=== {name: "foo", getFoo: ƒ} this.name== foo  ----------------------------------- ...args=====
    bar.getBar() //this=== {name: "bar", getBar: ƒ} this.name== bar  ----------------------------------- ...args=====

```
假如我们想在getFoo去借bar里面的东西用用，该怎么办呢?
也许有同学想到的是这样:
```javascript
    foo.getFoo(bar.name) // this=== {name: "foo", getFoo: ƒ} this.name== foo -----------------------------------  ...args===== bar

```
毫无疑问，这是没问题的，但此时只是正常的传参，能否干脆点把this.name也改成bar呢；根据call的定义:
```javascript
foo.getFoo.call(bar,'测试传参','测试call') //his=== {name: "bar", getBar: ƒ} this.name== bar ----------------------------------- ...args===== 测试传参 测试call
//使用call后，我们可以看到foo.getFoo的this此时指向了bar对象，此时的name拿到的bar的对象的name；
```
#### apply()
从[MDN 文档 apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)我们可以了解到:
**`apply()`** 方法调用一个具有给定`this`值的函数，以及作为一个数组（或[类似数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects)）提供的参数。

* func.apply(thisArg, [argsArray])
* thisArg：可选的。在 *`func`* 函数运行时使用的 `this` 值。请注意，`this`可能不是该方法看到的实际值：如果这个函数处于[非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode "如果你想改变你的代码，让其工作在具有限制性JavaScript环境中，请参阅转换成严格模式。")下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象，原始值会被包装。

* argsArray：可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `func` 函数。如果该参数的值为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null "值 null 特指对象的值未设置。它是 JavaScript 基本类型 之一。") 或  [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined "undefined是全局对象的一个属性。也就是说，它是全局作用域的一个变量。undefined的最初值就是原始数据类型undefined。")，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。 [浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#Browser_compatibility) 请参阅本文底部内容。

继续使用刚才的foo和bar
```javascript
foo.getFoo.apply(bar,['测试传参','测试apply']) //his=== {name: "bar", getBar: ƒ} this.name== bar ----------------------------------- ...args===== 测试传参 测试apply

```

总结 **call方法和apply方法两者极度相似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。**

#### bind()
从[MDN 文档 bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)我们可以了解到:

bind()方法创建一个新的函数，在调用时设置this关键字为提供的值。并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。
* function.bind(thisArg[, arg1[, arg2[, ...]]])
* thisArg 调用绑定函数时作为`this`参数传递给目标函数的值。 如果使用[`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new "new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。")运算符构造绑定函数，则忽略该值。当使用`bind`在`setTimeout`中创建一个函数（作为回调提供）时，作为`thisArg`传递的任何原始值都将转换为`object`。如果`bind`函数的参数列表为空，执行作用域的`this`将被视为新函数的`thisArg`。

* arg1, arg2, ... 当目标函数被调用时，预先添加到绑定函数的参数列表中的参数。

emmmm...继续最最上面的那个foo和bar

```javascript
foo.getFoo.bind(bar,'测试传参','测试bind') // 此时是无输出，因为bind()方法创建一个新的函数，当前函数并没有执行


```
修改如下：
```javascript
const foobindbar = foo.getFoo.bind(bar,'测试传参','测试bind');

console.log(foobindbar)
    // ƒ getFoo(...args){
    //   console.log('this===',this,'this.name==',this.name)
    //   console.log('-----------------------------------')
    //   console.log('...args=====',...args)
    // }

foobindbar() //this=== {name: "bar", getBar: ƒ} this.name== bar ----------------------------------- ...args===== 测试传参 测试apply


```
### 总结
#### call和apply的区别
call方法和apply方法两者极度相似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。用apply时，即使传入的参数只有一个，也必须定义为数组才行；

#### call与apply 和 bind的区别

call与apply改变this的指向时，会直接触发函数;而bind会创建一个新的函数，在调用时设置this关键字为提供的值，使用bind时，会优先使用bind绑定的几个值；
如下：
```javascript
foo.getFoo.bind(bar,'测试传参','测试bind')
const foobindbar = foo.getFoo.bind(bar,'测试传参','测试bind');

console.log(foobindbar)
    // ƒ getFoo(...args){
    //   console.log('this===',this,'this.name==',this.name)
    //   console.log('-----------------------------------')
    //   console.log('...args=====',...args)
    // }

foobindbar('参数1', '参数2') //this=== {name: "bar", getBar: ƒ} this.name== bar ----------------------------------- ...args=====  测试传参 测试apply 参数1 参数2
// ...args=====  测试传参 测试apply 参数1 参数2

```

> 文章所示demo请转[王一诺/github](https://github.com/wLove-c/JavaScript-demo/tree/master/call-bind-apply)

[具体文章请看](https://juejin.im/post/5d0c7333f265da1b8e70a762)
