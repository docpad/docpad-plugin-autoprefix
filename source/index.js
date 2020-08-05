'use strict'

// Import
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')

// Export Plugin
module.exports = function (BasePlugin) {
	// Define Plugin
	return class AutoprefixPlugin extends BasePlugin {
		// Plugin name
		get name() {
			return 'autoprefix'
		}

		// Render
		autoprefix(docpad, content, next) {
			postcss([autoprefixer])
				.process(content)
				.then(function (result) {
					result.warnings().forEach(function (warn) {
						docpad.log('warn', warn.toString())
					})
					next(null, result.css)
				})
				.catch(next)
		}

		// Render .autoprefix extension
		render(opts, next) {
			// Prepare
			const { inExtension, outExtension } = opts

			// Check extensions
			if (
				inExtension === 'autoprefix' &&
				['css', null].indexOf(outExtension) !== -1
			) {
				this.autoprefix(this.docpad, opts.content, function (err, result) {
					if (err) return next(err)
					opts.content = result
					next()
				})
			} else {
				next()
			}
		}

		// Render `autoprefix: true` header
		renderDocument(opts, next) {
			// Prepare
			const { file } = opts

			// Check extensions
			if (file.get('autoprefix')) {
				this.autoprefix(this.docpad, opts.content, function (err, result) {
					if (err) return next(err)
					opts.content = result
					next()
				})
			} else {
				next()
			}
		}
	}
}
