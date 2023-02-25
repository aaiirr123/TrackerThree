import express from "express"

const app = express();

const start = (port: number) => {
    try {
        app.listen(port, () => {
            console.log(`API running at http://localhost:${port}`)
        });

    }
    catch (err) {
        console.error(err);
    }
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
start(8000);
