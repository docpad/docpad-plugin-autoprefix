// Test our plugin using DocPad's Testers
'use strict'

require('docpad').require('testers').test({
	pluginPath: require('path').join(__dirname, '..'),
	testerClass: 'RendererTester'
})
