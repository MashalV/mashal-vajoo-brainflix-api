import express from "express";
import fs from "fs";

const imageMapping = {
    "84e96018-4022-434e-80bf-000ce4cd12b8": "./public/images/image0.jpg",
    "c05b9a93-8682-4ab6-aff2-92ebb4bbfc14": "./public/images/image1.jpg",
    "25ce5d91-a262-4dcf-bb87-42b87546bcfa": "./public/images/image2.jpg",
    "b6f35f03-7936-409b-bd2a-446bcc5f30e7": "./public/images/image3.jpg",
    "1b964601-a6dd-4fcc-b5f3-1000338c9557": "./public/images/image4.jpg",
    "9c268c0a-83dc-4b96-856a-bb5ded2772b1": "./public/images/image5.jpg",
    "fc5261d1-58a0-47e4-9c19-2b7a1715fa1b": "./public/images/image6.jpg",
    "99478bed-6428-49ed-8eaa-f245a5414336": "./public/images/image7.jpg",
    "76ca28c0-7dea-4553-887f-8e5129a80fc3": "./public/images/image8.jpg"
  };



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
                image: "./public/images/image8.jpg",
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