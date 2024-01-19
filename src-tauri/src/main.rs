// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod util;
mod tasks;
mod projects;

use crate::tasks::{new_task_window, create_task, delete_task, mark_as_completed, mark_as_pending, edit_task_window, update_task};
use crate::projects::{new_project_window, create_project, get_projects, delete_project, edit_project_window, update_project};
use crate::util::{select_project, unselect_project, select_task, unselect_task};

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![new_project_window, new_task_window, create_project, get_projects, create_task, select_project, unselect_project, delete_project, delete_task, mark_as_completed, mark_as_pending, edit_project_window, update_project, edit_task_window, select_task, unselect_task, update_task])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
