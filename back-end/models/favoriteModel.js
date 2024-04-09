import {Schema, model} from "mongoose"


// // favorite entitie for user entitie
const favoriteSchema = new Schema ({
  word: String,
  definition: String,
  userId: {type: Schema.Types.ObjectId, ref: 'user'},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

const FavoriteModel = model('Favorite', favoriteSchema)

export default FavoriteModel