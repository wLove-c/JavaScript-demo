@[toc](js基础数组Array的一些特性及方法)
> 前言: 业务中经常用到数组的方法，有些印象逐渐模糊，故而写下此文；

## 数据类型

### js数据类型
* 在js基础中，我都们知道数据类型有两大类:原始类型(基本类型)、引用类型


### 基本类型
js有5 种原始类型，即 Undefined、Null、Boolean、Number 和 String。其中Undefined和Null也称作**特殊类型**

```javascript
console.log(typeof undefined) // undefined
console.log(typeof null)   // object
console.log(typeof true)  // boolean
console.log(typeof 1)     // number
console.log(typeof '1')   // string
 
```
**总结**:基本类型，笔者就不作过多介绍具体详情可以查阅[w3school](http://www.w3school.com.cn/js/pro_js_primitivetypes.asp)，这里解释一下为何typeof null得出来的是object类型而不是null，因为null是一个只有一个值的特殊类型，它被认为是对象的占位符，表示一个空对象引用。

* 在js中null == undefined 得到是真(true)，尽管这两个值相等，但它们的含义不同。 undefined 是声明了变量但未对其初始化时赋予该变量的值，null 则用于表示尚未存在的对象（在讨论 typeof 运算符时，简单地介绍过这一点）。如果函数或方法要返回的是对象，那么找不到该对象时，返回的通常是 null。

### 引用类型
js中 基本类型的值基本是不可变的，但引用类型的值是动态可变的；基本类型的变量是存放在栈内存中，而引用类型的值是同时保存在栈内存和堆内存中的对象；
* 引用类型一般指的是对象和方法;
* 引用类型其实是在栈内存中存储了一个指针，这个指针指向堆内存中相应的存储地址

**举例说明:**
```javascript
 let arr = [1,2,3,4,5,6]
  let arr1 = arr;
  arr1.push(1)
  console.log(arr,arr1)
```
如上代码：按照我们常规的想法是 arr =  [1,2,3,4,5,6]，arr1 = [1,2,3,4,5,6,1]的；

但实际输出如下:
![实际输出](https://user-gold-cdn.xitu.io/2019/6/28/16b9d889bc955f1f?w=1006&h=100&f=png&s=18781)


解释: 上面对引用类型的定义**引用类型其实是在栈内存中存储了一个指针，这个指针指向堆内存中相应的存储地址**有讲到指针的这个词，实际上上面代码的操作 let arr1 = arr;并不是把arr重新拷贝了一份给arr1,而是把arr存储在堆内存的存储地址给了arr1, 对arr1的修改，会对该地址指向的堆内存的数据进行修改，而arr和arr1指向堆内存的地址是相同的，所以打印结果一致；并且都改变了；

上述换成Object对象依然是一致的，不相信的同学可以私下试试~

## 数组的方法
从[w3school](http://www.w3school.com.cn/jsref/jsref_obj_array.asp)中我们可以知道数组有许多的方法，并且有些是我们经常用到且混淆不清的，接下来我们将对数组的方法进行详解；

### 1. Array.concat()
Array.concat() 的作用是连接两个或更多的数组，并返回结果。
使用
```javascript

	let	arrNum = [1,2,3,4,5,6]
	let	arrStr = ['1','2','3','4','5','6']
	let	arrObj = [{a:1},{b:'2'}]
 	let arrAll =  arrNum.concat(arrStr).concat(arrObj)
	console.log(arrAll)

```
输出结果如下:
![Array.concat()](https://user-gold-cdn.xitu.io/2019/6/28/16b9d889bce3fa31?w=958&h=594&f=png&s=51994)

此时因为concat()返回的是一个新的实例对象，对原数组操作(arrNum、arrStr)并不会影响到arrAll的值变化，**但假如对arrObj进行改变,由于arrObj里面的对象属于引用类型，arrAll相应的值的地址指针依然是同一个堆内存，假如对arrObj进行改变，arrAll也会相应改变；而arrNum、arrStr里面的值是基本类型，则不影响**；

### 2. Array.join()
Array.join() 把数组的所有元素放入一个字符串并返回。元素通过指定的分隔符进行分隔。
```javascript
  let	arrNum = [1,2,3,4,5,6]
  let	arrStr = ['1','2','3','4','5','6']
  let	arrObj = [{a:1},{b:'2'}]
  let	arrArr = [[1,2],['1','2']]
  console.log(arrNum.join('|'))
  console.log(arrStr.join(','))
  console.log(arrObj.join('-'))
  console.log(arrArr.join('='))
```
![Array.join()](https://user-gold-cdn.xitu.io/2019/6/28/16b9d889c9a79ed5?w=1078&h=194&f=png&s=57520)

* 返回的字符串均没问题，但假如数组里面是object，则返回[object Object] 字符串；

### 3. Array.pop()
Array.pop() 向数组的末尾添加一个或更多元素，并返回新的长度。**注意！！！文档上没写明会改变原数组; 但实际上会改变**
```javascript
  let	arrNum = [1,2,3,4,5,6]
  let	arrStr = ['1','2','3','4','5','6']
  let	arrObj = [{a:1},{b:'2'}]
  let	arrArr = [[1,2],['1','2']]
  console.log(arrNum.pop())
  console.log(arrStr.pop())
  console.log(arrObj.pop())
  console.log(arrArr.pop())
  console.log(arrObj,arrArr)
```
输出结果:
![Array.pop()](https://user-gold-cdn.xitu.io/2019/6/28/16b9d889cc6450a7?w=964&h=270&f=png&s=72040)

### 4. Array.push()
 Array.push() 向数组的末尾添加一个或更多元素，并返回新的长度。

本来觉得**用的最多，不想作介绍了**但为了加以证明引用类型引用是的存储地址，修改原数组会导致引用相应地址的值也改变；
代码如下:
```javascript
  let	arrNum = [1,2,3,4,5,6]
  let	arrStr = ['1','2','3','4','5','6']
  let	arrObj = [{a:1},{b:'2'}]
  let	arrArr = [[1,2],['1','2']]
  let  arrAll = []
  console.log(arrAll.push(arrNum))
  console.log(arrAll.push(arrStr))
  console.log(arrAll.push(arrObj))
  console.log(arrAll.push(arrArr))
  console.log('改变前===',arrAll)
  arrNum[0] = 10000
  arrStr[0] = 10000
  arrObj[0] = 10000
  arrArr[0] = 10000
  console.log('改变后===',arrAll)
```
![Array.push()](https://user-gold-cdn.xitu.io/2019/6/28/16b9d889d2586a57?w=972&h=678&f=png&s=154236)

总结:再次证明引用类型的特点；

### 5. Array.reverse()
Array.reverse() 颠倒数组中元素的顺序。
```javascript
  let	arrNum = [1,2,3,4,5,6]
  let	arrStr = ['1','2','3','4','5','6']
  let	arrObj = [{a:1},{b:'2'}]
  let	arrArr = [[1,2],['1','2']]
  console.log(arrNum.reverse())
  console.log(arrStr.reverse())
  console.log(arrObj.reverse())
  console.log(arrArr.reverse())
```
常规使用，毫无问题
![Array.reverse() ](https://user-gold-cdn.xitu.io/2019/6/28/16b9d889d3546d90?w=912&h=526&f=png&s=83177)

### 6. Array.shift()
 Array.shift() 删除并返回数组的第一个元素,具体表现和上面的 3. Array.pop() 完全类似，同样会改变原数组，不作过多介绍；

### 7. Array.unshift()
Array.unshift()向数组的开头添加一个或更多元素，并返回新的长度。

用法:
```javascript
arrayObject.unshift(val1,val2,....,valn)
```
参数解释: 
* val1 必需。向数组添加的第一个元素。
* val2 可选。向数组添加的第二个元素。
* valn 可选。向数组添加的第n个元素。

**注意**：unshift() 方法将把它的参数插入 arrayObject 的头部，并将已经存在的元素顺次地移到较高的下标处，以便留出空间。该方法的第一个参数将成为数组的新元素 0，如果还有第二个参数，它将成为新的元素 1，以此类推。并且 **unshift() 方法不创建新的创建，而是直接修改原有的数组。**
使用如下:
```javascript
	let	arrNum = [1,2,3,4,5,6]
	let	arrStr = ['1','2','3','4','5','6']
	let	arrObj = [{a:1},{b:'2'}]
	let	arrArr = [[1,2],['1','2']]
	console.log(arrNum.unshift(1,2,3,4,5,6))
	console.log(arrStr.unshift('1','2','3','4','5','6'))
	console.log(arrObj.unshift({a:1},{b:'2'}))
	console.log(arrArr.unshift([1,2],['1','2']))
	console.log(arrNum,arrStr,arrObj,arrArr)
```

输出:
![Array.unshift()](https://user-gold-cdn.xitu.io/2019/6/28/16b9d889e0966c02?w=940&h=706&f=png&s=117896)

### 8. Array.slice()
Array.slice() 方法可从已有的数组中返回选定的元素。

用法:
```javascript
arrayObject.slice(start,end)
```
参数解释: 
* **start** ： 必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
* **end** ： 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。
* **返回值** ：返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。
使用
```javascript
  let	arrNum = [1,2,3,4,5,6]
  let	arrStr = ['1','2','3','4','5','6']
  let	arrObj = [{a:1},{b:'2'}]
  let	arrArr = [[1,2],['1','2']]
  console.log(arrNum.slice(0,1))
  console.log(arrStr.slice(0,1))
  console.log(arrObj.slice(0,1))
  console.log(arrArr.slice(0,1))
  console.log(arrNum,arrStr,arrObj,arrArr)
```
输出如下：
![Array.slice()](https://user-gold-cdn.xitu.io/2019/6/28/16b9d88a011b68d1?w=1008&h=540&f=png&s=99673)

**注意:** 该方法并不会修改原数组，而是返回一个子数组;灵活使用，可以用来深拷贝数组；如下:

```javascript
let arr = [1,2,3,4,5,6]
let arr2 = arr.slice()
console.log(arr2) // [1,2,3,4,5,6]
arr2[0] = 10000;
console.log(arr) // [1,2,3,4,5,6]
console.log(arr2) // [10000,2,3,4,5,6]


```

### 9. Array.splice()
Array.splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

用法：
```javascript

arrayObject.splice(index,delLong,item1,.....,itemN)

```
参数解释: 
* **index** ： 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
* **delLong** ：必需。要删除的项目数量。如果设置为 0，则不会删除项目。
* **item1, ..., itemN** ：可选。向数组添加的新项目。

**注意：** splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。

如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。

使用:
```javascript
  let	arrNum = [1,2,3,4,5,6]
  let	arrStr = ['1','2','3','4','5','6']
  let	arrObj = [{a:1},{b:'2'}]
  let	arrArr = [[1,2],['1','2']]
  console.log(arrNum.splice(-1,1,10000))
  console.log(arrStr.splice(0,0,'10000'))
  console.log(arrObj.splice(0,1))
  console.log(arrArr.splice(0,1))
  console.log(arrNum,arrStr,arrObj,arrArr)

```
结果如下:
![image.png](https://user-gold-cdn.xitu.io/2019/6/28/16b9d88a058eb959?w=944&h=524&f=png&s=101279)

**注意:** 该方法会修改原数组，而是返回一个子数组。如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。如果未删除，则返回空数组；

总结: slice()和splice()容易混淆，不过这样记就好:**单词长的参数也长，参数长的功能大，可加可减可改变**

### 9. Array.sort()
Array.sort() 方法用于对数组的元素进行排序。

用法：
```javascript
arrayObject.sort(sortby)

```
参数解释: 
* **sortby** ： 可选。规定排序顺序。必须是函数。

使用:
```javascript
let	arrNum = [6,2,1,3,4,5]
  let	arrStr = ['6','2','1','3','4','5']
  let	arrObj = [{b:'2'},{a:1}]
  let	arrArr = [['2','1'],[2,1]]
  console.log(arrNum.sort())
  console.log(arrStr.sort())
  console.log(arrObj.sort())
  console.log(arrArr.sort())
  console.log(arrNum,arrStr,arrObj,arrArr)
	var arr = [1,2,4,3,2,1]

	console.log(arr.sort(function (m,n) {
    if (m < n) return -1
   	if (m > n) return 1
    if (m == n)return 0
  }))
```
结果如下：
![Array.sort()](https://user-gold-cdn.xitu.io/2019/6/28/16b9d889e8e7e2d1?w=926&h=484&f=png&s=115263)

**总结**：实际上上面代码写的方法就是sort()默认的方法；方法可以自定义；

### 最后数组方法的扩展
从字面认知:every是每一个都，some是都有一些就~~
即:
1. every():方法用于检测数组中所有元素是否都符合指定条件，若符合返回true，否则返回false；
2. some():方法用于检测数组中的元素是否有满足指定条件的，若满足返回true，否则返回false；

#### every()

```javascript
// every():方法用于检测数组中所有元素是否都符合指定条件，若符合返回true，否则返回false,且程序不会继续往下执行；
array.every(function(item,index,array）{
                 // item:当前元素的值；

                 // index:当前元素的索引；

                 // array:当前元素的数组对象；

         })

```

##### 例子:

```javascript
//es6
let age = [10,20,30,40,50,22,26]
 // 所有都满足才会返回true,否则返回false;
 let result = age.every((item,index,array)=>{
 console.log(item) // 10
 console.log(index) // 0
 console.log(array) //[10,20,30,40,50,22,26]

     return item > 22;
 	})

// es5
// let result = age.every(function(item,index,array){
//     return item > 22;
// 	})
 	console.log(result) // false

```

#### some()

```javascript
// some():方法用于检测数组中是否有元素符合指定条件，若有符合的返回true，且程序不会继续往下执行；否则返回false；
array.some(function(item,index,array）{
                 // item:当前元素的值；

                 // index:当前元素的索引；

                 // array:当前元素的数组对象；

         })

```

##### 例子:

```javascript
//es6
let age = [10,20,30,40,50,22,26]
 // 所有都满足才会返回true,否则返回false;
 let result = age.some((item,index,array)=>{

  console.log(item) // 10 20 30
  console.log(index) // 0 1 2
  console.log(array) //[10,20,30,40,50,22,26]


     return item > 22;
 	})

// es5
// let result = age.some(function(item,index,array){
//     return item > 22;
// 	})
 	console.log(result) // true

```
> 以上就是js基础中 数组常用的方法，特别要注意的是splice和slice容易混淆，其他的话，用过几次就基本没有问题了，此次代码已经上传到github，有兴趣可以去下载实现一波喔@[王一诺wLove-c/JavaScript-demo](https://github.com/wLove-c/JavaScript-demo)，如果对你有帮助，请点个赞吧；

> 更多内容请转作者博客@[王一诺的博客](https://wlove-c.github.io/)，多多交流~




[具体文章请看](https://juejin.im/post/5d15e58ce51d45775e33f5a1)
