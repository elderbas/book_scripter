// index.js
import superagent from 'superagent'

const genericEnd = (fulfill, reject) => (err, response) => {
  if (err) {
    console.log(err);
    reject(err)
  }
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

export const confirmNameOnPreSnippet = ({bookName, blockId, preSnippetId, displayName, snippetType}) =>
  new Promise((fulfill, reject) => {
    superagent.post('/api/books/multi/nameConfirmedOnPreSnippet')
      .send({bookName, blockId, preSnippetId, displayName, snippetType})
      .end(genericEnd(fulfill, reject))
  })


export const addCharacterProfile = (displayName, aliases, bookName) =>
  new Promise((fulfill, reject) => {
    superagent.post('/api/books/characters')
      .send({ bookName, characterProfileToAdd: {displayName, aliases} })
      .end(genericEnd(fulfill, reject))
  })

export const markCurrentBlockCompletedAndGetNext = (blockId, bookName) => {
  return new Promise((fulfill, reject) => {
    superagent.post('/api/books/block/next')
    .send({ bookName, blockId})
    .end(genericEnd(fulfill, reject))
  })
}

export const modifyCharacterProfileAliases = (bookName, newCharacterProfile) => {
  return new Promise((fulfill, reject) => {
    superagent.post('/api/books/characters/edit')
    .send({ bookName, newCharacterProfile})
    .end(genericEnd(fulfill, reject))
  })
}



// export const getBookInfo = (bookName) =>

