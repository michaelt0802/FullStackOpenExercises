const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

const listWithOneBlog = [testHelper.initialBlogs[0]]

const blogs = testHelper.initialBlogs

test('dummy returns one', () => {
  const emptyBlogs = []

  const result = listHelper.dummy(emptyBlogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    expect(listHelper.totalLikes(blogs)).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(7)
  })

  test('of many blogs', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('blog with most likes', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('most blogs', () => {
  test('author with the most blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  test('author with most likes', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})
