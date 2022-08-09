/** @type {import('tailwindcss').Config} */
module.exports = {
    // 控制css文件优化摇树
    purge: {
        // 是否开启摇树优化
        enabled: false,
        content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx']
    },
    theme: {
        extend: {}
    },
    plugins: []
}
