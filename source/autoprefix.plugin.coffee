# Export Plugin
module.exports = (BasePlugin) ->
	# Define Plugin
	class AutoprefixPlugin extends BasePlugin
		# Plugin name
		name: 'autoprefix'

		# Render some content
		render: (opts) ->
			# Prepare
			{inExtension,outExtension,content,file} = opts

			# Check extensions
			if inExtension in ['autoprefix'] and outExtension in ['css',null]
				try
					opts.content = require('autoprefixer').process(content).css
				catch err
					return err

			# Done
			return

		# Render some content
		renderDocument: (opts) ->
			# Prepare
			{content,file} = opts

			# Check extensions
			if file.get('autoprefix')
				try
					opts.content = require('autoprefixer').process(content).css
				catch err
					return err

			# Done
			return