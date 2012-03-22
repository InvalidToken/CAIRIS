#  Licensed to the Apache Software Foundation (ASF) under one
#  or more contributor license agreements.  See the NOTICE file
#  distributed with this work for additional information
#  regarding copyright ownership.  The ASF licenses this file
#  to you under the Apache License, Version 2.0 (the
#  "License"); you may not use this file except in compliance
#  with the License.  You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing,
#  software distributed under the License is distributed on an
#  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
#  specific language governing permissions and limitations
#  under the License.


import wx
import armid
import WidgetFactory
from Borg import Borg
from ThreatEnvironmentPanel import ThreatEnvironmentPanel

class ThreatPanel(wx.Panel):
  def __init__(self,parent):
    wx.Panel.__init__(self,parent,armid.THREAT_ID)
    b = Borg()
    self.dbProxy = b.dbProxy
    self.theLikelihoods = self.dbProxy.getDimensionNames('likelihood')
    

  def buildControls(self,isCreate,isUpdateable=True):
    mainSizer = wx.BoxSizer(wx.VERTICAL)
    mainSizer.Add(WidgetFactory.buildTextSizer(self,'Name',(87,30),armid.THREAT_TEXTNAME_ID),0,wx.EXPAND)
    threatTypes = self.dbProxy.getDimensionNames('threat_type')
    mainSizer.Add(WidgetFactory.buildComboSizerList(self,'Type',(87,30),armid.THREAT_THREATTYPE_ID,threatTypes),0,wx.EXPAND)
    mainSizer.Add(WidgetFactory.buildMLTextSizer(self,'Method',(87,60),armid.THREAT_TEXTMETHOD_ID),0,wx.EXPAND)
    mainSizer.Add(ThreatEnvironmentPanel(self,self.dbProxy),1,wx.EXPAND)

    if (isUpdateable):
      mainSizer.Add(WidgetFactory.buildCommitButtonSizer(self,armid.THREAT_BUTTONCOMMIT_ID,isCreate),0,wx.ALIGN_CENTRE)
    self.SetSizer(mainSizer)

  def loadControls(self,threat,isReadOnly = False):
    nameCtrl = self.FindWindowById(armid.THREAT_TEXTNAME_ID)
    typeCtrl = self.FindWindowById(armid.THREAT_THREATTYPE_ID)
    methodCtrl = self.FindWindowById(armid.THREAT_TEXTMETHOD_ID)
    environmentCtrl = self.FindWindowById(armid.THREAT_PANELENVIRONMENT_ID)
    nameCtrl.SetValue(threat.name())
    typeCtrl.SetValue(threat.type())
    methodCtrl.SetValue(threat.method())
    environmentCtrl.loadControls(threat)
