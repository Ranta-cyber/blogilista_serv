const dummy = (blogs) => {
  return 1
}

const totalLikes = array => {
  const reducer = (sum, array) => {
    return sum + array.likes
  }
  return array.length === 0
    ? 0 
    : array.reduce(reducer,0) // total likes
}

const favoriteBlog = array => {
  const reducer = (maksim, array) => {
    return Math.max(maksim, array.likes)
  }
  return array.length === 0
    ? 0 
    : array.reduce(reducer,0) // eniten likes
}
 

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}