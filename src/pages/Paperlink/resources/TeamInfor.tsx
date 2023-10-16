export interface UserData {
  id: number;
  userId: number;
  teamsId: string;
  isOwner: boolean;
  ownersId: string;
  companyName: string;
  companyFirstName: string;
  companyLastName: string;
  companyProfilePicture: string | null;
  businessPage: string;
  companyEmail: string;
  teamMemberEmail: string;
  createdAt: string;
  updatedAt: string;
  teamId: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    hook: string | null;
    companyName: string;
    email: string;
    phone: string;
    address: string | null;
    slogan: string | null;
    briefIntro: string | null;
    profilePicture: string | null;
    password: string;
    referralCode: string;
    role: string;
    stripeCustomerId: string | null;
    country: string | null;
    state: string | null;
    signatureURL: string | null;
    initialURL: string | null;
    status: string;
    subscriptionId: number;
    totalLeavesEarned: number;
    totalCreditsEarned: number;
    referreeId: string | null;
    timezone: string | null;
    isReferreePaid: boolean;
    isTutorialPassed: boolean;
    mainAccountId: string | null;
    numberOfReferrals: number;
    totalPages: number;
    businessPage: string;
    teamAccess: string | null;
    socialLogin: string | null;
    socialId: string | null;
    secret: string | null;
    isAdmin: boolean;
    isEmailVerified: boolean;
    allowCopy: boolean;
    teamId: string;
    createdAt: string;
    updatedAt: string;
    memberId: string | null;
  };
  team: null;
}

interface ApiResponse {
  total: number;
  limit: number;
  skip: number;
  data: UserData[];
}
