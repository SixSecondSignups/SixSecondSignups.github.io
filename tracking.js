function loadPage() {
  var referrer = document.referrer;
  var urlParams = new URLSearchParams(window.location.search);
  var otherProperties = {};
  if (referrer != null) {
    otherProperties['referrer'] = referrer;
  }
  var campaign = urlParams.get('utmCampaign');
  if (campaign != null) {
    otherProperties['utmCampaign'] = campaign;
  }
  var uuid = urlParams.get('uuid');
  if (uuid != null) {
    otherProperties['uuid'] = uuid;
  }
  if (urlParams.toString() != null) {
    otherProperties['urlParams'] = urlParams.toString();
  }
  var eventName = "Page Load";
  mixpanel.track(eventName, otherProperties);
  amplitude.getInstance().logEvent(eventName, otherProperties);
}

function loadPrivacyPage() {
  var eventName = "Privacy Page Load";
  mixpanel.track(eventName);
  amplitude.getInstance().logEvent(eventName);
}

function clickCTA() {
  var eventName = "CTA Click";
  mixpanel.track(eventName);
  amplitude.getInstance().logEvent(eventName);
}

function privacy() {
  var eventName = "Privacy";
  mixpanel.track(eventName);
  amplitude.getInstance().logEvent(eventName);
}

function features() {
  var eventName = "features";
  mixpanel.track(eventName);
  amplitude.getInstance().logEvent(eventName);
}

function howitworks() {
  var eventName = "howitworks";
  mixpanel.track(eventName);
  amplitude.getInstance().logEvent(eventName);
}

function pricing() {
  var eventName = "pricing";
  mixpanel.track(eventName);
  amplitude.getInstance().logEvent(eventName);
}

function contactMailLink() {
  var eventName = "contactMailLink";
  mixpanel.track(eventName);
  amplitude.getInstance().logEvent(eventName);
}

function pressMailLink() {
  var eventName = "pressMailLink";
  mixpanel.track(eventName);
  amplitude.getInstance().logEvent(eventName);
}

// Functions around setting unique IDs for users

function getUserIdentifier() {
  var existingID = getCookie("identifier");
  if (existingID == "") {
    var newID = makeid(64);
    setCookie("identifier", newID, 3650);
    return newID;
  }
  return existingID;
}

function getFirstVisitDate() {
  var firstVisitDate = getCookie("firstVisitDate");
  if (firstVisitDate == "") {
    var firstVisitDate = new Date().toISOString();
    setCookie("firstVisitDate", firstVisitDate, 3650);
    return firstVisitDate;
  }
  return firstVisitDate;
}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function eraseCookie(cname) {   
  document.cookie = cname+'=; Max-Age=-99999999;';  
}

// Functions around identifying users

function identifyUser() {
  var user_identifier = getUserIdentifier();
  mixpanel.identify(user_identifier);
  var e = deviceData.init();
  var userProperties = {
    "First visit date": getFirstVisitDate(),    // Send dates in ISO timestamp format (e.g. "2020-01-02T21:07:03Z")
    "SSS identifier": user_identifier,
    "osName": e.os.name,
    "osVersion": e.os.version,
    "browserName": e.browser.name,
    "browserVersion": e.browser.version,
  };
  mixpanel.people.set(userProperties);
  amplitude.getInstance().setUserProperties(userProperties);
}

function loadingEvents() {
  identifyUser();
  loadPage();
}