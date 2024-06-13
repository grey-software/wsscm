import Joi, { object, string } from "joi";
import { IComplaint } from "../@types/ComplaintSchema.type";

export const ComplaintValidation = (
  data: IComplaint
): Joi.ValidationResult<any> => {
  const ComplaintSchema = Joi.object({
    userId: Joi.string().required(),

    userName: Joi.string()
      .min(3)
      .max(20)
      .pattern(new RegExp("^[a-zA-Z ._-]*$"))
      .message("Only Alphabets are allowed in Username field")
      .required(),

    phone: Joi.string()
      .pattern(new RegExp("^[0-9]*$"))
      .message("Only Numbers are allowed in phone Numbers"),
    
    complaintType: Joi.string(),
    WSSC_CODE: Joi.string(),

    complaintAddress: Joi.string()
      .min(6)
      .max(50)
      .required()
      .pattern(new RegExp("^[.a-zA-Z0-9,!? ]*$"))
      .message("Only alphanumeric characters are allowed in complaint address"),

    complaintDes: Joi.string().allow('', null).optional()
      .pattern(new RegExp("^[.a-zA-Z0-9,!? ]*$"))
      .message(
        "Only alphanumeric characters are allowed complaint description"
      ),

    ImageUrl: Joi.string(),
    VideoUrl: Joi.string().allow('', null).optional(),
  });

  const complaintValid: Joi.ValidationResult<any> =
    ComplaintSchema.validate(data);
  return complaintValid;
};
