export type VerificationStatus =
  | "Verified"
  | "Pending Verification"
  | "Temporarily Unavailable"
  | "Suspended";

export type ProviderAvailability =
  | "Available"
  | "Busy"
  | "Off Duty"
  | "Away";

export type RequestStatus =
  | "Requested"
  | "Pending"
  | "Accepted"
  | "Scheduled"
  | "In Progress"
  | "Completed"
  | "Declined"
  | "Cancelled"
  | "Disputed";

export interface ServiceCategory {
  slug: string;
  name: string;
  icon: string; // key into the icon map
  description: string;
  group: "Domestic" | "Maintenance" | "Technical" | "Outdoor" | "Other";
}

export interface Review {
  id: string;
  providerId: string;
  author: string;
  rating: number; // 1..5
  date: string;
  text: string;
  verifiedResident?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  category: string; // category name
  categorySlug: string;
  title: string; // e.g. "Plumber"
  experienceYears: number;
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  availability: ProviderAvailability;
  serviceArea: string;
  precincts: string[];
  verification: VerificationStatus;
  skills: string[];
  servicesOffered: string[];
  bio: string;
  registeredDate: string;
  languages: string[];
  responseRate: number; // percent
}

export interface ServiceRequest {
  id: string;
  providerId: string;
  providerName: string;
  service: string;
  categorySlug: string;
  status: RequestStatus;
  date: string;
  time: string;
  description: string;
  resident: string;
  precinct: string;
}

export interface Complaint {
  id: string;
  providerId: string;
  providerName: string;
  reason: string;
  details: string;
  reportedBy: string;
  date: string;
  status: "Open" | "Under Review" | "Resolved" | "Dismissed";
}

export interface Notification {
  id: string;
  title: string;
  detail: string;
  time: string;
  kind: "success" | "info" | "warning";
  unread?: boolean;
}
