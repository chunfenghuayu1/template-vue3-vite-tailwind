import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint' //导入包eslint
import { resolve } from 'path'
// 安装element plus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 修改title 可进行html的压缩
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, __dirname)
    // console.log(env)
    return {
        root: './',
        base: './',
        publicDir: 'public',
        plugins: [
            vue(),
            // 增加下面的配置项,这样在运行时就能检查eslint规范
            eslintPlugin({
                include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
            }),
            // 组件库按需引入，无需额外配置
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                resolvers: [ElementPlusResolver()]
            }),
            // 修改title
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        title: env.VITE_APP_TITLE
                    }
                }
            })
        ],
        css: {
            // 如果提供了该内联配置，Vite 将不会搜索其他 PostCSS 配置源。
            postcss: './postcss.config.cjs'
        },
        // 解决路径问题
        resolve: {
            alias: {
                '@': resolve(__dirname, './src')
            }
        },
        // 配置代理
        server: {
            host: '127.0.0.1',
            port: 3000,
            open: env.VITE_MODE_NAME === 'development',
            proxy: () => {
                if (env.VITE_MODE === 'development') {
                    return {
                        '/dev-api': {
                            target: '',
                            changeOrigin: true,
                            rewrite: { '^/dev-api': '' }
                        }
                    }
                }
            }
        }
    }
})
