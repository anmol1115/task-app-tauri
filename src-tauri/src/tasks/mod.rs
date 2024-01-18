use std::fs::File;
use std::io::{Read, Write};
use serde::{Serialize, Deserialize};

use crate::projects::Projects;
use crate::util::gen_id;

#[derive(Debug, Serialize, Deserialize)]
pub struct Task {
    #[serde(rename="_id")]
    id: String,
    name: String,
    description: String,
    status: String
}

#[tauri::command]
pub async fn new_task_window(handle: tauri::AppHandle) {
    let _new_window = tauri::WindowBuilder::new(
        &handle,
        "create_task_window",
        tauri::WindowUrl::App("../../../src/static/createTask.html".into())
    )
    .title("Create Task")
    .resizable(false)
    .inner_size(300.0, 150.0)
    .build().unwrap();
}

#[tauri::command]
pub fn create_task(task_name: String, task_desc: String, task_status: String) {
    let mut file = File::open("../db.json").expect("File not found");
    let mut content = String::new();

    file.read_to_string(&mut content).expect("Error reading from file");
    let mut projects: Projects = serde_json::from_str(&content).expect("Failed to pass to struct");

    let selected_project = projects.get_selected_project();
    let new_task = Task{id: gen_id(), name: task_name, description: task_desc, status: task_status};
    selected_project.add_task(new_task);

    let mut file = File::create("../db.json").expect("File not found");
    let json_data = serde_json::to_string_pretty(&projects).expect("Failed to parse to json");
    file.write_all(json_data.as_bytes()).expect("Failed to write to file");
}