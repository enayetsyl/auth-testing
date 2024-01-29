import mongoose, { models } from "mongoose"

const {Schema} = mongoose;

const userSchema = new Schema(
  { 
    name:{
    type: String,
    required:true,
  },
    email:{
      type: String,
      unique: true,
      required: true, 
    },
    password: {
      type: String,
      required: false,
    },
  },
  {timestamps: true}
)


const User = models.User || mongoose.model("User", userSchema)
export default User