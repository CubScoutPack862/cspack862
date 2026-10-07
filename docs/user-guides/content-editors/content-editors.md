# Content editor's guide

This guide is for Pack volunteers who keep website information accurate. You do not need to understand the website code. Make only changes you can confirm from an approved Pack source or a leader.

## Where to edit

Website information is stored in folders named `content`. On GitHub, open the relevant file, select the pencil icon (**Edit**), make the change, then choose **Propose changes**. Write a short note explaining what changed and where the information came from. A site administrator will review it before it appears on the website.

| What you want to change | Where to find it |
| --- | --- |
| Text on a website page | `content/pages/` |
| An upcoming activity or event | `content/events/` |
| Photo description and approval details | `content/media/` |
| Pack-wide information, such as fees, contacts, schedules, and links | `src/data/pack.ts` (ask a site maintainer if you are unsure) |

For a page, change the ordinary text underneath the information at the top. Do not add a new top-level heading. If you add a section heading, start it with two number signs and a space, for example `## Camping`. This makes it appear correctly in the page's contents list.

Some page text updates itself from Pack-wide information, such as the season, fees, or meeting location. If the text looks like `{{season}}` or `{{location}}`, leave it unchanged; update the Pack-wide information instead.

## Publication states

The Pack-wide information file, `src/data/pack.ts`, records whether a fact is ready to show. Each item has a status. Keep the status honest so families never see an unconfirmed detail as if it were final.

| Status | Use it when | What families see |
| --- | --- | --- |
| `verified` | A leader or approved source has confirmed the detail. | The confirmed detail. |
| `tentative` | There is a likely detail, but it may change. | The detail and a note that it is tentative. |
| `confirm` | A possible detail exists, but it is not approved. | A note asking families to confirm it; the possible detail stays hidden. |
| `missing` | The Pack has not provided the information. | A note that the information is not available. |
| `private` | The detail must not be public. | Nothing. |
| `member-only` | The detail belongs in a private Pack system or direct leader communication. | Nothing. |

When changing this file, update the public note as well as the value. Use `verified` only after confirmation. Do not add personal phone numbers, family information, medical information, consent forms, or passwords to the repository.

## Add or update an event

Each event has its own file in `content/events/`. To add an event, copy a similar existing event file, give the copy a clear date-and-name filename, and edit the information at its top. Ask a site maintainer for help if you need a new event type.

Fill in the event title, date, short summary, and whether the date is tentative. Add a time, place, notes, and an approved outside link only when they are known. Leave unknown details blank rather than using the normal meeting location as a placeholder. If an event lasts more than one day, add its ending date. Always put dates in quotation marks, such as `"2027-09-10"`.

The website puts events in date order automatically. The home page shows the next three. Please remove or update an event when it is cancelled or its details change.

## Validate content before review

Before proposing a change, check that:

- Names, dates, times, locations, costs, and links match an approved source.
- Tentative information is clearly marked as tentative.
- The change uses welcoming, concise language for families.
- Links open the intended destination.
- Photo descriptions are accurate and no image is added without Pack approval.
- No private family, medical, consent, account, or password information is included.

After a change is proposed, a site administrator checks the website preview, links, privacy, dates, and mobile presentation. Correct any questions before the change is published.

## Annual rollover

At the start of each new Pack season, work through this list with Pack leadership:

1. Confirm the season, Pack meeting schedule, virtual Parent Committee schedule, location, entrance guidance, public email contacts, fees, and payment due date.
2. Review every event date and keep it marked tentative until Pack leadership confirms it.
3. Check registration, Scout Shop, safeguarding, medical-form, uniform, map, and public Scouting links against approved sources.
4. Confirm that Den logistics, payment instructions, assistance details, member systems, rosters, and internal operations remain private or member-only.
5. Review the exact approved logo, rank-insignia, and stock-photo inventory. Do not add Pack-member or family photos.

Do not guess at missing information. Leave it unavailable or ask families to check with their Den Leader until a Pack leader confirms it.

## Launch confirmation

Before a public launch, confirm with leadership that the season details, fees, schedules, two public email contacts, tentative events, links, and stock assets are current. Confirm that the completed questionnaire, orientation PDF, phone numbers, biographies, and member-only information are absent. A site administrator will run the website checks and review the site on a phone and with a keyboard before it is launched.

## Parent contribution and handover

Parents can contribute by proposing a small, focused update on GitHub. In the change description, say what was changed and the source of the information. A site administrator reviews every change before it is accepted.

For a handover, make sure at least two Pack-controlled administrators can access the repository and domain account. Keep account recovery and renewal details in a private Pack record, not in this repository. If a published change is wrong, tell a site administrator; they can restore the earlier approved version.
