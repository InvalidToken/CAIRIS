/*  Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.

    Authors: Raf Vandelaer, Shamal Faily */


function updateRequirement(row){
    if ($(row).attr('class') != undefined) {
        // if new Row, POST
        var clazz = $(row).attr('class');
        //Not new anymore now we are Posting it
        $(clazz).removeClass(clazz);
        arr = clazz.split(':');
        var whatKind = arr[0];
        var vall = arr[1];
        postRequirementRow(row,whatKind,vall);
    }
    else{
        //if old row, PUT
        putRequirementRow(row)
    }
}


function reqRowtoJSON(row){
    //TODO: cant replace in object!
    /*row = row.replace('<tr>','');
    row = row.replace('</tr>','');*/
    var json = {};
    json.attrs = {};

    $.each(row[0].children, function (i, v) {
        name =  $(v).attr("name");
        if(name != "originator" && name != "rationale" && name != "type" && name != "fitCriterion"){
            json[name] =  v.innerHTML;
        }
        else{
            json.attrs[name] = v.innerHTML;
        }
    });
    return json
}


/*
 Updating the requirementsRow
 */
function putRequirementRow(row){
   var json = reqRowtoJSON(row);
    var object = {};
    object.object = json;
    object.session_id= $.session.get('sessionID');
       // console.log(object);
    var objectoutput = JSON.stringify(object);
    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        data: objectoutput,
        crossDomain: true,
        url: serverIP + "/api/requirements" ,
        success: function (data) {
            showPopup(true);
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });

}
function postRequirementRow(row,whatKind,value){
    var json = reqRowtoJSON(row);
    var dimName = "asset";
    var objtName = $( "#assetsbox").find("option:selected").text();
    if (objtName == "") {
      dimName = "environment";
      objtName = $( "#environmentsbox").find("option:selected").text();
    }
    var ursl = serverIP + "/api/requirements?" + dimName + "=" + objtName.replace(' ',"%20");
    var object = {};
    object.object = json;
    object.session_id= $.session.get('sessionID');
    var objectoutput = JSON.stringify(object);

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        data: objectoutput,
        crossDomain: true,
        url: ursl,
        success: function (data) {
            showPopup(true);
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });

}

/*
 Updating the requirementsRow
 */
