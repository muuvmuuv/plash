import Darwin
import EventKit
import Foundation
import Swifter

let Store = EKEventStore()

if !(remindersAllowed() && eventsAllowed()) {
	exit(1)
}

let server = HttpServer()
server["/"] = { _ in
	let calendar = Calendar()
	let calendars = calendar.getCalendarNames()
	let encoder = JSONEncoder()
	var encoded: Data
	do {
		encoded = try encoder.encode(calendars)
		print(encoded)
	} catch {
		return HttpResponse.badRequest(.text("Failed"))
	}
	return .ok(.json(encoded))
}

let semaphore = DispatchSemaphore(value: 0)
do {
	try server.start(8080, forceIPv4: true)
	print("Server has started ( port = \(try server.port()) ). Try to connect now...")
	semaphore.wait()
} catch {
	print("Server start error: \(error)")
	semaphore.signal()
}
