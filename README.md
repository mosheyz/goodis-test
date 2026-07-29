# Goodis Benefit Manager

ניהול ארוחות חיילים וההטבות שלהם, שמירת היסטוריית הטבות, וניהול תקציב היחידה.

שימוש ב:
express, supabase, node.js, mongodb

## file tree

```
├───db
│       mongodb.js => מייצר חיבור למסמך של benefits
│       supabase.js => מייצר חיבור לדטאבייס של budgets, spends
│       
├───repos
│       benefitsRepo.js
│       budgetsRepo.js
│       spendsRepo.js
│       
├───routers
│       budgetsRouter.js
│       soldiersRouter.js
│       
├───services
│       benefitsService.js
│       budgetsService.js
│       spendsService.js
│       utils.js
│       
├───tests/
│
├───.env
├───dockerfile
├───docker-compose
├───app.js
├───.gitignore
├───readme

```

## endpoints
|METHOD|ROUTE|PURPOSE|
|-|-|-|
POST|soldiers/:soldierId/benefits|הוספת הטבה לחייל|
GET|soldiers/:soldierId/benefits| קבלת הטבות של חייל + היסטוריה|
PATCH|soldiers/:soldierId/benefits|עדכון הטבה של חייל, והוספת ההטבה הקיימת להיסטוריה|
POST|budget|הוספת תקציב יחידה|
GET|budget|קבלת רשימת תקציבי היחידות + כמה כבר נוצל|
GET|budget/:id/transactions|קבלת רשימת עסקאות של יחידה|
POST|budget/:id/spend|יוצר עסקת ניצול חדשה|

## databases

benefits:<br>
מסמך ב mongodb, בגלל שמכיל מערך שמשתנה ומתעדכן כל הזמן.

budgets:<br>
טבלה ב supabase, מכיוון שהוא עם שדות קבועים שהסוג שלהם לא משתנה ולא דינמי.

spends:<br>
טבלה ב supabase, מכיוון שהוא עם שדות קבועים שהסוג שלהם לא משתנה ולא דינמי. <br>
מכיל forigen key של טבלת budgets.

## run structures
