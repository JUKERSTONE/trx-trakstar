//
//  TRXLiveActivity.swift
//  TRX
//
//  Created by TSB M3DIA on 25/12/2023.
//

import ActivityKit
import WidgetKit
import SwiftUI


struct MusicPlayerControlsView: View {
    var context: ActivityViewContext<MerchandiseTrackingWidgetAttributes> // Assuming TRXAttributes.ContentState is your context type

    var body: some View {
        HStack {
            Button(action: {
                // Action for previous track
            }) {
                Image(systemName: "backward.fill")
            }

            Button(action: {
                // Play or pause the music based on the context.state.isPlaying
            }) {
                Image(systemName: context.state.isPlaying ? "pause.fill" : "play.fill")
            }

            Button(action: {
                // Action for next track
            }) {
                Image(systemName: "forward.fill")
            }
        }
        // Add modifiers or additional UI elements as needed
    }
}

struct PlayerArtworkView: View {
    let artworkUrlString: String

    var body: some View {
        // Check if the string can be converted to a valid URL
        if let artworkUrl = URL(string: artworkUrlString) {
            AsyncImage(url: artworkUrl) { phase in
                switch phase {
                case .empty:
                    // Placeholder content while loading
                    ProgressView()
                case .success(let image):
                    // Display the loaded image
                    image.resizable()
                         .scaledToFit()
                         .frame(maxHeight: 50) // Set a max height for the artwork
                case .failure:
                    // Placeholder content for failed image loading
                    Image(systemName: "photo")
                        .resizable()
                        .scaledToFit()
                        .frame(maxHeight: 50)
                @unknown default:
                    EmptyView()
                }
            }
        } else {
            // If the URL string is not valid, display a placeholder
            Image(systemName: "photo")
                .resizable()
                .scaledToFit()
                .frame(maxHeight: 50)
        }
    }
}



struct ExpandedPlayerView: View {
    let context: ActivityViewContext<MerchandiseTrackingWidgetAttributes>

    var body: some View {
        HStack {
            PlayerArtworkView(artworkUrlString: context.state.playerImage)
            Text(context.state.playerTitle)
                .lineLimit(1)
                .minimumScaleFactor(0.5)
        }
    }
}

struct TRXLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: MerchandiseTrackingWidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text(context.state.playerTitle)
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)
            .widgetURL(URL(string: "traklist://app/auction/\(context.state.auctionId)"))

        } dynamicIsland: { context in
          DynamicIsland {
            DynamicIslandExpandedRegion(.leading) {
                
              }
              DynamicIslandExpandedRegion(.trailing) {
                  Image(systemName: "music.mic")
                          .foregroundColor(.primary)
              }
              DynamicIslandExpandedRegion(.center) {
                HStack(alignment: .center, spacing: 8) { // spacing is optional for padding between elements
                       PlayerArtworkView(artworkUrlString: context.state.playerImage)
                           .frame(width: 50, height: 50) // Set a fixed frame for the artwork

                       VStack(alignment: .leading) {
                           Text(context.state.playerTitle)
                               .lineLimit(1)
                               .minimumScaleFactor(0.5)

                           Text(context.state.playerArtist)
                               .lineLimit(1)
                               .minimumScaleFactor(0.5)
                       }
                       .frame(maxWidth: .infinity, alignment: .leading)
                   }
                
              }
              DynamicIslandExpandedRegion(.bottom) {
                MusicPlayerControlsView(context: context).padding(0.5)
              }
          } compactLeading: {
            PlayerArtworkView(artworkUrlString: context.state.playerImage)
          } compactTrailing: {
            Text(context.state.playerTitle)
              .lineLimit(1)
              .minimumScaleFactor(0.5)
          } minimal: {
              Text(context.state.isPlaying ? "▶️" : "⏸")
          }
          .keylineTint(Color.blue)
          .widgetURL(URL(string: "traklist://app/auction/\(context.state.auctionId)"))
      }
    }
}

@available(iOS 16.2, *)
struct TRXLiveActivity_Previews: PreviewProvider {
    let context: ActivityViewContext<MerchandiseTrackingWidgetAttributes>
    static let contentStateDictionary: [String: Any] = [
             "playerImage": "imageURLString",
             "playerTitle": "Song Title",
             "playerArtist": "Artist Name",
             "merchandiseImage": "merchandiseImageURLString",
             "merchandiseTitle": "Merchandise Title",
             "merchandisePromotion": "Promotion Text",
             "isPlaying": true
         ]
  
    static let contentState = toTRXLiveContentState(contentStateDictionary as NSDictionary)
  
    static let attributes = MerchandiseTrackingWidgetAttributes(activityId: "dvc")


    static var previews: some View {
        attributes
            .previewContext(contentState, viewKind: .dynamicIsland(.compact))
            .previewDisplayName("Island Compact")
        attributes
            .previewContext(contentState, viewKind: .dynamicIsland(.expanded))
            .previewDisplayName("Island Expanded")
        attributes
            .previewContext(contentState, viewKind: .dynamicIsland(.minimal))
            .previewDisplayName("Minimal")
        attributes
            .previewContext(contentState, viewKind: .content)
            .previewDisplayName("Notification")
    }
}
