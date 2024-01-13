// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod projects;
use crate::projects::new_project_window;

mod tasks;
use crate::tasks::new_task_window;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![new_project_window, new_task_window])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
