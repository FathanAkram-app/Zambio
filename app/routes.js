

module.exports = {
    initAuthRoutes: (app)=>{
        app.get('/', (req, res) => {
            res.sendFile(__dirname+'/views/game.html')
        })

        
    }
}
