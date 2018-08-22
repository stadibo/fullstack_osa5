let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "Blogs are great",
    author: "Blogger 1",
    url: "https://blogspot.com/1",
    likes: 10,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "stadibo",
      name: "Jesper Pettersson"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    title: "Blogs are hmm",
    author: "Blogger 2",
    url: "https://blogspot.com/2",
    likes: 4,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "stadibo",
      name: "Jesper Pettersson"
    }
  },
  {
    id: "5a451e30b5ffd44a58fa79ab",
    title: "Blogs are yaas",
    author: "Blogger 2",
    url: "https://blogspot.com/3",
    likes: 11,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "stadibo",
      name: "Jesper Pettersson"
    }
  }
]

const setToken = (t) => {
  token = t
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs, setToken }