//Axios (user) structure
export interface UsersInfo {
    id: number;
    fileName: string;
    fileAction: string;
    isDeleted: boolean;
    paperLink: string;
    downloadLink: string;
    key: string;
    annotaions: any; // You may want to specify a more specific type if possible
    leavesEarned: number;
    pages: number;
    position: number;
    positionInFolder: any; // You may want to specify a more specific type if possible
    shared: any; // You may want to specify a more specific type if possible
    filePrivacy: string;
    userName: string;
    role: string;
    teamMemberId: any; // You may want to specify a more specific type if possible
    isSuspended: boolean;
    cc: any; // You may want to specify a more specific type if possible
    uploadedBy: number;
    isEditing: boolean;
    tags: any; // You may want to specify a more specific type if possible
    createdAt: string;
    updatedAt: string;
    userId: number;
    folderId: number;
    user: {
      firstName: string;
      lastName: string;
      company_name: string;
      email: string;
      profile_picture: any; // You may want to specify a more specific type if possible
      role: string;
      businessPage: string;
      allowCopy: boolean;
    };
    favourites: any[]; // You may want to specify a more specific type if possible
  }
  