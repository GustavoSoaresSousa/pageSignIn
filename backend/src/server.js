const app = require('./index');
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> {
    console.log('Connected to database.')
    app.emit('Pronto');
  })
  .catch(e => console.log(e))

const port = 3001;

app.on('Pronto', () => {
  app.listen(port, () => {
    console.log(`rodando server em http://localhost:${port}`)
  });
});

