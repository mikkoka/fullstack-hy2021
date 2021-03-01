import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateForm from './CreateForm'


describe('<CreateForm />', () => {

  test('<CreateForm /> generates appropriate object', () => {
    const handleNewBlog = jest.fn()

    const component = render(
      <CreateForm handleNewBlog={handleNewBlog} />
    )

    // const button = component.getByText('new blog')
    // fireEvent.click(button)

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')



    fireEvent.change(title, {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.change(author, {
      target: { value: 'Me' }
    })
    fireEvent.change(url, {
      target: { value: 'google.com' }
    })
    fireEvent.submit(form)

    expect(handleNewBlog.mock.calls).toHaveLength(1)
    console.log(handleNewBlog.mock.calls.content) //toHaveTextContent('testing of forms could be easier' )
  })



})