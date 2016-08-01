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

var AssetEnvironmentProperty =
{
    "__python_obj__": "tools.ModelDefinitions.AssetEnvironmentPropertiesModel",
    "associations": [],
    "attributes": [
    ],
    "environment": "",
    "attributesDictionary": {}
};
var AssetEnvironmentPropertyAttribute =
        {
            "__python_obj__": "tools.ModelDefinitions.AssetSecurityAttribute",
            "rationale": "",
            "value": "",
            "name": ""
        };
var mainAssetObject =
{
    "__python_obj__": "Asset.Asset",
    "theEnvironmentDictionary": {},
    "theDescription": "",
    "theAssetPropertyDictionary": {},
    "theSignificance": "",
    "theId": -1,
    "theTags": [],
    "theCriticalRationale": "",
    "theInterfaces": [],
    "theType": "",
    "theName": "",
    "isCritical": 0,
    "theShortCode": "",
    "theEnvironmentProperties": []
};
var roleDefaultObject = {
    "__python_obj__": "Role.Role",
    "theEnvironmentDictionary": {},
    "theEnvironmentProperties": [],
    "theId": -1,
    "costLookup": {
    },
    "theType": "",
    "theName": "",
    "theShortCode": "",
    "theDescription": ""
};
var tensionDefault = {
    "__python_obj__": "tools.PseudoClasses.EnvironmentTensionModel",
    "rationale": "",
    "attr_id": -1,
    "base_attr_id": -1,
    "value": -1
};
var environmentDefault = {"__python_obj__": "Environment.Environment",
    "theId": -1,
    "theDuplicateProperty": "",
    "theTensions": [],
    "theName": "",
    "theEnvironments": [],
    "theShortCode": "",
    "theDescription": "",
    "theOverridingEnvironment": ""
};
var vulnerabilityDefault = {
    "__python_obj__": "Vulnerability.Vulnerability",
    "theEnvironmentDictionary": {},
    "theVulnerabilityName": "",
    "theVulnerabilityType": "",
    "theTags": [],
    "theVulnerabilityDescription": "",
    "theVulnerabilityId": -1,
    "severityLookup": {},
    "theEnvironmentProperties": []
};
var vulEnvironmentsDefault = {
    "__python_obj__": "VulnerabilityEnvironmentProperties.VulnerabilityEnvironmentProperties",
    "theEnvironmentName": "",
    "theAssets": [],
    "theSeverity": ""
};
var threatEnvironmentDefault = {"__python_obj__": "ThreatEnvironmentProperties.ThreatEnvironmentProperties",
    "theAssets": [],
    "theLikelihood": "",
    "theEnvironmentName": "",
    "theAttackers": [],
    "theRationale": [],
    "theProperties": []
};
var threatDefault = {
    "__python_obj__": "Threat.Threat",
    "theId": -1,
    "theTags": [],
    "theThreatName": "",
    "theType": "",
    "theMethod": "",
    "theEnvironmentProperties": [],
    "theProperties": []
};

var attackerEnvDefault = {
    "__python_obj__": "AttackerEnvironmentProperties.AttackerEnvironmentProperties",
    "theRoles": [],
    "theMotives": [],
    "theCapabilities": [],
    "theEnvironmentName": ""
};

var attackerDefault = {
    "__python_obj__": "Attacker.Attacker",
    "theDescription": "",
    "theId": -1,
    "theTags": [],
    "isPersona": false,
    "theName": "",
    "theImage": "",
    "theEnvironmentProperties": []
};

var personaEnvDefault = {
    "__python_obj__": "PersonaEnvironmentProperties.PersonaEnvironmentProperties",
    "theDirectFlag": 1,
    "theNarrative": "",
    "theRoles": [],
    "theCodes": []
};

var personaDefault = {
    "__python_obj__": "Persona.Persona",
    "theDescription": "",
    "theId": -1,
    "theName": "",
    "theTags": [],
    "theActivities": "",
    "theAttitudes": "",
    "theAptitudes": "",
    "theMotivations": "",
    "theSkills": "",
    "theIntrinsic": "",
    "theContextual": "",
    "theImage": "",
    "isAssumption": 0,
    "thePersonaType": "Primary",
    "theEnvironmentProperties": []
};

var goalEnvDefault =     {
        "__python_obj__": "GoalEnvironmentProperties.GoalEnvironmentProperties",
        "theFitCriterion": "",
        "theConcerns": [],
        "theSubGoalRefinements": [],
        "thePriority": "",
        "theEnvironmentName": "",
        "theCategory": "",
        "theDefinition": "",
        "theConcernAssociations": [],
        "theGoalRefinements": [],
        "theLabel": "",
        "theIssue": ""
    };
var goalDefault = {
    "__python_obj__": "Goal.Goal",
    "theColour": "",
    "theId": -1,
    "theOriginator": "",
    "theTags": [],
    "theName": "",
    "theEnvironmentProperties": []
};
var respRoleDefault = {
    "__python_obj__": "tools.PseudoClasses.ValuedRole",
    "roleName": "",
    "cost": ""
};
var respEnvDefault = {"__python_obj__": "TransferEnvironmentProperties.TransferEnvironmentProperties",
    "theRationale": "",
    "theRoles": [],
    "theEnvironmentName": "Stroke"
};
