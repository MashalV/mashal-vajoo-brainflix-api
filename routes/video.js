import express from "express";
import fs from "fs";


const router= express.Router();

const generateUniqueID = () => {
    return Math.random().toString(36).substr(2, 9);
};

const readVideos = () => {
    const data= fs.readFileSync("./data/videos.json", "utf8");
    return JSON.parse(data);
};

const writeVideos = (videos) => {
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos, null, 2), "utf8")

};

router
    .route("/")
    .get((_req, res) => {
        const videos = readVideos();
        res.json(videos);
    })
    .post((req, res) => {
        try{
            const videos = readVideos();
            const newVideo ={
                id: generateUniqueID(),
                ...req.body,
                timestamp: Date.now(),
                image: "http://localhost:8080/images/image8.jpg",
                channel: "Mashal Vajoo",
                views: "100,000,000",
                likes: "100,000",
                duration: "10:10",
                comments : [
                    {
                        id: "0123",
                        name: "person people",
                        comment: "hope this works",
                        likes: "12",
                        timestamp: Date.now()
                    },
                    {
                        id: "0124",
                        name: "buddy",
                        comment: "NO RAGRETS! Not even a letter ",
                        likes: "420",
                        timestamp: Date.now()
                    }

                ]
            };
            videos.push(newVideo);
            writeVideos(videos);
            res.status(201).json(newVideo);
        }catch(error){
            res.status(500).send("Couldn't add Video")
        }
    });

router
.route("/:id")
.get((req,res)=> {
    const videos = readVideos();
    const video = videos.find((v) => v.id === req.params.id);

    if(!video) {
        return res.sendStatus(404);
    }

    res.json(video);
})



export default router;