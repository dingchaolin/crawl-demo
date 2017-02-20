const cheerio = require( 'cheerio' );

let $ = cheerio.load( '<h2 class="title">hello world</h2>');

$('h2.title').text( 'hello wecash' );

$('h2').addClass('welcome');

console.log( $.html() );
