// swift-tools-version: 5.7

import PackageDescription

let package = Package(
	name: "Plash",
	dependencies: [
		.package(url: "https://github.com/httpswift/swifter.git", from: "1.5.0"),
	],
	targets: [
		.executableTarget(
			name: "Plash",
			dependencies: [
				.product(name: "Swifter", package: "swifter"),
			]
		),
		.binaryTarget(
			name: "swiftformat",
			url:
			"https://github.com/nicklockwood/SwiftFormat/releases/download/0.49.18/swiftformat.artifactbundle.zip",
			checksum: "47e8ecd01fca0ea3c21029a0ea53b3dff4eb712e6164c5c796e4c74c7facf073"
		),
	]
)
