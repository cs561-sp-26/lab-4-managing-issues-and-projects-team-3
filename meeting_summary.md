# Planning Poker Session — Speed Score
**April 25, 2026**

## Participants
- **Christopher Somnitz** (facilitator)
- **Savannah Tanner**
- **Adrien Protzel**
- **Alexander Bruzda**
- **Kyle Noble**

---

## User Story 1: Track rounds of speed golf — 5 points

Adrien opened by noting it would require a new JS file, HTML hookup, CSS styling, and a lot of functions to wire up. Savannah agreed it felt like a lot of individual changes. Alexander said he was between 3 and 5 and would have picked 4 if it existed. Kyle said Adrien's argument convinced him. After a second round they landed unanimously on **5**.

---

## User Story 2: Well-tested and bug-free codebase — 3 points

Adrien initially considered 8 due to the quantity of things to test, and Alexander felt similarly. Christopher admitted he hadn't written many tests and erred high. Savannah and Kyle both voted 3 — Savannah explained the test files are short, similar to each other, and not very complex. Kyle added that the tests are straightforward, basically just "push a button and see what happens." Adrien came around, noting you can essentially copy-paste tests and just change the name. They settled on **3**.

---

## User Story 3: Move around the website with a mouse (cleanup/misc) — 2 points

Adrien immediately flagged this as potentially a 0 or "coffee break" since mouse navigation is inherent to any webpage. The group agreed the user story was poorly written — Savannah admitted the tasks were just things that didn't fit elsewhere and needed a title. Kyle gave it a 2 because it touches multiple files and includes some refactoring. After some back and forth between 1 and 2, Christopher switched to 2 after Savannah made a point about package files being more complex. They settled on **2**.

---

## User Story 4: Personalize profile and share with others — 3 points

Adrien voted 5, comparing it to the rounds story since it involves creating many input fields. Kyle argued it was simpler because you just update the database once the form is filled — unlike rounds, you don't have to maintain an ongoing table. Savannah said that was "a better answer than just vibes." Alexander agreed the fields felt repetitive and straightforward. A second round brought consensus to **3**.

---

## User Story 5: Store speed golf info in an account (login/auth) — 3 points

Christopher voted 5, citing back-end complexity and security concerns around authentication. Alexander agreed it needs more testing but noted authentication is formulaic and well-trodden. Kyle pointed out you wouldn't build auth from scratch. Adrien noted most of the work is just inputting and saving data rather than retrieving or editing it later. A second round came out unanimously **3**.

---

## Story Points Summary

| User Story | Points |
|---|---|
| Track rounds of speed golf | 5 |
| Well-tested and bug-free codebase | 3 |
| Move around the website / cleanup | 2 |
| Personalize profile and share with others | 3 |
| Store speed golf info in an account (login/auth) | 3 |
| **Total** | **16** |

---

## Wrap-up

The group confirmed story points are only needed for user stories, not sub-issues. Kyle noted the instructions call for planning poker at the user story level, then subdividing into tasks separately. Alexander summarized: each person would subdivide their own assigned user story into tasks on their own.
