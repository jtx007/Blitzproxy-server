// Single Entry
module.exports = {
    output: { 
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader'}
        ] 
    }


}

// Multiple Entry points for Multiple Dependency Graphs
