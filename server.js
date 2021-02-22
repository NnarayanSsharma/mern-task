const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const config = require("config")

const app = express()

// body parser middleware
app.use(express.json())

// DB config
const db = config.get('mongoURI')

// connect to mongodb
mongoose.connect(db, { useUnifiedTopology: true,  useNewUrlParser: true, useCreateIndex: true  })
    .then(()=>console.log("mongoDB connected"))
    .catch((err)=>console.log(err))

// use routes
app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))



// serve static assets for production
if(process.env.NODE_ENV ==='production'){
    // set static folder
    app.use(express.static('client/build'))

    app.get('*', (res, req) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server started on PORT ${port}`))
