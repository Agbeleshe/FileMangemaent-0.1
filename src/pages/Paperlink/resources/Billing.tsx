export interface Billing {
  id: number;
  userId: number;
  paperlink: number;
  teamMember: number;
  businessPage: number;
  companyEmail: string;
  companyName: string;
  discount: number;
  total: number;
  reciept: string;
  createdAt: string;
  updatedAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    profile_picture: string | null;
    role: string;
    companyName: string;
  };
}
