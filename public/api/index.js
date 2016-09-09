// index.js
import superagent from 'superagent'

export const fetchBooks = () =>
  new Promise((fulfill, reject) => {
    superagent.get('/api/books')
      .send()
      .end(function (err, response) {
        if (err) { reject(err) }
        fulfill(response)
      })
  })

export const uploadBook = (file) =>
  new Promise((resolve, reject) => {
    superagent.post('/api/books/')
      .attach('file', file)
      .send()
      .end(function (err, response) {
        if (err) { reject(err) }
        resolve(response)
      })
  })

export const getBookInfo = (bookName) =>
  new Promise((fulfill, reject) => {
    superagent.get('/api/books/info')
      .query({ bookName })
      .end(function (err, response) {
        console.log('YAY');
        if (err) { reject(err) }
        fulfill(response)
      })
  })

// export const getBookInfo = (bookName) =>

