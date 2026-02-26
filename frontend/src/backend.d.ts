import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface UpdateLog {
    action: string;
    timestamp: bigint;
    registrationId: string;
}
export interface Registration {
    id: string;
    status: RegistrationStatus;
    hasPaid: boolean;
    owner: Principal;
    fullName: string;
    mobileNumber: string;
    email: string;
    lastModified: bigint;
    gender: string;
    timestamp: bigint;
    classLevel: string;
    schoolName: string;
}
export interface QRCode {
    image: ExternalBlob;
    price: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum RegistrationStatus {
    deleted = "deleted",
    approved = "approved"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    confirmPayment(): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteRegistration(id: string): Promise<void>;
    getAdvancePdf(): Promise<ExternalBlob | null>;
    getAllRegistrations(): Promise<Array<Registration>>;
    getAllUpdateLogs(): Promise<Array<UpdateLog>>;
    getApprovedRegistrations(): Promise<Array<Registration>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContemporaryIndiaPdf(): Promise<ExternalBlob | null>;
    getDeletedRegistrations(): Promise<Array<Registration>>;
    getPaidContentQRCode(): Promise<QRCode | null>;
    getRegistrationByOwner(): Promise<Registration | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hasPaidForContent(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    requestApproval(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setAdvancePdf(blob: ExternalBlob): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    setContemporaryIndiaPdf(blob: ExternalBlob): Promise<void>;
    setPaidContentQRCode(qrCode: QRCode): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitRegistration(fullName: string, mobileNumber: string, email: string, gender: string, schoolName: string, classLevel: string): Promise<string>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateRegistration(fullName: string, mobileNumber: string, email: string, gender: string, schoolName: string, classLevel: string): Promise<void>;
}
