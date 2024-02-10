//
//  TRXLiveHeader.m
//  LiteList
//
//  Created by TSB M3DIA on 25/12/2023.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(TRXLiveModule, RCTEventEmitter)

RCT_EXTERN_METHOD(
  request:(NSString *)activityId
  contentState:(NSDictionary *)contentState
)
RCT_EXTERN_METHOD(updateActivity: (NSDictionary *)contentState)

@end
