// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


// debugging
async function getDouban(isbn) {
    console.log("isbn")
    const url = 'https://search.douban.com/book/subject_search?search_text=' + isbn
    let searchInfo = await axios.get(url)
}

// 本地调试的入口
console.log(getDouban('9787010009148'))

// 所谓云函数，就是一个 node 的项目（函数）
exports.main = async (event, context)=>{
    // 云函数的逻辑
    const {isbn} = event
    return getDouban(isbn)
}