# css 选择器

##  class 选择器 (使用 . )

***
  ```
    .aa {
      height: 100px;
    }
  ```
  表示：class中 包含 aa 的

***

***
  ```
    .aa.bb {
      background-color:powderblue;
    }
  ```
  表示：class中 即有 aa，又有 bb 的

***

***
  ```
    .bb, .cc{
      color:purple;
    }
  ```
  中间 逗号, 代表：'什么元素 ' 和 '什么元素 '
      class中有bb 的元素 和 class中有cc 的元素

***

***
  ```
   .aa .aa-1 {
      color: pink;
    }
  ```
  中间 空格 代表：在 '什么元素 ' 的下面的 '什么元素 '
               aa下面 所有 class中有aa-1 的元素 

***
***
  ```
    .dd > div {
      height: 200px;
      width: 200px;
      color: #000;
      background-color: pink;
    }
  ```
  中间 > 代表： 在 '什么元素 ' 的下面的 '子元素'（只包含子元素，不包含子元素的子元素） 
    class中有dd 的元素 下面的 子元素中所有 div标签元素； (不包含div 中的 div 元素)
***

***
  ```
    .ee div + p {
      color: palegreen;
    }
  ```
  中间 + 代表： 在 '什么元素 ' 的右侧紧邻 的元素 
        class中有ee 的元素 下面的 所有紧邻右侧元素为 p 的div 元素；
***
  ```
    .ff div ~ p {
      color: pink;
    }
  ```
  中间 ~ 代表：在 '什么元素 ' 之后的每一个 ‘什么元素’ （不包含 子集的子集）
        选择p元素 之后的每一个 ul元素 
***

## id 选择器 &nbsp;&nbsp;(使用 # )

***
 ```
  #idSelect{
    height: 100px;
    width: 100px;
    background-color: peru;
  }
 ```
***
##  属性选择器 (使用 [属性名] 或 [属性名 =|～=||=|^=|$=|*= 属性值] )

***
  *  =    :  为相等关系
  *  ～=  : 为包含关系(单词)
  *  |=   : 以什么开头的
  *  ^=   : 以什么开头的
  *  $=   :  以什么结尾的
  *  *=   : 为包含关系(不限单词)
  
  ```
    代表 所有存在 name 属性的 元素 
    [name]{
      height: 200px;
      width: 400px;
      background-color: #f8f8f8;
    }
    代表 所有 name 属性值为att1的 元素 
    [name=attr1]{
      background-color: paleturquoise;
    }
    div[username^=张]{
      color: green;
    }
      包含'李四'这个字符串 
    div[username*=李四]{
      color: pink;
    }
    包含'李四'这个单词 
    div[username~=李四]{
      color: blue;
    }
  ```
***

##  a 链接
***
  * :link  未访问的链接
  * :hover  鼠标悬停时的链接
  * :active 活动链接
  * :visited 已被访问的链接

  ```
   .a-link:link {
      background-color: #36d8d1;
    }
    .a-visited:visited{
      color: blue;
    }
    .a-active:active{
      background-color: yellow;
    }
    .a-hover:hover{
      color: yellow;
    }
  ```
***


## :nth-child() | :first-child  | :last-child  | :not()

***

   ```
    /* .ul-area  下面的第一个li  */
    .ul-area li:first-child{
      color:teal;
    }
    
    /* .ul-area  下面的最后一个li  */
    .ul-area li:last-child{
      color: yellowgreen;
    }

    /* .ul-area  下面的所有第偶数个li  */
    .ul-area li:nth-child(2n){
      color: pink;
    }

    /* .ul-area2  下面的所有第奇数个li  */
    .ul-area2 li:nth-child(2n + 1){
      color: pink;
    }

    /* :not  不包含 关系 */
          
    .ul-area2 li:not(.num7){
      color:#000;
    } 
  ```

***

## :after | :before

***

 ```
    .pre::before{
      content: 'pre';
      color: pink;
    }
    .next:after{
      content: 'next';
      color:  blue;
    }
 ```

***

##  :first-of-type | :last-of-type | :only-of-type | :only-child |:nth-last-child(n) |:nth-of-type(n) |:nth-last-of-type(n)

***
  ：*-of-type 和 *-child 的区别
  * 1. *-of-type 先找到所有满足条件的标签， 再定位 到位置
    + 例1：li:first-of-type 
      在父级元素下面的找到的 第一个li标签
    + 例2：li:nth-of-type(2)
      在父级元素下面的找到的 第二个li标签
    + 例3：p:only-of-type
      在父级元素下面的找到的 找到所有p标签，p标签的数量是否只有一个，如果是 则满足要求，渲染样式；

  * 2: *-child 先定位到位置 再判断是否是满足条件的标签
    + 例1：li:first-child
      在父级元素下面的找到 第一个元素 判断是不是li标签，如果是 则满足要求，渲染样式；
    + 例2：li:nth-child(2)
      在父级元素下面的找到 第二个元素 判断是不是li标签，如果是 则满足要求，渲染样式；
    + 例3：p:only-child
      在父级元素下面的找到的 找到所有标签， 是否只有一个p元素，如果是 则满足要求，渲染样式；


 ```

    .type-ul-area li:first-child{
      color: yellow;
    } 

    .type-ul-area li:first-of-type{
      color: blue;
    }

    .type-ul-area li:last-of-type{
      color: blue;
    }

    .type-ul-area2 a:only-of-type{
      color: yellow;
    }
    .type-ul-area2 a:only-child{
      color: blue;
    }

    .type-ul-area3 li:nth-last-child(2){
      color: pink;
    }
    .type-ul-area3 li:nth-last-of-type(2){
      color: yellow;
    }

    .type-ul-area3 li:nth-of-type(1){
      color: green;
    }
    .type-ul-area3 li:nth-child(1){
      /* 不生效， 第一个元素不是li 标签 */
      color: aqua; 
    }
 ```

***


