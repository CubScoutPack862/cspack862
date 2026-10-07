## Purpose

Give families immediate, reliable access to Pack meeting and activity dates through validated event content and a live calendar integration that remains useful before final launch data is available.

## ADDED Requirements

### Requirement: Structured Pack events
Pack events SHALL be maintained as individually editable structured content with a required title, start date, category, and tentative status, plus optional end date, time, location, summary, and external details link.

#### Scenario: Maintainer adds a valid event
- **WHEN** a maintainer supplies all required event fields in the documented format
- **THEN** the event is included in the generated calendar and can be selected for the homepage preview

#### Scenario: Maintainer adds invalid event metadata
- **WHEN** an event omits a required field or contains an invalid date
- **THEN** the production build fails with a message identifying the affected content entry and field

### Requirement: Tentative 2026-2027 plan is represented accurately
The calendar SHALL include the documented 2026-2027 events and SHALL clearly identify the overall plan as tentative. Missing times or locations MUST remain omitted or explicitly marked to be confirmed rather than invented.

#### Scenario: Visitor views an event with incomplete details
- **WHEN** a documented event has no confirmed time or location
- **THEN** the event displays only known facts and a concise confirmation indicator where needed

#### Scenario: Visitor views Blue and Gold Party details
- **WHEN** the February 19, 2027 Blue and Gold Party is displayed
- **THEN** its location is shown as to be determined and not replaced with the Pack meeting address

### Requirement: Homepage upcoming-events preview
The homepage SHALL present a clearly labeled preview of the next two to four dated Pack events and a prominent route to the full calendar.

#### Scenario: Future events exist
- **WHEN** the homepage is generated while future dated events are available
- **THEN** it shows the nearest upcoming events in chronological order with readable dates and titles

#### Scenario: No future event remains
- **WHEN** all maintained events are in the past
- **THEN** the preview explains that new dates are being prepared and still links to the full calendar and Pack contact path

### Requirement: Live Google Calendar integration
The full Calendar page SHALL support a configurable Google Calendar embed that reflects upstream calendar changes without a website rebuild, is responsive and titled for assistive technology, and has a direct-calendar fallback link.

#### Scenario: Public Google Calendar URL is configured
- **WHEN** a maintainer supplies the approved embeddable and direct Google Calendar URLs in site configuration
- **THEN** the Calendar page shows a responsive live calendar and a link that opens the calendar directly

#### Scenario: Calendar URL is not configured
- **WHEN** no approved Google Calendar URL is available
- **THEN** the Calendar page continues to show the structured Pack event list and a clearly labeled setup placeholder without embedding an invented calendar

### Requirement: Calendar is usable on small screens
Event cards, date ranges, and the live calendar area SHALL remain readable and keyboard accessible on phone screens without horizontal page scrolling.

#### Scenario: Parent checks dates on a phone
- **WHEN** the Calendar page is viewed at 320 CSS pixels wide
- **THEN** event dates, titles, known time and location details, and the full-calendar fallback remain readable and operable

