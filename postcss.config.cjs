module.exports = {
    // 对于通过css文件引入的样式，需要进行兼容性补全
    plugins: [require('tailwindcss'), require('autoprefixer')]
}
