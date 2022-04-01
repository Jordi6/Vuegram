

// workaround for local host not working on port 8080.

module.exports = {
    devServer: {
        // other config
        port: 8081 // or any other port you wish to use other than 8080
    },

    pluginOptions: {
      vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
    }
}

