import mongoose from "mongoose";

const { Schema, model } = mongoose;

const massageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },

    deliveredUser: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "userModel",
    },

    senderName:{
      type:String,
      trim:true},
    
    favMassages:{
      type:Boolean,
      default :false
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.massageModel || model("massageModel", massageSchema);
