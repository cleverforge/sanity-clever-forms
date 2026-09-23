import {describe, expect, it} from 'vitest'
import {createSubmissionService} from '../src/index.js'

const form = {
  _id:'form-1',
  title:'Test',
  status:'active' as const,
  pages:[{
    fields:[
      {key:'email',label:'Email',type:'email',required:true},
      {key:'name',label:'Name',type:'text'}
    ]
  }],
  settings:{storeSubmissions:true,successMessage:'Received'}
}

describe('submission service', () => {
  it('drops undeclared values and stores declared fields', async () => {
    let stored:any
    const service=createSubmissionService({
      repository:{
        async getForm(){return form},
        async saveSubmission(value){stored=value; return {id:'sub-1'}}
      }
    })
    const result=await service.submit({
      formId:'form-1',
      values:{email:'person@example.com',name:'Person',admin:true}
    })
    expect(result.ok).toBe(true)
    expect(result.submissionId).toBe('sub-1')
    expect(stored.values).toEqual({email:'person@example.com',name:'Person'})
  })

  it('rejects invalid values', async () => {
    const service=createSubmissionService({
      repository:{
        async getForm(){return form},
        async saveSubmission(){throw new Error('should not save')}
      }
    })
    const result=await service.submit({formId:'form-1',values:{email:'bad'}})
    expect(result.ok).toBe(false)
    expect(result.fieldErrors?.email).toBeDefined()
  })
})
