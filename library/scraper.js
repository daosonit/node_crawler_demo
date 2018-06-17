const req = require('cheerio-req')
const typpy = require('typpy')
const iterateObj = require('iterate-object')
const Err = require('err')
const objDef = require('obj-def')
const emptyObj = require('is-empty-obj')
const assured = require('assured')
const cheerio = require('cheerio')

function scrapeIt (url, opts, cb) {
  cb = assured(cb)
  req(url, (err, $, res, body) => {
    if (err) return cb(err)

    try {
      let scrapedData = scrapeIt.scrapeHTML($, opts)
      cb(null, {data: scrapedData, $, response: res, body})
    } catch (err) {
      cb(err);
    }
  })
  return cb._
}

scrapeIt.scrapeHTML = ($, opts) => {

  if (typeof $ === 'string') $ = cheerio.load($)

  let normalizeOpt = value => {
    if (typpy(value, String)) value = {selector: value}

    objDef(value, 'data', {})
    objDef(value, 'how', 'text', true)

    if (value.attr) value.how = $elm => $elm.attr(value.attr)

    objDef(value, 'trimValue', true)
    objDef(value, 'closest', '')
    return value
  }

  let handleDataObj = (data, $context) => {
    let pageData = {}

    iterateObj(data, (cOpt, optName) => {
      cOpt = normalizeOpt(cOpt)
      cOpt.name = optName

      let $cContext = ($context === $) ? undefined : $context

      if (!$cContext && !cOpt.selector && !cOpt.listItem) {
        throw new Err('There is no element selected for the \'<option.name>\' field. Please provide a selector, list item or use nested object structure.', {
          option: cOpt,
          code: 'NO_ELEMENT_SELECTED'
        })
      }

      let $elm = (cOpt.selector) ? $(cOpt.selector, $cContext) : $cContext

      if (cOpt.listItem) {
        let docs = pageData[cOpt.name] = []
        let $items = $(cOpt.listItem, $cContext)
        let isEmpty = emptyObj(cOpt.data)

        if (isEmpty) cOpt.data.___raw = {}

        for (let i = 0; i < $items.length; ++i) {
          let cDoc = handleDataObj(cOpt.data, $items.eq(i))
          docs.push(cDoc.___raw || cDoc)
        }

      } else {

        if (typpy(cOpt.eq, Number)) $elm = $elm.eq(cOpt.eq)

        if (typpy(cOpt.texteq, Number)) {
          let children = $elm.contents()
          let textCounter = 0
          let found = false

          for (let i = 0, child; (child = children[i]); i++) {
            if (child.type === 'text') {
              if (textCounter === cOpt.texteq) {
                $elm = child
                found = true
                break;
              }
              textCounter++
            }
          }

          if (!found) $elm = cheerio.load('')

          cOpt.how = elm => elm.data;
        }

        if (cOpt.closest) $elm = $elm.closest(cOpt.closest)

        if (!emptyObj(cOpt.data)) {
          pageData[cOpt.name] = handleDataObj(cOpt.data, $elm)
          return pageData
        }

        let value = typpy(cOpt.how, Function) ? cOpt.how($elm) : $elm[cOpt.how]()
        value = (value === undefined) ? '' : value

        if (cOpt.trimValue && typpy(value, String)) value = value.trim()
        if (cOpt.convert) value = cOpt.convert(value, $elm)

        pageData[cOpt.name] = value
      }
    })
    return pageData
  }

  return handleDataObj(opts)
}

module.exports = scrapeIt
