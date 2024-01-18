// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod util;
mod tasks;
mod projects;

use crate::tasks::{new_task_window, create_task};
use crate::projects::{new_project_window, create_project, get_projects};
use crate::util::{select_project, unselect_project};

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![new_project_window, new_task_window, create_project, get_projects, create_task, select_project, unselect_project])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
