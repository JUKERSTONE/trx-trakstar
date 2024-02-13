import ActivityKit
import SwiftUI

struct MerchandiseTrackingWidgetAttributes: ActivityAttributes {
  public struct ContentState: Codable, Hashable {
    /**
     * e.g. "CREATED"
     */
    var playerImage: String
   
    var playerTitle: String
    
    var playerArtist: String
    
    var merchandiseImage: String
    
    var merchandiseTitle: String
    
    var merchandisePromotion: String
    
    var merchandisePrice: String
    
    var isPlaying: Bool
    
    var auctionId: String
    
    
  }

  let activityId: String
}

func toTRXLiveContentState(_ dict: NSDictionary) -> MerchandiseTrackingWidgetAttributes.ContentState {
  return MerchandiseTrackingWidgetAttributes.ContentState(
    playerImage: dict["playerImage"] as? String ?? "CREATED",
    playerTitle: dict["playerTitle"] as? String ?? "",
    playerArtist: dict["playerArtist"] as? String ?? "",
    merchandiseImage: dict["merchandiseImage"] as? String ?? "",
    merchandiseTitle: dict["merchandiseTitle"] as? String ?? "",
    merchandisePromotion: dict["merchandisePromotion"] as? String ?? "",
    merchandisePrice: dict["merchandisePrice"] as? String ?? "",
    isPlaying: dict["isPlaying"] as? Bool ?? true,
    auctionId: dict["auctionId"] as? String ?? ""
  )
}
