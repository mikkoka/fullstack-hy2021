import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {

  const blog = {
    user: '5a43e6b6c37f3d065eaaa581',
    likes: 1,
    author: 'Joel Spolsky',
    title: 'The Joel Test: 12 Steps to Better Code',
    url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
  }



  test('By default, title and author are shown', () => {

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'Joel Spolsky'
    )
    expect(component.container).toHaveTextContent(
      'The Joel Test: 12 Steps to Better Code'
    )

    expect(component.container).not.toHaveTextContent(
      'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
    )
    expect(component.container).not.toHaveTextContent(
      'likes'
    )
  })
  test('By default, url and likes not shown', () => {

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).not.toHaveTextContent(
      'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
    )
    expect(component.container).not.toHaveTextContent(
      'likes'
    )
  })
  test('After pressing view -button, url and likes are shown', () => {

    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
    )
    expect(component.container).toHaveTextContent(
      'likes'
    )
  })

  test('Likes -button presses correctly registered', () => {

    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} likeHandler={mockHandler} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likesButton = component.container.querySelector('.likeButton')
    fireEvent.click(likesButton)
    fireEvent.click(likesButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})



