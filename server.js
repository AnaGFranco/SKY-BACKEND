const app = require("./src/app")

app.set('port', (process.env.PORT || 5000));

//Para evitar erro no Heroku $PORT 
app.get('/', function(request, response) {
    var result = 'App está rodando'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App está rodando, server está escutando a porta ', app.get('port'));
});