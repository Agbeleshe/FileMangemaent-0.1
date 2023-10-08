export interface Ledger {
  id: number;
  userId: number;
  fileOwner: number;
  fileName: string;
  action: string;
  isGuest: boolean;
  createdAt: string;
  updatedAt: string;
  fileId: number;
  file: {
    fileName: string;
    fileAction: string;
    paperLink: string;
    downloadLink: string;
    annotations: string;
    filePrivacy: string;
    pages: number;
  };
  user: {
    firstName: string;
    lastName: string;
    email: string;
    profile_picture: string | null;
    role: string;
  };
}
