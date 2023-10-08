export interface Subscription {
    total: number;
    limit: number;
    skip: number;
    data: SubscriptionData[];
  }
  
   export interface SubscriptionData {
     id: number;
     userId: number;
     packageName: string;
     paperlink: number;
     teamMembers: number;
     cc: number;
     publicProfile: boolean;
     companyLedger: boolean;
     stripeChargeId: string;
     plan: string;
     amount: number;
     startDate: string;
     endDate: string;
     monthlyPrice: number;
     yearlyPrice: number;
     paymentType: string;
     status: string;
     isCancelled: boolean;
     isCustomPackage: boolean;
     fillablePdf: number;
     isWhiteGloveService: boolean;
     isRevenueCounted: boolean;
     isBillingNotified: boolean;
     createdAt: string;
     updatedAt: string;
     user: UserData;
     uuid: number;
   }
  
  interface UserData {
    id: number;
    firstName: string;
    lastName: string | null;
    companyName: string;
    email: string;
    phone: string;
    // Add other user-related fields here
  }
  
  // Example usage:
  const subscriptionData: Subscription = {
    total: 1,
    limit: 10,
    skip: 0,
    data: []
  }