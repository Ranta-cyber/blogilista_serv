const listHelper = require('../utils/list_helper')


const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Blogi2',
    author: 'Rebeca',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 4,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('total likes', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe()
    
  })
})

describe('favorite likes', () => {
  test.only('favorite likes', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)

    var indexOf = listWithOneBlog.findIndex(i => i.likes === result)

    console.log('author:', listWithOneBlog[indexOf].author)
    console.log('title:', listWithOneBlog[indexOf].title)
    console.log('likes:', listWithOneBlog[indexOf].likes)

    expect(result).toBe(5)
    
  })

})