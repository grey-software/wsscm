"use client";
import Image from "next/image";
import dummyPic from "../../public/wsscmlogo.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SupervisorComplaints } from "../../GlobalState/Supervisor-ApiCalls/ApiCalls/supervisorComplaintsApiCalls";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalState/store";
import { FcEmptyFilter } from "react-icons/fc";
import Loader from "@/app/loading";

export const FiltersBtns = [
  {
    name: "All",
    index: 0,
    filter: "AllComplaints",
  },
  {
    name: "Assigned",
    index: 1,
    filter: "InProgress",
  },
  {
    name: "Resolved",
    index: 2,
    filter: "Completed",
  },
  {
    name: "Closed",
    index: 3,
    filter: "Closed",
  },
];

const HomeScreen = () => {
  const [loading, setloading] = useState(false);
  // retreiving complaints from store
  const allcomplaints = useSelector(
    (state: RootState) => state.supervisorComplaints.SupervisorComplaints
  );
// getting supervisorToken from store
  const token: any = useSelector((state: RootState) => state.suprvisor.supervisorToken);

  const dispatch = useDispatch();
  const [complaints, setcomplaints] = useState<any[]>(allcomplaints);
  const [selected, setselected] = useState<Number>(0);
  const [IsComplaints, setIsComplaints] = useState<Boolean>(true);

  // A method to filtered the complaints on the click
  const FilteredComplaints = (index: string) => {
    if (index === "AllComplaints") {
      setcomplaints(allcomplaints);
      return;
    }

    const filteredComplaints = allcomplaints.filter((complaint: any) => {
      let lastStatus = complaint.status[complaint.status.length - 1].state;
      return lastStatus === index;
    });
    console.log(filteredComplaints.length);
    setIsComplaints(filteredComplaints.length != 0 ? true : false);
    setcomplaints(filteredComplaints);
  };

  // FetchSupervisorComplaints method definition to fetch all complaints that are assigned to supervisor
  const FetchSupervisorComplaints = async () => {
    setloading(true);
    try {
      const allcomplaints = await SupervisorComplaints(dispatch, token);
      setcomplaints(allcomplaints);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  // used useEffect to call supervisor_assigned_complaints API to fetch and retrieve the data accordingly
  useEffect(() => {
    FetchSupervisorComplaints();
    setselected(0);
  }, []);

  // JSX section
  return (
    <div className="container bg-slate-50 w-screen h-screen flex justify-center -mt-4 overflow-x-hidden">
      <div className="container w-screen h-screen md:w-[50%] pt-2  bg-slate-50 md:ml-2 ">
        <div className="complaints-record  flex  items-center  overflow-hidden border border-gray-300 shadow-sm shadow-gray-200 rounded-sm mx-2 md:mx-0 mt-20">
          {FiltersBtns.map((e, index) => (
            <span
              key={index}
              onClick={() => {
                setselected(e.index);
                FilteredComplaints(e.filter);
              }}
              className={`pending cursor-pointer py-3  hover:bg-green-500 hover:text-white flex flex-col justify-center items-center border-r border-gray-300  flex-1  ${
                e.index == selected && "bg-green-500 text-white"
              } `}
            >
              <p className="text-sm">{e.name}</p>
            </span>
          ))}
        </div>

        <div className="complaints-types m-3 mt-2">
          <h2 className="text-md text-center font-semibold text-gray-600">
            Assigned complaints
          </h2>
        </div>

        {/* --- Displaying all complaints ---- */}  

        {!loading ? (
          complaints.length != 0 ? (
            complaints.map((complaint: any, index: any) => (
              <div key={index}>
                <Link href={`/supervisor/complaint/${complaint?._id}`}>
                  <div className="flex items-center justify-between rounded-lg border-2 bg-white border-gray-200 mb-2 mx-2 md:mx-0 p-2  px-4 shadow-md active:shadow-none active:scale-[0.97] hover:scale-[0.99] transition-all relative overflow-hidden">
                    <div className="flex flex-col justify-center ml-1">
                      <h3 className="text-md font-bold text-gray-600">
                        {complaint?.complaintType}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <p>Status:</p>
                        <span
                          className={`font-bold ${
                            complaint?.status[complaint?.status.length - 1]
                              ?.state === "Initiated"
                              ? "text-initiatedColor"
                              : ""
                          }  ${
                            complaint?.status[complaint?.status.length - 1]
                              ?.state === "InProgress"
                              ? "text-inprogessColor"
                              : ""
                          } ${
                            complaint?.status[complaint?.status.length - 1]
                              ?.state === "Completed"
                              ? "text-completedColor"
                              : ""
                          } ${
                            complaint?.status[complaint?.status.length - 1]
                              ?.state === "Closed"
                              ? "text-closedColor"
                              : ""
                          }`}
                        >
                          {
                            complaint?.status[complaint?.status.length - 1]
                              ?.state
                          }
                        </span>
                      </div>

                      <div className="flex items-center gap-2  text-sm text-gray-600">
                        <p>Submited On:</p>
                        <span>{complaint?.updatedAt.split("T")[0]}</span>
                      </div>
                      <div className="flex  gap-3 text-sm text-gray-600">
                        <p>Address:</p>
                        <span>{complaint?.complaintAddress}</span>
                      </div>
                    </div>
                    <Image
                      src={complaint?.ImageUrl ? complaint?.ImageUrl : dummyPic}
                      className="h-[10vh] md:h-36 md:w-40 w-[30%] object-cover rounded-md"
                      width={60}
                      height={40}
                      alt=""
                    />
                    <div
                      className={`h-[100%] w-2 top-0 left-0 absolute ${
                        complaint?.status[complaint?.status.length - 1]
                          ?.state === "Initiated"
                          ? "bg-initiatedColor"
                          : ""
                      }  ${
                        complaint?.status[complaint?.status.length - 1]
                          ?.state === "InProgress"
                          ? "bg-inprogessColor"
                          : ""
                      } ${
                        complaint?.status[complaint?.status.length - 1]
                          ?.state === "Completed"
                          ? "bg-completedColor"
                          : ""
                      } ${
                        complaint?.status[complaint?.status.length - 1]
                          ?.state === "Closed"
                          ? "bg-closedColor"
                          : ""
                      }`}
                    ></div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="nocomplant w-full mt-36 h-screen flex flex-col  items-center">
              <FcEmptyFilter className="text-6xl" />
              <h1 className="text-lg">No complaints found</h1>
            </div>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
