const base64UrlDecode = (base64Url: string) => {
    // 替换 URL-safe 字符
    let base64 = base64Url
        .replace(/-/g, '+') // 将 `-` 替换为 `+`
        .replace(/_/g, '/') // 将 `_` 替换为 `/`

    // 处理可能的 padding
    const padding = base64.length % 4
    if (padding) {
        base64 += '='.repeat(4 - padding) // 添加必要的 padding (`=`)
    }

    // 解码
    return Buffer.from(base64, 'base64').toString('utf-8')
}

const base64UrlEncode = (data: string): string => {
    // 获取标准的 Base64 编码
    let base64 = Buffer.from(data).toString('base64')

    // 替换标准 Base64 中的字符
    base64 = base64.replace(/\+/g, '-').replace(/\//g, '_')

    // 去掉 Base64 编码中的 `=` padding
    base64 = base64.replace(/=+$/, '')

    return base64
}

const modify = (txtFile: string): string => {
    const oldUrlPrefix = 'https://lugu-fs-images.oss-cn-hangzhou.aliyuncs.com/1-CGM/'
    const newUrlPrefix = 'https://d1u3nv0u29h1dz.cloudfront.net/images/'
    const sps = txtFile.split(',')
    if (sps.length > 1) {
        const oldContent = base64UrlDecode(sps[1])
        const base64Regex = /\[data:image\/[a-zA-Z]+;base64,[^)]+\)/g
        // 替换所有 Base64 编码的图片为 ![]()
        const newContent = oldContent.replaceAll(base64Regex, '').replaceAll(oldUrlPrefix, newUrlPrefix)
        return sps[0] + ',' + base64UrlEncode(newContent) + ',' + sps[2]
    } else {
        const oldContent = base64UrlDecode(sps[0])
        const base64Regex = /\[data:image\/[a-zA-Z]+;base64,[^)]+\)/g
        // 替换所有 Base64 编码的图片为 ![]()
        const newContent = oldContent.replaceAll(base64Regex, '').replaceAll(oldUrlPrefix, newUrlPrefix)
        return base64UrlEncode(newContent)
    }
}

//处理mkd文件,去掉image base64 内容，替换 oss url 为 s3 url
export default {
    modify
}
