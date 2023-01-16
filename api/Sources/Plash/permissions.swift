import EventKit

func remindersAllowed() -> Bool {
	let semaphore = DispatchSemaphore(value: 0)
	var grantedAccess = false
	Store.requestAccess(to: .reminder) { granted, _ in
		print(granted)
		grantedAccess = granted
		semaphore.signal()
	}
	semaphore.wait()
	return grantedAccess
}

func eventsAllowed() -> Bool {
	let semaphore = DispatchSemaphore(value: 0)
	var grantedAccess = false
	Store.requestAccess(to: .event) { granted, _ in
		print(granted)
		grantedAccess = granted
		semaphore.signal()
	}
	semaphore.wait()
	return grantedAccess
}
