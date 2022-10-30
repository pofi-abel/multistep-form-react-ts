import { useMulitiStepform } from './useMultiStepForm'
import { AccountForm } from './AccountForm'
import { AddressForm } from './AddressForm'
import { UserForm } from './UserForm'
import { FormEvent, useState } from 'react'

function App() {
  type FormData = {
    firstName: string
    lastName: string
    age: string
    street: string
    city: string
    state: string
    zip: string
    email: string
    password: string
  }

  const INITIAL_DATA: FormData = {
    firstName: '',
    lastName: '',
    age: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    password: '',
  }

  const [data, setDate] = useState(INITIAL_DATA)

  function updateFields(fields: Partial<FormData>) {
    setDate((prev) => ({
      ...prev,
      ...fields,
    }))
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMulitiStepform([
    <UserForm {...data} updateFields={updateFields} />,
    <AddressForm {...data} updateFields={updateFields} />,
    <AccountForm {...data} updateFields={updateFields} />,
  ])

  function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (!isLastStep) return next()
    alert("Successful Account Creation!")
  }

  return (
    <div
      style={{
        position: 'relative',
        background: 'white',
        border: '1px solid black',
        padding: '2rem',
        margin: '1rem',
        borderRadius: '.5rem',
        fontFamily: 'Arial',
        maxWidth: 'max-content'
      }}
    >
      <form onSubmit={onSubmit}>
        <div style={{ position: 'absolute', top: '.5rem', right: '.5rem' }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{ marginTop: '1rem', display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}
        >
          {!isFirstStep && (
            <button type='button' onClick={back}>
              Back
            </button>
          )}
          <button type='submit'>{isLastStep ? 'Finish' : 'Next'}</button>
        </div>
      </form>
    </div>
  )
}

export default App
