var getParams = function (url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split(/&|%26/);
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return [query, params];
};

function loadPage() {
  var referrer = document.referrer;
  var url = window.location.href;
  var paramData = getParams(url);
  var query = paramData[0];
  var urlParams = paramData[1];
  var otherProperties = {};

  if (referrer != null) {
    otherProperties['referrer'] = referrer;
  }
  var campaign = urlParams['utmCampaign'];
  if (campaign != null) {
    otherProperties['utmCampaign'] = campaign;
  }
  var campaign = urlParams['utmSource'];
  if (campaign != null) {
    otherProperties['utmSource'] = campaign;
  }
  var campaign = urlParams['utmMedium'];
  if (campaign != null) {
    otherProperties['utmMedium'] = campaign;
  }
  var uuid = urlParams['uuid'];
  if (uuid != null) {
    otherProperties['uuid'] = uuid;
  }
  if (urlParams.toString() != null) {
    otherProperties['urlParams'] = query;
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