import mongoose from "mongoose";
import { IComplaint } from "../@types/ComplaintSchema.type";

const ComplaintSchema = new mongoose.Schema(
  {
    userId: { type: String, required: [true, "CurrentUser_Id is required"] },
    supervisorId: {
      type: String,
      default: "",
    },
    userName: { type: String },
    phone: { type: String },
    complaintAddress: {
      type: String,
      required: [true, "Complaint address is required"],
    },
    complaintType: {
      type: String,
      required: [true, "Complaint type is mandatory one"],
    },
    complaintDes: { type: String },
    wsscStatement: { type: String },
    WSSC_CODE: { type: String, required: [true, "WSSC code is required"] },
    status: {
      type: [
        {
          state: { type: String },
          updatedAt: {
            type: Date,
            default: new Date(),
          },
          _id: false,
        },
      ],
      default: [{ state: "Initiated" }],
    },
    feedback: {
      type: {
        rating: {
          type: Number,
          required: [true, "Rating is required in feedback"],
        },
        description: String,
      },
    },
    response: {
      type: {
        ImageUrl: {
          type: String,
          required: [true, "Image is required in response"],
        },
        description: String,
      },
    },
    // LOG
    feedbackLog: {
      type: [{
        rating: {
          type: Number,
          required: [true, "Rating is required in feedback"],
        },
        description: String,
        created_at : { type: Date,
                       default: Date.now 
                    }
    }],
    },
    responseLog: {
      type: [{
        ImageUrl: {
          type: String,
          // required: [true, "Image is required in response"],
        },
        description: String,
        created_at : { type: Date,
          default: Date.now 
       }
    }],
    },

  //   log:{
  //     _id: true,
  //     type: [
  //       {
  //     response: {
  //       type: {
  //         ImageUrl: {
  //           type: String,
  //           // required: [true, "Image is required in response"],
  //         },
  //         description: String,
  //       },
  //     },
  //     feedback: {
  //       type: {
  //         rating: {
  //           type: Number,
  //           required: [true, "Rating is required in feedback"],
  //         },
  //         description: String,
  //       },
  //     },
  //   }],
  // },
    ImageUrl: { type: String },
    VideoUrl: { type: String },
  },
  { timestamps: true }
);

export const ComplaintModel =
  mongoose.models.complaint ||
  mongoose.model<IComplaint>("complaint", ComplaintSchema);
