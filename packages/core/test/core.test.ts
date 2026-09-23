import {describe, expect, it} from 'vitest'
import {evaluateConditionalRule, validateField} from '../src/index.js'

describe('CleverForms Core', () => {
  it('validates required fields', () => {
    expect(validateField({key:'email',label:'Email',type:'email',required:true}, '')).toBe('Email is required.')
  })

  it('validates email fields', () => {
    expect(validateField({key:'email',label:'Email',type:'email'}, 'not-an-email')).toBe('Enter a valid email address.')
  })

  it('evaluates show conditions', () => {
    expect(evaluateConditionalRule({
      enabled:true,
      action:'show',
      match:'all',
      conditions:[{fieldKey:'age',operator:'greaterThan',value:17}]
    }, {age:21})).toBe(true)
  })

  it('evaluates hidden conditions', () => {
    expect(evaluateConditionalRule({
      enabled:true,
      action:'hide',
      match:'all',
      conditions:[{fieldKey:'status',operator:'equals',value:'closed'}]
    }, {status:'closed'})).toBe(false)
  })
})
