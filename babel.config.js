// exportando as configs do babel
module.exports = {
    presets: [
        '@babel/preset-env', // compila o código de acordo em que "infra" onde está rodando - ex: browsers, server com node
        ['@babel/preset-react', { // obj de config para o compilador
            runtime: "automatic" // config para não precisar importar o react em arquivo que usa html em js, pois até o react 17 precisava
        }]
    ]
}