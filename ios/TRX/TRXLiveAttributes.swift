import ActivityKit
import SwiftUI

struct MerchandiseTrackingWidgetAttributes: ActivityAttributes {
  public struct ContentState: Codable, Hashable {
    /**
     * e.g. "CREATED"
     */
    var playerImage: String
    /**
     * e.g. "We’re packing your order"
     */
    var playerTitle: String
    /**
     * e.g. "Arriving at"
     */
    var playerArtist: String
    /**
     * e.g. "9:15 - 9:25"
     */
    var merchandiseImage: String
    /**
     * e.g. "9:15"
     */
    var merchandiseTitle: String
    /**
     * ZCommerce Order ID
     */
    var merchandisePromotion: String
    
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
    isPlaying: dict["isPlaying"] as? Bool ?? true,
    auctionId: dict["auctionId"] as? String ?? ""
  )
}
