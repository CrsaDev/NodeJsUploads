const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const app = express()

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
    }
  });

let usersOnline = 0;
let usersSearching = []

io.on('connection',(socket)=> {
    console.log('Client connected - ' + socket.id)
    socket.emit('idSent',{id:socket.id})
    usersOnline++;
    io.emit('users-refresh',usersOnline)

    socket.emit('testClient','Prova')
    socket.on('testEvent',(data) => {
        console.log(data)
    })

    socket.on('user-searching',(data) => {
        console.log(data.id + 'is looking for someone')
        usersSearching.push(data.id)

        if(usersSearching.length >= 2) {
            const usr1 = usersSearching.shift()
            const usr2 = usersSearching.shift()
            console.log(usersSearching)
            io.to(usr2).emit('connection-created',{id:usr1})
            io.to(usr1).emit('connection-created',{id:usr2})

            console.log("Pairing users")
        }
    })

    socket.on('user-msg',(data) => {
        io.to(data.receiver).emit('msg',data)
    })

    socket.on('user-disconnect',(data) => {
        console.log(data.sender + 'is disconnecting from ' + data.receiver)
        io.to(data.paired).emit('user-dc',{user:socket.id})
    }) 
    

    socket.on('disconnect',() => {
        usersOnline--;
        if(usersSearching.includes(socket.id)){
            usersSearching.splice(usersSearching.indexOf(socket), 1);     
            console.log(usersSearching);
            console.log(socket.id + " - Removed from the searching list")
        }
        console.log('client disconnected')
        io.emit('user-dc',{user:socket.id})
        io.emit('users-refresh',usersOnline)
    })
})



/*

Formato risposta json:
{
    succes: ok/ko,
    status: failed/empty/full,
    data:"Internal error"/data
}

Meccanismo backend:
Sistema di associazione utenti
Utente 1: Inizia a cercare
Utente 2: Cerca
Utente 3: Cerca

Utente 1 e 2 associati
Utente 3: continua a cercare


/ --- Eventi da gestire --- /
1. Connessione utenti (Gestione utenti online)
2. Inizio ricerca ( Utente --> ricerca e mette il suo status in ricerca, comunica a tutti gli utenti che lui sta cercando )
3. Associazione ( Utente viene associato con altro utente che sta cercando )
4. Messaggistica utenti ( 
    1. Utente invia messaggio
    2. Server riceve e manda altro utente
    3. Altro utente riceve messaggio
 )


*/


server.listen(3000, () => {
    console.log('Server started on 3000')
})