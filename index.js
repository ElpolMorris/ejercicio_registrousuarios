// const { default: Axios } = require("axios");

const axios = require("axios");
const chalk = require('chalk')
const http = require('http')
const url = require('url')
const fs = require('fs');
const {v4:uuidv4} = require('uuid')
const _ = require('lodash')
const moment = require('moment')

const conexion = async ()=>{
    try {        
        const res = await axios.get("https://randomuser.me/api/ ")
        let usuarios = res.data.results
        return usuarios
    } catch (error) {
        console.log(error)
    }
}
//conexion()

const conexionUsuario = []
http.createServer(async(req,res)=>{
    const params = url.parse(req.url, true).query
    const usuario =await conexion()
    const nombre = usuario[0].name.first
    const apellido = usuario[0].name.last
    const fecha = moment()
    const id = uuidv4()
    let registro = `<li>Nombre:${nombre}-Apellido:${apellido}-ID:${id}-Fecha:${fecha}</li>`
    let template = ''
    if(req.url.includes('/consultar')){
        conexionUsuario.push(registro)
        console.log(chalk.blueBright.bgWhite(conexionUsuario))
        res.write(`<body><ol>${_.join(conexionUsuario, [separator=' '])}<ol></body>`)
        res.end()
    }

})
.listen(8080,()=>console.log(chalk.magenta("Está el servidor levantado sobre el puerto 8080")))

