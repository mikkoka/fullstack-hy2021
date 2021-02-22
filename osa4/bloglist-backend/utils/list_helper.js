var _ = require('lodash')

const dummy = (blogs) => {  
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((tot, b) => {
    tot += b.likes
    return tot  
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, curr) => {
      if (curr.likes > fav.likes) return curr
    return fav
  }, blogs[0])
}

const groupBlogsByAuthor = 
  blogs => _.groupBy(blogs, b => b.author)
  

const mostBlogs = (blogs) => {

  const blogsByAuthor = groupBlogsByAuthor(blogs)
  const authors = _.keys(blogsByAuthor)
    
  return authors.reduce((fav, a) => {

    const curr = {
      author: a, 
      blogs: blogsByAuthor[a].length
    }

    return fav 
      ? (fav.blogs > curr.blogs
        ? fav
        : curr)
      : curr // haha
 
  }, undefined)

 }

const mostLikes = (blogs) => {
  
  const blogsByAuthor = groupBlogsByAuthor(blogs)
  const authors = _.keys(blogsByAuthor)

      
  return authors.reduce((fav, a) => {
    const curr = {
      author: a, 
      likes: blogsByAuthor[a].reduce((sum, b) => sum+=b.likes, 0)
    };

    return fav 
      ? (fav.likes > curr.likes
        ? fav
        : curr)
      : curr // haha

  }, undefined)
  
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}