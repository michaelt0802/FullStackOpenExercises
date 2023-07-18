var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accum, item) => {
    return accum + item.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (mostLikes, item) => {
      return mostLikes.likes < item.likes
        ? {
            title: item.title,
            author: item.author,
            likes: item.likes,
          }
        : mostLikes
    },
    {
      likes: -1,
    }
  )
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author')
  const max = _.maxBy(_.keys(authors), (x) => authors[x])

  return {
    author: max,
    blogs: authors[max],
  }
}

const mostLikes = (blogs) => {
  const likes = _.groupBy(blogs, 'author')

  const authorWithMostLikes = _.maxBy(_.keys(likes), (author) =>
    _.sumBy(likes[author], 'likes')
  )

  return {
    author: authorWithMostLikes,
    likes: _.sumBy(likes[authorWithMostLikes], 'likes'),
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
