// Page modules
var FastClick = require('fastclick')
var nav = require('./nav.js') // eslint-disable-line
var sortBy = require('lodash/collection/sortBy')

// FastClick
FastClick.attach(document.body)

require.ensure(['./api', './get-api-data', 'hogan.js'], function (require) {
  var apiRoutes = require('./api')
  var getApiData = require('./get-api-data')
  var Hogan = require('hogan.js')

  // Get API data using promise
  getApiData.data(apiRoutes.serviceProviders).then(function (result) {
    var sorted = sortBy.sortBy(result, function (provider) {
      return provider.name
    })

    // Append object name for Hogan
    var theData = { organisations: sorted }

    // Compile and render category template
    var theTemplate = document.getElementById('js-category-result-tpl').innerHTML
    var compileTemplate = Hogan.compile(theTemplate)
    var theOutput = compileTemplate.render(theData)

    document.getElementById('js-category-result-output').innerHTML = theOutput
  })
})