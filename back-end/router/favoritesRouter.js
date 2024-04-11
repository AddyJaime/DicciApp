import { Router } from "express"
import favoriteModel from "../models/favoriteModel.js"


const router = Router()

router.get("/", (req, res) => {
  res.send("fab")
})


export default router