// index.js
import axios from 'axios'
import superagent from 'superagent'

export const fetchBooks = () => axios.get('/api/books')
export const uploadBook = (file) =>
  new Promise((resolve, reject) => {
    superagent.post('/api/books/')
    .attach('file', file)
    .send()
    .end(function (err, response) {
      if (err) { resolve(err) }
      resolve(response)
    })
  })



