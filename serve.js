const app = require('./src/config/express-custom/customExpress')
const PORT = process.env.PORT || 3000;


app.listen(PORT, (res, resp) =>{
    console.log(`Servidor Rodando na porta ${PORT}`);
});