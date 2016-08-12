#!/usr/bin/osascript
on run_in_new_window(cmd_to_run)
  set projPath to "/Users/bscherm/SideProjects/book_scripter_foundation"
  tell application "Terminal"
    do script "cd " & projPath & " && " & cmd_to_run
    activate
  end tell
end run_in_new_window

run_in_new_window("npm run back-api-test")
run_in_new_window("npm run back-test")



