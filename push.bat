@echo off
echo Adding new changes...
git add .

echo Committing...
git commit -m "Update portfolio"

echo Setting remote URL...
git remote set-url origin https://github.com/skillstar66-star/PORTFOLIO.git
if errorlevel 1 git remote add origin https://github.com/skillstar66-star/PORTFOLIO.git

echo Force pushing to GitHub to overwrite conflicts...
git branch -M main
git push -f -u origin main

echo Done!
pause
