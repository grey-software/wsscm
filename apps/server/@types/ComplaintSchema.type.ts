export interface IComplaint {
  userId: string;
  userName: string;
  supervisorId?: string;
  WSSC_CODE?: string;
  phone: string;
  complaintAddress: string;
  complaintType: string;
  complaintDes?: string;
  feedback?: any;
  response?: any;
  ImageUrl?: string;
  VideoUrl?: string;
  status: Object[];
}
