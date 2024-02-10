//
//  IOSNowPlayableBehaviorBridge.m
//  LiteList
//
//  Created by TSB M3DIA on 10/02/2024.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(IOSNowPlayableBehavior, NSObject)

RCT_EXTERN_METHOD(
  updateNowPlayingInfoWithTitle:(NSString *)title
  artist:(NSString *)artist
)

RCT_EXTERN_METHOD(configureRemoteCommandCenter)


@end
