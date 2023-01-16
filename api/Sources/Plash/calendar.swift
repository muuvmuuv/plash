import EventKit

struct Calendar {
	init() {}

	func getCalendarNames() -> [String] {
		var calendars = [String]()
		let list = getCalendars()
		for calendar in list {
			calendars.append(calendar.title)
		}
		return calendars
	}

	func getCalendars() -> [EKCalendar] {
		Store.calendars(for: .event)
			.filter(\.allowsContentModifications)
	}
}
