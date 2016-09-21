*All run from root directory of proj each having their own terminal instance*
I'm sure this can be improved somehow

Backend unit tests
npm run back-test

api tests
npm run back-api-test

changes to frontend code will update automatically with React Hot Reloader,
but changes to backend need to have 'npm run start' re done
dev server
npm run start
go to http://localhost:3000

if you notice the app feels slow when assigning snippets of text, it's because extensive syncronous  logging is enabled.
Just set these to false at server/appWithTests
```javascript
global.log = {
  preSnippetClassify: true, // will notice a difference
  getNameSuggestion: true, // reasonably quick
  // classifyPreSnippetArrangement: true
}
```

Goals of this project
- A tool to assist in character scripting an ebook into a consumable format for data analysis
- Use the data sets generated along with each datum's label, to build algorithms can predict
who will say what so no more manual work is needed for similarly formatted books

Necessary tools
MongoDB installed
npm install -g gulp-cli



