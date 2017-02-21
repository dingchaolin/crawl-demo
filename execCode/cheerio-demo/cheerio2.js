const cheerio = require( 'cheerio' );

let htmlStr =
    `<ul id="fruits">
        <li class="apple">Apple</li>
        <li class="orange">Orange</li>
        <li class="pear">Pear</li>
    </ul>`;

//#### 加载html

//首先方式 第二个参数附带默认选项
$ = cheerio.load( htmlStr , {
    ignoreWhitespace: false,//返回html标签就没有换行了
    xmlMode: false,//
    lowerCaseTags: false //把标签名全部转为小写
});
/*
 <ul id="fruits">
     <li class="apple">Apple</li>
     <li class="orange">Orange</li>
     <li class="pear">Pear</li>
 </ul>
 */
//或者
//$ = cheerio( 'ul', htmlStr );
/*
 <li class="apple">Apple</li>
 <li class="orange">Orange</li>
 <li class="pear">Pear</li>
 */
//或者
//$ = cheerio( 'li', 'ul', htmlStr );
/*
 Apple
 */
//console.log( $.html() );


//#### 选择器

//查看文本
let text = $('.apple', '#fruits').text();//Apple
//查看class
let cla = $('ul .apple').attr('class');// apple 标签的大小写会对结果有影响
// 通过class 或者 id 获取
let text1 = $('ul[id=fruits]').html() ;
text1 = $('li[class=apple]').html() ;// apple

//获得属性
let id = $('ul').attr('id');// fruits

//添加属性
$('.apple').attr('id', 'favorite');
/*
 <li class="apple" id="favorite">Apple</li>
 <li class="orange">Orange</li>
 <li class="pear">Pear</li>
 */

/*
let formStr =
    `<form action="form_action" method="get" class="form">
        <input type="text" name="fname" value="wecash"/>
        <input type="checkbox" name="lname" value="ok"/>
        <input type="submit" value="Submit" />
    </form>`;

let $1 = cheerio.load( formStr );
let value = $1('input[type=checkbox]').prop( 'checked' );// false
value = $1('input[type=checkbox]').prop( 'checked',true ).val();// ok
value = $1('input[type=text]').val();// wecash
$1('input[type=text]').val('test');//
value = $1('input[type=text]').val();// test
value = $(formStr).serializeArray();
*/
/*
 [ { name: 'fname', value: 'wecash' } ]  只能获取到input类型的属性
 */
//console.log( value )



let data = $('<div data-apple-color="red"></div>').data();//{ appleColor: 'red' }
data = $('<div data-apple-color="red"></div>').data('apple-color');// red

// data 数据在标签上看不到
let apple = $('.apple').data('kind','mac');
data = apple.data('kind');// mac　　

 　
// 移除属性
//$('.pear').removeAttr('class');
/*
 <ul id="fruits">
 <li class="apple" id="favorite">Apple</li>
 <li class="orange">Orange</li>
 <li>Pear</li>
 </ul>
 */

// 检查某个元素是否有给出的类名
data = $('.pear').hasClass('pear');// true
data = $('apple').hasClass('fruit');//false
data = $('li').hasClass('pear');//true


//给标签添加属性
$('.pear').addClass('fruit');
//$('.apple').addClass('fruit red');
/*
 <ul id="fruits">
 <li class="apple fruit red" id="favorite">Apple</li>
 <li class="orange">Orange</li>
 <li class="pear fruit">Pear</li>
 </ul>

 */

//$('.apple').removeClass();//所有的class都被移除了

//toggleClass
$('.apple').toggleClass( 'ugly green',  true );// 第二个参数加不加 都会将新的class添加上

data = $('#fruits').find('li');// 返回一个对象 有很多属性 相当于把一段html的代码用json对象表示了
// 其中有一个length属性
data = $('#fruits').find('li').length;// 3

// parent
data = $('.pear').parent().attr('id');// fruits

data = $('.orange').parent().length ; // 1

data = $('.orange').parent('#fruits').length ; // 1
console.log( data　);




