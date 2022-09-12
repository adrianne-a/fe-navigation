const $siteList = $('.siteList')
const $lastli = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' },
    { logo: 'C', url: 'https://cdnjs.cloudflare.com/' }
]
const simplifyUrl = (url) => {
    // url = url[0].toUpperCase()+url.substr(1);
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')//删除/开头的内容
        .replace('.com', '')
        .replace('.cn', '')
        .replace('url[0]', 'url[0].toUpperCase()')
}

//
const render = () => {
    $siteList.find('li:not(.last)').remove()

    hashMap.forEach((node, index) => {
        //color
        // var str = "#"
        // for (var i = 0; i < 6; i++) {
        //     str += Math.floor(Math.random() * 16).toString(16);
        // }
        const $li = $(`<li>
                        <div class="site">
                            
                            <div class ="logo" ><img src=https://www.google.com/s2/favicons?sz=128&domain_url=${node.url} style="max-width:55%" /> </div>
                            <div class="link">${simplifyUrl(node.url)}</div>
                            <div class='close'>
                                <div clsss='closebg' >
                            <img src="https://img.icons8.com/fluency-systems-regular/48/undefined/delete-sign--v1.png"/ >
                                </div>
                            </div>
                        </div>
        </li>`).insertBefore($lastli)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            console.log(hashMap)
            hashMap.splice(index, 1)
            render()
        })

    })
}
render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问要添加什么网址？', 'baidu.com')
        if (url.indexOf('http' !== 0)) {
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logo: simplifyUrl(url)[0],
            url: url
        })
        render()
    });
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
// 随机颜色
// function col(){
//     var str="#"
//     for(var i=0;i<6;i++){
//         str+=Math.floor(Math.random()*16).toString(16);
//     }
//     return str
// }

