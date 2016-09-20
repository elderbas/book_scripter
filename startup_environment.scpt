#!/usr/bin/osascript
#not optimized for anybody but me yet
# Could also add
# run mongod IF it isnt running
# open webstorm IF it isnt running
on run_in_new_window(cmd_to_run)
  set projPath to "/Users/bscherm/SideProjects/book_scripter"
  tell application "Terminal"
    do script "cd " & projPath & " && " & cmd_to_run
    activate
  end tell
end run_in_new_window

run_in_new_window("npm run back-api-test") # acceptance test
run_in_new_window("npm run back-test") # backend unit test (including DB models)
run_in_new_window("npm run start") # webpack start
