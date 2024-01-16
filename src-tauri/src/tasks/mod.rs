use serde::{Serialize, Deserialize};

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
    println!("{task_name}, {task_desc}, {task_status}");
}