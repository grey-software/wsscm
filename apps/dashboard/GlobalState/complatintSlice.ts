"use client";

// import { complaintTypes } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { complaintTypes } from "@/@types/complaintTypes.types";

const complaintSlice = createSlice({
  name: "complaint",
  initialState: {
    complaintsAll: <complaintTypes[]>(<unknown>[]),
    newComplaint: [],
    complaint: <complaintTypes>{},
    supervisorComplaints: <complaintTypes[]>(<unknown>[]),
    loading: false,
    error: false,
  },
  reducers: {
    //  Fetching all complaints data
    ApiRequestStart: (state) => {
      state.loading = true;
    },
    GetComplaintsSuccess: (state, action) => {
      state.loading = false;
      state.complaintsAll = action.payload;
    },

    // Get specific supervisor complaints
    GetSupervisorComplaintsSuccess: (state, action) => {
      state.loading = false;  
      state.supervisorComplaints = action.payload;
    },

    // Assign complaint to supervisor
    AssignComplaintSuccess: (state) => {
      state.loading = false;
    },

    AddStatementSuccess: (state, action) => {
      state.loading = false;
      state.complaint.wsscStatement = action.payload;
    },
    GetSingleComplaintSuccess: (state, action) => {
      state.loading = false;
      state.complaint = action.payload;
    },
    APIRequestError: (state, action) => {
      state.error = true;
      toast.error(action.payload, {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },
  },
});

export const {
  ApiRequestStart,
  GetComplaintsSuccess,
  AssignComplaintSuccess,
  AddStatementSuccess,
  GetSingleComplaintSuccess,
  GetSupervisorComplaintsSuccess,
  APIRequestError,
} = complaintSlice.actions;
export default complaintSlice.reducer;
