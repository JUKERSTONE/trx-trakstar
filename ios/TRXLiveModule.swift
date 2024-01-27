//
//  TRXLive.swift
//  LiteList
//
//  Created by TSB M3DIA on 25/12/2023.
//

import SwiftUI
import React // Add this to import RCTEventEmitter
import ActivityKit

@available(iOS 16.1, *)
@objc(TRXLiveModule)
class TRXLiveModule: RCTEventEmitter {
  
  open override func supportedEvents() -> [String] {
    ["onPushToken"]
  }
    
  @objc(updateActivity:)
   func updateActivity(contentState: NSDictionary){
     do{
         let state = toTRXLiveContentState(contentState)
         Task{
           for activity in Activity<MerchandiseTrackingWidgetAttributes>.activities {
             await activity.update(using: state)
           }
         }
     }
   }
  
  @objc func request(_
     activityId: String,
     contentState: NSDictionary
   ) -> Void {
     DispatchQueue.main.async {
       var hasBeenFound = false
       let attributes = MerchandiseTrackingWidgetAttributes(activityId: activityId)
       let state = toTRXLiveContentState(contentState)
//       let step = toMerchandiseTracking(state.status)

       // Find live activity with activity ID.
       Activity<MerchandiseTrackingWidgetAttributes>.activities.forEach { activity in
         if (!hasBeenFound && activity.attributes.activityId == activityId) {
           hasBeenFound = true
           Task {
//             if (step == .completed) {
//               await activity.end(dismissalPolicy: .immediate)
//             }

             for await data in activity.pushTokenUpdates {
               let pushToken = data.map {String(format: "%02x", $0)}.joined()
               if (!pushToken.isEmpty) {
                 self.sendEvent(withName: "onPushToken", body: pushToken)
               }
             }
           }
         }
       }

       // If we have not found a live activity, then request a new one.
       if (!hasBeenFound) {
         guard let activity = try? Activity<MerchandiseTrackingWidgetAttributes>.request(
           attributes: attributes,
           contentState: state,
           pushType: .token
         ) else { return }

         Task {
           for await data in activity.pushTokenUpdates {
             let pushToken = data.map {String(format: "%02x", $0)}.joined()
             if (!pushToken.isEmpty) {
               self.sendEvent(withName: "onPushToken", body: pushToken)
             }
           }
         }
       }
     }
   }
}
