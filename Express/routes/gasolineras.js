const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const moment = require("moment");
const db = require('tnc_mysql_connector');
const axios = require("axios");

const API_KEY = "AIzaSyAK9Ga71Aoeb9-RbP5X0fwfqyDkhhthVwk";

router.get('/:cmdID/:VIN', async(req, res, next) => {
    try {        
        const { cmdID, VIN } = req.params;
        let { limit, offset, numero } = req.query;
        if(!limit) limit = 10000;
        if(!offset) offset = 0;
        if(!numero) numero = 5;
        const recorridos = (await db.procedures.getDatosVehiculo(cmdID, VIN, limit, offset));
        const { penmax, fechasmax } = getMejoresRecorridos(recorridos, numero);  
        const gasolineras = await getGasolineras(fechasmax);        
        res.status(200).send(gasolineras);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send(error);
        next(error);
    }
});

async function getGasolineras(recorridos) {
    let gasolineras = new Array(recorridos.length).fill(1);
    const promises = [];
    recorridos.forEach((fecha_hora, index) => {
        const promise = new Promise((resolve, reject) => {
            db.procedures.getCargaCercana(fecha_hora).then(async response => {
                const carga = response[0];
                const { latitud, longitud } = carga;
                getGasolineraCercana(latitud, longitud, 50).then(gasolinera => {                    
                    gasolineras[index] = gasolinera;
                    resolve();
                });
            }).catch(error => {
                reject(error);
            })
        });        
        promises.push(promise);
    });
    await Promise.all(promises);
    return gasolineras;        
}

function getGasolineraCercana(latitud, longitud, range) {
    if(!range) range = 100;
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=gasolinera&inputtype=textquery&fields=name,formatted_address&locationbias=circle:${range}@${latitud},${longitud}&key=${API_KEY}`;
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            const { candidates } = res.data;
            const gasolinera = candidates[0];
            resolve(gasolinera);
        }).catch(error => {
            throw error;
        });
    });    
}

function getMejoresRecorridos(recorridos, numero) {
    let x = recorridos.map((recorrido, index) => index+1);
    let y = recorridos.map(recorrido => recorrido.cmdResult);
    let puntoStart=0;
    let puntoEnd=0;
    let contador=0;
    let ver=true;
    let fechasmax= new Array(numero).fill("");
    let penmax = new Array(numero).fill(-9999);
    let contr=0;
    while(contador < recorridos.length-1){
        while(ver){//este es un recorrido
            if(contador+1 < recorridos.length){
                let date1 = recorridos[contador].fecha_hora;
                let date2 = recorridos[contador+1].fecha_hora;
                let diff = diferenciaMinutos(date1,date2);
                if(diff > 2){
                    puntoEnd=contador++;
                    ver=false;
                } else contador++;
            } else{
                puntoEnd=contador;
                ver=false;
            }
        }//fin recorrido
        if(puntoEnd-puntoStart!=0){
            contr++;
            let params = calcularParametros(x, y,puntoStart,puntoEnd);
            let pendiente = params[0];
            if(pendiente<0 && pendiente>penmax[0]){
                penmax[0]=pendiente;
                penmax.sort((a,b) => a > b ? 1 : -1);
                for(let i=0; i<5; i++){
                if(penmax[i] === pendiente){                    
                    let k=1;
                    for(let j=0;j<i;j++)
                        fechasmax[j]=fechasmax[k++];              
                        fechasmax[i]=recorridos[puntoStart].fecha_hora; 
                    }
                }
            }               
            /*
            let desfase = params[1];               
            let r = calcularCorrelacion(x, y,puntoStart,puntoEnd);
            let r2 = Math.pow(r,2);            
            console.log("\nFecha de inicio de recorrido: "+recorridos[puntoStart].fecha_hora);
            console.log("B0 = "+desfase);
            console.log("B1 = "+pendiente);        
            console.log("r_x_y = "+r);
            console.log("r^2 = "+r2);            
            */
        }
        ver=true;
        puntoStart=puntoEnd+1;   
    }
    /*
    for(let i=0; i<5; i++){
        console.log("\nMayor pendiente negativa: "+penmax[i]);
        console.log("Fecha de mayor pendiente: "+fechasmax[i]);
    }    
    console.log("\nRecorridos: "+contr);
    */
    return { penmax, fechasmax };
}

function calcularParametros(x, y, inicio, fin) {   
    let sumatoria_num = calcularSuma(multiplicarArreglos(x, y,inicio,fin),inicio,fin);   
    let x_avg = calcularPromedio(x,inicio,fin);    
    let y_avg = calcularPromedio(y,inicio,fin);
    let resta_num = (fin-inicio+1) * x_avg * y_avg;    
    let numerador = sumatoria_num - resta_num;    
    let sumatoria_den = calcularSuma(calcularCuadrados(x,inicio,fin),inicio,fin);
    let resta_den = (fin-inicio+1) * Math.pow(calcularPromedio(x,inicio,fin), 2);
    let denominador = sumatoria_den - resta_den;
    let pendiente = numerador / denominador;
    let desfase = y_avg - pendiente * x_avg;
    return [pendiente, desfase];
}

function calcularSuma(arreglo, inicio, fin) {    
    let suma = 0.0;    
    for(let i = inicio; i < fin+1; i++) {        
        suma += arreglo[i];
    }    
    return suma;
}

function calcularPromedio(arreglo, inicio, fin) {    
    let suma = calcularSuma(arreglo,inicio,fin);    
    return suma / (fin-inicio+1);
}

function multiplicarArreglos(primero, segundo, inicio, fin) {
    if(primero.length != segundo.length) return [];
    let multiplicado = new Array(primero.length).fill(1);
    for(let i = inicio; i < fin+1; i++) {        
        multiplicado[i] = primero[i] * segundo[i];
    }
    return multiplicado;
}

function calcularCuadrados(arreglo, inicio, fin) {        
    return multiplicarArreglos(arreglo, arreglo,inicio,fin);
}

function calcularCorrelacion(x, y, inicio, fin) {    
    let numerador_uno = (fin-inicio+1) * calcularSuma(multiplicarArreglos(x, y,inicio,fin),inicio,fin);
    let numerador_dos = calcularSuma(x,inicio,fin) * calcularSuma(y,inicio,fin);
    let numerador = numerador_uno - numerador_dos;
    let den_uno = (fin-inicio+1) * calcularSuma(calcularCuadrados(x,inicio,fin),inicio,fin) - Math.pow(calcularSuma(x,inicio,fin),2);
    let den_dos = (fin-inicio+1) * calcularSuma(calcularCuadrados(y,inicio,fin),inicio,fin) - Math.pow(calcularSuma(y,inicio,fin), 2);
    let denominador = Math.sqrt(den_uno * den_dos);
    return numerador / denominador;
}

function diferenciaMinutos(fecha1, fecha2) {
    return moment(fecha2).diff(fecha1, "minutes");
}


module.exports = router