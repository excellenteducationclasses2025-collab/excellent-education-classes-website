import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import List "mo:core/List";
import Migration "migration";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Stripe "stripe/stripe";
import UserApproval "user-approval/approval";
import OutCall "http-outcalls/outcall";
import MixinStorage "blob-storage/Mixin";

(with migration = Migration.run)
actor {
  include MixinStorage();

  // Initialize authorization plugin
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User approval state
  let approvalState = UserApproval.initState(accessControlState);

  // Types
  public type RegistrationStatus = {
    #approved;
    #deleted;
  };

  public type Registration = {
    id : Text;
    fullName : Text;
    mobileNumber : Text;
    email : Text;
    gender : Text;
    schoolName : Text;
    classLevel : Text;
    timestamp : Int;
    status : RegistrationStatus;
    lastModified : Int;
    owner : Principal;
    hasPaid : Bool;
  };

  public type UpdateLog = {
    registrationId : Text;
    action : Text;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  public type AdminConfig = {
    adminEmail : Text;
    adminPrincipal : ?Principal;
  };

  public type QRCode = {
    image : Storage.ExternalBlob;
    price : Nat;
  };

  // Storage
  let registrations = Map.empty<Text, Registration>();
  let updateLogs = Map.empty<Text, UpdateLog>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let educationalMaterials = Map.empty<Text, Storage.ExternalBlob>();

  // Admin config and content storage
  var adminConfig : AdminConfig = {
    adminEmail = "kumarrishit1010@gmail.com";
    adminPrincipal = null;
  };
  var paidContentQRCode : ?QRCode = null;
  var advancePdf : ?Storage.ExternalBlob = null;
  var contemporaryIndiaPdf : ?Storage.ExternalBlob = null;

  // UPI related constants
  let advancePrice : Nat = 5;
  let upiId = "2010rishit@fam";

  // Stripe integration (non-persistent)
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // User Approval functions
  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only the authorized admin can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only the authorized admin can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  // Stripe related functions
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only the authorized admin can set Stripe configuration");
    };
    stripeConfig := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller.notEqual(user) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Helper function to check if caller is the authorized admin
  func isAuthorizedAdmin(caller : Principal) : Bool {
    // Check if caller has admin role
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return false;
    };

    // Additionally verify the caller's email matches the admin email
    // This requires the admin to have saved their profile with the correct email
    switch (userProfiles.get(caller)) {
      case (null) { false };
      case (?profile) { profile.email == adminConfig.adminEmail };
    };
  };

  // Helper function to check if caller owns a registration
  func callerOwnsRegistration(caller : Principal) : Bool {
    for ((_, r) in registrations.entries()) {
      if (Principal.equal(r.owner, caller)) {
        return true;
      };
    };
    false;
  };

  // Helper function to check if caller has paid and is approved
  func callerHasPaidAccess(caller : Principal) : Bool {
    for ((_, r) in registrations.entries()) {
      if (Principal.equal(r.owner, caller)) {
        return r.hasPaid and r.status == #approved;
      };
    };
    false;
  };

  // Registration submission - NO authorization required per specification
  public shared ({ caller }) func submitRegistration(
    fullName : Text,
    mobileNumber : Text,
    email : Text,
    gender : Text,
    schoolName : Text,
    classLevel : Text
  ) : async Text {
    let id = caller.toText() # "-" # Int.toText(Time.now());
    let registration : Registration = {
      id = id;
      fullName = fullName;
      mobileNumber = mobileNumber;
      email = email;
      gender = gender;
      schoolName = schoolName;
      classLevel = classLevel;
      timestamp = Time.now();
      status = #approved;
      lastModified = Time.now();
      owner = caller;
      hasPaid = false;
    };
    registrations.add(id, registration);
    id;
  };

  // Get registration by owner - check ownership
  public query ({ caller }) func getRegistrationByOwner() : async ?Registration {
    // Allow if caller is admin OR if caller owns a registration
    if (not (AccessControl.isAdmin(accessControlState, caller) or callerOwnsRegistration(caller))) {
      Runtime.trap("Unauthorized: No registration found for this user");
    };

    for ((_, r) in registrations.entries()) {
      if (Principal.equal(r.owner, caller)) { return ?r };
    };
    null;
  };

  // Update registration - check ownership
  public shared ({ caller }) func updateRegistration(
    fullName : Text,
    mobileNumber : Text,
    email : Text,
    gender : Text,
    schoolName : Text,
    classLevel : Text
  ) : async () {
    // Verify caller owns a registration
    if (not callerOwnsRegistration(caller)) {
      Runtime.trap("Unauthorized: No registration found for this user");
    };

    var found = false;
    for ((id, r) in registrations.entries()) {
      if (Principal.equal(r.owner, caller)) {
        let updated : Registration = {
          r with
          fullName = fullName;
          mobileNumber = mobileNumber;
          email = email;
          gender = gender;
          schoolName = schoolName;
          classLevel = classLevel;
          lastModified = Time.now();
        };
        registrations.add(id, updated);
        found := true;
      };
    };

    if (not found) {
      Runtime.trap("Registration not found");
    };
  };

  // Confirm payment - check ownership
  public shared ({ caller }) func confirmPayment() : async () {
    // Verify caller owns a registration
    if (not callerOwnsRegistration(caller)) {
      Runtime.trap("Unauthorized: No registration found for this user");
    };

    var found = false;
    for ((id, r) in registrations.entries()) {
      if (Principal.equal(r.owner, caller)) {
        let updated : Registration = {
          r with
          hasPaid = true;
          lastModified = Time.now();
        };
        registrations.add(id, updated);

        let log : UpdateLog = {
          registrationId = id;
          action = "Payment confirmed";
          timestamp = Time.now();
        };
        updateLogs.add(id # "-" # Int.toText(Time.now()), log);
        found := true;
      };
    };

    if (not found) {
      Runtime.trap("Registration not found");
    };
  };

  // Check if user has paid - check registration directly
  public query ({ caller }) func hasPaidForContent() : async Bool {
    callerHasPaidAccess(caller);
  };

  // Get all registrations - ADMIN ONLY with email verification
  public query ({ caller }) func getAllRegistrations() : async [Registration] {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only the authorized admin can view all registrations");
    };
    registrations.values().toArray();
  };

  public query ({ caller }) func getApprovedRegistrations() : async [Registration] {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only the authorized admin can view approved registrations");
    };
    let filtered = List.empty<Registration>();
    for (r in registrations.values()) {
      if (r.status == #approved) {
        filtered.add(r);
      };
    };
    filtered.toArray();
  };

  public query ({ caller }) func getDeletedRegistrations() : async [Registration] {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only the authorized admin can view deleted registrations");
    };
    let filtered = List.empty<Registration>();
    for (r in registrations.values()) {
      if (r.status == #deleted) {
        filtered.add(r);
      };
    };
    filtered.toArray();
  };

  // Delete registration - ADMIN ONLY with email verification
  public shared ({ caller }) func deleteRegistration(id : Text) : async () {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only the authorized admin can delete registrations");
    };

    switch (registrations.get(id)) {
      case (null) { Runtime.trap("Registration not found") };
      case (?r) {
        let updated : Registration = {
          r with
          status = #deleted;
          lastModified = Time.now();
        };
        registrations.add(id, updated);

        let log : UpdateLog = {
          registrationId = id;
          action = "Deleted by admin";
          timestamp = Time.now();
        };
        updateLogs.add(id # "-" # Int.toText(Time.now()), log);
      };
    };
  };

  // Set and get QR codes and PDFs
  public shared ({ caller }) func setPaidContentQRCode(qrCode : QRCode) : async () {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only the authorized admin can set QR code");
    };
    paidContentQRCode := ?qrCode;
  };

  // Get QR code - allow registered users to see payment QR
  public query ({ caller }) func getPaidContentQRCode() : async ?QRCode {
    // Allow if user has a registration (to enable payment)
    if (not (AccessControl.isAdmin(accessControlState, caller) or callerOwnsRegistration(caller))) {
      Runtime.trap("Unauthorized: Registration required to view payment QR code");
    };
    paidContentQRCode;
  };

  public shared ({ caller }) func setAdvancePdf(blob : Storage.ExternalBlob) : async () {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only the authorized admin can set content");
    };
    advancePdf := ?blob;
  };

  public shared ({ caller }) func setContemporaryIndiaPdf(blob : Storage.ExternalBlob) : async () {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only the authorized admin can set content");
    };
    contemporaryIndiaPdf := ?blob;
  };

  // PDF access requires both approved status AND payment confirmation
  public query ({ caller }) func getAdvancePdf() : async ?Storage.ExternalBlob {
    // Admin can always access for preview
    if (isAuthorizedAdmin(caller)) {
      return advancePdf;
    };

    // Regular users must have paid and be approved
    if (not callerHasPaidAccess(caller)) {
      Runtime.trap("Unauthorized: Payment required to access content");
    };
    advancePdf;
  };

  public query ({ caller }) func getContemporaryIndiaPdf() : async ?Storage.ExternalBlob {
    // Admin can always access for preview
    if (isAuthorizedAdmin(caller)) {
      return contemporaryIndiaPdf;
    };

    // Regular users must have paid and be approved
    if (not callerHasPaidAccess(caller)) {
      Runtime.trap("Unauthorized: Payment required to access content");
    };
    contemporaryIndiaPdf;
  };

  public query ({ caller }) func getAllUpdateLogs() : async [UpdateLog] {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only the authorized admin can view logs");
    };
    updateLogs.values().toArray();
  };
};
