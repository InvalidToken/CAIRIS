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
from RoleEnvironmentPanel import RoleEnvironmentPanel

class RolePanel(wx.Panel):
  def __init__(self,parent):
    wx.Panel.__init__(self,parent,armid.ROLE_ID)
    b = Borg()
    self.dbProxy = b.dbProxy

  def buildControls(self,isCreate):
    mainSizer = wx.BoxSizer(wx.VERTICAL)
    mainSizer.Add(WidgetFactory.buildTextSizer(self,'Name',(87,30),armid.ROLE_TEXTNAME_ID),0,wx.EXPAND)
    mainSizer.Add(WidgetFactory.buildTextSizer(self,'Short Code',(87,30),armid.ROLE_TEXTSHORTCODE_ID),0,wx.EXPAND)
    roleTypes = self.dbProxy.getDimensionNames('role_type')
    mainSizer.Add(WidgetFactory.buildComboSizerList(self,'Type',(87,30),armid.ROLE_COMBOTYPE_ID,roleTypes),0,wx.EXPAND)
    mainSizer.Add(WidgetFactory.buildMLTextSizer(self,'Description',(87,80),armid.ROLE_TEXTDESCRIPTION_ID),0,wx.EXPAND)
    mainSizer.Add(RoleEnvironmentPanel(self,self.dbProxy),1,wx.EXPAND)
    mainSizer.Add(WidgetFactory.buildCommitButtonSizer(self,armid.ROLE_BUTTONCOMMIT_ID,isCreate),0,wx.ALIGN_CENTER)
    self.SetSizer(mainSizer)

  def loadControls(self,role):
    nameCtrl = self.FindWindowById(armid.ROLE_TEXTNAME_ID)
    scCtrl = self.FindWindowById(armid.ROLE_TEXTSHORTCODE_ID)
    typeCtrl = self.FindWindowById(armid.ROLE_COMBOTYPE_ID)
    descCtrl = self.FindWindowById(armid.ROLE_TEXTDESCRIPTION_ID)
    environmentCtrl = self.FindWindowById(armid.ROLE_PANELENVIRONMENT_ID)
    nameCtrl.SetValue(role.name())
    scCtrl.SetValue(role.shortCode())
    typeCtrl.SetValue(role.type())
    descCtrl.SetValue(role.description())
    environmentCtrl.loadControls(role)
