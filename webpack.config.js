const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

const isDevelopment = process.env.NODE_ENV !== "production"

module.exports = {
    mode: isDevelopment ? "development" : "production", // ou "production", tipo debug e release
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    // entrypoint da aplicação ( o arquivo que contém o "main", Fernanda! )
    entry: path.resolve(__dirname, "src", "index.js"), // essa abordagem abstrai o SO que está rodando a aplicação para não conflitar com os padõres / ou \\, por exemplo
    output: { // arquivo de saída do webpack
        path: path.resolve(__dirname, "dist"), 
        filename: "bundle.js",
    },
    resolve: { // quais extensões de arquivos da minha aplicação o webpack deve saber ler
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"), // contentBase recebe o path de onde está o html estático da aplicação
        hot: true
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html") // template é o arquivo responsável pelo html da página da nossa aplicação
        })
    ].filter(Boolean), // hack para filtrar tudo o que for false ( já que isDevelopment pode ser false ) e não quebrar a compilação
    module: { // resolve como os arquivos da aplicação devem ser tratados baseados nos seus tipos 
        rules: [ // regras definidas, onde cada objeto é o tratamento de um tipo de arquivo
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/, //cada biblioteca se preocupa em ela mesma gerar o arquivo que o browser entederá dela, então quando importo o arquivo do node_modules, ele jã é compilado para o browser entendê-lo, mas não quero isso, quero que a lib webpack faça isso na minha aplicação através do babel(loader); por isso excluo a node_modules
                //use: "babel-loader" // é a integração entre o babel e o webpack: o webpack receberá os files jsx, no caso, e chamará o babel para convertê-lo para o browser
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            isDevelopment && require.resolve("react-refresh/babel")
                        ].filter(Boolean)
                    }
                },
            },
            {
                test: /\.(scss)$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
}