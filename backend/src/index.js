import express from "express";
import markdownit from 'markdown-it'
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = 5000;
const md = markdownit({
    html: true,
    linkify: true,
    typographer: true
});


app.post("/convert", function (req, res, next) {
    if (typeof req.body.data == 'undefined' || req.body.data == null) {
        res.json(["error", "No data found"]);
    } else {
        const text = req.body.data;
        const result = md.render(text);
        res.send({ result });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});