import Darwin
import EventKit
import Foundation

private let Store = EKEventStore()

public struct Plash {
  @discardableResult
  public init() {
    print("Start server...")

    self.showLists()
  }

  func showLists() {
    let calendars = self.getCalendars()
    for calendar in calendars {
      print(calendar.title)
    }
  }

  public static func requestAccess() -> Bool {
    let semaphore = DispatchSemaphore(value: 0)
    var grantedAccess = false
    Store.requestAccess(to: .reminder) { granted, _ in
      grantedAccess = granted
      semaphore.signal()
    }
    semaphore.wait()
    return grantedAccess
  }

  private func getCalendars() -> [EKCalendar] {
    return Store.calendars(for: .reminder)
      .filter { $0.allowsContentModifications }
  }
}

if Plash.requestAccess() {
  Plash.init()
} else {
  exit(0)
}
