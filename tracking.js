function loadPage() {
  mixpanel.track("Page Load");
}

function loadPrivacyPage() {
  mixpanel.track("Privacy Page Load");
}

function clickCTA() {
  mixpanel.track("CTA Click");
}

function privacy() {
  mixpanel.track("Privacy");
}

function features() {
  mixpanel.track("features");
}

function howitworks() {
  mixpanel.track("howitworks");
}

function pricing() {
  mixpanel.track("pricing");
}

function contactMailLink() {
  mixpanel.track("contactMailLink");
}

function pressMailLink() {
  mixpanel.track("pressMailLink");
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
    setCookie("identifier", firstVisitDate, 3650);
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

function deleteAllCookies() {
  document.cookie = "";
}

// Functions around identifying users

function identifyUser() {
  mixpanel.people.set({
  "First visit date": getFirstVisitDate(),    // Send dates in ISO timestamp format (e.g. "2020-01-02T21:07:03Z")
  "SSS identifier": getUserIdentifier()    // use human-readable names
});
}

function loadingEvents() {
  identifyUser();
  loadPage();
}