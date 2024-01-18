use serde::{Serialize, Deserialize};

use crate::util::{gen_id, load_from_json, load_to_json};

#[derive(Debug, Serialize, Deserialize)]
pub struct Task {
    #[serde(rename="_id")]
    id: String,
    name: String,
    description: String,
    status: String
}

impl Task {
    pub fn get_id(&self) -> String {
        self.id.clone()
    }
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
    let mut projects = load_from_json();
    let selected_project = projects.get_selected_project();
    let new_task = Task{id: gen_id(), name: task_name, description: task_desc, status: task_status};
    selected_project.add_task(new_task);

    load_to_json(&projects);
}

#[tauri::command]
pub fn delete_task(task_id: String) {
    let mut projects = load_from_json();
    let selected_project = projects.get_selected_project();

    selected_project.delete_task(task_id);
    load_to_json(&projects);
}