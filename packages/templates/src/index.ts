import type {CleverFormDefinition} from '@cleverforge/sanity-clever-forms-core'

export const contactFormTemplate: CleverFormDefinition = {
  title: 'Contact form',
  status: 'draft',
  pages: [{
    title: 'Contact us',
    fields: [
      {key: 'name', label: 'Name', type: 'text', required: true},
      {key: 'email', label: 'Email', type: 'email', required: true},
      {key: 'phone', label: 'Phone', type: 'phone'},
      {key: 'message', label: 'Message', type: 'textarea', required: true}
    ]
  }],
  settings: {
    submitLabel: 'Send',
    successMessage: 'Thank you. Your message was received.',
    storeSubmissions: true
  }
}

export const eventRegistrationTemplate: CleverFormDefinition = {
  title: 'Event registration',
  status: 'draft',
  pages: [{
    title: 'Registration',
    fields: [
      {key: 'name', label: 'Name', type: 'text', required: true},
      {key: 'email', label: 'Email', type: 'email', required: true},
      {key: 'guests', label: 'Number of guests', type: 'number', required: true, validation: {min: 1}}
    ]
  }],
  settings: {
    submitLabel: 'Register',
    successMessage: 'Your registration was received.',
    storeSubmissions: true
  }
}

export const jobApplicationTemplate: CleverFormDefinition = {
  title: 'Job application',
  status: 'draft',
  pages: [
    {
      title: 'Applicant',
      fields: [
        {key: 'firstName', label: 'First name', type: 'text', required: true},
        {key: 'lastName', label: 'Last name', type: 'text', required: true},
        {key: 'email', label: 'Email', type: 'email', required: true},
        {key: 'phone', label: 'Phone', type: 'phone', required: true}
      ]
    },
    {
      title: 'Application',
      fields: [
        {key: 'position', label: 'Position', type: 'text', required: true},
        {key: 'experience', label: 'Relevant experience', type: 'textarea', required: true}
      ]
    }
  ],
  settings: {
    submitLabel: 'Submit application',
    successMessage: 'Your application was received.',
    storeSubmissions: true
  }
}

export const cleverFormsTemplates = {
  contact: contactFormTemplate,
  eventRegistration: eventRegistrationTemplate,
  jobApplication: jobApplicationTemplate
}
