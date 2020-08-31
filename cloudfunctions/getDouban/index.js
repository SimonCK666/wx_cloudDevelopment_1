// 云函数入口文件
const cloud = require('wx-server-sdk')
// npm install axios --save
const axios = require('axios')
// npm install doubanbook --save
const doubanbook = require('doubanbook')
// npm install cheerio --save    => 解析 html 文档
const cheerio = require('cheerio')

cloud.init()

async function searchDouban(isbn) {
    console.log("isbn")
    const url = 'https://search.douban.com/book/subject_search?search_text=' + isbn
    let searchInfo = await axios.get(url)
    // console.log(searchInfo.data)

    // 获取 window.__DATA__ = 后面的数据 解密 需要的 就是括号里的数据
    let reg = /window\.__DATA__ = "(.*)"/
    // 匹配网页源码
    if (reg.test(searchInfo.data)) {
        // console.log(RegExp.$1)
        let searchData = doubanbook(RegExp.$1)[0]
        console.log(searchData)
        return searchData
    }
}


// debugging
// 网页爬虫： 获得豆瓣网中的信息
async function getDouban(isbn) {
    // 第一个爬虫，根据isbn 查询豆瓣 url
    let detailInfo = await searchDouban(isbn)
    console.log(detailInfo.title, detailInfo.rating.value)
    let detailPage = await axios.get(detailInfo.url)

// 第二个爬虫
    // cheerio 在node中使用 jquery 的语法 解析文档
    const $ = cheerio.load(detailPage.data)    // 需要图书的所有数据
    // jquery 语法
    const info = $('#info').text().split('\n').map(v=>v.trim()).filter(v=>v)
    console.log(info)
    let author = info[1]
    let tags = []
    $('#db-tags-section a.tag').each((i, v) => {
        tags.push({
            title: $(v).text()
        })
    })
    const ret = {
        creat_time : new Date().getTime(),
        title: detailInfo.title,
        rate: detailInfo.rating.value,
        image: detailInfo.cover_url,
        url: detailInfo.url,
        summary: $('#link-report .intro').text(),
        tags,
        author,
    }
    console.log(ret)
    return ret


// 第一个爬虫
    // console.log("isbn")
    // const url = 'https://search.douban.com/book/subject_search?search_text=' + isbn
    // let searchInfo = await axios.get(url)
    // // console.log(searchInfo.data)

    // // 获取 window.__DATA__ = 后面的数据 解密 需要的 就是括号里的数据
    // let reg = /window\.__DATA__ = "(.*)"/
    // // 匹配网页源码
    // if (reg.test(searchInfo.data)) {
    //     // console.log(RegExp.$1)
    //     let searchData = doubanbook(RegExp.$1)[0]
    //     // return searchData
    //     console.log(searchData) 
    // }
}

// 本地调试的入口
console.log(getDouban('9787010009148'))

// 所谓云函数，就是一个 node 的项目（函数）
exports.main = async (event, context)=>{
    // 云函数的逻辑
    const {isbn} = event
    return getDouban(isbn)
}