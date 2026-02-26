import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";

module {
  type OldRegistrationStatus = {
    #approved;
    #deleted;
  };

  type OldRegistration = {
    id : Text;
    fullName : Text;
    email : Text;
    gender : Text;
    collegeOrSchool : Text;
    classLevel : Text;
    timestamp : Int;
    status : OldRegistrationStatus;
    lastModified : Int;
    owner : Principal;
    hasPaid : Bool;
  };

  type OldUpdateLog = {
    registrationId : Text;
    action : Text;
    timestamp : Int;
  };

  type OldUserProfile = {
    name : Text;
    email : Text;
  };

  type OldAdminConfig = {
    adminEmail : Text;
    adminPrincipal : ?Principal;
  };

  type OldQRCode = {
    image : Storage.ExternalBlob;
    price : Nat;
  };

  type OldActor = {
    registrations : Map.Map<Text, OldRegistration>;
    updateLogs : Map.Map<Text, OldUpdateLog>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
    educationalMaterials : Map.Map<Text, Storage.ExternalBlob>;
    adminConfig : OldAdminConfig;
    paidContentQRCode : ?OldQRCode;
    advancePdf : ?Storage.ExternalBlob;
    contemporaryIndiaPdf : ?Storage.ExternalBlob;
  };

  type NewRegistrationStatus = OldRegistrationStatus;

  type NewRegistration = {
    id : Text;
    fullName : Text;
    mobileNumber : Text;
    email : Text;
    gender : Text;
    schoolName : Text;
    classLevel : Text;
    timestamp : Int;
    status : NewRegistrationStatus;
    lastModified : Int;
    owner : Principal;
    hasPaid : Bool;
  };

  type NewUpdateLog = OldUpdateLog;

  type NewUserProfile = OldUserProfile;

  type NewAdminConfig = OldAdminConfig;

  type NewQRCode = OldQRCode;

  type NewActor = {
    registrations : Map.Map<Text, NewRegistration>;
    updateLogs : Map.Map<Text, NewUpdateLog>;
    userProfiles : Map.Map<Principal, NewUserProfile>;
    educationalMaterials : Map.Map<Text, Storage.ExternalBlob>;
    adminConfig : NewAdminConfig;
    paidContentQRCode : ?NewQRCode;
    advancePdf : ?Storage.ExternalBlob;
    contemporaryIndiaPdf : ?Storage.ExternalBlob;
  };

  public func run(old : OldActor) : NewActor {
    let newRegistrations = old.registrations.map<Text, OldRegistration, NewRegistration>(
      func(_id, oldReg) {
        {
          oldReg with
          mobileNumber = "";
          schoolName = oldReg.collegeOrSchool;
        };
      }
    );

    {
      old with
      registrations = newRegistrations;
    };
  };
};