//TODO
function putAssetProperty(assetSON){
    var ursl = serverIP + "/api/assets/name/"+ $.session.get("AssetName").replace(' ',"%20") + "/properties?session_id=" + String($.session.get('sessionID'));
    //console.log("{ 'AssetEnvironmentPropertiesMessage': " + JSON.stringify(assetSON) + "}");
   // console.log($.session.get("UsedProperties"));
    var propsJon = JSON.parse($.session.get("thePropObject")).attributes;
    var theWholeObject = JSON.parse($.session.get("AssetProperties"));

    var index = -1;
    /// $.each(assts, function(arrayID,group) {
    /*$.each(propsJon, function(i, obj){
            if(obj.id == propsJon.id){
                propsJon.attributes[i] = assetSON;
            }
    });*/
    var theEnvProps = JSON.parse($.session.get("thePropObject"));
    theEnvProps.attributes[$.session.get("Arrayindex")] = assetSON;

    $.each(theWholeObject, function(index, obje){
       // alert(obje.environment);
        if(obje.environment == theEnvProps.environment){
            theWholeObject[index] = theEnvProps;
        }
    });

    $.session.set("AssetProperties", theWholeObject);
    //console.log(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        origin: serverIP,
        data: output,
        url: ursl,
        success: function (data) {
            showPopup(true);
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}

function putAsset(json){
    var ursl = serverIP + "/api/assets/name/"+ $.session.get("AssetName").replace(' ',"%20") + "?session_id=" + String($.session.get('sessionID'));

    var output = {};
    output.object = json;
    output = JSON.stringify(output);

    //console.log(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: ursl,
        success: function (data) {
            showPopup(true);
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}

function postAsset(json,callback){
    var ursl = serverIP + "/api/assets?session_id=" + String($.session.get('sessionID'));

    var output = JSON.stringify(json);
    //console.log(output);

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: ursl,
        success: function (data) {
            showPopup(true);
            if(typeof(callback) == "function"){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function updateAssetEnvironment(json,callback){
    var ursl = serverIP + "/api/assets/name/"+ $.session.get("AssetName").replace(' ',"%20") + "/properties?session_id=" + String($.session.get('sessionID'));

    var output = {};
    output.object = json;
    var output2 = JSON.stringify(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output2,
        url: ursl,
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function newAssetEnvironment(jsonString,callback){
    var ursl = serverIP + "/api/assets/name/"+ $.session.get("AssetName").replace(' ',"%20") + "/properties?session_id=" + String($.session.get('sessionID'));
    var output = {};

    if(typeof jsonString == 'undefined'){
       output = jQuery.extend(true, {},AssetEnvironmentProperty );
    }
    else{
        output.object = JSON.parse(jsonString);
        var output2 = JSON.stringify(output);
    }
    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output2,
        url: ursl,
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function updateRole(role, oldName, callback){

    var output = {};
    output.object = role;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    debugLogger(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/roles/name/" + oldName.replace(" ","%20") + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function postRole(role, callback){

   var output = {};
    output.object = role;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    debugLogger(output);

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/roles?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function deleteRole(roleName, callback){
    $.ajax({
        type: "DELETE",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: roleName,
        url: serverIP + "/api/roles/name/" + roleName.replace(" ","%20") + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function putEnvironment(environment, oldName, callback){
    var output = {};
    output.object = environment;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    debugLogger(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/environments/name/" + oldName.replace(" ","%20") + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function postEnvironment(environment, callback){
   var output = {};
    output.object = environment;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    debugLogger(output);

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/environments" + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            showPopup(false);
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function deleteEnvironment(name, callback){

    $.ajax({
        type: "DELETE",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        url: serverIP + "/api/environments/name/" + name.replace(" ","%20") + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function putVulnerability(vuln, oldName, callback){
   var output = {};
    output.object = vuln;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    debugLogger(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/vulnerabilities/name/" + oldName.replace(" ","%20") + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function postVulnerability(vuln, callback){
    var output = {};
    output.object = vuln;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    debugLogger(output);

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/vulnerabilities" + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function deleteVulnerability(name, callback){

    $.ajax({
        type: "DELETE",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        url: serverIP + "/api/vulnerabilities/name/" + name.replace(" ","%20") + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function putThreat(threat, oldName, callback){
    var output = {};
    output.object = threat;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    debugLogger(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/threats/name/" + oldName.replace(" ","%20") + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function postThreat(threat, callback){
   var output = {};
    output.object = threat;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    debugLogger(output);

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/threats" + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function deleteThreat(name, callback){

    $.ajax({
        type: "DELETE",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        url: serverIP + "/api/threats/name/" + name.replace(" ","%20") + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function putAttacker(attacker, oldName, usePopup, callback){
   var output = {};
    output.object = attacker;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    debugLogger(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/attackers/name/" + oldName.replace(" ","%20") + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            if(usePopup) {
                showPopup(true);
            }
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            if(usePopup) {
                var error = JSON.parse(xhr.responseText);
                showPopup(false, String(error.message));
            }
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function postAttacker(attacker, callback){
    var output = {};
    output.object = attacker;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    debugLogger(output);

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/attackers" + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function deleteAttacker(name, callback){
    $.ajax({
        type: "DELETE",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        url: serverIP + "/api/attackers/name/" + name.replace(" ","%20") + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function putGoal(goal, oldName, callback){
   var output = {};
    output.object = goal;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    //debugLogger(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/goals/name/" + oldName.replace(" ","%20") + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function postGoal(goal, callback){
    var output = {};
    output.object = goal;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    debugLogger(output);

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/goals" + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function postNewProject(callback){
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        url: serverIP + "/api/settings/create" + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
           callback();
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
        }
    });
}
function putProjectSettings(settings, callback){
    var output = {};
    output.object = settings;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/settings?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}

function putPersona(persona, oldName, usePopup, callback){
   var output = {};
    output.object = persona;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    debugLogger(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/personas/name/" + oldName.replace(" ","%20") + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            if(usePopup) {
                showPopup(true);
            }
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            if(usePopup) {
                var error = JSON.parse(xhr.responseText);
                showPopup(false, String(error.message));
            }
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function postPersona(persona, callback){
    var output = {};
    output.object = persona;
    output.session_id = $.session.get('sessionID');
    output = JSON.stringify(output);
    debugLogger(output);

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: serverIP + "/api/personas" + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function deletePersona(name, callback){
    $.ajax({
        type: "DELETE",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        url: serverIP + "/api/personas/name/" + name.replace(" ","%20") + "?session_id=" + $.session.get('sessionID'),
        success: function (data) {
            showPopup(true);
            if(jQuery.isFunction(callback)){
                callback();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var error = JSON.parse(xhr.responseText);
            showPopup(false, String(error.message));
            debugLogger(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
