// index.js
import superagent from 'superagent'

const genericEnd = (fulfill, reject) => (err, response) => {
  if (err) { reject(err) }
  fulfill(response);
}

export const fetchBooks = () =>
  new Promise((fulfill, reject) => {
    superagent.get('/api/books')
      .send()
      .end(genericEnd(fulfill, reject))
  })

export const uploadBook = (file) =>
  new Promise((fulfill, reject) => {
    superagent.post('/api/books/')
      .attach('file', file)
      .send()
      .end(genericEnd(fulfill, reject))
  })

export const getBookInfo = (bookName) =>
  new Promise((fulfill, reject) => {
    superagent.get('/api/books/info')
      .query({ bookName })
      .end(genericEnd(fulfill, reject))
  })

export const getNameSuggestion = ({ bookName, blockId, speechPreSnippetIdSelected }) =>
  new Promise((fulfill, reject) => {
    superagent.get('/api/books/suggestion')
      .query({ bookName, blockId, speechPreSnippetIdSelected })
      .end(genericEnd(fulfill, reject))
  })


// export const getBookInfo = (bookName) =>

