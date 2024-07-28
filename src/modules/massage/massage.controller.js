import massageModel from "../../../DB/models/massage.model.js";
import { errorHandlingClass } from "../../utils/error-class.utils.js";

//CRUD

//CREATE
export const createMassage = async (req, res, next) => {
  const { senderName, deliveredUser, content } = req.body;
  const newMassage = await massageModel.create({
    senderName,
    deliveredUser,
    content,
  });
  res.status(201).json({ msg: "created successfully", newMassage });
}; 

//READ 
export const getAllMassages = async (req, res, next) => {
  const { _id } = req.authUser;
  const massages = await massageModel.find({ deliveredUser: _id });
  res.status(200).json(massages);
};

//DELETE
export const deleteMassage = async (req, res, next) => {
  const { _id } = req.authUser;
  const { deletedMassage_id } = req.params;
  const massage = await massageModel.findOneAndDelete({
    deliveredUser: _id,
    _id: deletedMassage_id,
  });
  if (!massage) {
    return next(
      new errorHandlingClass(`massage not found ${deletedMassage_id}`, 404)
    );
  }
  res.status(200).json({ msg: "deleted successfully", massage });
};

//FavMassages

export const favMassages = async (req, res, next) => {
 const { _id } = req.authUser;
 const {favMassages} = req.body;
 const massage = await massageModel.findById(favMassages);
 
 if (massage.favMassages == true){
   massage.favMassages = false;
 }else{
   massage.favMassages = true
 }
const updatedMassage = await massage.save();
  if (!massage) return next(new errorHandlingClass("massage not found", 404));
 res.status(200).json(updatedMassage);

}
