enum MerchandiseTrackingStep {
 case created
 case packed
 case stacked
 case delivering
 case handingOver
 case completed
}

func toMerchandiseTracking(_ status: String) -> MerchandiseTrackingStep {
 switch (status) {
 case "CREATED":
  return .created
 case "PICKING", "PACKED":
  return .packed
 case "ASSIGNED":
  return .stacked
 case "DELIVERING":
  return .delivering
 case "HANDING_OVER":
  return .handingOver
 case "DELIVERED", "FULFILLED", "CANCELED":
  return .completed
 default:
  return .completed
 }
}

func getFirstStepWidth(_ step: MerchandiseTrackingStep) -> Double {
  switch (step) {
    case .created: return 0.0
    case .packed: return 0.5
    default: return 1.0
  }
}

func getSecondStepWidth(_ step: MerchandiseTrackingStep) -> Double {
  switch (step) {
    case .created: return 0.0
    case .packed: return 0.0
    case .stacked: return 0.25
    case .delivering: return 0.5
    case .handingOver: return 0.75
    default: return 1.0
  }
}
