//
//  NowPlayableModule.swift
//  LiteList
//
//  Created by TSB M3DIA on 10/02/2024.
//

import Foundation
import MediaPlayer

extension IOSNowPlayableBehavior {
    @objc func updateNowPlayingInfoWithTitle(_ title: String, artist: String) {
//        let metadata = NowPlayableStaticMetadata(
//            // Assume all necessary metadata fields are filled, simplifying for example
//            title: title, artist: artist
//            // Other metadata fields...
//        )
//        self.handleNowPlayableItemChange(metadata: metadata)
      
      var nowPlayingInfo = [String: Any]()
      nowPlayingInfo[MPMediaItemPropertyTitle] = "New Title"
      nowPlayingInfo[MPMediaItemPropertyArtist] = "New Artist"
//      nowPlayingInfo[MPMediaItemPropertyArtwork] = // ... set artwork if available ...

      // Update the Now Playing widget
      MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
    }
  
    @objc func configureRemoteCommandCenter() {
      let commandCenter = MPRemoteCommandCenter.shared()
      
      // Enable Next Track Command
      commandCenter.nextTrackCommand.isEnabled = true
      commandCenter.nextTrackCommand.addTarget { [weak self] event -> MPRemoteCommandHandlerStatus in
          // Handle Next Track action here
          return .success
      }
      
      // Enable Previous Track Command
      commandCenter.previousTrackCommand.isEnabled = true
      commandCenter.previousTrackCommand.addTarget { [weak self] event -> MPRemoteCommandHandlerStatus in
          // Handle Previous Track action here
          return .success
      }
      
      // Optionally disable skip forward and skip backward
      commandCenter.skipForwardCommand.isEnabled = false
      commandCenter.skipBackwardCommand.isEnabled = false
  }

}


